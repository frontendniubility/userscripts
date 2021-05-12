// ==UserScript==
// @name        Kijiji Middle Click
// @version     2021.5.12103902
// @author      fuzetsu
// @description make link middle clicking work on kijiji
// @homepage    https://github.com/niubilityfrontend/userscripts#readme
// @supportURL  https://github.com/niubilityfrontend/userscripts/issues
// @match       *://www.kijiji.ca/*
// @namespace   kijiji-middle-click
// @grant       none
// @require     https://greasyfork.org/scripts/5679-wait-for-elements/code/Wait%20For%20Elements.js?version=147465
// @deprecated  true
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

/***/ "./src/kijiji-middle-click/kijiji-middle-click.user.js":
/*!*************************************************************!*\
  !*** ./src/kijiji-middle-click/kijiji-middle-click.user.js ***!
  \*************************************************************/
/***/ (() => {

eval("// ==UserScript==\n// @name         Kijiji Middle Click\n// @namespace    kijiji-middle-click\n// @version      1.1\n// @description  make link middle clicking work on kijiji\n// @author       fuzetsu\n// @match        *://www.kijiji.ca/*\n// @grant        none\n// @require      https://greasyfork.org/scripts/5679-wait-for-elements/code/Wait%20For%20Elements.js?version=147465\n// @deprecated   true\n// ==/UserScript==\n(function () {\n  'use strict';\n\n  var allowMiddleClick = function allowMiddleClick(evt) {\n    if (evt.button === 1) evt.stopPropagation();\n  };\n\n  waitForElems({\n    sel: 'a',\n    onmatch: function onmatch(a) {\n      a.onclick = allowMiddleClick;\n    }\n  });\n})();\n\n//# sourceURL=webpack://userscripts/./src/kijiji-middle-click/kijiji-middle-click.user.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/kijiji-middle-click/kijiji-middle-click.user.js"]();
/******/ 	
/******/ })()
;