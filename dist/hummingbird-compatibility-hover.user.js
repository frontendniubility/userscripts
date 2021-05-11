// ==UserScript==
// @name        Hummingbird Compatibility Hover
// @version     1.0.4
// @author      fuzetsu
// @description Shows hummingbird user compatibility rating at the bottom right of the screen when a user link is hovered over
// @homepage    https://github.com/niubilityfrontend/userscripts#readme
// @supportURL  https://github.com/niubilityfrontend/userscripts/issues
// @match       *://hummingbird.me/*
// @match       *://forums.hummingbird.me/*
// @namespace   http://fuzetsu.com/hch
// @grant       none
// @require     https://greasyfork.org/scripts/5679-wait-for-elements/code/Wait%20For%20Elements.js?1
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

/***/ "./src/hummingbird-compatibility-hover/hummingbird-compatibility-hover.user.js":
/*!*************************************************************************************!*\
  !*** ./src/hummingbird-compatibility-hover/hummingbird-compatibility-hover.user.js ***!
  \*************************************************************************************/
/***/ (() => {

eval("// ==UserScript==\n// @name         Hummingbird Compatibility Hover\n// @namespace    http://fuzetsu.com/hch\n// @version      1.0.4\n// @description  Shows hummingbird user compatibility rating at the bottom right of the screen when a user link is hovered over\n// @author       fuzetsu\n// @match        *://hummingbird.me/*\n// @match        *://forums.hummingbird.me/*\n// @grant        none\n// @require      https://greasyfork.org/scripts/5679-wait-for-elements/code/Wait%20For%20Elements.js?1\n// @deprecated   true\n// ==/UserScript==\nvar SCRIPT_NAME = 'Hummingbird Compatibility Hover',\n    COMPAT_ID = 'hb-compat-area',\n    LOAD_GIF = 'https://i.imgur.com/gX1lY9z.gif',\n    DELAY_SEC = .75,\n    CACHED = {},\n    Util = {\n  log: function log() {\n    var args = [].slice.call(arguments);\n    args.unshift('%c' + SCRIPT_NAME + ':', 'font-weight: bold;color: #233c7b;');\n    console.log.apply(console, args);\n  },\n  q: function q(query, context) {\n    return (context || document).querySelector(query);\n  },\n  qq: function qq(query, context) {\n    return [].slice.call((context || document).querySelectorAll(query));\n  },\n  getJSON: function getJSON(url, load, error) {\n    var xhr = new XMLHttpRequest();\n    xhr.open('get', url);\n    xhr.responseType = 'json';\n\n    xhr.onload = function () {\n      load(xhr.response);\n    };\n\n    xhr.onerror = error;\n    xhr.send();\n  },\n  _style: document.head.appendChild(document.createElement('style')),\n  addStyle: function addStyle(styles) {\n    var sel,\n        css,\n        obj,\n        out = '';\n\n    for (sel in styles) {\n      obj = styles[sel];\n      out += sel + '{';\n\n      for (css in obj) {\n        out += css + ':' + obj[css] + ';';\n      }\n\n      out += '}';\n    }\n\n    this._style.textContent += out;\n  }\n},\n    hb = {\n  getUserName: function getUserName(url) {\n    return url.match(/\\/users\\/([a-z0-9_]+)/i)[1];\n  }\n},\n    App = {\n  userLinkRegex: /^https?:\\/\\/(forums\\.)?hummingbird\\.me\\/users\\/[^\\/]+\\/?(\\?.*)?$/,\n  styleUI: function styleUI() {\n    var style = {\n      '.hb-visible': {\n        'visibility': 'visible',\n        'opacity': 1,\n        'transition': 'opacity .5s linear'\n      },\n      '.hb-hidden': {\n        'visibility': 'hidden',\n        'opacity': 0,\n        'transition': 'visibility 0s .5s, opacity .5s linear'\n      },\n      '.hb-compat-percent': {\n        'font-size': '32px',\n        'font-weight': 'bold',\n        'margin': '5px 10px 10px 10px'\n      },\n      '.hb-compat-header': {\n        'font-size': '24px',\n        'margin': '20px 10px 10px 10px'\n      }\n    },\n        id = '#' + COMPAT_ID;\n    style[id] = {\n      'font-family': '\"Helvetica Neue\", Helvetica, Arial, \"Lucida Grande\", sans-serif',\n      'position': 'fixed',\n      'background': 'white',\n      'text-align': 'center',\n      'box-shadow': '0px 0px 15px 0px rgba(0,0,0,0.75)',\n      'border-top-left-radius': '5px',\n      'max-width': '90%',\n      'bottom': '0',\n      'right': '0',\n      'z-index': '10000',\n      'line-height': '32px'\n    };\n    style[id + ' img'] = {\n      'margin': '20px 50px 20px 50px'\n    };\n    Util.addStyle(style);\n  },\n  getCompatArea: function getCompatArea() {\n    var compatArea = Util.q('#' + COMPAT_ID);\n\n    if (!compatArea) {\n      compatArea = document.createElement('div');\n      compatArea.id = COMPAT_ID;\n      compatArea.style.display = 'none';\n      document.body.appendChild(compatArea);\n    }\n\n    return compatArea;\n  },\n  getCompatHTML: function getCompatHTML(compat) {\n    return '<h3 class=\"hb-compat-header\">Compatibility is ' + compat.phrase + '</h3><div class=\"hb-compat-percent\" style=\"color: ' + compat.color + '\">' + compat.percent + '</div>';\n  },\n  showCompat: function showCompat(me, them) {\n    if (me === them) return;\n    if (Util.q('.signup-cta')) return; // not signed in\n\n    var self = this,\n        area = this.getCompatArea(),\n        cache = CACHED[me + '+' + them];\n\n    if (cache) {\n      area.innerHTML = self.getCompatHTML(cache);\n    } else {\n      area.innerHTML = '<img src=\"' + LOAD_GIF + '\" />';\n      Util.getJSON('https://hbird-cmp-node.herokuapp.com/compatibility/anime?user1=' + me + '&user2=' + them, function (compat) {\n        CACHED[me + '+' + them] = compat;\n        area.innerHTML = self.getCompatHTML(compat);\n      });\n    }\n\n    area.style.display = '';\n    setTimeout(function () {\n      area.className = 'hb-visible';\n    }, 0);\n  },\n  hideCompat: function hideCompat() {\n    var area = this.getCompatArea();\n    area.className = 'hb-hidden';\n    setTimeout(function () {\n      area.style.display = 'none';\n    }, 500);\n  },\n  _timeout: null,\n  startHover: function startHover(e) {\n    App._timeout = setTimeout(function () {\n      App._timeout = null;\n      App.showCompat(hb.getUserName(Util.q('.dropdown-menu > li > a, #current-user > a').href), hb.getUserName(e.target.href));\n    }, DELAY_SEC * 1e3);\n  },\n  stopHover: function stopHover(e) {\n    clearInterval(App._timeout);\n    App.hideCompat();\n  },\n  start: function start() {\n    var self = this;\n    Util.log('starting...');\n    self.styleUI();\n    waitForElems('a', function (link) {\n      if (self.userLinkRegex.test(link.href)) {\n        link.addEventListener('mouseenter', self.startHover);\n        link.addEventListener('mouseleave', self.stopHover);\n        link.addEventListener('click', self.stopHover);\n      }\n    });\n  }\n};\nApp.start();\n\n//# sourceURL=webpack://userscripts/./src/hummingbird-compatibility-hover/hummingbird-compatibility-hover.user.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/hummingbird-compatibility-hover/hummingbird-compatibility-hover.user.js"]();
/******/ 	
/******/ })()
;