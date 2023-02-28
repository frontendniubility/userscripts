// ==UserScript==
// @name        YouTube Playlist Time
// @version     2023.228.5233619
// @description Shows the total time it would take to watch all the videos in a YouTube playlist
// @homepage    https://github.com/niubilityfrontend/userscripts#readme
// @supportURL  https://github.com/niubilityfrontend/userscripts/issues
// @match       https://www.youtube.com/*
// @namespace   http://www.fuzetsu.com/WLFT
// @require     https://greasyfork.org/scripts/5679-wait-for-elements/code/Wait%20For%20Elements.js?version=147465
// @copyright   2014+, fuzetsu
// @grant       none
// @downloadURL https://gitee.com/tsharp/userscripts/raw/master/dist/youtube-playlist-time.user.js
// @updateURL   https://gitee.com/tsharp/userscripts/raw/master/dist/youtube-playlist-time.meta.js
// ==/UserScript==

(()=>{var t,e,n="YouTube Playlist Time",r="#stats",o="us-total-time",i=function(){var t=[].slice.call(arguments);t.unshift("%c"+n+":","font-weight: bold;color: #233c7b;"),console.log.apply(console,t)},a=function(t,e){return(e||document).querySelector(t)},l=function(){var t=a("#"+o);return t||((t=a(r).appendChild(document.createElement("yt-formatted-string"))).id=o,t.className="style-scope ytd-playlist-sidebar-primary-info-renderer"),t},c=0,u=function(t){var e,n,r=(e="ytd-browse:not([hidden]) .ytd-thumbnail-overlay-time-status-renderer",[].slice.call((n||document).querySelectorAll(e)));!t&&r.length===c&&a("#"+o)||(c=r.length,function(t){var e=l(),n=Math.floor(t/60/60);t%=3600;var r=Math.floor(t/60);t%=60,e.innerHTML=((n?n+" hours ":"")+(r?r+" minutes ":"")+(t?t+" seconds":"")).trim()}(r.reduce((function(t,e){return t+e.textContent.trim().split(":").reverse().reduce((function(t,e,n){switch(e=parseInt(e,10),n){case 0:return t+e;case 1:return t+60*e;case 2:return t+60*e*60;default:return 0}}),0)}),0)))},s=[["mousemove",(t=u.bind(null,!1),e=!1,function(){e||(t.apply(this,arguments),e=!0,setTimeout((function(){e=!1}),500))})]];i("Started, waiting for playlist"),waitForUrl(/^https:\/\/www\.youtube\.com\/playlist\?list=.+/,(function(){var t,e=location.href;i("Reached playlist, waiting for display area to load"),waitForElems({sel:r,stop:!0,onmatch:function(n){clearTimeout(t),i("display area loaded, calculating time."),t=setTimeout((function(){(function(t,e){e.forEach((function(e){t.addEventListener(e[0],e[1])}))})(window,s),u(!0),waitForUrl((function(t){return t!==e}),(function(){i("Leaving playlist, removing listeners"),function(t,e){e.forEach((function(e){t.removeEventListener(e[0],e[1])}))}(window,s);var t=l();t&&t.remove()}),!0)}),500)}})}))})();
//# sourceMappingURL=youtube-playlist-time.user.js.map