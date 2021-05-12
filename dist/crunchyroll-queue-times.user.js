// ==UserScript==
// @name        Crunchyroll Queue Real Times
// @version     2021.5.12035638
// @description Display countdown until next episode in the Crunchyroll Queue page
// @homepage    https://github.com/niubilityfrontend/userscripts#readme
// @supportURL  https://github.com/niubilityfrontend/userscripts/issues
// @match       http://www.crunchyroll.com/home/queue
// @namespace   http://www.fuzetsu.com/CRRT
// @copyright   2014+, fuzetsu
// @deprecated  true
// @downloadURL https://raw.githubusercontent.com/niubilityfrontend/userscripts/master/dist/crunchyroll-queue-times.user.js
// @updateURL   https://raw.githubusercontent.com/niubilityfrontend/userscripts/master/dist/crunchyroll-queue-times.meta.js
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

/***/ "./src/crunchyroll-queue-times/crunchyroll-queue-times.user.js":
/*!*********************************************************************!*\
  !*** ./src/crunchyroll-queue-times/crunchyroll-queue-times.user.js ***!
  \*********************************************************************/
/***/ (() => {

eval("// ==UserScript==\n// @name        Crunchyroll Queue Real Times\n// @namespace   http://www.fuzetsu.com/CRRT\n// @version     1.0.4\n// @description Display countdown until next episode in the Crunchyroll Queue page\n// @match       http://www.crunchyroll.com/home/queue\n// @copyright   2014+, fuzetsu\n// @deprecated  true\n// ==/UserScript==\nvar PREMIUM = 'rgb(255, 251, 223)',\n    REGULAR = 'rgb(232, 244, 248)',\n    COMING_SOON_IMG = 'http://static.ak.crunchyroll.com/i/coming_soon_beta_wide.jpg',\n    SECOND = 1e3,\n    MINUTE = SECOND * 60,\n    HOUR = MINUTE * 60,\n    DAY = HOUR * 24,\n    CURYEAR = new Date().getFullYear(),\n    qq = function qq(q, c) {\n  return [].slice.call((c || document).querySelectorAll(q));\n},\n    storeGet = function storeGet(key) {\n  if (typeof GM_getValue === \"undefined\") {\n    var value = localStorage.getItem(key);\n\n    if (value === \"true\" || value === \"false\") {\n      return value === \"true\" ? true : false;\n    }\n\n    return value;\n  }\n\n  return GM_getValue(key);\n},\n    storeSet = function storeSet(key, value) {\n  if (typeof GM_setValue === \"undefined\") {\n    return localStorage.setItem(key, value);\n  }\n\n  return GM_setValue(key, value);\n},\n    storeDel = function storeDel(key) {\n  if (typeof GM_deleteValue === \"undefined\") {\n    return localStorage.removeItem(key);\n  }\n\n  return GM_deleteValue(key);\n},\n    findEpByTitle = function findEpByTitle(shows, title) {\n  var found;\n  shows.some(function (show) {\n    if (show.name.indexOf(title) === 0) {\n      found = show;\n      return true;\n    }\n  });\n  return found;\n},\n    getTimes = function getTimes(total) {\n  var days = Math.floor(total / DAY);\n  total -= days * DAY;\n  var hours = Math.floor(total / HOUR);\n  total -= hours * HOUR;\n  var minutes = Math.floor(total / MINUTE);\n  total -= minutes * MINUTE;\n  var seconds = Math.floor(total / SECOND);\n  total -= seconds * SECOND;\n  return {\n    days: days,\n    hours: hours,\n    minutes: minutes,\n    seconds: seconds,\n    isDone: function isDone() {\n      return days <= 0 && hours <= 0 && minutes <= 0 && seconds <= 0;\n    },\n    toTimeStr: function toTimeStr() {\n      return (this.days > 0 ? this.days + ' days ' : '') + (this.hours > 0 ? this.hours + ' hours ' : '') + (this.minutes > 0 ? this.minutes + ' minutes ' : '') + this.seconds + ' seconds';\n    }\n  };\n},\n    insertCountDown = function insertCountDown(loc, ep) {\n  var countDown = document.createElement('span'),\n      last = Date.now(),\n      totalTime = ep.date.valueOf() - last,\n      tick = setInterval(function () {\n    var times = getTimes(totalTime);\n\n    if (times.isDone()) {\n      countDown.innerHTML = '<strong>A new episode has been released! Refresh the page to see it.</strong>';\n      return clearInterval(tick);\n    }\n\n    countDown.textContent = times.toTimeStr();\n    totalTime -= Date.now() - last;\n    last = Date.now();\n  }, 1e3);\n  loc.innerHTML = '';\n  loc.appendChild(countDown);\n},\n    extractDataFromScript = function extractDataFromScript(text) {\n  var obj = JSON.parse(text.slice(text.indexOf('{'), text.lastIndexOf('}') + 1)),\n      dateStr = text.slice(text.lastIndexOf('}') + 4, text.lastIndexOf('\"'));\n  obj.date = new Date(dateStr.slice(0, -1) + \" \" + (dateStr.slice(-1) === 'a' ? 'am' : 'pm') + ' ' + CURYEAR);\n  return obj;\n},\n    getLaunchCalendar = function getLaunchCalendar(cb) {\n  var xhr = new XMLHttpRequest();\n  xhr.open('get', '/launchcalendar', true);\n  xhr.responseType = 'document';\n  xhr.onload = cb;\n  xhr.send();\n},\n    main = function main(userColor) {\n  console.log(userColor);\n  getLaunchCalendar(function (evt) {\n    var xhr = evt.target,\n        animeData = [];\n    qq('td > div > script', xhr.response).forEach(function (script) {\n      if (script.previousSibling.previousSibling.style.backgroundColor !== userColor) return;\n      animeData.push(extractDataFromScript(script.textContent.trim()));\n    }); // find first date that is before now\n\n    var now = Date.now();\n    animeData = animeData.filter(function (anime) {\n      return anime.date.valueOf() >= now;\n    }); // add retrieved data to page\n\n    qq('.queue-wrapper').forEach(function (queueItem) {\n      if (qq('.episode-img img', queueItem)[0].src !== COMING_SOON_IMG) {\n        return;\n      }\n\n      var title = qq('.series-title', queueItem)[0].textContent,\n          episode = findEpByTitle(animeData, title);\n\n      if (episode) {\n        insertCountDown(qq('.short-desc', queueItem)[0], episode);\n      }\n    });\n  });\n},\n    user_premium = storeGet('CQRT_user_premium');\n\nif (user_premium === undefined) {\n  user_premium = true;\n} // register menu command\n\n\ntypeof GM_registerMenuCommand === 'function' && GM_registerMenuCommand('CR Queue countdown: show schedule for ' + (user_premium ? 'PREMIUM' : 'REGULAR') + ' users', function () {\n  storeSet('CQRT_user_premium', !user_premium);\n  window.location.reload();\n}); // kick it off\n\nmain(user_premium && PREMIUM || REGULAR);\n\n//# sourceURL=webpack://userscripts/./src/crunchyroll-queue-times/crunchyroll-queue-times.user.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/crunchyroll-queue-times/crunchyroll-queue-times.user.js"]();
/******/ 	
/******/ })()
;