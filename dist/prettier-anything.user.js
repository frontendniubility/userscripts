// ==UserScript==
// @name        Prettier Anything
// @version     2023.228.5144344
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
// @downloadURL https://gitee.com/tsharp/userscripts/raw/master/dist/prettier-anything.user.js
// @updateURL   https://gitee.com/tsharp/userscripts/raw/master/dist/prettier-anything.meta.js
// ==/UserScript==

/*! For license information please see prettier-anything.user.js.LICENSE.txt */
(()=>{"use strict";var __webpack_exports__={};function _typeof(t){return _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},_typeof(t)}function _regeneratorRuntime(){_regeneratorRuntime=function(){return t};var t={},e=Object.prototype,r=e.hasOwnProperty,n=Object.defineProperty||function(t,e,r){t[e]=r.value},o="function"==typeof Symbol?Symbol:{},i=o.iterator||"@@iterator",a=o.asyncIterator||"@@asyncIterator",c=o.toStringTag||"@@toStringTag";function u(t,e,r){return Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{u({},"")}catch(t){u=function(t,e,r){return t[e]=r}}function l(t,e,r,o){var i=e&&e.prototype instanceof p?e:p,a=Object.create(i.prototype),c=new S(o||[]);return n(a,"_invoke",{value:_(t,r,c)}),a}function f(t,e,r){try{return{type:"normal",arg:t.call(e,r)}}catch(t){return{type:"throw",arg:t}}}t.wrap=l;var s={};function p(){}function y(){}function d(){}var h={};u(h,i,(function(){return this}));var v=Object.getPrototypeOf,g=v&&v(v(O([])));g&&g!==e&&r.call(g,i)&&(h=g);var m=d.prototype=p.prototype=Object.create(h);function b(t){["next","throw","return"].forEach((function(e){u(t,e,(function(t){return this._invoke(e,t)}))}))}function w(t,e){function o(n,i,a,c){var u=f(t[n],t,i);if("throw"!==u.type){var l=u.arg,s=l.value;return s&&"object"==_typeof(s)&&r.call(s,"__await")?e.resolve(s.__await).then((function(t){o("next",t,a,c)}),(function(t){o("throw",t,a,c)})):e.resolve(s).then((function(t){l.value=t,a(l)}),(function(t){return o("throw",t,a,c)}))}c(u.arg)}var i;n(this,"_invoke",{value:function(t,r){function n(){return new e((function(e,n){o(t,r,e,n)}))}return i=i?i.then(n,n):n()}})}function _(t,e,r){var n="suspendedStart";return function(o,i){if("executing"===n)throw new Error("Generator is already running");if("completed"===n){if("throw"===o)throw i;return{value:void 0,done:!0}}for(r.method=o,r.arg=i;;){var a=r.delegate;if(a){var c=E(a,r);if(c){if(c===s)continue;return c}}if("next"===r.method)r.sent=r._sent=r.arg;else if("throw"===r.method){if("suspendedStart"===n)throw n="completed",r.arg;r.dispatchException(r.arg)}else"return"===r.method&&r.abrupt("return",r.arg);n="executing";var u=f(t,e,r);if("normal"===u.type){if(n=r.done?"completed":"suspendedYield",u.arg===s)continue;return{value:u.arg,done:r.done}}"throw"===u.type&&(n="completed",r.method="throw",r.arg=u.arg)}}}function E(t,e){var r=e.method,n=t.iterator[r];if(void 0===n)return e.delegate=null,"throw"===r&&t.iterator.return&&(e.method="return",e.arg=void 0,E(t,e),"throw"===e.method)||"return"!==r&&(e.method="throw",e.arg=new TypeError("The iterator does not provide a '"+r+"' method")),s;var o=f(n,t.iterator,e.arg);if("throw"===o.type)return e.method="throw",e.arg=o.arg,e.delegate=null,s;var i=o.arg;return i?i.done?(e[t.resultName]=i.value,e.next=t.nextLoc,"return"!==e.method&&(e.method="next",e.arg=void 0),e.delegate=null,s):i:(e.method="throw",e.arg=new TypeError("iterator result is not an object"),e.delegate=null,s)}function x(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function P(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function S(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(x,this),this.reset(!0)}function O(t){if(t){var e=t[i];if(e)return e.call(t);if("function"==typeof t.next)return t;if(!isNaN(t.length)){var n=-1,o=function e(){for(;++n<t.length;)if(r.call(t,n))return e.value=t[n],e.done=!1,e;return e.value=void 0,e.done=!0,e};return o.next=o}}return{next:j}}function j(){return{value:void 0,done:!0}}return y.prototype=d,n(m,"constructor",{value:d,configurable:!0}),n(d,"constructor",{value:y,configurable:!0}),y.displayName=u(d,c,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"==typeof t&&t.constructor;return!!e&&(e===y||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,d):(t.__proto__=d,u(t,c,"GeneratorFunction")),t.prototype=Object.create(m),t},t.awrap=function(t){return{__await:t}},b(w.prototype),u(w.prototype,a,(function(){return this})),t.AsyncIterator=w,t.async=function(e,r,n,o,i){void 0===i&&(i=Promise);var a=new w(l(e,r,n,o),i);return t.isGeneratorFunction(r)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},b(m),u(m,c,"Generator"),u(m,i,(function(){return this})),u(m,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=Object(t),r=[];for(var n in e)r.push(n);return r.reverse(),function t(){for(;r.length;){var n=r.pop();if(n in e)return t.value=n,t.done=!1,t}return t.done=!0,t}},t.values=O,S.prototype={constructor:S,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=void 0,this.done=!1,this.delegate=null,this.method="next",this.arg=void 0,this.tryEntries.forEach(P),!t)for(var e in this)"t"===e.charAt(0)&&r.call(this,e)&&!isNaN(+e.slice(1))&&(this[e]=void 0)},stop:function(){this.done=!0;var t=this.tryEntries[0].completion;if("throw"===t.type)throw t.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var e=this;function n(r,n){return a.type="throw",a.arg=t,e.next=r,n&&(e.method="next",e.arg=void 0),!!n}for(var o=this.tryEntries.length-1;o>=0;--o){var i=this.tryEntries[o],a=i.completion;if("root"===i.tryLoc)return n("end");if(i.tryLoc<=this.prev){var c=r.call(i,"catchLoc"),u=r.call(i,"finallyLoc");if(c&&u){if(this.prev<i.catchLoc)return n(i.catchLoc,!0);if(this.prev<i.finallyLoc)return n(i.finallyLoc)}else if(c){if(this.prev<i.catchLoc)return n(i.catchLoc,!0)}else{if(!u)throw new Error("try statement without catch or finally");if(this.prev<i.finallyLoc)return n(i.finallyLoc)}}}},abrupt:function(t,e){for(var n,o=this.tryEntries.length-1;o>=0;--o)if((n=this.tryEntries[o]).tryLoc<=this.prev&&r.call(n,"finallyLoc")&&this.prev<n.finallyLoc){var i=n;break}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,s):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),s},finish:function(t){for(var e,r=this.tryEntries.length-1;r>=0;--r)if((e=this.tryEntries[r]).finallyLoc===t)return this.complete(e.completion,e.afterLoc),P(e),s},catch:function(t){for(var e,r=this.tryEntries.length-1;r>=0;--r)if((e=this.tryEntries[r]).tryLoc===t){var n=e.completion;if("throw"===n.type){var o=n.arg;P(e)}return o}throw new Error("illegal catch attempt")},delegateYield:function(t,e,r){return this.delegate={iterator:O(t),resultName:e,nextLoc:r},"next"===this.method&&(this.arg=void 0),s}},t}function ownKeys(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function _objectSpread(t){for(var e,r=1;r<arguments.length;r++)e=null!=arguments[r]?arguments[r]:{},r%2?ownKeys(Object(e),!0).forEach((function(r){_defineProperty(t,r,e[r])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):ownKeys(Object(e)).forEach((function(r){Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(e,r))}));return t}function _defineProperty(t,e,r){return(e=_toPropertyKey(e))in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function _toPropertyKey(t){var e=_toPrimitive(t,"string");return"symbol"===_typeof(e)?e:String(e)}function _toPrimitive(t,e){if("object"!==_typeof(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,e||"default");if("object"!==_typeof(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return("string"===e?String:Number)(t)}function asyncGeneratorStep(t,e,r,n,o,i,a){try{var c=t[i](a),u=c.value}catch(t){return void r(t)}c.done?e(u):Promise.resolve(u).then(n,o)}function _asyncToGenerator(t){return function(){var e=this,r=arguments;return new Promise((function(n,o){var i=t.apply(e,r);function a(t){asyncGeneratorStep(i,n,o,a,c,"next",t)}function c(t){asyncGeneratorStep(i,n,o,a,c,"throw",t)}a(void 0)}))}}var deps=["https://unpkg.com/prettier@2/standalone.js","https://unpkg.com/prettier@2/parser-babel.js"],loadDep=function(t){return new Promise((function(e,r){GM_xmlhttpRequest({method:"GET",url:t,onload:function(t){return e(t.responseText)},onerror:function(){return r(new Error("Failed to load ".concat(t)))}})}))},Config=GM_config([{key:"prettierrc",label:"Prettier Config",default:"{}",type:"text",multiline:!0,resizable:!0},{key:"binding",label:"Key Binding",type:"keybinding",default:{altKey:!0,shiftKey:!0,key:"I"},requireModifier:!0,requireKey:!0},{key:"copyBinding",label:"Copy Key Binding",type:"keybinding",default:{ctrlKey:!0,altKey:!0,shiftKey:!0,key:"I"},requireModifier:!0,requireKey:!0}]);GM_registerMenuCommand("Prettier Anywhere Settings",(function(){window.top===window.self&&Config.setup()}));var config=Config.load();Config.onsave=function(t){return config=t};var p=function(){var t;return(t=console).log.apply(t,arguments),arguments.length<=0?void 0:arguments[0]},loaded=!1,load=function load(){if(!loaded)return loaded=!0,Promise.all(deps.map(loadDep)).then((function(scripts){return scripts.map(eval)}))},getSelection=function(){var t=document.activeElement;if(["INPUT","TEXTAREA"].includes(t.nodeName))return t.value.slice(t.selectionStart,t.selectionEnd);if(t.contentEditable){if(!document.getSelection().toString())return;return document.execCommand("copy"),navigator.clipboard.readText()}return document.getSelection().toString()},insertText=function(t){var e=document.activeElement;"undefined"!=typeof InstallTrigger&&["INPUT","TEXTAREA"].includes(e.nodeName)?e.value=e.value.slice(0,e.selectionStart)+t+e.value.slice(e.selectionEnd):document.execCommand("insertText",!1,t)},prettify=function(){var t=_asyncToGenerator(_regeneratorRuntime().mark((function t(e){var r,n,o,i;return _regeneratorRuntime().wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(r=getSelection(),p("key combo HIT, selection = ",r,"; clip = ",e),r){t.next=4;break}return t.abrupt("return",p("no selection, so nothing to do"));case 4:return p("--- PRETTIER START ---"),p("Loading Prettier"),n=Date.now(),t.next=9,load();case 9:p("Loaded, delta = ",Date.now()-n),o=_objectSpread(_objectSpread({},JSON.parse(config.prettierrc||"{}")),{},{parser:"babel",plugins:prettierPlugins}),p("formatting using conf:",o),i=prettier.format(r,o),e?GM_setClipboard(i):insertText(i),document.getSelection().empty(),p("BEFORE:\n",r),p("AFTER:\n",i),p("--- PRETTIER END ---");case 18:case"end":return t.stop()}}),t)})));return function(e){return t.apply(this,arguments)}}(),keyBindingsMatch=function(t,e){return!t.ctrlKey==!e.ctrlKey&&!t.altKey==!e.altKey&&!t.shiftKey==!e.shiftKey&&!t.metaKey==!e.metaKey&&t.key.toUpperCase()===e.key.toUpperCase()};window.addEventListener("keydown",(function(t){keyBindingsMatch(t,config.binding)?(t.preventDefault(),prettify()):keyBindingsMatch(t,config.copyBinding)&&(t.preventDefault(),prettify(!0))}))})();
//# sourceMappingURL=prettier-anything.user.js.map