// ==UserScript==
// @name        Format JSON
// @version     2023.915.5232332
// @author      fuzetsu
// @description Automatically prettify JSON responses
// @homepage    https://gitee.com/tsharp/userscripts#readme
// @supportURL  https://gitee.com/tsharp/userscripts/issues
// @match       *://*/*.json
// @namespace   format-json
// @grant       GM_setClipboard
// @downloadURL https://gitee.com/tsharp/userscripts/raw/master/dist/format-json.user.js
// @updateURL   https://gitee.com/tsharp/userscripts/raw/master/dist/format-json.meta.js
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
var json = JSON.parse(document.body.textContent),
  formatted = JSON.stringify(json, null, 2);
document.body.innerHTML = '<code><pre style="white-space:pre-wrap;word-break:break-word" id="jsonArea"></pre></code>';
document.getElementById('jsonArea').textContent = formatted;
/******/ })()
;
//# sourceMappingURL=format-json.user.js.map