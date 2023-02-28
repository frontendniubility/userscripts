// ==UserScript==
// @name        YouTube History Management
// @version     2023.301.5000844
// @author      fuzetsu
// @description Select and remove YouTube history items quickly
// @homepage    https://gitee.com/tsharp/userscripts#readme
// @supportURL  https://gitee.com/tsharp/userscripts/issues
// @match       *://www.youtube.com/*
// @namespace   http://fuzetsu.com/YHM
// @grant       none
// @require     https://greasyfork.org/scripts/5679-wait-for-elements/code/Wait%20For%20Elements.js?version=141779
// @deprecated  true
// @downloadURL https://gitee.com/tsharp/userscripts/raw/master/dist/youtube-history-management.user.js
// @updateURL   https://gitee.com/tsharp/userscripts/raw/master/dist/youtube-history-management.meta.js
// ==/UserScript==

!function(){if(window.top===window.self){var e=[],t=[],n=0,o=null,i=!1,l="YouTube History Management",a="orange",r="#browse-items-primary li > ul",u={log:function(){var e=[].slice.call(arguments);e.unshift("%c"+l+":","font-weight: bold;color:navy"),console.log.apply(console,e)},q:function(e,t){return(t||document).querySelector(e)},qq:function(e,t){return[].slice.call((t||document).querySelectorAll(e))},_cbQueue:[],_handleQueue:function(){this._cbQueue.shift()()},queueCallback:function(e){this._cbQueue.push(e),setTimeout(this._handleQueue.bind(this),0)}};u.log("Started"),waitForUrl(/^http(s)?:\/\/www\.youtube\.com\/feed\/history/,(function(){var l=location.href;u.log("Entered history page, waiting for menu area to load"),waitForElems(r,(function(){u.log("Found menu area, creating and inserting buttons"),d("Edit History",(function(t){if("Edit History"===this.textContent)i=!0,this.textContent="Stop Editing",l.parentNode.style.display="";else{for(i=!1,this.textContent="Edit History";e.length>0;)s(e.pop(),!1,!0);l.parentNode.style.display="none"}}));var l=d("Delete Selected",(function(t){var n=e.length;if(n<1)return alert("Nothing selected, select at least one history item and try again.");for(i=!1;e.length>0;)c(e.pop());u.queueCallback((function(){i=!0})),alert("Deleted "+n+" history items.")}));l.parentNode.style.display="none",o=waitForElems(".yt-lockup-video",(function(e){var o=n;n+=1,t.push(e),e.addEventListener("click",(function(n){i&&(n.preventDefault(),n.stopPropagation(),n.shiftKey?function(e,n){for(;n&&!n.dataset.yhmSelected;)s(n,!0),n=t[--e]}(o,e):s(e),window.getSelection().removeAllRanges())}),!1)}))}),!0),waitForUrl((function(e){return e!==l}),(function(){clearInterval(o),i=!1,e=[],u.log("Leaving history page, cleaning up listeners and references")}),!0)}))}function c(e){u.qq("button",e).some((function(t){if("Remove from Watch history"===t.title.trim())return u.queueCallback(t.click.bind(t)),s(e,!1,!0),!0}))}function s(t,n,o){var i=u.q(".yt-uix-tile-link",t),l=u.q(".yt-lockup-description",t);n||!t.dataset.yhmSelected?(o||e.push(t),t.style.backgroundColor=a,i&&(i.style.backgroundColor=a),l&&(l.style.backgroundColor=a),t.dataset.yhmSelected="yes"):(o||e.splice(e.indexOf(t),1),t.style.backgroundColor="",i&&(i.style.backgroundColor=""),l&&(l.style.backgroundColor=""),t.dataset.yhmSelected="")}function d(e,t){var n=document.createElement("button"),o=document.createElement("li");return n.className="yt-uix-button yt-uix-button-size-default yt-uix-button-default",n.innerHTML='<span class="yt-uix-button-content">'+e+"</span>",n.addEventListener("click",t,!1),o.appendChild(n),u.q(r).appendChild(o),n}}();
//# sourceMappingURL=youtube-history-management.user.js.map