// ==UserScript==
// @name        Format JSON
// @version     0.0.2
// @author      fuzetsu
// @description Automatically prettify JSON responses
// @homepage    https://github.com/niubilityfrontend/userscripts#readme
// @supportURL  https://github.com/niubilityfrontend/userscripts/issues
// @match       *://*/*.json
// @namespace   format-json
// @grant       GM_setClipboard
// ==/UserScript==

/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
// ==UserScript==
// @name         Format JSON
// @namespace    format-json
// @author       fuzetsu
// @version      0.0.2
// @description  Automatically prettify JSON responses
// @match        *://*/*.json
// @grant        GM_setClipboard
// ==/UserScript==
const json = JSON.parse(document.body.textContent)
const formatted = JSON.stringify(json, null, 2)
document.body.innerHTML =
  '<code><pre style="white-space:pre-wrap;word-break:break-word" id="jsonArea"></pre></code>'
document.getElementById('jsonArea').textContent = formatted

/******/ })()
;