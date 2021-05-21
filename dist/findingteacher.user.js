// ==UserScript==
// @name        BestTeacher
// @version     2021.5.521014915
// @author      jimbo
// @description 辅助选老师-排序显示，经验值计算|好评率|显示年龄|列表显示所有教师
// @homepage    https://github.com/niubilityfrontend/userscripts#readme
// @supportURL  https://github.com/niubilityfrontend/hunttingteacheron51talk
// @match       *://www.51talk.com/ReserveNew/index*
// @match       *://www.51talk.com/TeacherNew/*
// @match       *://www.51talk.com/user/*
// @namespace   https://github.com/niubilityfrontend
// @license     OSL-3.0
// @grant       GM_xmlhttpRequest
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_listValues
// @grant       GM_deleteValue
// @grant       GM_registerMenuCommand
// @grant       GM_getResourceText
// @grant       GM_addStyle
// @require     https://code.jquery.com/jquery-3.6.0.min.js
// @require     https://raw.githubusercontent.com/niubilityfrontend/jquery.ui/1.12.1/jquery-ui.min.js
// @require     https://raw.githubusercontent.com/niubilityfrontend/pace/v1.2.4/pace.min.js
// @require     https://greasyfork.org/scripts/388372-scrollfix/code/scrollfix.js?version=726657
// @require     https://raw.githubusercontent.com/niubilityfrontend/userscripts/master/libs/gm_config.js
// @require     https://raw.githubusercontent.com/free-jqgrid/jqGrid/v4.15.5/dist/i18n/grid.locale-cn.js
// @require     https://raw.githubusercontent.com/free-jqgrid/jqGrid/v4.15.5/dist/jquery.jqgrid.min.js
// @rescource   jquicss https://raw.githubusercontent.com/niubilityfrontend/jquery.ui/1.12.1/jquery-ui.min.css
// @resource    pacecss https://raw.githubusercontent.com/niubilityfrontend/pace/v1.2.4/themes/red/pace-theme-big-counter.css
// @resource    jqgridcss https://raw.githubusercontent.com/niubilityfrontend/jqGrid/v4.15.5/css/ui.jqgrid.min.css
// @downloadURL https://raw.githubusercontent.com/niubilityfrontend/userscripts/master/dist/findingteacher.user.js
// @updateURL   https://raw.githubusercontent.com/niubilityfrontend/userscripts/master/dist/findingteacher.meta.js
// ==/UserScript==

/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 385:
/***/ (() => {

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = [], _n = true, _d = false, _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// ==UserScript==
// @name         gm_config_toolbar
// @version      2020.4.20
// @namespace    https://github.com/niubilityfrontend
// @description  greasyfork configuration toolbar on the script addins
// @author       kufii
// @license      OSL-3.0
// @match *
// @include *
// @supportURL   https://github.com/kufii/My-UserScripts
// @grant        GM_xmlhttpRequest
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_listValues
// @grant        GM_deleteValue
// @grant        GM_registerMenuCommand
// ==/UserScript==
(function () {
  'use strict';

  window.GM_config = function (settings) {
    var storage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'cfg',
        ret = null,
        prefix = 'gm-config',
        addStyle = function addStyle() {
      var css = "\n\t\t\t\t.".concat(prefix, " {\n\t\t\t\t\tdisplay: grid;\n\t\t\t\t\talign-items: center;\n\t\t\t\t\tgrid-row-gap: 5px;\n\t\t\t\t\tgrid-column-gap: 10px;\n\t\t\t\t\tbackground-color: white;\n\t\t\t\t\tborder: 1px solid black;\n\t\t\t\t\tpadding: 5px;\n\t\t\t\t\tposition: fixed;\n\t\t\t\t\ttop: 0;\n\t\t\t\t\tright: 0;\n\t\t\t\t\tz-index: 2147483647;\n\t\t\t\t}\n\n\t\t\t\t.").concat(prefix, " label {\n\t\t\t\t\tgrid-column: 1 / 2;\n\t\t\t\t\tcolor: black;\n\t\t\t\t\ttext-align: right;\n\t\t\t\t\tfont-size: small;\n\t\t\t\t\tfont-weight: bold;\n\t\t\t\t}\n\n\t\t\t\t.").concat(prefix, " input,\n\t\t\t\t.").concat(prefix, " textarea,\n\t\t\t\t.").concat(prefix, " select {\n\t\t\t\t\tgrid-column: 2 / 4;\n\t\t\t\t}\n\n\t\t\t\t.").concat(prefix, " .").concat(prefix, "-save {\n\t\t\t\t\tgrid-column: 2 / 3;\n\t\t\t\t}\n\n\t\t\t\t.").concat(prefix, " .").concat(prefix, "-cancel {\n\t\t\t\t\tgrid-column: 3 / 4;\n\t\t\t\t}\n\t\t\t");

      if (typeof GM_addStyle === 'undefined') {
        var style = document.createElement('style');
        style.textContent = css;
        document.head.appendChild(style);
      } else {
        GM_addStyle(css);
      }
    },
        load = function load() {
      var defaults = {};
      settings.forEach(function (_ref) {
        var key = _ref.key,
            def = _ref["default"];
        return defaults[key] = def;
      });
      var cfg = typeof GM_getValue !== 'undefined' ? GM_getValue(storage) : localStorage.getItem(storage);
      if (!cfg) return defaults;
      cfg = JSON.parse(cfg);
      Object.entries(defaults).forEach(function (_ref2) {
        var _ref3 = _slicedToArray(_ref2, 2),
            key = _ref3[0],
            value = _ref3[1];

        if (typeof cfg[key] === 'undefined') {
          cfg[key] = value;
        }
      });
      return cfg;
    },
        save = function save(cfg) {
      var data = JSON.stringify(cfg);
      typeof GM_setValue !== 'undefined' ? GM_setValue(storage, data) : localStorage.setItem(storage, data);
    },
        setup = function setup() {
      var createContainer = function createContainer() {
        var form = document.createElement('form');
        form.classList.add(prefix);
        return form;
      },
          createTextbox = function createTextbox(name, value, placeholder, maxLength, multiline, resize) {
        var input = document.createElement(multiline ? 'textarea' : 'input');

        if (multiline) {
          input.style.resize = resize ? 'vertical' : 'none';
        } else {
          input.type = 'text';
        }

        input.name = name;
        if (typeof value !== 'undefined') input.value = value;
        if (placeholder) input.placeholder = placeholder;
        if (maxLength) input.maxLength = maxLength;
        return input;
      },
          createNumber = function createNumber(name, value, placeholder, min, max, step) {
        var input = createTextbox(name, value, placeholder);
        input.type = 'number';
        if (typeof min !== 'undefined') input.min = min;
        if (typeof max !== 'undefined') input.max = max;
        if (typeof step !== 'undefined') input.step = step;
        return input;
      },
          createSelect = function createSelect(name, options, value, showBlank) {
        var select = document.createElement('select');
        select.name = name;

        var createOption = function createOption(val) {
          var _val$value = val.value,
              value = _val$value === void 0 ? val : _val$value,
              _val$text = val.text,
              text = _val$text === void 0 ? val : _val$text,
              option = document.createElement('option');
          option.value = value;
          option.textContent = text;
          return option;
        };

        if (showBlank) {
          select.appendChild(createOption(''));
        }

        options.forEach(function (opt) {
          if (typeof opt.optgroup !== 'undefined') {
            var optgroup = document.createElement('optgroup');
            optgroup.label = opt.optgroup;
            select.appendChild(optgroup);
            opt.values.forEach(function (value) {
              return optgroup.appendChild(createOption(value));
            });
          } else {
            select.appendChild(createOption(opt));
          }
        });
        select.value = value;
        return select;
      },
          createCheckbox = function createCheckbox(name, checked) {
        var checkbox = document.createElement('input');
        checkbox.id = "".concat(prefix, "-").concat(name);
        checkbox.type = 'checkbox';
        checkbox.name = name;
        checkbox.checked = checked;
        return checkbox;
      },
          createButton = function createButton(text, onclick, classname) {
        var button = document.createElement('button');
        button.classList.add("".concat(prefix, "-").concat(classname));
        button.textContent = text;
        button.onclick = onclick;
        return button;
      },
          createLabel = function createLabel(label, htmlFor) {
        var lbl = document.createElement('label');
        if (htmlFor) lbl.htmlFor = htmlFor;
        lbl.textContent = label;
        return lbl;
      },
          init = function init(cfg) {
        var controls = {},
            div = createContainer();
        settings.filter(function (_ref4) {
          var type = _ref4.type;
          return type !== 'hidden';
        }).forEach(function (setting) {
          var value = cfg[setting.key],
              control;

          if (setting.type === 'text') {
            control = createTextbox(setting.key, value, setting.placeholder, setting.maxLength, setting.multiline, setting.resizable);
          } else if (setting.type === 'number') {
            control = createNumber(setting.key, value, setting.placeholder, setting.min, setting.max, setting.step);
          } else if (setting.type === 'dropdown') {
            control = createSelect(setting.key, setting.values, value, setting.showBlank);
          } else if (setting.type === 'bool') {
            control = createCheckbox(setting.key, value);
          }

          div.appendChild(createLabel(setting.label, control.id));
          div.appendChild(control);
          controls[setting.key] = control;
          control.addEventListener(setting.type === 'dropdown' ? 'change' : 'input', function () {
            if (ret.onchange) {
              var control = controls[setting.key],
                  _value = setting.type === 'bool' ? control.checked : control.value;

              ret.onchange(setting.key, _value);
            }
          });
        });
        div.appendChild(createButton('Save', function () {
          settings.filter(function (_ref5) {
            var type = _ref5.type;
            return type !== 'hidden';
          }).forEach(function (_ref6) {
            var key = _ref6.key,
                type = _ref6.type,
                control = controls[key];
            cfg[key] = type === 'bool' ? control.checked : control.value;
          });
          save(cfg);

          if (ret.onsave) {
            ret.onsave(cfg);
          }

          div.remove();
        }, 'save'));
        div.appendChild(createButton('Cancel', function () {
          if (ret.oncancel) {
            ret.oncancel(cfg);
          }

          div.remove();
        }, 'cancel'));
        document.body.appendChild(div);
      };

      init(load());
    };

    addStyle();
    ret = {
      load: load,
      save: save,
      setup: setup
    };
    return ret;
  };
})();

/***/ }),

/***/ 570:
/***/ (() => {

// xxxxxxxxxxxxxx
// import PaceCss from './../../libs/pace-1.2.4/themes/red/pace-theme-big-counter.css'
Pace.Options = {
  ajax: false,
  // disabled
  document: false,
  // disabled
  eventLag: false,
  // disabled
  elements: {
    selectors: ["#filterdialog"]
  }
};

/***/ }),

/***/ 228:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Z": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(645);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0__);
// Imports

var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_0___default()(function(i){return i[1]});
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\r\n.search-teachers .s-t-list .item-time-list {margin-top:315px;}\r\n.search-teachers .s-t-list .item { height: 679px; }\r\n.search-teachers .s-t-list .s-t-content { margin-right: 0px;}\r\n.search-teachers { width: 100%; }\r\n.search-teachers .s-t-list .item .item-top .teacher-name {line-height: 15px;}\r\n.search-teachers .s-t-list .item { width: 233px; height: auto; margin-right: 5px; margin-bottom: 5px; }\r\n \r\n\r\n.ui-tabs .ui-tabs-panel{padding:.5em 0.2em;}\r\n.ui-dialog .ui-dialog-content { padding: .5em 0.2em;}\r\n\r\n.search-teachers .s-t-top .s-t-days .s-t-days-list li {\r\n  float: left;\r\n  width: 118px;\r\n  height: 34px;\r\n  line-height: 34px;\r\n  margin-right: 5px;\r\n  margin-bottom: 5px;\r\n}\r\n.search-teachers .s-t-top .s-t-top-details {\r\n  padding: 2px 0 2px 30px;\r\n}\r\n.search-teachers .s-t-top .s-t-top-right {\r\n  height: auto;\r\n}\r\n.search-teachers .s-t-top .s-t-top-left .condition-item {\r\n  margin-bottom: 2px;\r\n}\r\n.s-t-page { padding-top: 2px;}\r\n/* \r\n.pace .pace-progress {\r\n  background: #29d;\r\n  position: fixed;\r\n  z-index: 2000;\r\n  top: 0;\r\n  right: 100%;\r\n  width: 100%;\r\n  height: 2px;\r\n} */\r\n", ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 645:
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),

/***/ 379:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";

// EXTERNAL MODULE: ./src/findteacherson51talk/gm_config.js
var gm_config = __webpack_require__(385);
;// CONCATENATED MODULE: ./src/findteacherson51talk/bestteacher_gm_toolbar.es6

var config = GM_config([{
  key: "pagecount",
  label: "最大页数 (自动获取时)",
  "default": 20,
  type: "dropdown",
  values: [0, 5, 10, 20, 50, 1e3]
}, {
  key: "newBatcherKeyHours",
  label: "批次更新间隔（小时），0为每次更新",
  "default": 24,
  type: "dropdown",
  values: [0, 1, 2, 3, 5, 10, 24, 168, 168e3]
}, {
  key: "markRankRed",
  label: "突出前N名教师的名次",
  "default": 100,
  type: "dropdown",
  values: [5, 10, 30, 50, 120, 500, 3e3, 5e3, 10080]
}, {
  key: "version",
  type: "hidden",
  "default": 1
}]),
    conf = config.load();

config.onsave = function (cfg) {
  conf = cfg;
  $("#autogetnextpage").text("自动获取" + getAutoNextPagesCount() + "页");
};

GM_registerMenuCommand("设置", config.setup);

;// CONCATENATED MODULE: ./src/findteacherson51talk/common.es6
//*://www.51talk.com/ReserveNew/index*
//https://www.51talk.com/TeacherNew/info/t26501111
//https://www.51talk.com/TeacherNew/teacherComment?tid=t26501111&type=all&has_msg=1
//https://www.51talk.com/TeacherNew/teacherComment?tid=t26501111&type=good&has_msg=1
//https://www.51talk.com/TeacherNew/teacherComment?tid=t26501111&type=bad&has_msg=1
//https://www.51talk.com/user/study_center_zx
//https://www.51talk.com/user/study_center_zy
//https://www.51talk.com/user/study_center_xx

var url = window.location.href.toLocaleLowerCase(),
    settings = {
  url: url,
  tid: url.match(/(t\d+)/g),
  pagecount: conf.pagecount,
  isDetailPage: url.includes("teachernew"),
  isListPage: url.includes("reservenew"),
  isCoursePage: url.includes("study_center")
},
    configExprMilliseconds = 36e5 * GM_getValue("tinfoexprhours", 168),
    num = /[0-9]*/g;

function gettid() {
  return settings.tid;
}

function getorAddSession(key, func) {
  if (!(key in sessionStorage)) {
    var data = typeof func == "function" ? func(key) : func;
    sessionStorage.setItem(key, data);
    return data;
  }

  return sessionStorage.getItem(key);
}

function sleep(delay) {
  var start = Date.now();

  while (Date.now() - start < delay) {
    continue;
  }
}

var asc = function asc(a, b) {
  var av = $(a).attr("indicator"),
      bv = $(b).attr("indicator");
  if (!av || !bv) return 0;
  return $(a).attr("indicator").toFloat() > $(b).attr("indicator").toFloat() ? 1 : -1;
},
    desc = function desc(a, b) {
  var av = $(a).attr("indicator"),
      bv = $(b).attr("indicator");
  if (!av || !bv) return 0;
  return $(a).attr("indicator").toFloat() > $(b).attr("indicator").toFloat() ? -1 : 1;
},
    sortByIndicator = function sortByIndicator(sortBy) {
  var sortEle = $(".s-t-content.f-cb .item").sort(sortBy);
  $(".s-t-content.f-cb").empty().append(sortEle);
};

function getBatchNumber() {
  if (conf.newBatcherKeyHours <= 0) return Date.now();
  return parseInt(Date.now() / conf.newBatcherKeyHours / 36e5) * conf.newBatcherKeyHours * 36e5;
}

function getLeftPageCount() {
  var pages = Number($(".s-t-page>.next-page:first").prev().text()),
      curr = Number($(".s-t-page>.active:first").text());
  if (pages) return pages - curr;else return 0;
}

function common_getAutoNextPagesCount() {
  var pages = getLeftPageCount();
  if (settings.pagecount > pages) return pages;else return settings.pagecount;
}

function getinfokey() {
  return "tinfo-" + gettid();
}

function calcIndicator(tinfo) {
  return Math.ceil(tinfo.label * tinfo.thumbupRate / 100) + tinfo.favoritesCount;
}

function calcThumbRate(tinfo) {
  var all = tinfo.thumbdown + tinfo.thumbup;
  if (all < 1) all = 1;
  return ((tinfo.thumbup + 1e-5) / all).toFixed(2) * 100;
}
/**
 * 提交运算函数到 document 的 fx 队列
 */


function common_submit(fun) {
  var queue = $.queue(document, "fx", fun);

  if (queue[0] == "inprogress") {
    return;
  }

  $.dequeue(document);
}


;// CONCATENATED MODULE: ./libs/propertiesCaseInsensitive.mjs
/* harmony default export */ const propertiesCaseInsensitive = (class {
    has(target, prop) {
        if (typeof prop === "symbol") {
            return prop in target; // pass through; or 'return;' if you want to block pass through
        }
        prop = prop.toLowerCase();
        if (prop in target) return true;
        let keys = Object.keys(target);
        let i = keys.length;
        while (i--) {
            if (keys[i] && keys[i].toLowerCase() == prop) return true;
        }
        return false;
    };
    get(target, prop, receiver) {
        if (typeof prop === "symbol") {
            return target[prop];
        }
        prop = prop.toLowerCase();
        if (prop in target) return target[prop];
        let keys = Object.keys(target);
        let i = keys.length;
        while (i--) {
            if (keys[i] && keys[i].toLowerCase() == prop) return target[keys[i]];
        }
        return undefined;
    };
    set(target, prop, value) {
        if (typeof prop === "symbol") {
            target[prop] = value;
        }
        target[prop.toLowerCase()] = value;
        return true;
    }
});;
;// CONCATENATED MODULE: ./src/findteacherson51talk/jqueryextend.es6
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

 ///date to string with formater

var getPaddedComp = function getPaddedComp(comp) {
  var len = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  if (len < 1) len = 1;
  comp = "" + comp;
  var paddedLen = len - ("" + comp).length;

  if (paddedLen > 0) {
    return [].concat(_toConsumableArray(Array(paddedLen).fill("0")), _toConsumableArray(comp)).join("");
  } else return comp;
},
    o = {
  "[y|Y]{4}": function yY4(date) {
    return date.getFullYear();
  },
  // year
  "[y|Y]{2}": function yY2(date) {
    return date.getFullYear().toString().slice(2);
  },
  // year
  MM: function MM(date) {
    return getPaddedComp(date.getMonth() + 1);
  },
  //month
  M: function M(date) {
    return date.getMonth() + 1;
  },
  //month
  "[d|D]{2}": function dD2(date) {
    return getPaddedComp(date.getDate());
  },
  //day
  "[d|D]{1}": function dD1(date) {
    return date.getDate();
  },
  //day
  "h{2}": function h2(date) {
    return getPaddedComp(date.getHours() > 12 ? date.getHours() % 12 : date.getHours());
  },
  //hour
  "h{1}": function h1(date) {
    return date.getHours() > 12 ? date.getHours() % 12 : date.getHours();
  },
  //hour
  "H{2}": function H2(date) {
    return getPaddedComp(date.getHours());
  },
  //hour
  "H{1}": function H1(date) {
    return date.getHours();
  },
  //hour
  "m{2}": function m2(date) {
    return getPaddedComp(date.getMinutes());
  },
  //minute
  "m{1}": function m1(date) {
    return date.getMinutes();
  },
  //minute
  "s+": function s(date) {
    return getPaddedComp(date.getSeconds());
  },
  //second
  "f+": function f(date) {
    return getPaddedComp(date.getMilliseconds(), 3);
  },
  //millisecond,
  "f{1}": function f1(date) {
    return getPaddedComp(date.getMilliseconds(), 0);
  },
  //millisecond,
  "b+": function b(date) {
    return date.getHours() >= 12 ? "PM" : "AM";
  }
};

$.extend(Date.prototype, {
  toString: function toString(format) {
    if (!format) return this.toLocaleDateString();
    var formattedDate = format;

    for (var k in o) {
      if (new RegExp("(" + k + ")").test(format)) {
        formattedDate = formattedDate.replace(RegExp.$1, o[k](this));
      }
    }

    return formattedDate;
  }
}); //扩展基本类型方法 array.clean(val), Number.toString(len),String.toFloat, String.toInt,String.startsWtih,String.endsWith, ** String.replaceAll区别育默认的string.replace

$.extend(Array.prototype, {
  clean: function clean() {
    for (var deleteValue = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "", i = 0; i < this.length; i++) {
      if (this[i] == deleteValue) {
        this.splice(i, 1);
        i--;
      }
    }

    return this;
  }
});
$.extend(Number.prototype, {
  toString: function toString(num) {
    if (isNaN(num)) num = 2;
    return this.toFixed(num);
  }
});
$.extend(String.prototype, {
  toFloat: function toFloat() {
    return parseFloat(this);
  },
  toInt: function toInt() {
    return parseInt(this);
  },
  includesAny: function includesAny() {
    for (var _len = arguments.length, arr = new Array(_len), _key = 0; _key < _len; _key++) {
      arr[_key] = arguments[_key];
    }

    if (!Array.isArray(arr)) return false;
    return new RegExp(arr.join('|')).test(this);
    ;
  } // startsWith: function (str) {
  //     return this.slice(0, str.length) == str;
  // },
  // endsWith: function (str) {
  //     return this.slice(-str.length) == str;
  // },
  // includes: function (str) {
  //     return this.indexOf(str) > -1;
  // },
  // replaceAll: function (search, replacement) {
  //     let target = this;
  //     return target.replace(new RegExp(search, "g"), replacement);
  // },

}); ///extend method parameters of window, get parameter's value with key case-insensitive

$.extend(window, {
  parameters: function parameters(url) {
    // get query string from url (optional) or window
    var queryString = url ? url.split("?")[1] : window.location.search.slice(1),
        cachedkey = "urlparameters" + queryString,
        obj = $(window).data(cachedkey);

    if (obj == undefined) {
      obj = new Proxy({}, propertiesCaseInsensitive);
      $(window).data(cachedkey, obj);
    } else return obj; // we'll store the parameters here
    // if query string exists


    if (queryString) {
      // stuff after # is not part of query string, so get rid of it
      queryString = queryString.split("#")[0]; // split our query string into its component parts

      var arr = queryString.split("&");

      for (var i = 0; i < arr.length; i++) {
        // separate the keys and the values
        var a = arr[i].split("="),
            paramName = a[0],
            paramValue = typeof a[1] === "undefined" ? true : a[1]; // set parameter name and value (use 'true' if empty)

        // if the paramName ends with square brackets, e.g. colors[] or colors[2]
        if (paramName.match(/\[(\d+)?\]$/)) {
          // create key if it doesn't exist
          var key = paramName.replace(/\[(\d+)?\]/, "");
          if (!obj[key]) obj[key] = []; // if it's an indexed array e.g. colors[2]

          if (paramName.match(/\[\d+\]$/)) {
            // get the index value and add the entry at the appropriate position
            var index = /\[(\d+)\]/.exec(paramName)[1];
            obj[key][index] = paramValue;
          } else {
            // otherwise add the value to the end of the array
            obj[key].push(paramValue);
          }
        } else {
          // we're dealing with a string
          if (!obj[paramName]) {
            // if it doesn't exist, create property
            obj[paramName] = paramValue;
          } else if (obj[paramName] && typeof obj[paramName] === "string") {
            // if property does exist and it's a string, convert it to an array
            obj[paramName] = [obj[paramName]];
            obj[paramName].push(paramValue);
          } else {
            // otherwise add the property
            obj[paramName].push(paramValue);
          }
        }
      }
    }

    return obj;
  }
});
// EXTERNAL MODULE: ./src/findteacherson51talk/pacesetup.es6
var pacesetup = __webpack_require__(570);
;// CONCATENATED MODULE: ./src/findteacherson51talk/listpage.es6


var maxrate = 0,
    minrate = 99999,
    maxlabel = 0,
    minlabel = 9999999,
    maxfc = 0,
    minfc = 999999,
    maxage = 0,
    minage = 99999;

function updateTeacherinfoToUI(jqel, tinfo) {
  if (tinfo.label > maxlabel) maxlabel = tinfo.label;
  if (tinfo.label < minlabel) minlabel = tinfo.label;
  if (tinfo.favoritesCount > maxfc) maxfc = tinfo.favoritesCount;
  if (tinfo.favoritesCount < minfc) minfc = tinfo.favoritesCount;
  if (tinfo.thumbupRate > maxrate) maxrate = tinfo.thumbupRate;
  if (tinfo.thumbupRate < minrate) minrate = tinfo.thumbupRate;
  if (tinfo.age > maxage) maxage = tinfo.age ? tinfo.age : 100;
  if (tinfo.age < minage) minage = tinfo.age ? tinfo.age : 0;
  jqel.attr("teacherinfo", JSON.stringify(tinfo));
  jqel.find(".teacher-name").html(jqel.find(".teacher-name").html() + "<br /><label title='\u8BC4\u8BBA\u6807\u7B7E\u6570\u91CF'>".concat(tinfo.label, "</label>|<label title='\u597D\u8BC4\u7387'>").concat(tinfo.thumbupRate, "%</label>\n      | <label title='\u6536\u85CF\u6570\u91CF'>").concat(tinfo.favoritesCount, " </label> ")); // jqel.find(".teacher-age").html(jqel.find(".teacher-age").html() + " | <label title='收藏数量'>" + tinfo.favoritesCount + "</label>");

  jqel.attr("indicator", tinfo.indicator);
}

function executeFilters(uifilters) {
  var tcount = 0,
      hidecount = 0;
  $.each($(".item"), function (i, item) {
    var node = $(item),
        tinfojson = node.attr("teacherinfo");

    if (!tinfojson) {
      return true;
    }

    var tinfo = JSON.parse(tinfojson),
        ret = true;
    if (!isNaN(tinfo.thumbupRate)) ret = tinfo.thumbupRate >= uifilters.rate1 && tinfo.thumbupRate <= uifilters.rate2;
    if (!isNaN(tinfo.label)) ret = tinfo.label >= uifilters.l1 && tinfo.label <= uifilters.l2 && ret;
    if (!isNaN(tinfo.age)) tinfo.age >= uifilters.age1 && tinfo.age <= uifilters.age2 && ret;
    if (!isNaN(tinfo.favoritesCount)) tinfo.favoritesCount >= uifilters.fc1 && tinfo.favoritesCount <= uifilters.fc2 && ret;

    if (ret) {
      if (node.is(":hidden")) {
        //如果node是隐藏的则显示node元素，否则隐藏
        node.show();
        node.animate({
          left: "+=50"
        }, 3500).animate({
          left: "-=50"
        }, 3500);
      } else {//nothing todo
      }

      tcount++;
    } else {
      node.css("color", "white").hide();
      hidecount++;
    }
  });
  $("#tcount").text(tcount);
  $("#thidecount").text(hidecount);
}

function getUiFilters() {
  var l1 = $("#tlabelslider").slider("values", 0),
      l2 = $("#tlabelslider").slider("values", 1),
      rate1 = $("#thumbupRateslider").slider("values", 0),
      rate2 = $("#thumbupRateslider").slider("values", 1),
      age1 = $("#tAgeSlider").slider("values", 0),
      age2 = $("#tAgeSlider").slider("values", 1),
      fc1 = $("#fcSlider").slider("values", 0),
      fc2 = $("#fcSlider").slider("values", 1);
  return {
    l1: l1,
    l2: l2,
    rate1: rate1,
    rate2: rate2,
    age1: age1,
    age2: age2,
    fc1: fc1,
    fc2: fc2
  };
}

function getTeacherInfoInList(jqel) {
  var age = 0,
      label = function () {
    var j_len = jqel.find(".label").text().match(num).clean("").length,
        l = 0;

    for (var j = 0; j < j_len; j++) {
      l += Number(jqel.find(".label").text().match(num).clean("")[j]);
    }

    return l;
  }(),
      name = jqel.find(".teacher-name").text(),
      type = $(".s-t-top-list .li-active").text(),
      effectivetime = getBatchNumber();

  if (type == "收藏外教") {
    var isfavorite = true;
    return {
      age: age,
      label: label,
      name: name,
      effectivetime: effectivetime,
      isfavorite: isfavorite
    };
  } else return {
    age: age,
    label: label,
    name: name,
    effectivetime: effectivetime,
    type: type
  };
}

if (settings.isListPage) {
  $(".item-top-cont").prop("innerHTML", function (i, val) {
    return val.replaceAll("<!--", "").replaceAll("-->", "");
  }); // 自动获取时,显示停止按钮

  common_submit(function (next) {
    var totalPages = Number($(".s-t-page>a:eq(-2)").text()),
        curPageId = window.parameters().pageID ? window.parameters().pageID : 1,
        remainPages = totalPages - curPageId,
        autonextpagecount = GM_getValue("autonextpagecount", 1);

    if (autonextpagecount > 0 && $(".s-t-page>.next-page").length > 0) {
      var dialog = $("<div id=\"dialog-confirm\" title=\"\u662F\u5426\u505C\u6B62\u81EA\u52A8\u641C\u7D22\u8001\u5E08?\">\n<p><span class=\"ui-icon ui-icon-alert\" style=\"float:left; margin:12px 12px 20px 0;\"></span>\n<b>\u6B63\u5728\u6839\u636E\u60A8\u7684\u9009\u62E9\u81EA\u52A8\u83B7\u53D6\u6559\u5E08\u4FE1\u606F</b><br><br>\n\u5269\u4F59".concat(sessionStorage.getItem("selectedTimeSlotsRemain"), "/").concat(sessionStorage.getItem("selectedTimeSlotsTotal"), "\u4E2A\u65F6\u6BB5\uFF0C<br><br>\n\u5F53\u524D\u65F6\u6BB5\u7EA6").concat(totalPages * 28, "\u4E2A\u6559\u5E08\uFF0C\u83B7\u53D6\u7B2C").concat(curPageId, "/").concat(totalPages, "\u9875\uFF0C\u8FDB\u5EA6").concat(Math.floor(curPageId / totalPages * 100), "%,<br>\n\n</p>\n</div>"));
      dialog.appendTo("body");
      dialog.dialog({
        resizable: false,
        height: "auto",
        width: 400,
        modal: false,
        buttons: {
          立即停止: function 立即停止() {
            sessionStorage.setItem("selectedTimeSlots", "");
            GM_setValue("autonextpagecount", 0);
            $(this).dialog("close");
          } // [`取后${(remainPages*0.25).toFixed(0)}页`]: function() {
          // sessionStorage.setItem('selectedTimeSlots', '');
          // GM_setValue('autonextpagecount', (remainPages * 0.25).toFixed(0));
          // $(this).dialog("close");
          // },
          // [`取后${(remainPages*0.5).toFixed(0)}页`]: function() {
          // sessionStorage.setItem('selectedTimeSlots', '');
          // GM_setValue('autonextpagecount', (remainPages * 0.5).toFixed(0));
          // $(this).dialog("close");
          // },
          // [`取后${(remainPages*0.75).toFixed(0)}页`]: function() {
          // sessionStorage.setItem('selectedTimeSlots', '');
          // GM_setValue('autonextpagecount', (remainPages * 0.75).toFixed(0));
          // $(this).dialog("close");
          // },

        }
      });
    }

    next();
  }); //获取列表中数据

  $(".item").each(function (index, el) {
    common_submit(function (next) {
      Pace.track(function () {
        var jqel = $(el),
            tid = jqel.find(".teacher-details-link a").attr("href").replace("https://www.51talk.com/TeacherNew/info/", "").replace("http://www.51talk.com/TeacherNew/info/", ""),
            tinfokey = "tinfo-" + tid,
            teacherlistinfo = getTeacherInfoInList(jqel),
            tinfo = GM_getValue(tinfokey);

        if (tinfo) {
          var now = Date.now();

          if (!tinfo.expire) {
            tinfo.expire = new Date(1970, 1, 1).getTime();
          }

          tinfo = $.extend(tinfo, teacherlistinfo);
          GM_setValue(tinfokey, tinfo);

          if (now - tinfo.expire < configExprMilliseconds) {
            updateTeacherinfoToUI(jqel, tinfo);
            next();
            return true;
          }
        } // ajax 请求一定要包含在一个函数中


        var start = Date.now();
        $.ajax({
          url: window.location.protocol + "//www.51talk.com/TeacherNew/teacherComment?tid=" + tid + "&type=bad&has_msg=1",
          type: "GET",
          dateType: "html",
          success: function success(r) {
            var jqr = $(r);

            if (jqr.find(".teacher-name-tit").length > 0) {
              var tempitem = jqr.find(".teacher-name-tit")[0];
              tempitem.innerHTML = tempitem.innerHTML.replace("<!--", "").replace("-->", "");
            }

            if (jqr.find(".evaluate-content-left span").length >= 3) {
              var thumbup = Number(jqr.find(".evaluate-content-left span:eq(1)").text().match(num).clean("")[0]),
                  thumbdown = Number(jqr.find(".evaluate-content-left span:eq(2)").text().match(num).clean("")[0]),
                  favoritesCount = Number(jqr.find(".clear-search").text().match(num).clean("")[0]),
                  isfavorite = jqr.find(".go-search.cancel-collection").length > 0,
                  agesstr = jqr.find(".teacher-name-tit > .age.age-line").text().match(num).clean(""),
                  tage = Number(agesstr[1]),
                  age = Number(agesstr[0]),
                  slevel = jqr.find(".sui-students").text();
              jqr.remove();
              var tinfo = {
                slevel: slevel,
                tage: tage,
                age: age,
                thumbup: thumbup,
                thumbdown: thumbdown,
                thumbupRate: 100,
                favoritesCount: favoritesCount,
                isfavorite: isfavorite,
                expire: Date.now()
              };
              tinfo = $.extend(tinfo, teacherlistinfo);
              tinfo.thumbupRate = calcThumbRate(tinfo);
              tinfo.indicator = calcIndicator(tinfo);
              GM_setValue(tinfokey, tinfo);
              updateTeacherinfoToUI(jqel, tinfo);
            } else {
              console.log("Teacher s detail info getting error:" + JSON.stringify(jqel) + ",error info:" + r);
            }
          },
          error: function error(data) {
            console.log("xhr error when getting teacher " + JSON.stringify(jqel) + ",error msg:" + JSON.stringify(data));
          }
        }).always(function () {
          while (Date.now() - start < 600) {
            continue;
          }

          next();
        });
      });
    });
  });
  common_submit(function (next) {
    //翻页
    var autonextpagecount = GM_getValue("autonextpagecount", 0);

    if (autonextpagecount > 0) {
      GM_setValue("autonextpagecount", autonextpagecount - 1);

      if ($(".s-t-page>.next-page").length == 0) {
        GM_setValue("autonextpagecount", 0);
        if (isStopShowboxAndAutoGetNextTimeTeachers()) return;
      } else {
        $(".s-t-page .next-page")[0].click();
        return false;
      }
    } else {
      if (isStopShowboxAndAutoGetNextTimeTeachers()) return;
    }

    next();
  });
}

function isStopShowboxAndAutoGetNextTimeTeachers() {
  var str = sessionStorage.getItem("selectedTimeSlots");
  if (!str) return false;
  var selectedTimeSlots = JSON.parse(str),
      cur = selectedTimeSlots.shift();

  if (cur) {
    GM_setValue("autonextpagecount", 500);
    sessionStorage.setItem("selectedTimeSlots", JSON.stringify(selectedTimeSlots));
    sessionStorage.setItem("selectedTimeSlotsRemain", selectedTimeSlots.length);
    $('form[name="searchform"]>input[name="selectTime"]').val(cur);
    $('form[name="searchform"]>input[name="pageID"]').val(1);
    $(".go-search").trigger("click");
    return true;
  }

  return false;
}

function addCheckbox(val, lbl, group) {
  var container = $("#timesmutipulecheck"),
      inputs = container.find("input"),
      id = inputs.length + 1;
  $("<input />", {
    type: "checkbox",
    id: "cb" + id,
    value: val,
    name: group
  }).appendTo(container);
  $("<label />", {
    "for": "cb" + id,
    text: lbl ? lbl : val
  }).appendTo(container);
}


;// CONCATENATED MODULE: ./src/findteacherson51talk/detailpage.es6


if (settings.isDetailPage) {
  var processTeacherDetailPage = function processTeacherDetailPage(jqr) {
    jqr.find(".teacher-name-tit").prop("innerHTML", function (i, val) {
      return val.replaceAll("<!--", "").replaceAll("-->", "");
    });
    var tinfo = GM_getValue(getinfokey(), {});

    tinfo.label = function () {
      var l = 0;
      $.each(jqr.find(".t-d-label").text().match(num).clean(""), function (i, val) {
        l += Number(val);
      });
      return l;
    }(); //if never set expire then


    if (!tinfo.expire) tinfo.expire = Date.now();

    if (window.location.href.toLocaleLowerCase().includes("teachercomment")) {
      tinfo.thumbup = Number(jqr.find(".evaluate-content-left span:eq(1)").text().match(num).clean("")[0]);
      tinfo.thumbdown = Number(jqr.find(".evaluate-content-left span:eq(2)").text().match(num).clean("")[0]);
      tinfo.thumbupRate = calcThumbRate(tinfo);
      tinfo.slevel = jqr.find(".sui-students").text();
      tinfo.expire = Date.now();
    }

    tinfo.favoritesCount = Number(jqr.find(".clear-search").text().match(num).clean("")[0]);
    tinfo.isfavorite = jqr.find(".go-search.cancel-collection").length > 0;
    tinfo.name = jqr.find(".t-name").text().trim(); //无法获取type
    //tinfo.type = $('.s-t-top-list .li-active').text().trim();

    var agesstr = jqr.find(".teacher-name-tit > .age.age-line").text().match(num).clean("");
    tinfo.tage = Number(agesstr[1]);
    tinfo.age = Number(agesstr[0]);
    tinfo.effectivetime = getBatchNumber();
    tinfo.indicator = calcIndicator(tinfo);
    GM_setValue(getinfokey(), tinfo);
    jqr.find(".teacher-name-tit").prop("innerHTML", function (i, val) {
      return "".concat(val, "\n  <span class=\"age age-line\"><label title='\u6307\u6807'>").concat(tinfo.indicator, "</label></span>\n  <span class=\"age age-line\"><label title='\u597D\u8BC4\u7387'>").concat(tinfo.thumbupRate, "%</label></span>\n  <span class=\"age age-line\"><label title='\u88AB\u8D5E\u6570\u91CF'>").concat(tinfo.thumbup, "</label></span>\n  <span class=\"age age-line\"><label title='\u88AB\u8E29\u6570\u91CF'>").concat(tinfo.thumbdown, "</label></span>\n  <span class=\"age age-line\"><label title='\u8BC4\u8BBA\u6807\u7B7E\u6570\u91CF'>").concat(tinfo.label, "</label></span>\n    <span class=\"age age-line\"><label title='\u5728\u540C\u7C7B\u522B\u6559\u5E08\u4E2D\u7684\u6392\u540D'><span id=\"teacherRank\"></span></label></span>\n  ");
    });
  };

  common_submit(function (next) {
    processTeacherDetailPage($(document));
    next();
  });
}
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__(379);
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js??clonedRuleSet-7[0].rules[0].use[1]!./src/findteacherson51talk/findingteacher.user.css
var findingteacher_user = __webpack_require__(228);
;// CONCATENATED MODULE: ./src/findteacherson51talk/findingteacher.user.css

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = injectStylesIntoStyleTag_default()(findingteacher_user/* default */.Z, options);



/* harmony default export */ const findteacherson51talk_findingteacher_user = (findingteacher_user/* default.locals */.Z.locals || {});
;// CONCATENATED MODULE: ./src/findteacherson51talk/findingteacher.user.es6
// ==UserScript==
// @name BestTeacher
// @version 2021.4.15001
// @namespace https://github.com/niubilityfrontend
// @description 辅助选老师-排序显示，经验值计算|好评率|显示年龄|列表显示所有教师
// @author jimbo
// @license OSL-3.0
// @supportURL https://github.com/niubilityfrontend/hunttingteacheron51talk
// @match *://www.51talk.com/ReserveNew/index*
// @match *://www.51talk.com/TeacherNew/*
// @match *://www.51talk.com/user/*
// @grant GM_xmlhttpRequest
// @grant GM_getValue
// @grant GM_setValue
// @grant GM_listValues
// @grant GM_deleteValue
// @grant GM_registerMenuCommand
// @grant GM_getResourceText
// @grant GM_addStyle
// @require https://code.jquery.com/jquery-3.6.0.min.js
// @require https://raw.githubusercontent.com/niubilityfrontend/jquery.ui/1.12.1/jquery-ui.min.js
// @rescource jquicss https://raw.githubusercontent.com/niubilityfrontend/jquery.ui/1.12.1/jquery-ui.min.css
// @require https://raw.githubusercontent.com/niubilityfrontend/pace/v1.2.4/pace.min.js
// @resource pacecss https://raw.githubusercontent.com/niubilityfrontend/pace/v1.2.4/themes/red/pace-theme-big-counter.css
// @require https://greasyfork.org/scripts/388372-scrollfix/code/scrollfix.js?version=726657
// @require https://raw.githubusercontent.com/niubilityfrontend/userscripts/master/libs/gm_config.js
// @require https://raw.githubusercontent.com/free-jqgrid/jqGrid/v4.15.5/dist/i18n/grid.locale-cn.js
// @require https://raw.githubusercontent.com/free-jqgrid/jqGrid/v4.15.5/dist/jquery.jqgrid.min.js
// @resource jqgridcss https://raw.githubusercontent.com/niubilityfrontend/jqGrid/v4.15.5/css/ui.jqgrid.min.css
// ==/UserScript==
GM_addStyle(GM_getResourceText('jquicss'));
GM_addStyle(GM_getResourceText('pacecss'));
GM_addStyle(GM_getResourceText('jqgridcss')); // GM_addStyle(GM_getResourceText('pacecss'))






 // import './../../libs/jquery-ui-1.12.1/jquery-ui.css';
// import './../../libs/jqGrid-4.15.5/dist/css/ui.jqgrid.css';



(function () {
  'use strict';

  if (settings.isListPage || settings.isDetailPage) {
    var getRankHtml = function getRankHtml(t) {
      if (t) {
        var colorif = '';

        if (t.rank <= conf.markRankRed) {
          colorif = "style = 'color:red'";
        }

        return "<label title='\u5728\u540C\u7C7B\u522B\u6559\u5E08\u4E2D\u7684\u6392\u540D' ".concat(colorif, "> ").concat(t.rank, "\u540D</label>");
      }
    }; //弹出信息框


    //构建插件信息
    common_submit(function (next) {
      try {
        var getCatchedTeachers = function getCatchedTeachers() {
          var teachers = [];
          $.each(GM_listValues(), function (i, item) {
            if (item.startsWith('tinfo-')) {
              var t = GM_getValue(item);
              t.tid = item.slice(6, item.length);
              teachers.push(t);
            }
          });
          var indexs = {};
          teachers = teachers.sort(function (t1, t2) {
            if (t1.indicator == t2.indicator) return t1.favoritesCount > t2.favoritesCount ? -1 : 1;
            return t1.indicator > t2.indicator ? -1 : 1;
          }).map(function (val, idx) {
            if (isNaN(indexs[val.type])) {
              indexs[val.type] = 1;
            } else {
              indexs[val.type] += 1;
            }

            var t = $.extend(val, {
              // 'slevel': slevel,
              tage: Number(val.tage),
              thumbup: Number(val.thumbup),
              thumbdown: Number(val.thumbdown),
              thumbupRate: Number(val.thumbupRate),
              indicator: Number(val.indicator),
              //'favoritesCount': val.favoritesCount,
              //'isfavorite': val.isfavorite,
              //'expire': Date.now(),
              rank: indexs[val.type]
            }); //GM_setValue("tinfo-"+t.tid,t);

            return t;
          });
          return teachers;
        };

        var _config = GM_getValue('filterconfig', {
          l1: 300,
          l2: maxlabel,
          rate1: 97,
          rate2: maxrate,
          age1: minage,
          age2: maxage
        }),
            buttons = '';

        if (settings.isListPage) {
          buttons = "\n            <div id='buttons' style='text-align: center'>\n            <button id='asc' title='\u5F53\u524D\u4E3A\u964D\u5E8F\uFF0C\u70B9\u51FB\u540E\u6309\u5347\u5E8F\u6392\u5217'>\u5347\u5E8F</button>\n            <button id='desc' title='\u5F53\u524D\u4E3A\u5347\u5E8F\uFF0C\u70B9\u51FB\u8FDB\u884C\u964D\u5E8F\u6392\u5217' style='display:none;'>\u964D\u5E8F</button>&nbsp;\n            <input id='tinfoexprhours' title='\u7F13\u5B58\u8FC7\u671F\u65F6\u95F4\uFF08\u5C0F\u65F6\uFF09'>&nbsp;\n            <button title='\u6E05\u7A7A\u7F13\u5B58\uFF0C\u5E76\u91CD\u65B0\u641C\u7D22'>\u6E05\u9664\u7F13\u5B58</button>&nbsp;\n            <a>\u62A5\u544ABUG</a>&nbsp;\n            <a>\u5E2E\u52A9</a>&nbsp;\n          </div>\n          <div id='buttons1' style='text-align: center;'>\n            <div id='timesmutipulecheck'></div>\n            <button>\u53CD\u9009\u65F6\u95F4\u6BB5</button>&nbsp;\n            <button id='autogettodaysteachers' title='\u81EA\u52A8\u83B7\u53D6\u4E0A\u8FF0\u9009\u62E9\u65F6\u6BB5\u7684\u5168\u90E8\u6559\u5E08\u5E76\u7F13\u5B58'>\u83B7\u53D6\u9009\u5B9A\u65F6\u6BB5\u8001\u5E08</button>&nbsp;\n          </div>";
        }

        $('body').append("<div id='filterdialog' title='Teacher Filter'>\n      <div id='tabs'>\n        <div>\n          <ul>\n            <li><a href=\"#tabs-1\">Search Teachers</a></li>\n            <li><a href=\"#tabs-2\">Sorted Teachers</a></li>\n          </ul>\n          <br />\n            ".concat(buttons, "\n        </div>\n        <div id=\"tabs-1\">\n          \u5F53\u524D\u53EF\u9009<span id='tcount' ></span>\u4F4D,\u88AB\u6298\u53E0<span id='thidecount' ></span>\u4F4D\u3002<br />\n          \u6709\u6548\u7ECF\u9A8C\u503C <span id='_tLabelCount' ></span><br /><div id='tlabelslider'></div>\n          \u6536\u85CF\u6570 <span id='_tfc' ></span><br /><div id='fcSlider'></div>\n          \u597D\u8BC4\u7387 <span id='_thumbupRate'></span><br /><div id='thumbupRateslider'></div>\n          \u5E74\u9F84 <span id='_tAge' ></span><br /><div id='tAgeSlider'></div>\n        </div>\n        <div id=\"tabs-2\">\n          <table id=\"teachertab\"></table>\n          <div id=\"pager5\"></div>\n        </div>\n      </div>\n    </div>"));
        $('body').append("<div id='teachlistdialog' style='display:none;'></div>");
        $('body').append("<div id='wwwww'>已加载选课辅助插件。</div>"); //这是一个奇怪的BUG on jqueryui. 如果不多额外添加一个，则dialog无法弹出。

        $('#tlabelslider').slider({
          range: true,
          min: minlabel - 1,
          max: maxlabel,
          values: [_config.l1 < minlabel - 1 ? minlabel - 1 : _config.l1, maxlabel],
          slide: function slide(event, ui) {
            $('#_tLabelCount').html(ui.values[0] + ' - ' + ui.values[1]);
          }
        }).on('slidestop', function (event, ui) {
          var l1 = $('#tlabelslider').slider('values', 0),
              l2 = $('#tlabelslider').slider('values', 1),
              uifilters = getUiFilters(),
              filterconfig = GM_getValue('filterconfig', uifilters);
          filterconfig.l1 = l1;
          filterconfig.l2 = l2;
          GM_setValue('filterconfig', filterconfig);
          executeFilters(uifilters);
        });
        $('#fcSlider').slider({
          range: true,
          min: minfc,
          max: maxfc,
          values: [_config.fc1 < minfc ? minfc : _config.fc1, maxfc],
          slide: function slide(event, ui) {
            $('#_tfc').html(ui.values[0] + ' - ' + ui.values[1]);
          }
        }).on('slidestop', function (event, ui) {
          var fc1 = $('#fcSlider').slider('values', 0),
              fc2 = $('#fcSlider').slider('values', 1),
              uifilters = getUiFilters(),
              filterconfig = GM_getValue('filterconfig', uifilters);
          filterconfig.fc1 = fc1;
          filterconfig.fc2 = fc2;
          GM_setValue('filterconfig', filterconfig);
          executeFilters(uifilters);
        });
        $('#thumbupRateslider').slider({
          range: true,
          min: minrate,
          max: maxrate,
          values: [_config.rate1 < minrate ? minrate : _config.rate1, maxrate],
          slide: function slide(_event, ui) {
            $('#_thumbupRate').html(ui.values[0] + '% - ' + ui.values[1] + '%');
          }
        }).on('slidestop', function (event, ui) {
          var rate1 = $('#thumbupRateslider').slider('values', 0),
              rate2 = $('#thumbupRateslider').slider('values', 1),
              uifilters = getUiFilters(),
              filterconfig = GM_getValue('filterconfig', uifilters);
          filterconfig.rate1 = rate1;
          filterconfig.rate2 = rate2;
          GM_setValue('filterconfig', filterconfig);
          executeFilters(uifilters);
        });
        $('#tAgeSlider').slider({
          range: true,
          min: minage,
          max: maxage,
          values: [_config.age1 < minage ? minage : _config.age1, _config.age2 > maxage ? maxage : _config.age2],
          slide: function slide(event, ui) {
            $('#_tAge').html(ui.values[0] + ' - ' + ui.values[1]);
          }
        }).on('slidestop', function (event, ui) {
          var age1 = $('#tAgeSlider').slider('values', 0),
              age2 = $('#tAgeSlider').slider('values', 1),
              uifilters = getUiFilters(),
              filterconfig = GM_getValue('filterconfig', uifilters);
          filterconfig.age1 = age1;
          filterconfig.age2 = age2;
          console.log("log2 ".concat(age1, "  ").concat(age2));
          GM_setValue('filterconfig', filterconfig);
          executeFilters(uifilters);
        });
        $('#buttons>button,#buttons>input,#buttons>a') //升序
        .eq(0).button({
          icon: 'ui-icon-arrowthick-1-n',
          showLabel: true
        }).click(function () {
          $('#desc').show();
          $(this).hide();
          sortByIndicator(asc);
        }).end() //降序
        .eq(1).button({
          icon: 'ui-icon-arrowthick-1-s',
          showLabel: true
        }).click(function () {
          $('#asc').show();
          $(this).hide();
          sortByIndicator(desc);
        }).end() // 缓存过期时间（小时）
        .eq(2).spinner({
          min: 0,
          spin: function spin(event, ui) {
            GM_setValue('tinfoexprhours', ui.value);
          }
        }).css({
          width: '45px'
        }).val(GM_getValue('tinfoexprhours', configExprMilliseconds / 36e5)).end() //清空缓存
        .eq(3).button({
          icon: 'uiicon-trash',
          showLabel: true
        }).click(function () {
          var keys = GM_listValues();
          $.each(keys, function (i, item) {
            var title = "\u6B63\u5728\u5220\u9664\u7B2C".concat(i, "\u4E2A\u6559\u5E08\u7F13\u5B58");
            common_submit(function (next) {
              try {
                $('title').html(title);
                GM_deleteValue(item);
              } finally {
                next();
              }
            });
          });
          $('.go-search').click();
        }).end() //submit suggestion
        .eq(4).button({
          icon: 'ui-icon-comment',
          showLabel: true
        }).prop('href', 'https://github.com/niubilityfrontend/userscripts/issues/new?assignees=&labels=&template=feature_request.md&title=').prop('target', '_blank').end() //系统帮助
        .eq(5).button({
          icon: 'ui-icon-help',
          showLabel: true
        }).prop('href', 'https://github.com/niubilityfrontend/userscripts/tree/master/hunttingteacheron51talk').prop('target', '_blank').end();
        $('#buttons1>button') //反选时间段
        .eq(0).button({
          icon: 'ui-icon-seek-next',
          showLabel: true
        }).click(function () {
          $('#timesmutipulecheck>input').each(function (i, item) {
            $(item).prop('checked', !$(item).is(':checked')).change();
          });
        }).end() // 获取选定时段老师
        .eq(1).button({
          icon: 'ui-icon-seek-next',
          showLabel: true
        }).click(function () {
          var selectedTimeSlots = [];
          $('#timesmutipulecheck>input').each(function (i, item) {
            if ($(item).is(':checked')) {
              selectedTimeSlots.push($(item).val());
            }
          });
          sessionStorage.setItem('selectedTimeSlots', JSON.stringify(selectedTimeSlots));
          sessionStorage.setItem('selectedTimeSlotsTotal', selectedTimeSlots.length);
          isStopShowboxAndAutoGetNextTimeTeachers();
        }).end(); //初始化时间选择按钮

        $('div.condition-type:eq(0)>ul.condition-type-time>li').each(function (i, item) {
          addCheckbox($(item).attr('data-val'), $(item).text());
        });
        var timesstr = sessionStorage.getItem('selectedTimeSlots'),
            selectedTimeSlots = [];

        if (timesstr) {
          selectedTimeSlots = JSON.parse(timesstr);

          if (selectedTimeSlots.length > 0) {
            var i = selectedTimeSlots.length;

            while (i--) {
              $("#timesmutipulecheck>input[value='" + selectedTimeSlots[i] + "']").attr('checked', true);
            }
          } else {
            $("#timesmutipulecheck>input[value='" + $("input[name='selectTime']").val() + "']").attr('checked', true);
          }
        } else {
          $("#timesmutipulecheck>input[value='" + $("input[name='selectTime']").val() + "']").attr('checked', true);
        }

        $('#timesmutipulecheck').find('input').checkboxradio({
          icon: false
        });
        $('#tabs').tabs({
          active: '#tabs-2',
          activate: function activate(event, ui) {
            if (ui.newPanel.attr('id') != 'tabs-2') return;
            var teachers = getCatchedTeachers();
            $('#teachertab') //searchoptions:{sopt:['eq','ne','le','lt','gt','ge','bw','bn','cn','nc','ew','en']}
            .jqGrid({
              data: teachers,
              datatype: 'local',
              height: 240,
              colNames: ['查', '类型', '排名', 'Name', '爱', '分', '标', '率%', '收藏数', '学', '教龄', '好', '差', '龄', '更新'],
              colModel: [//
              {
                name: 'effectivetime',
                index: 'effectivetime',
                width: 45,
                sorttype: 'float',
                align: 'right',
                searchoptions: {
                  sopt: ['cn']
                },
                formatter: function formatter(value, options, rData) {
                  var date = new Date(Number(value));

                  if (date instanceof Date && !isNaN(date.valueOf())) {
                    return date.toString('MMddHHmm');
                  }

                  return value;
                }
              }, //
              {
                name: 'type',
                index: 'type',
                width: 55,
                sorttype: 'string',
                align: 'left',
                searchoptions: {
                  sopt: ['cn'],
                  defaultValue: $('.s-t-top-list .li-active').text() == '收藏外教' ? '' : $('.s-t-top-list .li-active').text()
                },
                formatter: function formatter(value, options, rData) {
                  if (value) return value;else return 'na';
                }
              }, //
              {
                name: 'rank',
                index: 'rank',
                width: 40,
                sorttype: 'float',
                align: 'right',
                searchoptions: {
                  sopt: ['le']
                }
              }, //
              {
                name: 'name',
                index: 'name',
                width: 125,
                sorttype: 'string',
                formatter: function formatter(value, options, rData) {
                  return "<a href='http://www.51talk.com/TeacherNew/info/" + rData['tid'] + "' target='_blank' style='color:blue'>" + (!!value ? value : rData['tid']) + '</a>';
                }
              }, //
              {
                name: 'isfavorite',
                index: 'isfavorite',
                width: 39,
                sorttype: 'string',
                align: 'left',
                searchoptions: {
                  sopt: ['cn']
                },
                formatter: function formatter(value, options, rData) {
                  if (value) return '收藏';else return '';
                }
              }, //
              {
                name: 'indicator',
                index: 'indicator',
                width: 50,
                sorttype: 'float',
                align: 'right',
                searchoptions: {
                  sopt: ['ge']
                }
              }, //
              {
                name: 'label',
                index: 'label',
                width: 45,
                align: 'right',
                searchoptions: {
                  sopt: ['ge']
                }
              }, //
              {
                name: 'thumbupRate',
                index: 'thumbupRate',
                width: 35,
                align: 'right',
                sorttype: 'float',
                searchoptions: {
                  sopt: ['ge']
                }
              }, //
              {
                name: 'favoritesCount',
                index: 'favoritesCount',
                width: 35,
                align: 'right',
                sorttype: 'float',
                searchoptions: {
                  sopt: ['ge']
                }
              }, //
              {
                name: 'slevel',
                index: 'slevel',
                width: 85,
                sorttype: 'string',
                align: 'left',
                searchoptions: {
                  sopt: ['cn', 'nc']
                }
              }, //
              {
                name: 'tage',
                index: 'tage',
                width: 25,
                sorttype: 'float',
                align: 'right',
                searchoptions: {
                  sopt: ['ge']
                }
              }, //
              {
                name: 'thumbup',
                index: 'thumbup',
                width: 45,
                align: 'right',
                sorttype: 'float',
                searchoptions: {
                  sopt: ['ge']
                }
              }, //
              {
                name: 'thumbdown',
                index: 'thumbdown',
                width: 30,
                sorttype: 'float',
                align: 'right'
              }, //
              {
                name: 'age',
                index: 'age',
                width: 30,
                sorttype: 'float',
                align: 'right',
                searchoptions: {
                  sopt: ['le', 'ge', 'eq']
                }
              }, //
              {
                name: 'expire',
                index: 'expire',
                width: 35,
                sorttype: 'Date',
                align: 'right',
                searchoptions: {
                  sopt: ['cn']
                },
                formatter: function formatter(value, options, rData) {
                  if (value) {
                    var d = Date.now() - value;

                    if (d < 1e3 * 60) {
                      return '刚刚';
                    } else if (d < 1e3 * 60 * 60) {
                      return (d / 6e4).toFixed(0) + '分';
                    } else if (d < 1e3 * 60 * 60 * 24) {
                      return (d / 36e5).toFixed(0) + '时';
                    } else {
                      return (d / 864e5).toFixed(0) + '天';
                    }

                    return d;
                  } else return 'na';
                }
              }],
              multiselect: false,
              rowNum: 10,
              rowList: [5, 10, 20, 30],
              pager: '#pager5',
              sortname: 'effectivetime desc,indicator desc',
              viewrecords: true,
              multiSort: true,
              sortorder: 'desc',
              grouping: false,
              shrinkToFit: false,
              responsive: true,
              del: true //refresh: true,
              //autowidth: true,
              //width: 732
              //caption: "",,

            }).jqGrid('filterToolbar', {
              searchOperators: true
            })[0].triggerToolbar();

            if (settings.isListPage) {
              $.each($('.item'), function (i, item) {
                var jqel = $(item),
                    tid = jqel.find('.teacher-details-link a').attr('href').replace('https://www.51talk.com/TeacherNew/info/', '').replace('http://www.51talk.com/TeacherNew/info/', ''),
                    t = teachers.find(function (currentValue, index, arr) {
                  return currentValue.tid == tid;
                }),
                    lb = jqel.find('.teacher-name>label:eq(3)');
                if (lb.length == 0) jqel.find('.teacher-name').html("".concat(jqel.find('.teacher-name').html(), "| ").concat(getRankHtml(t)));else lb.replaceWith(getRankHtml(t));
              });
            }

            if (settings.isDetailPage) {
              var t = teachers.find(function (currentValue, index, arr) {
                return currentValue.tid == gettid();
              });
              $('#teacherRank').html(getRankHtml(t));
            }
          }
        });
        var uifilters = getUiFilters();
        executeFilters(uifilters);
        $('#_tAge').html(uifilters.age1 + ' - ' + uifilters.age2);
        $('#_tLabelCount').html(uifilters.l1 + ' - ' + uifilters.l2);
        $('#_tfc').html(uifilters.fc1 + ' - ' + uifilters.fc2 + '');
        $('#_thumbupRate').html(uifilters.rate1 + '% - ' + uifilters.rate2 + '%');
      } catch (ex) {
        console.log(ex + '');
        throw ex;
      } finally {
        next();
      }
    });
    common_submit(function (next) {
      $('.s-t-list').before($('.s-t-page').prop('outerHTML'));
      $('#tabs>div:first').append($('.s-t-page').prop('outerHTML'));
      sortByIndicator(desc);
      $('#tabs').tabs('option', 'active', 1);

      if (settings.isDetailPage) {
        $('#tabs').tabs('option', 'disabled', [0]);
      }

      $('#filterdialog').dialog({
        width: '850'
      });
      $('#filterdialog').parent().scrollFix();
      $('#filterdialog').dialog('open');
      next();
    });
  }

  if (settings.isCoursePage) {
    common_submit(function (next) {
      $('.course_lock').removeClass('course_lock').addClass('course_unlock');
      $('img.course_mask').removeClass('course_mask').attr('src', '');
      next();
    });
  }

  (function (x) {
    return x;
  });
})();
})();

/******/ })()
;