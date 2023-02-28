// ==UserScript==
// @name        Format JSON
// @version     2023.301.5000844
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

(()=>{var e=JSON.parse(document.body.textContent),t=JSON.stringify(e,null,2);document.body.innerHTML='<code><pre style="white-space:pre-wrap;word-break:break-word" id="jsonArea"></pre></code>',document.getElementById("jsonArea").textContent=t})();
//# sourceMappingURL=format-json.user.js.map