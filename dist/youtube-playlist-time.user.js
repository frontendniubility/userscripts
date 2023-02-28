// ==UserScript==
// @name        YouTube Playlist Time
// @version     2023.228.5144344
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

(()=>{var t,e,n,r="YouTube Playlist Time",o="#stats",i="us-total-time",a=function(){var t=[].slice.call(arguments);t.unshift("%c"+r+":","font-weight: bold;color: #233c7b;"),console.log.apply(console,t)},l=function(t,e){return(e||document).querySelector(t)},c=function(){var t=l("#"+i);return t||((t=l(o).appendChild(document.createElement("yt-formatted-string"))).id=i,t.className="style-scope ytd-playlist-sidebar-primary-info-renderer"),t},u=0,s=function(t){var e,n,r=(e="ytd-browse:not([hidden]) .ytd-thumbnail-overlay-time-status-renderer",[].slice.call((n||document).querySelectorAll(e)));!t&&r.length===u&&l("#"+i)||(u=r.length,function(t){var e=c(),n=Math.floor(t/60/60);t%=3600;var r=Math.floor(t/60);t%=60,e.innerHTML=((n?n+" hours ":"")+(r?r+" minutes ":"")+(t?t+" seconds":"")).trim()}(r.reduce((function(t,e){return t+e.textContent.trim().split(":").reverse().reduce((function(t,e,n){switch(e=parseInt(e,10),n){case 0:return t+e;case 1:return t+60*e;case 2:return t+60*e*60;default:return 0}}),0)}),0)))},d=[["mousemove",(t=s.bind(null,!1),e=500,n=!1,function(){n||(t.apply(this,arguments),n=!0,setTimeout((function(){n=!1}),e))})]];a("Started, waiting for playlist"),waitForUrl(/^https:\/\/www\.youtube\.com\/playlist\?list=.+/,(function(){var t,e=location.href;a("Reached playlist, waiting for display area to load"),waitForElems({sel:o,stop:!0,onmatch:function(n){clearTimeout(t),a("display area loaded, calculating time."),t=setTimeout((function(){(function(t,e){e.forEach((function(e){t.addEventListener(e[0],e[1])}))})(window,d),s(!0),waitForUrl((function(t){return t!==e}),(function(){a("Leaving playlist, removing listeners"),function(t,e){e.forEach((function(e){t.removeEventListener(e[0],e[1])}))}(window,d);var t=c();t&&t.remove()}),!0)}),500)}})}))})();
//# sourceMappingURL=youtube-playlist-time.user.js.map