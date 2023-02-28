// ==UserScript==
// @name        Gfycat Redirect to Webm
// @version     2023.301.5000844
// @author      fuzetsu
// @description Automatically redirects you to the webm source of a gif when you load a gfycat page
// @homepage    https://gitee.com/tsharp/userscripts#readme
// @supportURL  https://gitee.com/tsharp/userscripts/issues
// @match       *://gfycat.com/*
// @namespace   http://fuzetsu/gfycat-redirect-webm
// @grant       none
// @deprecated  true
// @downloadURL https://gitee.com/tsharp/userscripts/raw/master/dist/gfycat-redirect-to-webm.user.js
// @updateURL   https://gitee.com/tsharp/userscripts/raw/master/dist/gfycat-redirect-to-webm.meta.js
// ==/UserScript==

(()=>{var e=new XMLHttpRequest;e.open("get",location.href+".webm"),e.responseType="document",e.onload=function(){location.href=e.response.querySelector("#inner > h1 > a").href},e.send()})();
//# sourceMappingURL=gfycat-redirect-to-webm.user.js.map