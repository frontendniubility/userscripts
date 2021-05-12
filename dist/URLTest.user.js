// ==UserScript==
// @name        URLTest
// @version     2021.5.12030033
// @author      jimbo
// @description tampermonkey scripts
// @homepage    https://github.com/niubilityfrontend/userscripts#readme
// @supportURL  https://github.com/niubilityfrontend/hunttingteacheron51talk
// @match       *:*/*
// @match       *127.0.0.1*:*/*
// @match       *localhost*:*/*
// @namespace   https://github.com/niubilityfrontend
// @license     OSL-3.0
// @grant       GM_xmlhttpRequest
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_listValues
// @grant       GM_deleteValue
// @grant       GM_registerMenuCommand
// @require     http://code.jquery.com/jquery-3.4.1.min.js
// @require     https://code.jquery.com/ui/1.12.1/jquery-ui.min.js
// @require     https://cdnjs.cloudflare.com/ajax/libs/pace/1.0.2/pace.min.js
// @require     https://cdnjs.cloudflare.com/ajax/libs/free-jqgrid/4.15.5/i18n/grid.locale-cn.js
// @require     https://cdnjs.cloudflare.com/ajax/libs/free-jqgrid/4.15.5/jquery.jqgrid.min.js
// @require     https://greasyfork.org/scripts/388372-scrollfix/code/scrollfix.js?version=726657
// @require     https://greasyfork.org/scripts/389774-gm-config-toolbar/code/gm_config_toolbar.js?version=730739
// @downloadURL https://raw.githubusercontent.com/niubilityfrontend/userscripts/master/dist/URLTest.user.js
// @updateURL   https://raw.githubusercontent.com/niubilityfrontend/userscripts/master/dist/URLTest.meta.js
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

/***/ "./src/javascriptSnippets/URLTest.user.es6":
/*!*************************************************!*\
  !*** ./src/javascriptSnippets/URLTest.user.es6 ***!
  \*************************************************/
/***/ (() => {

eval("// ==UserScript==\n// @name         URLTest\n// @version      2019.12.20\n// @namespace    https://github.com/niubilityfrontend\n// @description\n// @author       jimbo\n// @license      OSL-3.0\n// @supportURL   https://github.com/niubilityfrontend/hunttingteacheron51talk\n// @match        *:*/*\n// @match        *127.0.0.1*:*/*\n// @match        *localhost*:*/*\n// @grant        GM_xmlhttpRequest\n// @grant        GM_getValue\n// @grant        GM_setValue\n// @grant        GM_listValues\n// @grant        GM_deleteValue\n// @grant        GM_registerMenuCommand\n// @require      http://code.jquery.com/jquery-3.4.1.min.js\n// @require      https://code.jquery.com/ui/1.12.1/jquery-ui.min.js\n// @require      https://cdnjs.cloudflare.com/ajax/libs/pace/1.0.2/pace.min.js\n// @require      https://cdnjs.cloudflare.com/ajax/libs/free-jqgrid/4.15.5/i18n/grid.locale-cn.js\n// @require      https://cdnjs.cloudflare.com/ajax/libs/free-jqgrid/4.15.5/jquery.jqgrid.min.js\n// @require      https://greasyfork.org/scripts/388372-scrollfix/code/scrollfix.js?version=726657\n// @require      https://greasyfork.org/scripts/389774-gm-config-toolbar/code/gm_config_toolbar.js?version=730739\n// ==/UserScript==\n//\nfunction myFunction() {\n  var uri = \"https://www.w3schools.com/jsref/tryit.asp?Filename=tryjsref_decodeuri&color[0]=red&color[1]=green&selection=1&selection=2&selection=3#testhashzhong中文\",\n      enc = encodeURI(uri),\n      dec = decodeURI(enc),\n      params = new URL(uri).searchParams,\n      res = \"Encoded URI: \" + enc + \"<br>\" + \"Decoded URI: \" + dec + \"<br> JSON\" + JSON.stringify(params);\n  $(\"<div></div>\").appendTo('body').html(res);\n  params.forEach(function (val, k, arr) {\n    console.log(\"\".concat(val, \" \").concat(k, \" \"));\n  });\n}\n\nmyFunction();\n$('#timesmutipulecheck').find(\"input\").checkboxradio({\n  icon: false\n});\n$(\"#btns\").eq(0).button({\n  icon: 'ui-icon-seek-next',\n  showLabel: true\n}).click(function () {\n  $('#timesmutipulecheck>input').each(function (i, item) {\n    $(item).prop(\"checked\", !$(item).is(\":checked\")).change(); //checkboxradio 修改值后，必须调用change才会引发UI更新\n  });\n}).end();\n\nfunction test() {\n  for (var x = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : \"hello\", _ref = arguments.length > 1 ? arguments[1] : undefined, a = _ref.a, b = _ref.b, _len = arguments.length, args = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {\n    args[_key - 2] = arguments[_key];\n  }\n\n  console.log(x, a, b, args);\n}\n\n//# sourceURL=webpack://userscripts/./src/javascriptSnippets/URLTest.user.es6?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/javascriptSnippets/URLTest.user.es6"]();
/******/ 	
/******/ })()
;