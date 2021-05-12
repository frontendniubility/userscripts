// ==UserScript==
// @name        Prettier Anything
// @version     2021.5.12030033
// @author      fuzetsu
// @description Apply prettier formatting to any text input
// @homepage    https://github.com/niubilityfrontend/userscripts#readme
// @supportURL  https://github.com/niubilityfrontend/userscripts/issues
// @match       *://*/*
// @namespace   prettier-anything
// @inject-into content
// @grant       GM_setClipboard
// @grant       GM_xmlhttpRequest
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_registerMenuCommand
// @require     https://cdn.jsdelivr.net/gh/kufii/My-UserScripts@00302ac8bd875599ed97df07b379b58f9b4932bd/libs/gm_config.js
// @downloadURL https://raw.githubusercontent.com/niubilityfrontend/userscripts/master/dist/prettier-anything.user.js
// @updateURL   https://raw.githubusercontent.com/niubilityfrontend/userscripts/master/dist/prettier-anything.meta.js
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
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/prettier-anything/prettier-anything.user.js":
/*!*********************************************************!*\
  !*** ./src/prettier-anything/prettier-anything.user.js ***!
  \*********************************************************/
/***/ (() => {

eval("// ==UserScript==\n// @name         Prettier Anything\n// @namespace    prettier-anything\n// @author       fuzetsu\n// @version      0.1.4\n// @description  Apply prettier formatting to any text input\n// @match        *://*/*\n// @inject-into  content\n// @grant        GM_setClipboard\n// @grant        GM_xmlhttpRequest\n// @grant        GM_getValue\n// @grant        GM_setValue\n// @grant        GM_registerMenuCommand\n// @require      https://cdn.jsdelivr.net/gh/kufii/My-UserScripts@00302ac8bd875599ed97df07b379b58f9b4932bd/libs/gm_config.js\n// ==/UserScript==\n\n/* global prettier prettierPlugins GM_setClipboard GM_xmlhttpRequest GM_registerMenuCommand GM_config */\n\n\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1, source; i < arguments.length; i++) { source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg), value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }\n\nfunction _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"next\", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, \"throw\", err); } _next(undefined); }); }; }\n\nvar deps = ['https://unpkg.com/prettier@2/standalone.js', 'https://unpkg.com/prettier@2/parser-babel.js'],\n    loadDep = function loadDep(url) {\n  return new Promise(function (resolve, reject) {\n    GM_xmlhttpRequest({\n      method: 'GET',\n      url: url,\n      onload: function onload(res) {\n        return resolve(res.responseText);\n      },\n      onerror: function onerror() {\n        return reject(new Error(\"Failed to load \".concat(url)));\n      }\n    });\n  });\n},\n    Config = GM_config([{\n  key: 'prettierrc',\n  label: 'Prettier Config',\n  \"default\": '{}',\n  type: 'text',\n  multiline: true,\n  resizable: true\n}, {\n  key: 'binding',\n  label: 'Key Binding',\n  type: 'keybinding',\n  \"default\": {\n    altKey: true,\n    shiftKey: true,\n    key: 'I'\n  },\n  requireModifier: true,\n  requireKey: true\n}, {\n  key: 'copyBinding',\n  label: 'Copy Key Binding',\n  type: 'keybinding',\n  \"default\": {\n    ctrlKey: true,\n    altKey: true,\n    shiftKey: true,\n    key: 'I'\n  },\n  requireModifier: true,\n  requireKey: true\n}]);\n\nGM_registerMenuCommand('Prettier Anywhere Settings', function () {\n  if (window.top === window.self) Config.setup();\n});\nvar config = Config.load();\n\nConfig.onsave = function (cfg) {\n  return config = cfg;\n};\n\nvar p = function p() {\n  var _console;\n\n  return (_console = console).log.apply(_console, arguments), arguments.length <= 0 ? undefined : arguments[0];\n},\n    loaded = false,\n    load = function load() {\n  if (loaded) return;\n  loaded = true;\n  return Promise.all(deps.map(loadDep)).then(function (scripts) {\n    return scripts.map(eval);\n  }); // eslint-disable-line no-eval\n},\n    getSelection = function getSelection() {\n  var elem = document.activeElement;\n\n  if (['INPUT', 'TEXTAREA'].includes(elem.nodeName)) {\n    return elem.value.slice(elem.selectionStart, elem.selectionEnd);\n  } else if (elem.contentEditable) {\n    if (!document.getSelection().toString()) return;\n    document.execCommand('copy');\n    return navigator.clipboard.readText();\n  } else return document.getSelection().toString();\n},\n    insertText = function insertText(text) {\n  var elem = document.activeElement;\n\n  if (typeof InstallTrigger !== 'undefined' && ['INPUT', 'TEXTAREA'].includes(elem.nodeName)) {\n    elem.value = elem.value.slice(0, elem.selectionStart) + text + elem.value.slice(elem.selectionEnd);\n  } else {\n    document.execCommand('insertText', false, text);\n  }\n},\n    prettify = /*#__PURE__*/function () {\n  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(clip) {\n    var code, loadStart, conf, formatted;\n    return regeneratorRuntime.wrap(function _callee$(_context) {\n      while (1) {\n        switch (_context.prev = _context.next) {\n          case 0:\n            code = getSelection();\n            p('key combo HIT, selection = ', code, '; clip = ', clip);\n\n            if (code) {\n              _context.next = 4;\n              break;\n            }\n\n            return _context.abrupt(\"return\", p('no selection, so nothing to do'));\n\n          case 4:\n            p('--- PRETTIER START ---');\n            p('Loading Prettier');\n            loadStart = Date.now();\n            _context.next = 9;\n            return load();\n\n          case 9:\n            p('Loaded, delta = ', Date.now() - loadStart);\n            conf = _objectSpread(_objectSpread({}, JSON.parse(config.prettierrc || '{}')), {}, {\n              parser: 'babel',\n              plugins: prettierPlugins\n            });\n            p('formatting using conf:', conf);\n            formatted = prettier.format(code, conf);\n            if (clip) GM_setClipboard(formatted);else insertText(formatted);\n            document.getSelection().empty();\n            p('BEFORE:\\n', code);\n            p('AFTER:\\n', formatted);\n            p('--- PRETTIER END ---');\n\n          case 18:\n          case \"end\":\n            return _context.stop();\n        }\n      }\n    }, _callee);\n  }));\n\n  return function prettify(_x) {\n    return _ref.apply(this, arguments);\n  };\n}(),\n    keyBindingsMatch = function keyBindingsMatch(a, b) {\n  return !a.ctrlKey === !b.ctrlKey && !a.altKey === !b.altKey && !a.shiftKey === !b.shiftKey && !a.metaKey === !b.metaKey && a.key.toUpperCase() === b.key.toUpperCase();\n};\n\nwindow.addEventListener('keydown', function (e) {\n  if (keyBindingsMatch(e, config.binding)) {\n    e.preventDefault();\n    prettify();\n  } else if (keyBindingsMatch(e, config.copyBinding)) {\n    e.preventDefault();\n    prettify(true);\n  }\n});\n\n//# sourceURL=webpack://userscripts/./src/prettier-anything/prettier-anything.user.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/prettier-anything/prettier-anything.user.js"]();
/******/ 	
/******/ })()
;