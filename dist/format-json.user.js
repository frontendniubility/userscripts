// ==UserScript==
// @name        Format JSON
// @version     2021.10.521114345
// @author      fuzetsu
// @description Automatically prettify JSON responses
// @homepage    https://github.com/niubilityfrontend/userscripts#readme
// @supportURL  https://github.com/niubilityfrontend/userscripts/issues
// @match       *://*/*.json
// @namespace   format-json
// @grant       GM_setClipboard
// @downloadURL https://raw.githubusercontent.com/niubilityfrontend/userscripts/master/dist/format-json.user.js
// @updateURL   https://raw.githubusercontent.com/niubilityfrontend/userscripts/master/dist/format-json.meta.js
// ==/UserScript==

(() => {
    var __webpack_exports__ = {};
    var json = JSON.parse(document.body.textContent), formatted = JSON.stringify(json, null, 2);
    document.body.innerHTML = '<code><pre style="white-space:pre-wrap;word-break:break-word" id="jsonArea"></pre></code>';
    document.getElementById("jsonArea").textContent = formatted;
})();