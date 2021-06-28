// ==UserScript==
// @name        userscripts
// @version     2021.6.528145500
// @description tampermonkey scripts
// @homepage    https://github.com/niubilityfrontend/userscripts#readme
// @supportURL  https://github.com/niubilityfrontend/userscripts/issues
// @match       *://*/*
// @downloadURL https://raw.githubusercontent.com/niubilityfrontend/userscripts/master/dist/test.user.js
// @updateURL   https://raw.githubusercontent.com/niubilityfrontend/userscripts/master/dist/test.meta.js
// ==/UserScript==

(() => {
    var __webpack_exports__ = {};
    var p = function p() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
        }
        return args.forEach((function(arg, index, all) {
            return console.log(arg);
        }));
    }, buildtime = new Date;
    p(buildtime);
    p("dwws223");
    p(3);
    var a = Date.now(), sa = a + "";
    p(sa);
    var ai = Number(sa);
    p(a);
    p(ai == a);
    p(new Date(a).getHours());
})();