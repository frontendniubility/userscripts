// ==UserScript==
// @name        YouTube Playlist Time
// @version     1.2.11
// @description Shows the total time it would take to watch all the videos in a YouTube playlist
// @homepage    https://github.com/niubilityfrontend/userscripts#readme
// @supportURL  https://github.com/niubilityfrontend/userscripts/issues
// @match       https://www.youtube.com/*
// @namespace   http://www.fuzetsu.com/WLFT
// @require     https://greasyfork.org/scripts/5679-wait-for-elements/code/Wait%20For%20Elements.js?version=147465
// @copyright   2014+, fuzetsu
// @grant       none
// @downloadURL https://raw.githubusercontent.com/niubilityfrontend/userscripts/master/dist/youtube-playlist-time.user.js
// @updateURL   https://raw.githubusercontent.com/niubilityfrontend/userscripts/master/dist/youtube-playlist-time.meta.js
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

/***/ "./src/youtube-playlist-time/youtube-playlist-time.user.js":
/*!*****************************************************************!*\
  !*** ./src/youtube-playlist-time/youtube-playlist-time.user.js ***!
  \*****************************************************************/
/***/ (() => {

eval("// ==UserScript==\n// @name         YouTube Playlist Time\n// @namespace    http://www.fuzetsu.com/WLFT\n// @version      1.2.11\n// @description  Shows the total time it would take to watch all the videos in a YouTube playlist\n// @match        https://www.youtube.com/*\n// @require      https://greasyfork.org/scripts/5679-wait-for-elements/code/Wait%20For%20Elements.js?version=147465\n// @copyright    2014+, fuzetsu\n// @grant        none\n// ==/UserScript==\nvar SCRIPT_NAME = 'YouTube Playlist Time',\n    HOLDER_SELECTOR = '#stats',\n    TIMESTAMP_SELECTOR = 'ytd-browse:not([hidden]) .ytd-thumbnail-overlay-time-status-renderer',\n    EL_ID = 'us-total-time',\n    EL_TYPE = 'yt-formatted-string',\n    EL_CLASS = 'style-scope ytd-playlist-sidebar-primary-info-renderer',\n    util = {\n  log: function log() {\n    var args = [].slice.call(arguments);\n    args.unshift('%c' + SCRIPT_NAME + ':', 'font-weight: bold;color: #233c7b;');\n    console.log.apply(console, args);\n  },\n  q: function q(query, context) {\n    return (context || document).querySelector(query);\n  },\n  qq: function qq(query, context) {\n    return [].slice.call((context || document).querySelectorAll(query));\n  },\n  bindEvt: function bindEvt(target, events) {\n    events.forEach(function (evt) {\n      target.addEventListener(evt[0], evt[1]);\n    });\n  },\n  unbindEvt: function unbindEvt(target, events) {\n    events.forEach(function (evt) {\n      target.removeEventListener(evt[0], evt[1]);\n    });\n  },\n  throttle: function throttle(callback, limit) {\n    var wait = false;\n    return function () {\n      if (!wait) {\n        callback.apply(this, arguments);\n        wait = true;\n        setTimeout(function () {\n          wait = false;\n        }, limit);\n      }\n    };\n  }\n},\n    calcTimeString = function calcTimeString(str) {\n  return str.split(':').reverse().reduce(function (last, cur, idx) {\n    cur = parseInt(cur, 10);\n\n    switch (idx) {\n      case 0:\n        // seconds\n        return last + cur;\n\n      case 1:\n        // minutes\n        return last + cur * 60;\n\n      case 2:\n        // hours\n        return last + cur * 60 * 60;\n\n      default:\n        return 0;\n    }\n  }, 0);\n},\n    padTime = function padTime(time) {\n  return (\"0\" + time).slice(-2);\n},\n    setTime = function setTime(seconds) {\n  var loc = getTimeLoc(),\n      hours = Math.floor(seconds / 60 / 60);\n  seconds = seconds % (60 * 60);\n  var minutes = Math.floor(seconds / 60);\n  seconds = seconds % 60;\n  loc.innerHTML = (((hours || '') && hours + ' hours ') + ((minutes || '') && minutes + ' minutes ') + ((seconds || '') && seconds + ' seconds')).trim();\n},\n    getTimeLoc = function getTimeLoc() {\n  var loc = util.q('#' + EL_ID);\n\n  if (!loc) {\n    loc = util.q(HOLDER_SELECTOR).appendChild(document.createElement(EL_TYPE));\n    loc.id = EL_ID;\n    loc.className = EL_CLASS;\n  }\n\n  return loc;\n},\n    timeLocExists = function timeLocExists() {\n  return !!util.q('#' + EL_ID);\n},\n    lastLength = 0,\n    calcTotalTime = function calcTotalTime(force) {\n  var timestamps = util.qq(TIMESTAMP_SELECTOR);\n  if (!force && timestamps.length === lastLength && timeLocExists()) return;\n  lastLength = timestamps.length;\n  var totalSeconds = timestamps.reduce(function (total, ts) {\n    return total + calcTimeString(ts.textContent.trim());\n  }, 0);\n  setTime(totalSeconds);\n},\n    events = [['mousemove', util.throttle(calcTotalTime.bind(null, false), 500)]];\n\nutil.log('Started, waiting for playlist');\nwaitForUrl(/^https:\\/\\/www\\.youtube\\.com\\/playlist\\?list=.+/, function () {\n  var playlistUrl = location.href,\n      urlWaitId,\n      oid,\n      seconds = 0;\n  util.log('Reached playlist, waiting for display area to load');\n  waitForElems({\n    sel: HOLDER_SELECTOR,\n    stop: true,\n    onmatch: function onmatch(holder) {\n      clearTimeout(oid);\n      util.log('display area loaded, calculating time.');\n      oid = setTimeout(function () {\n        util.bindEvt(window, events);\n        calcTotalTime(true);\n        urlWaitId = waitForUrl(function (url) {\n          return url !== playlistUrl;\n        }, function () {\n          util.log('Leaving playlist, removing listeners');\n          util.unbindEvt(window, events);\n          var loc = getTimeLoc();\n          if (loc) loc.remove();\n        }, true);\n      }, 500);\n    }\n  });\n});\n\n//# sourceURL=webpack://userscripts/./src/youtube-playlist-time/youtube-playlist-time.user.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/youtube-playlist-time/youtube-playlist-time.user.js"]();
/******/ 	
/******/ })()
;