"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

//
var logger = require('./../log').loggers.get('webpack');
/**
 * @typedef {import('webpack')} webpack
 * @typedef {import('webpack').Compiler} Compiler
 *  @typedef {import('tapable').Hook} Hook
 * @typedef {import('tapable').HookMap } HookMap
 *   @typedef {import('webpack').Compilation} Compilation
 */


module.exports =
/*#__PURE__*/
function () {
  function webpacktestplugin() {
    _classCallCheck(this, webpacktestplugin);
  }

  _createClass(webpacktestplugin, [{
    key: "apply",

    /**
     *
     * @param {Compiler} compiler
     */
    value: function apply(compiler) {
      var p1 = 12,
          p2 = 23,
          p3 = 20;
      Object.keys(compiler.hooks).forEach(function (crKey, index, array) {
        /** @type Hook */
        var compilerHook = compiler.hooks[crKey]; //

        logger.crrg("".concat(''.padEnd(p1), " cr> ").concat(crKey.padEnd(p2), " > ").concat('----'.padEnd(p3)));
        compilerHook.tap("Compiler_".concat(crKey),
        /**@param {Compilation} compilation */
        function (compilation) {
          logger.cr("".concat(''.padEnd(p1), " cr> ").concat(crKey.padEnd(p2), " > ").concat('----'.padEnd(p3)));

          if (compilerHook._args.includes('compilation')) {
            Object.keys(compilation.hooks).forEach(function (cnKey, index, array) {
              /** @type {Hook}  */
              var compilationHook = compilation.hooks[cnKey];

              var _crKey = "".concat(crKey);

              if (!compilationHook["for"]) {
                try {
                  if (cnKey != 'log') {
                    logger.cnrg("".concat(''.padEnd(p1), " cr> ").concat(_crKey.padEnd(p2), " cn> ").concat(cnKey.padEnd(p3), " > ").concat(compilationHook._args != null ? 'args:  ' + compilationHook._args.join(', ') : 'null'));
                    compilationHook.tap("Compilation-".concat(_crKey, "-").concat(cnKey), function () {
                      logger.cn("".concat(''.padEnd(p1), " cr> ").concat(_crKey.padEnd(p2), " cn> ").concat(cnKey.padEnd(p3), " > ").concat(compilationHook._args != null ? 'args:  ' + compilationHook._args.join(', ') : 'null'));
                    });
                  }
                } catch (e) {
                  logger.info(e);
                }
              } else {// here type of compilationHook is the HookMap<H>
                //logger.info(compilationHook);
              }
            });
          }
        });
      });
    }
  }]);

  return webpacktestplugin;
}();