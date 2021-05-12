// ==UserScript==
// @name        Crunchyroll Video Utilities
// @version     1.0.5
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
// @downloadURL https://raw.githubusercontent.com/niubilityfrontend/userscripts/master/dist/crunchyroll-video-utilties.user.js
// @updateURL   https://raw.githubusercontent.com/niubilityfrontend/userscripts/master/dist/crunchyroll-video-utilties.meta.js
// ==/UserScript==

/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/crunchyroll-video-utilities/crunchyroll-video-utilties.user.js":
/*!****************************************************************************!*\
  !*** ./src/crunchyroll-video-utilities/crunchyroll-video-utilties.user.js ***!
  \****************************************************************************/
/***/ (() => {

eval("// ==UserScript==\n// @name Crunchyroll Video Utilities\n// @version 1.0.5\n// @namespace fuzetsu/csdvqn\n// @description seek video with hotkeys and set default quality\n// @match https://static.crunchyroll.com/*/player.html\n// @match https://www.crunchyroll.com/*\n// @grant GM_registerMenuCommand\n// @grant GM_getValue\n// @grant GM_setValue\n// @require https://gitcdn.xyz/cdn/fuzetsu/userscripts/b38eabf72c20fa3cf7da84ecd2cefe0d4a2116be/wait-for-elements/wait-for-elements.js\n// @require https://gitcdn.xyz/cdn/kufii/My-UserScripts/fa4555701cf5a22eae44f06d9848df6966788fa8/libs/gm_config.js\n// ==/UserScript==\n\n/* globals unsafeWindow, GM_config, GM_registerMenuCommand, waitForElems */\nvar sep = '~~@~~',\n    domain = 'https://www.crunchyroll.com',\n    CSS = {\n  quality: '.qualityMenuItemSelector',\n  settings: '.settingsMenuButton,#settingsControl',\n  playerBox: '#showmedia_video_player'\n},\n    vilosPlayer = function vilosPlayer() {\n  return unsafeWindow.VILOS_PLAYERJS;\n},\n    qq = function qq(q, c) {\n  return Array.from((c || document).querySelectorAll(q));\n},\n    q = function q(_q, c) {\n  return (c || document).querySelector(_q);\n},\n    config = GM_config([{\n  key: 'quality',\n  label: 'Quality',\n  type: 'dropdown',\n  values: ['auto', 360, 480, 720, 1080],\n  \"default\": 'auto'\n}]),\n    cfg = config.load();\n\nconfig.onsave = function (newCfg) {\n  cfg = newCfg;\n  player.setQuality(cfg.quality);\n};\n\nvar p = function p() {\n  var _console;\n\n  return (_console = console).log.apply(_console, arguments), arguments.length <= 0 ? undefined : arguments[0];\n},\n    isFullscreen = false,\n    player = {\n  setQuality: function setQuality(quality) {\n    var btn = quality !== 'auto' ? qq(CSS.quality).slice(2).find(function (item) {\n      return quality >= parseInt(item.textContent);\n    }) : qq(CSS.quality)[2];\n\n    if (btn) {\n      // this causes the menu to open\n      btn.click(); // so close it after a short delay\n\n      setTimeout(player.toggleSettings, 200, false);\n    }\n  },\n  fillTab: function fillTab() {\n    var playerBox = q(CSS.playerBox);\n    if (!playerBox) return p('playerbox not found');\n    isFullscreen = !isFullscreen;\n    if (!isFullscreen) return playerBox.removeAttribute('style');\n    Object.assign(playerBox.style, {\n      position: 'fixed',\n      zIndex: 1e3,\n      top: 0,\n      bottom: 0,\n      left: 0,\n      right: 0,\n      width: '100%',\n      height: '100%'\n    });\n  },\n  nextEp: function nextEp() {\n    var back = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;\n    return q('.collection-carousel-media-link-current').parentElement[back ? 'previousElementSibling' : 'nextElementSibling'].querySelector('a').click();\n  },\n  prevEp: function prevEp() {\n    return player.nextEp(true);\n  },\n  skip: function skip(sec) {\n    return vilosPlayer().getCurrentTime(function (curTime) {\n      return vilosPlayer().setCurrentTime(curTime + sec);\n    });\n  },\n  volumeUp: function volumeUp() {\n    var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 10;\n    return vilosPlayer().getVolume(function (curVol) {\n      return vilosPlayer().setVolume(curVol + val);\n    });\n  },\n  volumeDown: function volumeDown() {\n    var val = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : -10;\n    return player.volumeUp(val);\n  },\n  toggleSettings: function toggleSettings(makeVisible) {\n    var btn = q(CSS.settings);\n\n    if (typeof makeVisible === 'boolean') {\n      var isVisible = p(!!btn.offSetParent, '=== isVisible');\n      if (makeVisible === isVisible) return;\n    }\n\n    btn.click();\n  }\n},\n    seekKeys = {\n  l: 85,\n  b: -85,\n  '}': 30,\n  '{': -30,\n  ']': 15,\n  '[': -15\n},\n    handleKey = function handleKey(key) {\n  return key === 'n' ? player.nextEp() : key === 'p' ? player.prevEp() : key === 'j' ? player.volumeDown() : key === 'k' ? player.volumeUp() : key === 'w' ? player.fillTab() : key in seekKeys ? player.skip(seekKeys[key]) : null;\n},\n    isPlayerFrame = location.href.includes('static.crunchyroll.com'),\n    pass = ['INPUT', 'TEXTAREA', 'SELECT'];\n\nwindow.addEventListener('keydown', isPlayerFrame ? function (e) {\n  return window.parent.postMessage(sep + e.key, domain);\n} : function (e) {\n  return pass.includes(document.activeElement.nodeName) || handleKey(e.key);\n});\n\nif (isPlayerFrame) {\n  // can only set quality from the player frame since the button is in its dom\n  waitForElems({\n    stop: true,\n    sel: CSS.quality + '.selected',\n    onmatch: function onmatch(elem) {\n      if (elem.textContent.toLowerCase().includes(cfg.quality)) return p('configured default already selected');\n      player.setQuality(cfg.quality);\n    }\n  });\n} else {\n  // handle forwarded keyboard from player frame\n  window.addEventListener('message', function (_ref) {\n    var data = _ref.data;\n    return data.startsWith(sep) && handleKey(data.slice(sep.length));\n  });\n}\n\nGM_registerMenuCommand('Crunchyroll Video Utilities - Config', config.setup);\n\n//# sourceURL=webpack://userscripts/./src/crunchyroll-video-utilities/crunchyroll-video-utilties.user.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/crunchyroll-video-utilities/crunchyroll-video-utilties.user.js"]();
/******/ 	
/******/ })()
;