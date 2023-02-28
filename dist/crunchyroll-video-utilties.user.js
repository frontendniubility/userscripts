// ==UserScript==
// @name        Crunchyroll Video Utilities
// @version     2023.228.5144344
// @description seek video with hotkeys and set default quality
// @homepage    https://github.com/niubilityfrontend/userscripts#readme
// @supportURL  https://github.com/niubilityfrontend/userscripts/issues
// @match       https://static.crunchyroll.com/*/player.html
// @match       https://www.crunchyroll.com/*
// @namespace   fuzetsu/csdvqn
// @grant       GM_registerMenuCommand
// @grant       GM_getValue
// @grant       GM_setValue
// @require     https://gitcdn.xyz/cdn/fuzetsu/userscripts/b38eabf72c20fa3cf7da84ecd2cefe0d4a2116be/wait-for-elements/wait-for-elements.js
// @require     https://gitcdn.xyz/cdn/kufii/My-UserScripts/fa4555701cf5a22eae44f06d9848df6966788fa8/libs/gm_config.js
// @downloadURL https://gitee.com/tsharp/userscripts/raw/master/dist/crunchyroll-video-utilties.user.js
// @updateURL   https://gitee.com/tsharp/userscripts/raw/master/dist/crunchyroll-video-utilties.meta.js
// ==/UserScript==

(()=>{var e="~~@~~",t=".qualityMenuItemSelector",n=function(){return unsafeWindow.VILOS_PLAYERJS},o=function(e,t){return Array.from((t||document).querySelectorAll(e))},i=function(e,t){return(t||document).querySelector(e)},r=GM_config([{key:"quality",label:"Quality",type:"dropdown",values:["auto",360,480,720,1080],default:"auto"}]),u=r.load();r.onsave=function(e){u=e,c.setQuality(u.quality)};var l=function(){var e;return(e=console).log.apply(e,arguments),arguments.length<=0?void 0:arguments[0]},a=!1,c={setQuality:function(e){var n="auto"!==e?o(t).slice(2).find((function(t){return e>=parseInt(t.textContent)})):o(t)[2];n&&(n.click(),setTimeout(c.toggleSettings,200,!1))},fillTab:function(){var e=i("#showmedia_video_player");return e?(a=!a)?void Object.assign(e.style,{position:"fixed",zIndex:1e3,top:0,bottom:0,left:0,right:0,width:"100%",height:"100%"}):e.removeAttribute("style"):l("playerbox not found")},nextEp:function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return i(".collection-carousel-media-link-current").parentElement[e?"previousElementSibling":"nextElementSibling"].querySelector("a").click()},prevEp:function(){return c.nextEp(!0)},skip:function(e){return n().getCurrentTime((function(t){return n().setCurrentTime(t+e)}))},volumeUp:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:10;return n().getVolume((function(t){return n().setVolume(t+e)}))},volumeDown:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:-10;return c.volumeUp(e)},toggleSettings:function(e){var t=i(".settingsMenuButton,#settingsControl");"boolean"==typeof e&&e===l(!!t.offSetParent,"=== isVisible")||t.click()}},s={l:85,b:-85,"}":30,"{":-30,"]":15,"[":-15},d=function(e){return"n"===e?c.nextEp():"p"===e?c.prevEp():"j"===e?c.volumeDown():"k"===e?c.volumeUp():"w"===e?c.fillTab():e in s?c.skip(s[e]):null},f=location.href.includes("static.crunchyroll.com"),m=["INPUT","TEXTAREA","SELECT"];window.addEventListener("keydown",f?function(t){return window.parent.postMessage(e+t.key,"https://www.crunchyroll.com")}:function(e){return m.includes(document.activeElement.nodeName)||d(e.key)}),f?waitForElems({stop:!0,sel:t+".selected",onmatch:function(e){if(e.textContent.toLowerCase().includes(u.quality))return l("configured default already selected");c.setQuality(u.quality)}}):window.addEventListener("message",(function(t){var n=t.data;return n.startsWith(e)&&d(n.slice(e.length))})),GM_registerMenuCommand("Crunchyroll Video Utilities - Config",r.setup)})();
//# sourceMappingURL=crunchyroll-video-utilties.user.js.map