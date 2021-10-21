const logger = require("../../log").loggers.get("webpacktest");

/**
 * @typedef {import('webpack')} webpack
 * @typedef {import('webpack').Compiler} Compiler
 * @typedef {import('tapable').Hook} Hook
 * @typedef {import('tapable').HookMap } HookMap
 * @typedef {import('webpack').Compilation} Compilation
 * @typedef {import('webpack').Module} Module
 * @typedef {import('webpack').NormalModule} NormalModule
 *
 */

function className(object, defaultName) {
	if (!object) return "";
	var result = "";
	if (typeof object === "function") {
		result = object.name || object.toString().match(/^function\s?([^\s(]*)/)[1];
	} else if (typeof object.constructor === "function") {
		result = className(object.constructor, defaultName);
	}
	return result || defaultName;
}
// logger.info(Hook);

module.exports = class webpackTestPlugin {
	static __objectId = 0;
	static inject(target) {
		target.__objectId = function () {
			this.____newId = webpackTestPlugin.__objectId++;
			this.__objectId = function () {
				return this.____newId;
			};
			return this.____newId;
		};
	}

	static log(level, crKey, cnKey, addition) {
		const p1 = 0;
		const p2 = 23;
		const p3 = 30;
		
		logger.log(level, `${"".padEnd(p1)} cnkey> ${cnKey.padEnd(p2)} crkey> ${crKey.padEnd(p3)} > ${addition}`);
	}
	/**
	 *
	 * @param {Compiler} compiler
	 */
	apply(compiler) {
		Object.keys(compiler.hooks).forEach(function (crKey) {
			/** @type Hook */
			let compilerHook = compiler.hooks[crKey];

			//
			// logger.crtap(`${''.padEnd(p1)} crkey> ${crKey.padEnd(p2)} > ${'----'.padEnd(p3)}`);
			// let showCrhooks = ['thisCompilation' /* , 'compilation' */ /*, 'make', 'emit' */];
			// if (showCrhooks.includes(crKey))
			compilerHook.tap(
				`Compiler_${crKey}`,
				/**@param {Compilation} compilation */
				function (compilation) {
					webpackTestPlugin.log("crrun", crKey, "", ` ${compilerHook._args != null ? "args:  " + compilerHook._args.join(", ") : "null"}`);

					if (compilerHook._args.includes("compilation")) {
						webpackTestPlugin.inject(compilation);
						Object.keys(compilation.hooks).forEach(function (cnKey, index, array) {
							let deprecatedHooks = ["additionalChunkAssets", "optimizeChunkAssets", "afterOptimizeChunkAssets", "normalModuleLoader"];
							let noNeeds = ["dependencyReferencedExports"];
							if (deprecatedHooks.concat(noNeeds).includes(cnKey)) return;
							/** @type {Hook}  */
							let compilationHook = compilation.hooks[cnKey];
							let _crKey = `${crKey}`;

							if (!compilationHook.for) {
								try {
									if (cnKey != "log") {
										// logger.cntap(`${''.padEnd(p1)} crkey> ${_crKey.padEnd(p2)} cnkey> ${cnKey.padEnd(p3)} > ${compilationHook._args != null ? 'args:  ' + compilationHook._args.join(', ') : 'null'}`);

										compilationHook.tap(
											`Compilation-${_crKey}-${cnKey}`,
											/**
											 * @param {NormalModule} module
											 */
											function (module) {
												// console.log(className(module));
												if (className(module) === "NormalModule") {
													webpackTestPlugin.log("cnrun", _crKey, cnKey, ` ${compilation.__objectId()}    > ${compilationHook._args != null ? "args:  " + compilationHook._args.join(", ") : "null"} `);
													// console.log(module);
												} else {
													// logger.cnrun(`${''.padEnd(p1)} cnkey> ${cnKey.padEnd(p2)} crkey> ${_crKey.padEnd(p3)} >${className(compilationHook)} ${compilation.__objectId())}    > ${compilationHook._args != null ? 'args:  ' + compilationHook._args.join(', ') : 'null'}`);
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
