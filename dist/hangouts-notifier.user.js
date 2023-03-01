// ==UserScript==
// @name        Hangouts Notifier
// @version     2023.301.5132113
// @author      fuzetsu
// @description Show desktop notifications for the Hangouts web app
// @homepage    https://gitee.com/tsharp/userscripts#readme
// @supportURL  https://gitee.com/tsharp/userscripts/issues
// @match       https://hangouts.google.com/webchat/*
// @namespace   fuzetsu.com/HangoutsNotifier
// @grant       none
// @deprecated  true
// @downloadURL https://gitee.com/tsharp/userscripts/raw/master/dist/hangouts-notifier.user.js
// @updateURL   https://gitee.com/tsharp/userscripts/raw/master/dist/hangouts-notifier.meta.js
// ==/UserScript==

(()=>{"use strict";var t=function(){var t=[].slice.call(arguments);t.unshift("%c"+o+":","font-weight: bold;color: purple;"),console.log.apply(console,t)},i=function(t,i){return(i||document).querySelector(t)},o="Hangouts Notifier",n=".Ik.uB",e={checkPermissions:function(){return Notification.requestPermission((function(i){t("permission",i)}))},notification:function(t,i){var o=new Notification(t,i),n=setTimeout((function(){o.close()}),6e4);o.onclick=function(){clearTimeout(n),o.close(),window.focus()},o.onshow=function(){clearTimeout(n),setTimeout((function(){o.close()}),6e3)}},notify:function(t,i,o){if("Notification"in window){var n=t,s={body:i,icon:o||"https://cdn4.iconfinder.com/data/icons/miu-shadow-social/48/hangouts-128.png"};if("granted"===Notification.permission)e.notification(n,s);else if("denied"!==Notification.permission)return Notification.requestPermission((function(t){"granted"===t&&e.notification(n,s)}))}else alert("This browser does not support desktop notifications...")},getLastMessage:function(){var t,o,n=(t=".tk.Sn",[].slice.call((o||document).querySelectorAll(t))).pop();if(n){var e=i("img.Yf",n);if(n=i(".Mu:last-child",n))return{user:e.alt,id:n.id,text:n.textContent,img:e.src.replace(/\/s32[^\/]*\//,"/s128/")}}},start:function(){t("Starting...",location.href);var o=null,s=e.getLastMessage();if(!s){if(t("failed to get last message, this probably  isn't a hangouts chat window..."),!(document.URL.indexOf("prop=gmail#epreld")>=0))return!1;t("So it may be a hangouts chat window, after all..."),s={id:-1}}return!document.hasFocus()&&i(n)||(o=s.id),setInterval((function(){(s=e.getLastMessage())&&s.id!==o&&(o=s.id,!document.hasFocus()&&i(n)&&e.notify(s.user,s.text,s.img))}),1e3),!0}};e.checkPermissions(),e.start()||(t("trying again in 5 seconds, just in case"),setTimeout(e.start,5e3))})();
//# sourceMappingURL=hangouts-notifier.user.js.map