// ==UserScript==
// @name        userscripts
// @version     2021.5.12103902
// @description tampermonkey scripts
// @homepage    https://github.com/niubilityfrontend/userscripts#readme
// @supportURL  https://github.com/niubilityfrontend/userscripts/issues
// @match       *://*/*
// ==/UserScript==

/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/findteacherson51talk/test.user.es6":
/*!************************************************!*\
  !*** ./src/findteacherson51talk/test.user.es6 ***!
  \************************************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _iterableToArray(iter) { if (typeof Symbol !== \"undefined\" && iter[Symbol.iterator] != null || iter[\"@@iterator\"] != null) return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nvar extend = __webpack_require__(/*! extend */ \"./node_modules/extend/index.js\"),\n    getPaddedComp = function getPaddedComp(comp) {\n  var len = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;\n  if (len < 1) len = 1;\n  comp = \"\" + comp;\n  var paddedLen = len - (\"\" + comp).length;\n\n  if (paddedLen > 0) {\n    return [].concat(_toConsumableArray(Array(paddedLen).fill(\"0\")), _toConsumableArray(comp)).join(\"\");\n  } else return comp;\n},\n    o = {\n  \"[y|Y]{4}\": function yY4(date) {\n    return date.getFullYear();\n  },\n  // year\n  \"[y|Y]{2}\": function yY2(date) {\n    return date.getFullYear().toString().slice(2);\n  },\n  // year\n  MM: function MM(date) {\n    return getPaddedComp(date.getMonth() + 1);\n  },\n  //month\n  M: function M(date) {\n    return date.getMonth() + 1;\n  },\n  //month\n  \"[d|D]{2}\": function dD2(date) {\n    return getPaddedComp(date.getDate());\n  },\n  //day\n  \"[d|D]{1}\": function dD1(date) {\n    return date.getDate();\n  },\n  //day\n  \"h{2}\": function h2(date) {\n    return getPaddedComp(date.getHours() > 12 ? date.getHours() % 12 : date.getHours());\n  },\n  //hour\n  \"h{1}\": function h1(date) {\n    return date.getHours() > 12 ? date.getHours() % 12 : date.getHours();\n  },\n  //hour\n  \"H{2}\": function H2(date) {\n    return getPaddedComp(date.getHours());\n  },\n  //hour\n  \"H{1}\": function H1(date) {\n    return date.getHours();\n  },\n  //hour\n  \"m{2}\": function m2(date) {\n    return getPaddedComp(date.getMinutes());\n  },\n  //minute\n  \"m{1}\": function m1(date) {\n    return date.getMinutes();\n  },\n  //minute\n  \"s+\": function s(date) {\n    return getPaddedComp(date.getSeconds());\n  },\n  //second\n  \"f+\": function f(date) {\n    return getPaddedComp(date.getMilliseconds(), 3);\n  },\n  //millisecond,\n  \"f{1}\": function f1(date) {\n    return getPaddedComp(date.getMilliseconds(), 0);\n  },\n  //millisecond,\n  \"b+\": function b(date) {\n    return date.getHours() >= 12 ? \"PM\" : \"AM\";\n  }\n};\n\nextend(Date.prototype, {\n  toString: function toString(format) {\n    var formattedDate = format;\n\n    for (var k in o) {\n      if (new RegExp(\"(\" + k + \")\").test(format)) {\n        formattedDate = formattedDate.replace(RegExp.$1, o[k](this));\n      }\n    }\n\n    return formattedDate;\n  }\n});\n\nvar p = function p() {\n  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {\n    args[_key] = arguments[_key];\n  }\n\n  return args.forEach(function (arg, index, all) {\n    return console.log(arg);\n  });\n},\n    buildtime = new Date(),\n    vstring = \"\".concat(buildtime.toString('yyyy.M'), \".\").concat(buildtime.toString('Dhhmmss'));\n\np(vstring);\n\n//# sourceURL=webpack://userscripts/./src/findteacherson51talk/test.user.es6?");

/***/ }),

/***/ "./node_modules/extend/index.js":
/*!**************************************!*\
  !*** ./node_modules/extend/index.js ***!
  \**************************************/
/***/ ((module) => {

"use strict";
eval("\n\nvar hasOwn = Object.prototype.hasOwnProperty;\nvar toStr = Object.prototype.toString;\nvar defineProperty = Object.defineProperty;\nvar gOPD = Object.getOwnPropertyDescriptor;\n\nvar isArray = function isArray(arr) {\n\tif (typeof Array.isArray === 'function') {\n\t\treturn Array.isArray(arr);\n\t}\n\n\treturn toStr.call(arr) === '[object Array]';\n};\n\nvar isPlainObject = function isPlainObject(obj) {\n\tif (!obj || toStr.call(obj) !== '[object Object]') {\n\t\treturn false;\n\t}\n\n\tvar hasOwnConstructor = hasOwn.call(obj, 'constructor');\n\tvar hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf');\n\t// Not own constructor property must be Object\n\tif (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {\n\t\treturn false;\n\t}\n\n\t// Own properties are enumerated firstly, so to speed up,\n\t// if last one is own, then all properties are own.\n\tvar key;\n\tfor (key in obj) { /**/ }\n\n\treturn typeof key === 'undefined' || hasOwn.call(obj, key);\n};\n\n// If name is '__proto__', and Object.defineProperty is available, define __proto__ as an own property on target\nvar setProperty = function setProperty(target, options) {\n\tif (defineProperty && options.name === '__proto__') {\n\t\tdefineProperty(target, options.name, {\n\t\t\tenumerable: true,\n\t\t\tconfigurable: true,\n\t\t\tvalue: options.newValue,\n\t\t\twritable: true\n\t\t});\n\t} else {\n\t\ttarget[options.name] = options.newValue;\n\t}\n};\n\n// Return undefined instead of __proto__ if '__proto__' is not an own property\nvar getProperty = function getProperty(obj, name) {\n\tif (name === '__proto__') {\n\t\tif (!hasOwn.call(obj, name)) {\n\t\t\treturn void 0;\n\t\t} else if (gOPD) {\n\t\t\t// In early versions of node, obj['__proto__'] is buggy when obj has\n\t\t\t// __proto__ as an own property. Object.getOwnPropertyDescriptor() works.\n\t\t\treturn gOPD(obj, name).value;\n\t\t}\n\t}\n\n\treturn obj[name];\n};\n\nmodule.exports = function extend() {\n\tvar options, name, src, copy, copyIsArray, clone;\n\tvar target = arguments[0];\n\tvar i = 1;\n\tvar length = arguments.length;\n\tvar deep = false;\n\n\t// Handle a deep copy situation\n\tif (typeof target === 'boolean') {\n\t\tdeep = target;\n\t\ttarget = arguments[1] || {};\n\t\t// skip the boolean and the target\n\t\ti = 2;\n\t}\n\tif (target == null || (typeof target !== 'object' && typeof target !== 'function')) {\n\t\ttarget = {};\n\t}\n\n\tfor (; i < length; ++i) {\n\t\toptions = arguments[i];\n\t\t// Only deal with non-null/undefined values\n\t\tif (options != null) {\n\t\t\t// Extend the base object\n\t\t\tfor (name in options) {\n\t\t\t\tsrc = getProperty(target, name);\n\t\t\t\tcopy = getProperty(options, name);\n\n\t\t\t\t// Prevent never-ending loop\n\t\t\t\tif (target !== copy) {\n\t\t\t\t\t// Recurse if we're merging plain objects or arrays\n\t\t\t\t\tif (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {\n\t\t\t\t\t\tif (copyIsArray) {\n\t\t\t\t\t\t\tcopyIsArray = false;\n\t\t\t\t\t\t\tclone = src && isArray(src) ? src : [];\n\t\t\t\t\t\t} else {\n\t\t\t\t\t\t\tclone = src && isPlainObject(src) ? src : {};\n\t\t\t\t\t\t}\n\n\t\t\t\t\t\t// Never move original objects, clone them\n\t\t\t\t\t\tsetProperty(target, { name: name, newValue: extend(deep, clone, copy) });\n\n\t\t\t\t\t// Don't bring in undefined values\n\t\t\t\t\t} else if (typeof copy !== 'undefined') {\n\t\t\t\t\t\tsetProperty(target, { name: name, newValue: copy });\n\t\t\t\t\t}\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n\n\t// Return the modified object\n\treturn target;\n};\n\n\n//# sourceURL=webpack://userscripts/./node_modules/extend/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/findteacherson51talk/test.user.es6");
/******/ 	
/******/ })()
;