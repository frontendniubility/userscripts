const fs = require('fs');
const path = require('path');
const { URL } = require('url');
const { validate } = require('schema-utils');
const { ConcatSource, RawSource } = require('webpack-sources');
const userscriptMeta = require('@tkausl/userscript-meta');
const _pick = require('lodash.pick');
const pkgUp = require('pkg-up');

const loadHeaderFile = require('./loadHeaderFile');
const createHeaderProvider = require('./createHeaderProvider');
const interpolate = require('./interpolate');
const optionsSchema = require('./schemas/options.json');
const { computeSSRI } = require('./ssri');
// const webpack = require('webpack');

const PLUGIN_NAME = 'WebpackUserscript';

/**
 * @typedef {import('webpack').Compilation} Compilation
 * @typedef {import('webpack').Compiler} Compiler
 * @typedef {import('./index').WPUSOptions} WPUSOptions
 */

const DEFAULT_CONFIG = {
    pretty: true,
    metajs: true,
    renameExt: true,
    downloadBaseUrl: '',
    updateBaseUrl: '',
    ssri: false,
};
const DEFAULT_SSRI_CONFIG = {
    include: /.*/,
    single: false,
};
const fileDependencies = new Set();

module.exports = class WebpackUserscript {
    /**
     * @param { WPUSOptions} options
     */
    constructor(options = {}) {
        validate(optionsSchema, options, PLUGIN_NAME);

        options.proxyScript = Object.assign(
            {
                baseUrl: 'http://localhost:8080/',
                filename: '[basename].proxy.user.js',
                enable: process.env.WEBPACK_DEV_SERVER === 'true',
            },
            options.proxyScript,
        );
        options.proxyScript.enable = typeof options.proxyScript.enable === 'function' ? options.proxyScript.enable() : options.proxyScript.enable;

        if (options.downloadBaseUrl && !options.updateBaseUrl) {
            options.updateBaseUrl = options.downloadBaseUrl;
        } else if (!options.downloadBaseUrl && options.updateBaseUrl) {
            options.downloadBaseUrl = options.updateBaseUrl;
        }

        this.options = Object.assign({}, DEFAULT_CONFIG, typeof options === 'string' ? { headers: loadHeaderFile(options, fileDependencies) } : typeof options === 'function' ? { headers: options } : typeof options.headers === 'string' ? { ...options, headers: loadHeaderFile(options.headers, fileDependencies) } : options);

        this.buildNo = 0;
        this.ssriCache = {};
    }

    /**
     *
     * @param {Compiler} compiler
     */
    apply(compiler) {
        const packageJsonFile = pkgUp.sync({
            cwd: compiler.options.context,
        });
        const packageJson = typeof packageJsonFile === 'string' ? JSON.parse(fs.readFileSync(packageJsonFile, 'utf8')) : {};
        const packageInfoObj = {
            name: packageJson.name || '',
            version: packageJson.version || '',
            description: packageJson.description || '',
            author: packageJson.author || '',
            homepage: packageJson.homepage || '',
            bugs: typeof packageJson.bugs === 'string' ? packageJson.bugs : typeof packageJson.bugs === 'object' && typeof packageJson.bugs.url === 'string' ? packageJson.bugs.url : '',
        };
        const headerProvider = createHeaderProvider(packageInfoObj, this.options.headers);
        fileDependencies.add(packageJsonFile);
        // compiler.hooks.watchRun(c=>{})

        compiler.hooks.thisCompilation.tap(PLUGIN_NAME, async compilation => {
            compilation.hooks.afterProcessAssets.tap(
                {
                    name: PLUGIN_NAME,
                },

                assets => {
                    for (const chunk of compilation.chunks) {
                        if (!chunk.canBeInitial()) {
                            // non-entry
                            continue;
                        }

                        for (const file of chunk.files) {
                            const hash = compilation.hash;
                            const querySplit = file.indexOf('?');
                            const query = querySplit >= 0 ? file.substr(querySplit) : '';

                            const filename = querySplit >= 0 ? file.substr(0, querySplit) : file;
                            if (path.extname(filename) !== '.js') {
                                continue;
                            }

                            const basename = filename.endsWith('.user.js') ? path.basename(filename, '.user.js') : filename.endsWith('.js') ? path.basename(filename, '.js') : filename;
                            const outputFile = this.options.renameExt && !filename.endsWith('.user.js') ? filename.replace(/\.js$/, '') + '.user.js' : filename;
                            const metaFile = basename + '.meta.js';
                            /**
                             * @type {import('./index').DataObject}
                             */
                            const data = {
                                hash,
                                chunkHash: chunk.hash,
                                chunkName: chunk.name,
                                file,
                                filename,
                                basename,
                                query,
                                buildNo: ++this.buildNo,
                                buildTime: Date.now(),
                                ...packageInfoObj,
                            };
                            /**
                             * @type {import('./index').HeaderObject}
                             */
                            const tplHeaderObj = headerProvider(data);
                            if (!tplHeaderObj.downloadURL && this.options.downloadBaseUrl) {
                                tplHeaderObj.downloadURL = new URL(outputFile, this.options.downloadBaseUrl).toString();
                            }
                            if (!tplHeaderObj.updateURL && this.options.updateBaseUrl) {
                                tplHeaderObj.updateURL = !this.options.metajs ? tplHeaderObj.downloadURL : new URL(metaFile, this.options.updateBaseUrl).toString();
                            }

                            if (this.options.ssri) {
                                // sri support
                                const ssriOptions = Object.assign({}, DEFAULT_SSRI_CONFIG, typeof this.options.ssri === 'boolean' ? {} : this.options.ssri);
                                const urlFilters = _pick(ssriOptions, ['include', 'exclude']);
                                const integrityOptions = _pick(ssriOptions, ['algorithms', 'integrity', 'size']);

                                tplHeaderObj.require = !tplHeaderObj.require ? [] : !Array.isArray(tplHeaderObj.require) ? [tplHeaderObj.require] : tplHeaderObj.require;
                                tplHeaderObj.resource = !tplHeaderObj.resource ? [] : !Array.isArray(tplHeaderObj.resource) ? [tplHeaderObj.resource] : tplHeaderObj.resource;

                                const effectiveUrls = new Set();
                                tplHeaderObj.require = tplHeaderObj.require.map(url => {
                                    effectiveUrls.add(url);
                                    if (!(url in this.ssriCache)) {
                                        this.ssriCache[url] = computeSSRI(url, 'require', urlFilters, integrityOptions);
                                    }
                                    return this.ssriCache[url];
                                });

                                tplHeaderObj.resource = tplHeaderObj.resource.map(url => {
                                    let name;
                                    if (url.match(/^\w+\s+https?:\/\/.*/)) {
                                        [name, url] = url.split(/\s+/);
                                    }

                                    effectiveUrls.add(url);
                                    if (!(url in this.ssriCache)) {
                                        this.ssriCache[url] = computeSSRI(url, 'resource', urlFilters, integrityOptions).then(urlSSRI => [name, urlSSRI].join(' '));
                                    }
                                    return this.ssriCache[url];
                                });

                                for (const url in this.ssriCache) {
                                    if (!effectiveUrls.has(url)) {
                                        delete this.ssriCache[url];
                                    }
                                }
                            }

                            const headerObj = interpolate(tplHeaderObj, data);

                            const headerString = userscriptMeta.stringify(headerObj, this.options.pretty);
                            const fileSource = compilation.assets[file];
                            // console.log(headerString);
                            if (outputFile !== file) {
                                compilation.deleteAsset(file);

                                compilation.emitAsset(outputFile, new ConcatSource(headerString, '\n', fileSource));
                            } else {
                                compilation.updateAsset(outputFile, old => new ConcatSource(headerString, '\n', fileSource));
                            }

                            let hotDevHeaderString = '';
                            if (this.options.proxyScript.enable) {
                                const hotDevBaseUrl = interpolate(this.options.proxyScript.baseUrl, data);
                                const hotDevFilename = interpolate(this.options.proxyScript.filename, data);
                                const requires = Array.isArray(headerObj.require) ? headerObj.require : typeof headerObj.require === 'string' ? [headerObj.require] : [];
                                hotDevHeaderString = userscriptMeta.stringify(
                                    {
                                        ...headerObj,
                                        require: [...requires, `${hotDevBaseUrl.replace(/\/$/, '')}/${outputFile}`],
                                    },
                                    this.options.pretty,
                                );
                                compilation.emitAsset(hotDevFilename, new ConcatSource(hotDevHeaderString), {
                                    development: false,
                                });
                            }

                            if (this.options.metajs) {
                                // console.log(headerString);
                                compilation.emitAsset(metaFile, new ConcatSource(this.options.proxyScript.enable ? hotDevHeaderString : headerString));
                            }
                        }
                    }
                },
            );
        });

        compiler.hooks.afterEmit.tapAsync(PLUGIN_NAME, (compilation, callback) => {
            for (const fileDependency of fileDependencies) {
                // Add file dependencies if they're not already tracked
                if (!compilation.fileDependencies.has(fileDependency)) {
                    compilation.fileDependencies.add(fileDependency);
                }
            }
            callback();
        });
    }
};
