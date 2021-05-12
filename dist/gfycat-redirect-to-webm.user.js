// ==UserScript==
// @name        Gfycat Redirect to Webm
// @version     2021.5.12103902
// @author      fuzetsu
// @description Automatically redirects you to the webm source of a gif when you load a gfycat page
// @homepage    https://github.com/niubilityfrontend/userscripts#readme
// @supportURL  https://github.com/niubilityfrontend/userscripts/issues
// @match       *://gfycat.com/*
// @namespace   http://fuzetsu/gfycat-redirect-webm
// @grant       none
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

/***/ "./src/gfycat-redirect-to-webm/gfycat-redirect-to-webm.user.js":
/*!*********************************************************************!*\
  !*** ./src/gfycat-redirect-to-webm/gfycat-redirect-to-webm.user.js ***!
  \*********************************************************************/
/***/ (() => {

eval("// ==UserScript==\n// @name         Gfycat Redirect to Webm\n// @namespace    http://fuzetsu/gfycat-redirect-webm\n// @version      1.0.1\n// @description  Automatically redirects you to the webm source of a gif when you load a gfycat page\n// @author       fuzetsu\n// @match        *://gfycat.com/*\n// @grant        none\n// @deprecated   true\n// ==/UserScript==\nvar xhr = new XMLHttpRequest();\nxhr.open('get', location.href + '.webm');\nxhr.responseType = 'document';\n\nxhr.onload = function () {\n  location.href = xhr.response.querySelector('#inner > h1 > a').href;\n};\n\nxhr.send();\n\n//# sourceURL=webpack://userscripts/./src/gfycat-redirect-to-webm/gfycat-redirect-to-webm.user.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/gfycat-redirect-to-webm/gfycat-redirect-to-webm.user.js"]();
/******/ 	
/******/ })()
;