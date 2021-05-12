// ==UserScript==
// @name        Hangouts Notifier
// @version     2021.5.12103902
// @author      fuzetsu
// @description Show desktop notifications for the Hangouts web app
// @homepage    https://github.com/niubilityfrontend/userscripts#readme
// @supportURL  https://github.com/niubilityfrontend/userscripts/issues
// @match       https://hangouts.google.com/webchat/*
// @namespace   fuzetsu.com/HangoutsNotifier
// @grant       none
// @deprecated  true
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
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/hangouts-notifier/hangouts-notifier.user.js":
/*!*********************************************************!*\
  !*** ./src/hangouts-notifier/hangouts-notifier.user.js ***!
  \*********************************************************/
/***/ (() => {

eval("// ==UserScript==\n// @name         Hangouts Notifier\n// @namespace    fuzetsu.com/HangoutsNotifier\n// @version      0.0.9\n// @description  Show desktop notifications for the Hangouts web app\n// @author       fuzetsu\n// @match        https://hangouts.google.com/webchat/*\n// @grant        none\n// @deprecated   true\n// ==/UserScript==\n\n/* jshint -W097 */\n\n\nvar util = {\n  log: function log() {\n    var args = [].slice.call(arguments);\n    args.unshift('%c' + SCRIPT_NAME + ':', 'font-weight: bold;color: purple;');\n    console.log.apply(console, args);\n  },\n  q: function q(query, context) {\n    return (context || document).querySelector(query);\n  },\n  qq: function qq(query, context) {\n    return [].slice.call((context || document).querySelectorAll(query));\n  }\n},\n    SCRIPT_NAME = 'Hangouts Notifier',\n    LAST_MESSAGE = '.tk.Sn',\n    MESSAGE_TEXT = '.Mu:last-child',\n    USER_IMAGE = 'img.Yf',\n    NEW_MSG = '.Ik.uB',\n    CHECK_INTERVAL = 1 * 1e3,\n    NOTIFY_HIDE_DELAY = 6 * 1e3,\n    NOTIFY_EXPIRE = 1 * 60 * 1e3,\n    hn = {\n  checkPermissions: function checkPermissions() {\n    return Notification.requestPermission(function (permission) {\n      util.log('permission', permission);\n    });\n  },\n  notification: function notification(title, opt) {\n    var n = new Notification(title, opt),\n        id = setTimeout(function () {\n      n.close();\n    }, NOTIFY_EXPIRE);\n\n    n.onclick = function () {\n      clearTimeout(id);\n      n.close();\n      window.focus();\n    };\n\n    n.onshow = function () {\n      clearTimeout(id);\n      setTimeout(function () {\n        n.close();\n      }, NOTIFY_HIDE_DELAY);\n    };\n  },\n  notify: function notify(user, msg, img) {\n    if (!('Notification' in window)) {\n      alert('This browser does not support desktop notifications...');\n      return;\n    }\n\n    var title = user,\n        opt = {\n      body: msg,\n      icon: img || 'https://cdn4.iconfinder.com/data/icons/miu-shadow-social/48/hangouts-128.png'\n    };\n\n    if (Notification.permission === 'granted') {\n      hn.notification(title, opt);\n    } else if (Notification.permission !== 'denied') {\n      return Notification.requestPermission(function (permission) {\n        if (permission === 'granted') {\n          hn.notification(title, opt);\n        }\n      });\n    }\n  },\n  getLastMessage: function getLastMessage() {\n    var message = util.qq(LAST_MESSAGE).pop();\n    if (!message) return;\n    var user = util.q(USER_IMAGE, message);\n    message = util.q(MESSAGE_TEXT, message);\n    if (!message) return;\n    return {\n      user: user.alt,\n      id: message.id,\n      text: message.textContent,\n      img: user.src.replace(/\\/s32[^\\/]*\\//, '/s128/')\n    };\n  },\n  start: function start() {\n    util.log('Starting...', location.href);\n    var lastId = null,\n        res = hn.getLastMessage();\n\n    if (!res) {\n      util.log('failed to get last message, this probably  isn\\'t a hangouts chat window...');\n\n      if (document.URL.indexOf('prop=gmail#epreld') >= 0) {\n        util.log('So it may be a hangouts chat window, after all...');\n        res = {\n          id: -1\n        };\n      } else {\n        return false;\n      }\n    } // if window is focused set last message as read\n\n\n    if (document.hasFocus() || !util.q(NEW_MSG)) {\n      lastId = res.id;\n    }\n\n    setInterval(function () {\n      res = hn.getLastMessage();\n\n      if (res && res.id !== lastId) {\n        lastId = res.id;\n\n        if (!document.hasFocus() && util.q(NEW_MSG)) {\n          hn.notify(res.user, res.text, res.img);\n        }\n      }\n    }, CHECK_INTERVAL);\n    return true;\n  }\n};\nhn.checkPermissions();\n\nif (!hn.start()) {\n  util.log('trying again in 5 seconds, just in case');\n  setTimeout(hn.start, 5e3);\n}\n\n//# sourceURL=webpack://userscripts/./src/hangouts-notifier/hangouts-notifier.user.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/hangouts-notifier/hangouts-notifier.user.js"]();
/******/ 	
/******/ })()
;