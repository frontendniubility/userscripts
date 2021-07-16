// ==UserScript==
// @name        Gfycat Redirect to Webm
// @version     2021.7.516143257
// @author      fuzetsu
// @description Automatically redirects you to the webm source of a gif when you load a gfycat page
// @homepage    https://github.com/niubilityfrontend/userscripts#readme
// @supportURL  https://github.com/niubilityfrontend/userscripts/issues
// @match       *://gfycat.com/*
// @namespace   http://fuzetsu/gfycat-redirect-webm
// @grant       none
// @deprecated  true
// @downloadURL https://raw.githubusercontent.com/niubilityfrontend/userscripts/master/dist/gfycat-redirect-to-webm.user.js
// @updateURL   https://raw.githubusercontent.com/niubilityfrontend/userscripts/master/dist/gfycat-redirect-to-webm.meta.js
// ==/UserScript==

(() => {
    var __webpack_exports__ = {};
    var xhr = new XMLHttpRequest;
    xhr.open("get", location.href + ".webm");
    xhr.responseType = "document";
    xhr.onload = function() {
        location.href = xhr.response.querySelector("#inner > h1 > a").href;
    };
    xhr.send();
})();