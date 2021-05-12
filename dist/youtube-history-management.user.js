// ==UserScript==
// @name        YouTube History Management
// @version     2021.5.12103903
// @author      fuzetsu
// @description Select and remove YouTube history items quickly
// @homepage    https://github.com/niubilityfrontend/userscripts#readme
// @supportURL  https://github.com/niubilityfrontend/userscripts/issues
// @match       *://www.youtube.com/*
// @namespace   http://fuzetsu.com/YHM
// @grant       none
// @require     https://greasyfork.org/scripts/5679-wait-for-elements/code/Wait%20For%20Elements.js?version=141779
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
/******/ 	var __webpack_modules__ = ({

/***/ "./src/youtube-history-management/youtube-history-management.user.js":
/*!***************************************************************************!*\
  !*** ./src/youtube-history-management/youtube-history-management.user.js ***!
  \***************************************************************************/
/***/ (() => {

eval("// ==UserScript==\n// @name         YouTube History Management\n// @namespace    http://fuzetsu.com/YHM\n// @version      1.1.0\n// @description  Select and remove YouTube history items quickly\n// @author       fuzetsu\n// @match        *://www.youtube.com/*\n// @grant        none\n// @require      https://greasyfork.org/scripts/5679-wait-for-elements/code/Wait%20For%20Elements.js?version=141779\n// @noframes\n// @deprecated   true\n// ==/UserScript==\n(function () {\n  if (window.top !== window.self) return;\n  var deleteQueue = [],\n      items = [],\n      itemIdx = 0,\n      waitID = null,\n      EDIT_MODE = false,\n      SCRIPT_NAME = 'YouTube History Management',\n      SELECT_COLOR = 'orange',\n      TITLE_SELECTOR = '.yt-uix-tile-link',\n      DESC_SELECTOR = '.yt-lockup-description',\n      MENU_SELECTOR = '#browse-items-primary li > ul',\n      FEED_SELECTOR = '.yt-lockup-video',\n      Util = {\n    log: function log() {\n      var args = [].slice.call(arguments);\n      args.unshift('%c' + SCRIPT_NAME + ':', 'font-weight: bold;color:navy');\n      console.log.apply(console, args);\n    },\n    q: function q(query, context) {\n      return (context || document).querySelector(query);\n    },\n    qq: function qq(query, context) {\n      return [].slice.call((context || document).querySelectorAll(query));\n    },\n    _cbQueue: [],\n    _handleQueue: function _handleQueue() {\n      this._cbQueue.shift()();\n    },\n    queueCallback: function queueCallback(callback) {\n      this._cbQueue.push(callback);\n\n      setTimeout(this._handleQueue.bind(this), 0);\n    }\n  };\n\n  function removeItem(item) {\n    // find \"remove from watch history\" button within history item\n    var btns = Util.qq('button', item);\n    btns.some(function (btn) {\n      // make sure we have the right button\n      if (btn.title.trim() === 'Remove from Watch history') {\n        Util.queueCallback(btn.click.bind(btn));\n        toggleSelected(item, false, true);\n        return true;\n      }\n    });\n  }\n\n  function toggleUntil(index, item) {\n    while (item && !item.dataset.yhmSelected) {\n      toggleSelected(item, true);\n      item = items[--index];\n    }\n  }\n\n  function toggleSelected(item, state, ignore) {\n    var title = Util.q(TITLE_SELECTOR, item),\n        desc = Util.q(DESC_SELECTOR, item);\n\n    if (state || !item.dataset.yhmSelected) {\n      if (!ignore) {\n        deleteQueue.push(item);\n      }\n\n      item.style.backgroundColor = SELECT_COLOR;\n      title && (title.style.backgroundColor = SELECT_COLOR);\n      desc && (desc.style.backgroundColor = SELECT_COLOR);\n      item.dataset.yhmSelected = 'yes';\n    } else {\n      if (!ignore) {\n        deleteQueue.splice(deleteQueue.indexOf(item), 1);\n      }\n\n      item.style.backgroundColor = '';\n      title && (title.style.backgroundColor = '');\n      desc && (desc.style.backgroundColor = '');\n      item.dataset.yhmSelected = '';\n    }\n  }\n\n  function makeMenuButton(text, action) {\n    var btn = document.createElement('button'),\n        liContainer = document.createElement('li');\n    btn.className = 'yt-uix-button yt-uix-button-size-default yt-uix-button-default';\n    btn.innerHTML = '<span class=\"yt-uix-button-content\">' + text + '</span>';\n    btn.addEventListener('click', action, false);\n    liContainer.appendChild(btn);\n    Util.q(MENU_SELECTOR).appendChild(liContainer);\n    return btn;\n  }\n\n  Util.log('Started');\n  waitForUrl(/^http(s)?:\\/\\/www\\.youtube\\.com\\/feed\\/history/, function () {\n    var historyUrl = location.href;\n    Util.log('Entered history page, waiting for menu area to load');\n    waitForElems(MENU_SELECTOR, function () {\n      Util.log('Found menu area, creating and inserting buttons'); // Button that toggles between edit and standard modes\n\n      var btnEditHistory = makeMenuButton('Edit History', function (evt) {\n        if (this.textContent === 'Edit History') {\n          EDIT_MODE = true;\n          this.textContent = 'Stop Editing';\n          btnDeleteSelected.parentNode.style.display = '';\n        } else {\n          EDIT_MODE = false;\n          this.textContent = 'Edit History'; // reset history selection\n\n          while (deleteQueue.length > 0) {\n            toggleSelected(deleteQueue.pop(), false, true);\n          }\n\n          btnDeleteSelected.parentNode.style.display = 'none';\n        }\n      }),\n          btnDeleteSelected = makeMenuButton('Delete Selected', function (evt) {\n        var count = deleteQueue.length;\n        if (count < 1) return alert('Nothing selected, select at least one history item and try again.');\n        EDIT_MODE = false;\n\n        while (deleteQueue.length > 0) {\n          removeItem(deleteQueue.pop());\n        }\n\n        Util.queueCallback(function () {\n          EDIT_MODE = true;\n        });\n        alert('Deleted ' + count + ' history items.');\n      }); // Button that deletes all selected items, only visible while editing\n\n      // hide the button pre-emptively\n      btnDeleteSelected.parentNode.style.display = 'none'; // watch DOM for new history items\n\n      waitID = waitForElems(FEED_SELECTOR, function (item) {\n        var index = itemIdx;\n        itemIdx += 1;\n        items.push(item); // bind selecting event for history items\n\n        item.addEventListener('click', function (evt) {\n          if (EDIT_MODE) {\n            evt.preventDefault();\n            evt.stopPropagation();\n\n            if (evt.shiftKey) {\n              toggleUntil(index, item);\n            } else {\n              toggleSelected(item);\n            }\n\n            window.getSelection().removeAllRanges();\n          }\n        }, false);\n      });\n    }, true);\n    waitForUrl(function (url) {\n      return url !== historyUrl;\n    }, function () {\n      clearInterval(waitID);\n      EDIT_MODE = false;\n      deleteQueue = [];\n      Util.log('Leaving history page, cleaning up listeners and references');\n    }, true);\n  });\n})();\n\n//# sourceURL=webpack://userscripts/./src/youtube-history-management/youtube-history-management.user.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/youtube-history-management/youtube-history-management.user.js"]();
/******/ 	
/******/ })()
;