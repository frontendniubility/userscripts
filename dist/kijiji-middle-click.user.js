// ==UserScript==
// @name        Kijiji Middle Click
// @version     2023.1005.5024000
// @author      fuzetsu
// @description make link middle clicking work on kijiji
// @homepage    https://gitee.com/tsharp/userscripts#readme
// @supportURL  https://gitee.com/tsharp/userscripts/issues
// @match       *://www.kijiji.ca/*
// @namespace   kijiji-middle-click
// @grant       none
// @require     https://greasyfork.org/scripts/5679-wait-for-elements/code/Wait%20For%20Elements.js?version=147465
// @deprecated  true
// @downloadURL https://gitee.com/tsharp/userscripts/raw/master/dist/kijiji-middle-click.user.js
// @updateURL   https://gitee.com/tsharp/userscripts/raw/master/dist/kijiji-middle-click.meta.js
// ==/UserScript==

/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
// ==UserScript==
// @name         Kijiji Middle Click
// @namespace    kijiji-middle-click
// @version      1.1
// @description  make link middle clicking work on kijiji
// @author       fuzetsu
// @match        *://www.kijiji.ca/*
// @grant        none
// @require      https://greasyfork.org/scripts/5679-wait-for-elements/code/Wait%20For%20Elements.js?version=147465
// @deprecated   true
// ==/UserScript==

(function () {
  'use strict';

  var allowMiddleClick = function allowMiddleClick(evt) {
    if (evt.button === 1) evt.stopPropagation();
  };
  waitForElems({
    sel: 'a',
    onmatch: function onmatch(a) {
      a.onclick = allowMiddleClick;
    }
  });
})();
/******/ })()
;
//# sourceMappingURL=kijiji-middle-click.user.js.map