// ==UserScript==
// @name        Kijiji Middle Click
// @version     2021.5.526021259
// @author      fuzetsu
// @description make link middle clicking work on kijiji
// @homepage    https://github.com/niubilityfrontend/userscripts#readme
// @supportURL  https://github.com/niubilityfrontend/userscripts/issues
// @match       *://www.kijiji.ca/*
// @namespace   kijiji-middle-click
// @grant       none
// @require     https://greasyfork.org/scripts/5679-wait-for-elements/code/Wait%20For%20Elements.js?version=147465
// @deprecated  true
// @downloadURL https://raw.githubusercontent.com/niubilityfrontend/userscripts/master/dist/kijiji-middle-click.user.js
// @updateURL   https://raw.githubusercontent.com/niubilityfrontend/userscripts/master/dist/kijiji-middle-click.meta.js
// ==/UserScript==

(() => {
    var __webpack_exports__ = {};
    (function() {
        "use strict";
        var allowMiddleClick = function allowMiddleClick(evt) {
            if (evt.button === 1) evt.stopPropagation();
        };
        waitForElems({
            sel: "a",
            onmatch: function onmatch(a) {
                a.onclick = allowMiddleClick;
            }
        });
    })();
})();