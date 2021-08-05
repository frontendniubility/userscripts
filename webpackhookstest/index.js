//

const logger = require('../log').loggers.get('webpacktest');

/**
 * @typedef {import('webpack')} webpack
 * @typedef {import('webpack').Compiler} Compiler
 *  @typedef {import('tapable').Hook} Hook
 * @typedef {import('tapable').HookMap } HookMap
 *   @typedef {import('webpack').Compilation} Compilation
 *   @typedef {import('webpack').Module} Module
 *  @typedef {import('webpack').NormalModule} NormalModule
 *
 */
const _sym = 'abcdefghijklmnopqrstuvwxyz1234567890',
    len = _sym.length;
function generate(count = 10) {
    let str = [];
    for (var i = 0; i < count; i++) {
        str[i] = _sym[parseInt(Math.random() * len)];
    }

    return str.join('');
}

function className(object, defaultName) {
    if (!object) return '';
    var result = '';
    if (typeof object === 'function') {
        result = object.name || object.toString().match(/^function\s?([^\s(]*)/)[1];
    } else if (typeof object.constructor === 'function') {
        result = className(object.constructor, defaultName);
    }
    return result || defaultName;
}

module.exports = class webpacktestplugin {
    /**
     *
     * @param {Compiler} compiler
     */
    apply(compiler) {
        const p1 = 6,
            p2 = 23,
            p3 = 30;
        Object.keys(compiler.hooks).forEach(function (crKey, index, array) {
            /** @type Hook */
            let compilerHook = compiler.hooks[crKey];

            //
            // logger.crtap(`${''.padEnd(p1)} crkey> ${crKey.padEnd(p2)} > ${'----'.padEnd(p3)}`);
            let showCrhooks = ['thisCompilation' /* , 'compilation' */ /*, 'make', 'emit' */];
            if (showCrhooks.includes(crKey))
                compilerHook.tap(
                    `Compiler_${crKey}`,
                    /**@param {Compilation} compilation */
                    function (compilation) {
                        logger.crrun(`${''.padEnd(p1)} CRKEY> ${crKey.padEnd(p2)} > ${'----'.padEnd(p3)}  > ${compilerHook._args != null ? 'args:  ' + compilerHook._args.join(', ') : 'null'}`);

                        if (compilerHook._args.includes('compilation')) {
                            if (!compilation.iDDDDDDDDD) {
                                compilation.iDDDDDDDDD = generate();
                            }
                            Object.keys(compilation.hooks).forEach(function (cnKey, index, array) {
                                /** @type {Hook}  */
                                let compilationHook = compilation.hooks[cnKey];
                                let _crKey = `${crKey}`;

                                let deprecatedHooks = ['additionalChunkAssets', 'optimizeChunkAssets', 'afterOptimizeChunkAssets', 'normalModuleLoader'];
                                let noNeeds = ['dependencyReferencedExports'];

                                if (!compilationHook.for && !deprecatedHooks.concat(noNeeds).includes(cnKey)) {
                                    try {
                                        if (cnKey != 'log') {
                                            // logger.cntap(`${''.padEnd(p1)} crkey> ${_crKey.padEnd(p2)} cnkey> ${cnKey.padEnd(p3)} > ${compilationHook._args != null ? 'args:  ' + compilationHook._args.join(', ') : 'null'}`);

                                            compilationHook.tap(
                                                `Compilation-${_crKey}-${cnKey}`,
                                                /**
                                                 *
                                                 * @param {NormalModule} module
                                                 */
                                                function (module) {
                                                    // console.log(className(module));
                                                    if (className(module) === 'NormalModule') {
                                                        logger.cnrun(`${''.padEnd(p1)} cnkey> ${cnKey.padEnd(p2)} crkey> ${_crKey.padEnd(p3)} >${className(compilationHook)} ${compilation.iDDDDDDDDD}    > ${compilationHook._args != null ? 'args:  ' + compilationHook._args.join(', ') : 'null'} > ${JSON.stringify(module.type)}`);
                                                        // console.log(module);
                                                    } else {
                                                        // logger.cnrun(`${''.padEnd(p1)} cnkey> ${cnKey.padEnd(p2)} crkey> ${_crKey.padEnd(p3)} >${className(compilationHook)} ${compilation.iDDDDDDDDD}    > ${compilationHook._args != null ? 'args:  ' + compilationHook._args.join(', ') : 'null'}`);
                                                    }
                                                },
                                            );
                                        }
                                    } catch (e) {
                                        logger.info(e);
                                    }
                                } else {
                                    // here type of compilationHook is the HookMap<H>
                                    //logger.info(compilationHook);
                                }
                            });
                        }
                    },
                );
        });
    }
};
