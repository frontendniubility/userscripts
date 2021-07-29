//

const logger = require('./../log').loggers.get('webpack');

/**
 * @typedef {import('webpack')} webpack
 * @typedef {import('webpack').Compiler} Compiler
 *  @typedef {import('tapable').Hook} Hook
 * @typedef {import('tapable').HookMap } HookMap
 *   @typedef {import('webpack').Compilation} Compilation
 */

module.exports = class webpacktestplugin {
    /**
     *
     * @param {Compiler} compiler
     */
    apply(compiler) {
        const p1 = 12,
            p2 = 23,
            p3 = 20;
        Object.keys(compiler.hooks).forEach(function (crKey, index, array) {
            /** @type Hook */
            let compilerHook = compiler.hooks[crKey];

            //
            logger.crrg(`${''.padEnd(p1)} cr> ${crKey.padEnd(p2)} > ${'----'.padEnd(p3)}`);
            compilerHook.tap(
                `Compiler_${crKey}`,
                /**@param {Compilation} compilation */
                function (compilation) {
                    logger.cr(`${''.padEnd(p1)} cr> ${crKey.padEnd(p2)} > ${'----'.padEnd(p3)}`);

                    if (compilerHook._args.includes('compilation')) {
                        Object.keys(compilation.hooks).forEach(function (cnKey, index, array) {
                            /** @type {Hook}  */
                            let compilationHook = compilation.hooks[cnKey];
                            let _crKey = `${crKey}`;
                            if (!compilationHook.for) {
                                try {
                                    if (cnKey != 'log') {
                                        logger.cnrg(`${''.padEnd(p1)} cr> ${_crKey.padEnd(p2)} cn> ${cnKey.padEnd(p3)} > ${compilationHook._args != null ? 'args:  ' + compilationHook._args.join(', ') : 'null'}`);
                                        compilationHook.tap(`Compilation-${_crKey}-${cnKey}`, function () {
                                            logger.cn(`${''.padEnd(p1)} cr> ${_crKey.padEnd(p2)} cn> ${cnKey.padEnd(p3)} > ${compilationHook._args != null ? 'args:  ' + compilationHook._args.join(', ') : 'null'}`);
                                        });
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
