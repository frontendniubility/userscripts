// ==UserScript==
// @name        Find Best Teacher(Jquery)
// @version     2021.10.5261046
// @author      jimbo
// @description 谁是最好的老师？-排序显示，经验值计算|自定义经验值公式|好评率|显示年龄|列表显示所有教师
// @homepage    https://github.com/niubilityfrontend/userscripts#readme
// @supportURL  https://github.com/niubilityfrontend/findteacherson51talk
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
// @require     https://raw.githubusercontent.com/niubilityfrontend/jquery.ui/1.12.1/jquery-ui.min.js
// @require     https://raw.githubusercontent.com/niubilityfrontend/pace/v1.2.4/pace.min.js
// @require     https://raw.githubusercontent.com/niubilityfrontend/jquery-scrollfix/master/src/scrollfix.js
// @require     https://raw.githubusercontent.com/free-jqgrid/jqGrid/v4.15.5/dist/i18n/grid.locale-cn.js
// @require     https://raw.githubusercontent.com/free-jqgrid/jqGrid/v4.15.5/dist/jquery.jqgrid.min.js
// @downloadURL https://raw.githubusercontent.com/niubilityfrontend/userscripts/master/dist/607.a67736db482554581266.hot-update.user.js
// @updateURL   https://raw.githubusercontent.com/niubilityfrontend/userscripts/master/dist/607.a67736db482554581266.hot-update.meta.js
// ==/UserScript==

"use strict";

self["webpackHotUpdateuserscripts"](607, {
    6976: (__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {
        var dayjs_min = __webpack_require__(7484);
        var dayjs_min_default = __webpack_require__.n(dayjs_min);
        var zh_cn = __webpack_require__(3852);
        var zh_cn_default = __webpack_require__.n(zh_cn);
        var relativeTime = __webpack_require__(4110);
        var relativeTime_default = __webpack_require__.n(relativeTime);
        function _slicedToArray(arr, i) {
            return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
        }
        function _nonIterableRest() {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }
        function _unsupportedIterableToArray(o, minLen) {
            if (!o) return;
            if (typeof o === "string") return _arrayLikeToArray(o, minLen);
            var n = Object.prototype.toString.call(o).slice(8, -1);
            if (n === "Object" && o.constructor) n = o.constructor.name;
            if (n === "Map" || n === "Set") return Array.from(o);
            if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
        }
        function _arrayLikeToArray(arr, len) {
            if (len == null || len > arr.length) len = arr.length;
            for (var i = 0, arr2 = new Array(len); i < len; i++) {
                arr2[i] = arr[i];
            }
            return arr2;
        }
        function _iterableToArrayLimit(arr, i) {
            var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];
            if (_i == null) return;
            var _arr = [], _n = true, _d = false, _s, _e;
            try {
                for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
                    _arr.push(_s.value);
                    if (i && _arr.length === i) break;
                }
            } catch (err) {
                _d = true;
                _e = err;
            } finally {
                try {
                    if (!_n && _i["return"] != null) _i["return"]();
                } finally {
                    if (_d) throw _e;
                }
            }
            return _arr;
        }
        function _arrayWithHoles(arr) {
            if (Array.isArray(arr)) return arr;
        }
        var GM_config = function GM_config(settings) {
            var storage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "cfg", ret = null, prefix = "gm-config", addStyle = function addStyle() {
                var css = "\n\t\t\t\t.".concat(prefix, " {\n\t\t\t\t\tdisplay: grid;\n\t\t\t\t\talign-items: center;\n\t\t\t\t\tgrid-row-gap: 5px;\n\t\t\t\t\tgrid-column-gap: 10px;\n\t\t\t\t\tbackground-color: white;\n\t\t\t\t\tborder: 1px solid black;\n\t\t\t\t\tpadding: 5px;\n\t\t\t\t\tposition: fixed;\n\t\t\t\t\ttop: 0;\n\t\t\t\t\tright: 0;\n\t\t\t\t\tz-index: 2147483647;\n\t\t\t\t}\n\n\t\t\t\t.").concat(prefix, " label {\n\t\t\t\t\tgrid-column: 1 / 2;\n\t\t\t\t\tcolor: black;\n\t\t\t\t\ttext-align: right;\n\t\t\t\t\tfont-size: small;\n\t\t\t\t\tfont-weight: bold;\n\t\t\t\t}\n\n\t\t\t\t.").concat(prefix, " input,\n\t\t\t\t.").concat(prefix, " textarea,\n\t\t\t\t.").concat(prefix, " select {\n\t\t\t\t\tgrid-column: 2 / 4;\n\t\t\t\t}\n\n\t\t\t\t.").concat(prefix, " .").concat(prefix, "-save {\n\t\t\t\t\tgrid-column: 2 / 3;\n\t\t\t\t}\n\n\t\t\t\t.").concat(prefix, " .").concat(prefix, "-cancel {\n\t\t\t\t\tgrid-column: 3 / 4;\n\t\t\t\t}\n\t\t\t");
                if (typeof GM_addStyle === "undefined") {
                    var style = document.createElement("style");
                    style.textContent = css;
                    document.head.appendChild(style);
                } else {
                    GM_addStyle(css);
                }
            }, load = function load() {
                var defaults = {};
                settings.forEach((function(_ref) {
                    var key = _ref.key, def = _ref["default"];
                    return defaults[key] = def;
                }));
                var cfg = typeof GM_getValue !== "undefined" ? GM_getValue(storage) : localStorage.getItem(storage);
                if (!cfg) return defaults;
                cfg = JSON.parse(cfg);
                Object.entries(defaults).forEach((function(_ref2) {
                    var _ref3 = _slicedToArray(_ref2, 2), key = _ref3[0], value = _ref3[1];
                    if (typeof cfg[key] === "undefined") {
                        cfg[key] = value;
                    }
                }));
                return cfg;
            }, save = function save(cfg) {
                var data = JSON.stringify(cfg);
                typeof GM_setValue !== "undefined" ? GM_setValue(storage, data) : localStorage.setItem(storage, data);
            }, setup = function setup() {
                var createContainer = function createContainer() {
                    var form = document.createElement("form");
                    form.classList.add(prefix);
                    return form;
                }, createTextbox = function createTextbox(name, value, placeholder, maxLength, multiline, resize) {
                    var input = document.createElement(multiline ? "textarea" : "input");
                    if (multiline) {
                        input.style.resize = resize ? "vertical" : "none";
                    } else {
                        input.type = "text";
                    }
                    input.name = name;
                    if (typeof value !== "undefined") input.value = value;
                    if (placeholder) input.placeholder = placeholder;
                    if (maxLength) input.maxLength = maxLength;
                    return input;
                }, createNumber = function createNumber(name, value, placeholder, min, max, step) {
                    var input = createTextbox(name, value, placeholder);
                    input.type = "number";
                    if (typeof min !== "undefined") input.min = min;
                    if (typeof max !== "undefined") input.max = max;
                    if (typeof step !== "undefined") input.step = step;
                    return input;
                }, createSelect = function createSelect(name, options, value, showBlank) {
                    var select = document.createElement("select");
                    select.name = name;
                    var createOption = function createOption(val) {
                        var _val$value = val.value, value = _val$value === void 0 ? val : _val$value, _val$text = val.text, text = _val$text === void 0 ? val : _val$text, option = document.createElement("option");
                        option.value = value;
                        option.textContent = text;
                        return option;
                    };
                    if (showBlank) {
                        select.appendChild(createOption(""));
                    }
                    options.forEach((function(opt) {
                        if (typeof opt.optgroup !== "undefined") {
                            var optgroup = document.createElement("optgroup");
                            optgroup.label = opt.optgroup;
                            select.appendChild(optgroup);
                            opt.values.forEach((function(value) {
                                return optgroup.appendChild(createOption(value));
                            }));
                        } else {
                            select.appendChild(createOption(opt));
                        }
                    }));
                    select.value = value;
                    return select;
                }, createCheckbox = function createCheckbox(name, checked) {
                    var checkbox = document.createElement("input");
                    checkbox.id = "".concat(prefix, "-").concat(name);
                    checkbox.type = "checkbox";
                    checkbox.name = name;
                    checkbox.checked = checked;
                    return checkbox;
                }, createButton = function createButton(text, onclick, classname) {
                    var button = document.createElement("button");
                    button.classList.add("".concat(prefix, "-").concat(classname));
                    button.textContent = text;
                    button.onclick = onclick;
                    return button;
                }, createLabel = function createLabel(label, htmlFor) {
                    var lbl = document.createElement("label");
                    if (htmlFor) lbl.htmlFor = htmlFor;
                    lbl.textContent = label;
                    return lbl;
                }, init = function init(cfg) {
                    var controls = {}, div = createContainer();
                    settings.filter((function(_ref4) {
                        var type = _ref4.type;
                        return type !== "hidden";
                    })).forEach((function(setting) {
                        var value = cfg[setting.key], control;
                        if (setting.type === "text") {
                            control = createTextbox(setting.key, value, setting.placeholder, setting.maxLength, setting.multiline, setting.resizable);
                        } else if (setting.type === "number") {
                            control = createNumber(setting.key, value, setting.placeholder, setting.min, setting.max, setting.step);
                        } else if (setting.type === "dropdown") {
                            control = createSelect(setting.key, setting.values, value, setting.showBlank);
                        } else if (setting.type === "bool") {
                            control = createCheckbox(setting.key, value);
                        }
                        div.appendChild(createLabel(setting.label, control.id));
                        div.appendChild(control);
                        controls[setting.key] = control;
                        control.addEventListener(setting.type === "dropdown" ? "change" : "input", (function() {
                            if (ret.onchange) {
                                var control = controls[setting.key], _value = setting.type === "bool" ? control.checked : control.value;
                                ret.onchange(setting.key, _value);
                            }
                        }));
                    }));
                    div.appendChild(createButton("Save", (function() {
                        settings.filter((function(_ref5) {
                            var type = _ref5.type;
                            return type !== "hidden";
                        })).forEach((function(_ref6) {
                            var key = _ref6.key, type = _ref6.type, control = controls[key];
                            cfg[key] = type === "bool" ? control.checked : control.value;
                        }));
                        save(cfg);
                        if (ret.onsave) {
                            ret.onsave(cfg);
                        }
                        div.remove();
                    }), "save"));
                    div.appendChild(createButton("Cancel", (function() {
                        if (ret.oncancel) {
                            ret.oncancel(cfg);
                        }
                        div.remove();
                    }), "cancel"));
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
        var config = GM_config([ {
            key: "pageMaxCount",
            label: "最大页数 (自动获取时)",
            default: 20,
            type: "dropdown",
            values: [ 0, 5, 10, 20, 50, 1e3 ]
        }, {
            key: "newBatcherKeyMinutes",
            label: "排名缓存（分钟）,0为每次更新",
            default: 24,
            type: "dropdown",
            values: [ 0, 1, 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 179, 181, 191, 193, 197, 199 ]
        }, {
            key: "tInfoExprHours",
            label: "教师数据缓存过期时间（小时）",
            default: 139,
            type: "dropdown",
            values: [ 0, 1, 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 179, 181, 191, 193, 197, 199 ]
        }, {
            key: "markRankRed",
            label: "突出前N名教师的名次",
            default: 100,
            type: "dropdown",
            values: [ 5, 10, 30, 50, 120, 500, 3e3, 5e3, 10080 ]
        }, {
            key: "calcIndicator",
            label: "[高级]排名公式",
            default: "",
            type: "text",
            placeholder: "Math.ceil((t.label * t.thumbupRate) / 100) + t.favoritesCount",
            multiline: true,
            resizable: true
        }, {
            key: "version",
            type: "hidden",
            default: 1
        } ]), conf = config.load();
        GM_registerMenuCommand("设置", config.setup);
        function GetCalculatorIndicator() {
            var f;
            if (conf.calcIndicator) {
                try {
                    f = new Function("t", "return ".concat(conf.calcIndicator));
                } catch (error) {
                    f = new Function("t", "return Math.ceil((t.label * t.thumbpRate) / 100) + t.favoritesCount");
                    console.log(error);
                    alert("计算公式错误，排名计算方式使用默认公式。Error:".concat(error));
                }
            } else {
                f = new Function("t", "return Math.ceil((t.label * t.thumbupRate) / 100) + t.favoritesCount");
            }
            return f;
        }
        var indicatorCalculator = GetCalculatorIndicator();
        var currentURL = window.location.href.toLocaleLowerCase();
        var settings = {
            isCoursePage: currentURL.includes("study_center"),
            isDetailPage: currentURL.includes("teachernew"),
            isListPage: currentURL.includes("reservenew"),
            pageMaxCount: conf.pageMaxCount,
            tid: currentURL.match(/(t\d+)/g) ? currentURL.match(/(t\d+)/g)[0] : null,
            url: currentURL
        };
        var configExprMilliseconds = 36e5 * conf.tInfoExprHours;
        var num = /[0-9]*/g;
        function getTId(url) {
            if (!url) return settings.tid;
            return url.match(/(t\d+)/g)[0];
        }
        function getSession(key, funcDefaultValue) {
            var v = sessionStorage.getItem(key);
            if (v !== null) {
                return JSON.parse(v);
            } else {
                var data = typeof funcDefaultValue == "function" ? funcDefaultValue(key) : funcDefaultValue;
                sessionStorage.setItem(key, JSON.stringify(data));
                return data;
            }
        }
        function setSession(key, funcValue) {
            if (funcValue === null) {
                sessionStorage.removeItem(key);
            } else {
                var data = typeof funcValue == "function" ? funcValue(key) : funcValue;
                sessionStorage.setItem(key, JSON.stringify(data));
            }
        }
        function getBatchNumber() {
            var cur = Date.now();
            if (conf.newBatcherKeyMinutes <= 0) return cur;
            var saved = parseInt(GM_getValue("_getBatchNumber"));
            if (!saved || Date.now() - saved > conf.newBatcherKeyMinutes * 6e5) {
                GM_setValue("_getBatchNumber", cur);
                return cur;
            }
            return saved;
        }
        function getinfokey() {
            return "tinfo-" + getTId();
        }
        function calcIndicator(tinfo) {
            if (isNaN(tinfo.label)) tinfo.label = 0;
            if (isNaN(tinfo.thumbupRate)) tinfo.thumbupRate = 0;
            if (isNaN(tinfo.favoritesCount)) tinfo.favoritesCount = 0;
            return indicatorCalculator(tinfo);
        }
        function calcThumbRate(tinfo) {
            if (isNaN(tinfo.thumbdown)) tinfo.thumbdown = 0;
            if (isNaN(tinfo.thumbup)) tinfo.thumbup = 0;
            var all = tinfo.thumbdown + tinfo.thumbup;
            if (all < 1) all = 1;
            return ((tinfo.thumbup + Number.EPSILON) / all).toFixed(2) * 100;
        }
        function common_submit(func) {
            var queue = $.queue(document, "fx", func);
            if (queue[0] == "inprogress") {
                return;
            }
            $.dequeue(document);
        }
        function getLabelCount(jqLabelElement) {
            return function() {
                var l = 0;
                $.each(jqLabelElement.text().match(num).clean(""), (function(i, val) {
                    l += Number(val);
                }));
                return l;
            }();
        }
        function getLabelByItems(jqLabelSpanList) {
            return jqLabelSpanList.map((function(i, v) {
                var r = /([\u4e00-\u9fa5]+)\s*\(\s*(\d+)\)/gi.exec(v.innerHTML);
                return {
                    key: r[1],
                    value: r[2]
                };
            })).get().reduce((function(meta, item) {
                if (meta[item.key]) meta[item.key] += Number(item.value);
                meta[item.key] = Number(item.value);
                return meta;
            }), {});
        }
        function getTeacherInfoFromDetailPage(tinfo_saved, jqr) {
            var tinfo_latest = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            jqr.find(".teacher-name-tit").prop("innerHTML", (function(i, val) {
                return val.replaceAll("<!--", "").replaceAll("-->", "");
            }));
            var tinfo = {
                label: getLabelCount(jqr.find(".t-d-label")),
                updateTime: Date.now(),
                labels: getLabelByItems(jqr.find(".t-d-label>span")),
                teacherStar: Number(jqr.find(".s-t-top>.s-t-top-details.f-cb>.s-t-top-left>.teacher-left-right>.teacher-star").text()),
                certificaties: jqr.find(".s-t-top>.s-t-top-details.f-cb>.s-t-top-left>.teacher-left-right>.teacher-icon-tag>span:eq(0)").text(),
                suitables: jqr.find(".s-t-top>.s-t-top-details.f-cb>.s-t-top-left>.teacher-left-right>.suitable>span:not(:first)").map((function(i, v) {
                    return $(v).text();
                })).get().reduce((function(pre, cur) {
                    if (cur) pre.push(cur);
                    return pre;
                }), [])
            };
            if (jqr.find(".evaluate-content-left span").length >= 3) {
                tinfo.thumbup = Number(jqr.find(".evaluate-content-left span:eq(1)").text().match(num).clean("")[0]);
                tinfo.thumbdown = Number(jqr.find(".evaluate-content-left span:eq(2)").text().match(num).clean("")[0]);
                tinfo.thumbupRate = calcThumbRate(tinfo);
                tinfo.thumbupRate = calcThumbRate(tinfo);
                tinfo.indicator = calcIndicator(tinfo);
                tinfo.slevel = jqr.find(".sui-students").text();
            }
            tinfo.favoritesCount = Number(jqr.find(".clear-search").text().match(num).clean("")[0]);
            tinfo.isfavorite = jqr.find(".go-search.cancel-collection").length > 0;
            tinfo.name = jqr.find(".t-name").text().trim();
            var agesstr = jqr.find(".teacher-name-tit > .age.age-line").text().match(num).clean("");
            tinfo.tage = Number(agesstr[1]);
            tinfo.age = Number(agesstr[0]);
            tinfo.batchNumber = getBatchNumber();
            tinfo = $.extend({}, tinfo_saved, tinfo, tinfo_latest);
            jqr.find(".teacher-name-tit").prop("innerHTML", (function(i, val) {
                return "".concat(val, "\n<span class=\"age age-line\"><label title='指标'>").concat(tinfo_saved.indicator, "</label></span>\n<span class=\"age age-line\"><label title='好评率'>").concat(tinfo_saved.thumbupRate, "%</label></span>\n<span class=\"age age-line\"><label title='被赞数量'>").concat(tinfo_saved.thumbup, "</label></span>\n<span class=\"age age-line\"><label title='被踩数量'>").concat(tinfo_saved.thumbdown, "</label></span>\n<span class=\"age age-line\"><label title='评论标签数量'>").concat(tinfo_saved.label, '</label></span>\n<span class="age age-line"><label title=\'在同类别教师中的排名\'><span id="teacherRank"></span></label></span>\n  ');
            }));
            return tinfo;
        }
        function processTeacherDetailPage(jqr) {
            var tinfo_saved = GM_getValue(getinfokey(), {});
            tinfo_saved = getTeacherInfoFromDetailPage(tinfo_saved, jqr, {});
            GM_setValue(getinfokey(), tinfo_saved);
        }
        if (settings.isDetailPage) {
            common_submit((function(next) {
                processTeacherDetailPage($(document));
                next();
            }));
        }
        var findingteacher_user = __webpack_require__(5771);
        const propertiesCaseInsensitive = class {
            has(target, prop) {
                if (typeof prop === "symbol") {
                    return prop in target;
                }
                prop = prop.toLowerCase();
                if (prop in target) return true;
                let keys = Object.keys(target);
                let i = keys.length;
                while (i--) {
                    if (keys[i] && keys[i].toLowerCase() == prop) return true;
                }
                return false;
            }
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
            }
            set(target, prop, value) {
                if (typeof prop === "symbol") {
                    target[prop] = value;
                }
                target[prop.toLowerCase()] = value;
                return true;
            }
        };
        Date.prototype._toString = Date.prototype.toString;
        $.extend(Date.prototype, {
            toString: function toString(format) {
                if (!format) return this._toString();
                return dayjs_min_default()(this).format(format);
            }
        });
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
                return new RegExp(arr.join("|")).test(this);
            },
            replaceAll: function replaceAll(search, replacement) {
                var target = this;
                return target.replace(new RegExp(search, "g"), replacement);
            }
        });
        if (!String.prototype.startsWith) {
            Object.defineProperty(String.prototype, "startsWith", {
                value: function value(search, rawPos) {
                    var pos = rawPos > 0 ? rawPos | 0 : 0;
                    return this.substring(pos, pos + search.length) === search;
                }
            });
        }
        if (!String.prototype.endsWith) {
            String.prototype.endsWith = function(search, this_len) {
                if (this_len === undefined || this_len > this.length) {
                    this_len = this.length;
                }
                return this.substring(this_len - search.length, this_len) === search;
            };
        }
        if (!String.prototype.includes) {
            String.prototype.includes = function(search, start) {
                "use strict";
                if (search instanceof RegExp) {
                    throw TypeError("first argument must not be a RegExp");
                }
                if (start === undefined) {
                    start = 0;
                }
                return this.indexOf(search, start) !== -1;
            };
        }
        $.extend(window, {
            parameters: function parameters(url) {
                var queryString = url ? url.split("?")[1] : window.location.search.slice(1), cachedkey = "urlparameters" + queryString, obj = $(window).data(cachedkey);
                if (obj == undefined) {
                    obj = new Proxy({}, propertiesCaseInsensitive);
                    $(window).data(cachedkey, obj);
                } else return obj;
                if (queryString) {
                    queryString = queryString.split("#")[0];
                    var arr = queryString.split("&");
                    for (var i = 0; i < arr.length; i++) {
                        var a = arr[i].split("="), paramName = a[0], paramValue = typeof a[1] === "undefined" ? true : a[1];
                        if (paramName.match(/\[(\d+)?\]$/)) {
                            var key = paramName.replace(/\[(\d+)?\]/, "");
                            if (!obj[key]) obj[key] = [];
                            if (paramName.match(/\[\d+\]$/)) {
                                var index = /\[(\d+)\]/.exec(paramName)[1];
                                obj[key][index] = paramValue;
                            } else {
                                obj[key].push(paramValue);
                            }
                        } else {
                            if (!obj[paramName]) {
                                obj[paramName] = paramValue;
                            } else if (obj[paramName] && typeof obj[paramName] === "string") {
                                obj[paramName] = [ obj[paramName] ];
                                obj[paramName].push(paramValue);
                            } else {
                                obj[paramName].push(paramValue);
                            }
                        }
                    }
                }
                return obj;
            }
        });
        function _defineProperty(obj, key, value) {
            if (key in obj) {
                Object.defineProperty(obj, key, {
                    value: value,
                    enumerable: true,
                    configurable: true,
                    writable: true
                });
            } else {
                obj[key] = value;
            }
            return obj;
        }
        config.onsave = function(cfg) {
            try {
                new Function("t", "return ".concat(cfg.load().calcIndicator))({});
            } catch (error) {
                console.log(error);
                alert("计算公式错误，排名计算方式使用默认公式。Error:".concat(error));
                return false;
            }
            $("#autogetnextpage").text("自动获取" + getAutoNextPagesCount() + "页");
        };
        var maxrate = 0, minrate = 99999, maxlabel = 0, minlabel = 9999999, maxfc = 0, minfc = 999999, maxage = 0, minage = 99999;
        function getLeftPageCount() {
            var pages = Number($(".s-t-page>.next-page:first").prev().text()), curr = Number($(".s-t-page>.active:first").text());
            if (pages) return pages - curr; else return 0;
        }
        function getAutoNextPagesCount() {
            var pages = getLeftPageCount();
            if (settings.pageMaxCount > pages) return pages; else return settings.pageMaxCount;
        }
        function updateTeacherinfoToUI(jqel, tinfo) {
            if (!isNaN(tinfo.label)) {
                if (tinfo.label > maxlabel) maxlabel = tinfo.label;
                if (tinfo.label < minlabel) minlabel = tinfo.label;
            }
            if (!isNaN(tinfo.favoritesCount)) {
                if (tinfo.favoritesCount > maxfc) maxfc = tinfo.favoritesCount;
                if (tinfo.favoritesCount < minfc) minfc = tinfo.favoritesCount;
            }
            if (!isNaN(tinfo.thumbupRate)) {
                if (tinfo.thumbupRate > maxrate) maxrate = tinfo.thumbupRate;
                if (tinfo.thumbupRate < minrate) minrate = tinfo.thumbupRate;
            }
            if (!isNaN(tinfo.age)) {
                if (tinfo.age > maxage) maxage = tinfo.age;
                if (tinfo.age < minage) minage = tinfo.age;
            }
            jqel.attr("teacherinfo", JSON.stringify(tinfo));
            jqel.find(".teacher-name").html(jqel.find(".teacher-name").html() + "<br /><label title='评论标签数量'>".concat(tinfo.label, "</label>|<label title='好评率'>").concat(tinfo.thumbupRate, "%</label>\n      | <label title='收藏数量'>").concat(tinfo.favoritesCount, " </label> "));
            jqel.attr("indicator", tinfo.indicator);
        }
        function executeFilters(uifilters) {
            var tcount = 0, hidecount = 0;
            $.each($(".item"), (function(i, item) {
                var node = $(item), tinfojson = node.attr("teacherinfo");
                if (!tinfojson) {
                    return true;
                }
                var tinfo = JSON.parse(tinfojson), ret = true;
                if (!isNaN(tinfo.thumbupRate)) ret = tinfo.thumbupRate >= uifilters.rate1 && tinfo.thumbupRate <= uifilters.rate2;
                if (!isNaN(tinfo.label)) ret = tinfo.label >= uifilters.l1 && tinfo.label <= uifilters.l2 && ret;
                if (!isNaN(tinfo.age)) ret = tinfo.age >= uifilters.age1 && tinfo.age <= uifilters.age2 && ret;
                if (!isNaN(tinfo.favoritesCount)) ret = tinfo.favoritesCount >= uifilters.fc1 && tinfo.favoritesCount <= uifilters.fc2 && ret;
                if (ret) {
                    if (node.is(":hidden")) {
                        node.show();
                        node.animate({
                            left: "+=50"
                        }, 3500).animate({
                            left: "-=50"
                        }, 3500);
                    } else {}
                    tcount++;
                } else {
                    node.css("color", "white").hide();
                    hidecount++;
                }
            }));
            $("#tcount").text(tcount);
            $("#thidecount").text(hidecount);
        }
        function getUiFilters() {
            var l1 = $("#tlabelslider").slider("values", 0), l2 = $("#tlabelslider").slider("values", 1), rate1 = $("#thumbupRateslider").slider("values", 0), rate2 = $("#thumbupRateslider").slider("values", 1), age1 = $("#tAgeSlider").slider("values", 0), age2 = $("#tAgeSlider").slider("values", 1), fc1 = $("#fcSlider").slider("values", 0), fc2 = $("#fcSlider").slider("values", 1);
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
        function getTeacherInfoFromListPageUI(jqel) {
            var label = getLabelCount(jqel.find(".label")), labels = getLabelByItems(jqel.find(".label>span")), name = jqel.find(".teacher-name").text(), type = $(".s-t-top-list .li-active").text(), batchNumber = getBatchNumber();
            if (type == "收藏外教") {
                var isfavorite = true;
                return {
                    label: label,
                    name: name,
                    batchNumber: batchNumber,
                    isfavorite: isfavorite,
                    labels: labels
                };
            } else return {
                label: label,
                name: name,
                batchNumber: batchNumber,
                type: type,
                labels: labels
            };
        }
        if (settings.isListPage) {
            $(".item-top-cont").prop("innerHTML", (function(i, val) {
                return val.replaceAll("<!--", "").replaceAll("-->", "");
            }));
            common_submit((function(next) {
                var totalPages = Number($(".s-t-page:last>a:last").prev().text()), curPageId = window.parameters().pageID ? window.parameters().pageID : 1, remainPages = totalPages - curPageId, autoNextPageCount = getSession("autoNextPageCount", 0);
                if (autoNextPageCount > 0 && $(".s-t-page>.next-page").length > 0) {
                    var _buttons, dialog = $('<div id="dialog-confirm" title="是否停止自动搜索老师?">\n<p><span class="ui-icon ui-icon-alert" style="float:left; margin:12px 12px 20px 0;"></span>\n<b>正在根据您的选择自动获取教师信息</b><br><br>\n剩余'.concat(sessionStorage.getItem("selectedTimeSlotsRemain"), "/").concat(sessionStorage.getItem("selectedTimeSlotsTotal"), "个时段，<br><br>\n当前时段约").concat(totalPages * 28, "个教师，获取第").concat(curPageId, "/").concat(totalPages, "页，进度").concat(Math.floor(curPageId / totalPages * 100), "%,<br>\n\n</p>\n</div>"));
                    dialog.appendTo("body");
                    dialog.dialog({
                        resizable: false,
                        height: "auto",
                        width: 400,
                        modal: false,
                        buttons: (_buttons = {
                            "停止获取": function 停止获取() {
                                sessionStorage.removeItem("selectedTimeSlots");
                                setSession("autoNextPageCount", 0);
                                $(this).dialog("close");
                            }
                        }, _defineProperty(_buttons, "取后".concat((remainPages * .25).toFixed(0), "页"), (function 取后页() {
                            sessionStorage.removeItem("selectedTimeSlots");
                            setSession("autoNextPageCount", (remainPages * .25).toFixed(0));
                            $(this).dialog("close");
                        })), _defineProperty(_buttons, "取后".concat((remainPages * .5).toFixed(0), "页"), (function 取后页() {
                            sessionStorage.removeItem("selectedTimeSlots");
                            setSession("autoNextPageCount", (remainPages * .5).toFixed(0));
                            $(this).dialog("close");
                        })), _defineProperty(_buttons, "取后".concat((remainPages * .75).toFixed(0), "页"), (function 取后页() {
                            sessionStorage.removeItem("selectedTimeSlots");
                            setSession("autoNextPageCount", (remainPages * .75).toFixed(0));
                            $(this).dialog("close");
                        })), _buttons)
                    });
                }
                next();
            }));
            $(".item").each((function(index, el) {
                common_submit((function(next) {
                    Pace.track((function() {
                        var jqel = $(el), tid = getTId(jqel.find(".teacher-details-link a").attr("href")), tinfokey = "tinfo-" + tid, tinfo = getTeacherInfoFromListPageUI(jqel), tinfo_saved = GM_getValue(tinfokey);
                        if (tinfo_saved) {
                            var now = Date.now();
                            if (!tinfo_saved.updateTime) {
                                tinfo_saved.updateTime = new Date(1970, 1, 1).getTime();
                            }
                            tinfo = $.extend({}, tinfo_saved, tinfo);
                            if (now - tinfo_saved.updateTime < configExprMilliseconds) {
                                updateTeacherinfoToUI(jqel, tinfo);
                                GM_setValue(tinfokey, tinfo);
                                next();
                                return true;
                            }
                        }
                        var start = Date.now();
                        $.ajax({
                            url: window.location.protocol + "//www.51talk.com/TeacherNew/teacherComment?tid=" + tid + "&type=bad&has_msg=1",
                            type: "GET",
                            dateType: "html",
                            success: function success(r) {
                                var jqr = $(r);
                                tinfo = getTeacherInfoFromDetailPage(tinfo, jqr, {});
                                jqr.remove();
                                updateTeacherinfoToUI(jqel, tinfo);
                                GM_setValue(tinfokey, tinfo);
                            },
                            error: function error(data) {
                                console.log("xhr error when getting teacher " + JSON.stringify(jqel) + ",error msg:" + JSON.stringify(data));
                            }
                        }).always((function() {
                            while (Date.now() - start < 600) {
                                continue;
                            }
                            next();
                        }));
                    }));
                }));
            }));
            common_submit((function(next) {
                var autoNextPageCount = getSession("autoNextPageCount", 0);
                if (autoNextPageCount > 0) {
                    setSession("autoNextPageCount", autoNextPageCount - 1);
                    if ($(".s-t-page>.next-page").length == 0) {
                        setSession("autoNextPageCount", 0);
                        if (isStopShowboxAndAutoGetNextTimeTeachers()) return;
                    } else {
                        $(".s-t-page .next-page")[0].click();
                        return false;
                    }
                } else {
                    if (isStopShowboxAndAutoGetNextTimeTeachers()) return;
                }
                next();
            }));
        }
        function isStopShowboxAndAutoGetNextTimeTeachers() {
            var str = sessionStorage.getItem("selectedTimeSlots");
            if (!str) return false;
            var selectedTimeSlots = JSON.parse(str), cur = selectedTimeSlots.shift();
            if (cur) {
                setSession("autoNextPageCount", 500);
                setSession("selectedTimeSlots", selectedTimeSlots);
                setSession("selectedTimeSlotsRemain", selectedTimeSlots.length);
                $('form[name="searchform"]>input[name="selectTime"]').val(cur);
                $('form[name="searchform"]>input[name="pageID"]').val(1);
                $(".go-search").trigger("click");
                return true;
            }
            return false;
        }
        function addCheckbox(val, lbl, group) {
            var container = $("#timesmutipulecheck"), inputs = container.find("input"), id = inputs.length + 1;
            $("<input />", {
                type: "checkbox",
                id: "cb" + id,
                value: val,
                name: group
            }).appendTo(container);
            $("<label />", {
                for: "cb" + id,
                text: lbl ? lbl : val
            }).appendTo(container);
        }
        var pacesetup = __webpack_require__(8895);
        var code = '<div id="filterdialog" title="Teacher Filter"> <div id="tabs"> <div> <ul> <li><a href="#tabs-1">Search Teachers</a></li> <li><a href="#tabs-2">Sorted Teachers</a></li> </ul> <br/> <div id="filterButtons"> <div id="buttons" style="text-align:center"> <button id="asc" title="当前为降序，点击后按升序排列">升序</button> <button id="desc" title="当前为升序，点击进行降序排列" style="display:none">降序</button> <input id="tInfoExprHours" title="缓存过期时间（小时）"/> <button title="清空缓存，并重新搜索">清除缓存</button> <a>报告BUG</a> <a>帮助</a> </div> <div id="buttons1" style="text-align:center"> <div id="timesmutipulecheck"></div> <button>反选时间段</button> <button id="autogettodaysteachers" title="自动获取上述选择时段的全部教师并缓存">获取选定时段老师</button> </div> </div> </div> <div id="tabs-1"> 当前可选 <span id="tcount"></span> 位,被折叠 <span id="thidecount"></span> 位。 <br/> 有效经验值 <span id="_tLabelCount"></span> <br/> <div id="tlabelslider"></div> 收藏数 <span id="_tfc"></span> <br/> <div id="fcSlider"></div> 好评率 <span id="_thumbupRate"></span> <br/> <div id="thumbupRateslider"></div> 年龄 <span id="_tAge"></span> <br/> <div id="tAgeSlider"></div> </div> <div id="tabs-2"> <table id="teachertab"> <caption></caption> <th id="vwswslwo"></th> </table> <div id="pager5"></div> </div> </div> </div> ';
        const pluginUITemplate = code;
        dayjs_min_default().extend(relativeTime_default());
        dayjs_min_default().locale(zh_cn_default());
        var asc = function asc(a, b) {
            var av = $(a).attr("indicator"), bv = $(b).attr("indicator");
            if (!av || !bv) return 0;
            return $(a).attr("indicator").toFloat() > $(b).attr("indicator").toFloat() ? 1 : -1;
        }, desc = function desc(a, b) {
            var av = $(a).attr("indicator"), bv = $(b).attr("indicator");
            if (!av || !bv) return 0;
            return $(a).attr("indicator").toFloat() > $(b).attr("indicator").toFloat() ? -1 : 1;
        }, sortByIndicator = function sortByIndicator(sortBy) {
            var sortEle = $(".s-t-content.f-cb .item").sort(sortBy);
            $(".s-t-content.f-cb").empty().append(sortEle);
        };
        function getCatchedTeachers() {
            var teachers = [];
            $.each(GM_listValues(), (function(i, item) {
                if (item.startsWith("tinfo-")) {
                    var t = GM_getValue(item);
                    t.tid = item.slice(6, item.length);
                    teachers.push(t);
                }
            }));
            var indexs = {};
            teachers = teachers.sort((function(t1, t2) {
                if (t1.indicator == t2.indicator) return t1.favoritesCount > t2.favoritesCount ? -1 : 1;
                return t1.indicator > t2.indicator ? -1 : 1;
            })).map((function(val, idx) {
                if (isNaN(indexs[val.type])) {
                    indexs[val.type] = 1;
                } else {
                    indexs[val.type] += 1;
                }
                val.rank = indexs[val.type];
                return val;
            }));
            return teachers;
        }
        function getRankHtml(t) {
            if (t) {
                var colorif = "";
                if (t.rank <= conf.markRankRed) {
                    colorif = "style = 'color:red'";
                }
                return "<label title='在同类别教师中的排名' ".concat(colorif, "> ").concat(t.rank, "名</label>");
            }
        }
        if (settings.isListPage || settings.isDetailPage) {
            common_submit((function(next) {
                try {
                    var config = GM_getValue("filterconfig", {
                        l1: 300,
                        l2: maxlabel,
                        rate1: 97,
                        rate2: maxrate,
                        age1: minage,
                        age2: maxage
                    });
                    $("body").append(pluginUITemplate);
                    if (!settings.isListPage) {
                        $("#filterButtons").hide();
                    }
                    $("body").append("<div id='teachlistdialog' style='display:none;'></div>");
                    $("body").append("<div id='wwwww'>已加载选课辅助插件。</div>");
                    $("#tlabelslider").slider({
                        range: true,
                        min: minlabel - 1,
                        max: maxlabel,
                        values: [ config.l1 < minlabel - 1 ? minlabel - 1 : config.l1, maxlabel ],
                        slide: function slide(event, ui) {
                            $("#_tLabelCount").html(ui.values[0] + " - " + ui.values[1]);
                        }
                    }).on("slidestop", (function(event, ui) {
                        var l1 = $("#tlabelslider").slider("values", 0), l2 = $("#tlabelslider").slider("values", 1), uifilters = getUiFilters(), filterconfig = GM_getValue("filterconfig", uifilters);
                        filterconfig.l1 = l1;
                        filterconfig.l2 = l2;
                        GM_setValue("filterconfig", filterconfig);
                        executeFilters(uifilters);
                    }));
                    $("#fcSlider").slider({
                        range: true,
                        min: minfc,
                        max: maxfc,
                        values: [ config.fc1 < minfc ? minfc : config.fc1, maxfc ],
                        slide: function slide(event, ui) {
                            $("#_tfc").html(ui.values[0] + " - " + ui.values[1]);
                        }
                    }).on("slidestop", (function(event, ui) {
                        var fc1 = $("#fcSlider").slider("values", 0), fc2 = $("#fcSlider").slider("values", 1), uifilters = getUiFilters(), filterconfig = GM_getValue("filterconfig", uifilters);
                        filterconfig.fc1 = fc1;
                        filterconfig.fc2 = fc2;
                        GM_setValue("filterconfig", filterconfig);
                        executeFilters(uifilters);
                    }));
                    $("#thumbupRateslider").slider({
                        range: true,
                        min: minrate,
                        max: maxrate,
                        values: [ config.rate1 < minrate ? minrate : config.rate1, maxrate ],
                        slide: function slide(_event, ui) {
                            $("#_thumbupRate").html(ui.values[0] + "% - " + ui.values[1] + "%");
                        }
                    }).on("slidestop", (function(event, ui) {
                        var rate1 = $("#thumbupRateslider").slider("values", 0), rate2 = $("#thumbupRateslider").slider("values", 1), uifilters = getUiFilters(), filterconfig = GM_getValue("filterconfig", uifilters);
                        filterconfig.rate1 = rate1;
                        filterconfig.rate2 = rate2;
                        GM_setValue("filterconfig", filterconfig);
                        executeFilters(uifilters);
                    }));
                    $("#tAgeSlider").slider({
                        range: true,
                        min: minage,
                        max: maxage,
                        values: [ config.age1 < minage ? minage : config.age1, config.age2 > maxage ? maxage : config.age2 ],
                        slide: function slide(event, ui) {
                            $("#_tAge").html(ui.values[0] + " - " + ui.values[1]);
                        }
                    }).on("slidestop", (function(event, ui) {
                        var age1 = $("#tAgeSlider").slider("values", 0), age2 = $("#tAgeSlider").slider("values", 1), uifilters = getUiFilters(), filterconfig = GM_getValue("filterconfig", uifilters);
                        filterconfig.age1 = age1;
                        filterconfig.age2 = age2;
                        GM_setValue("filterconfig", filterconfig);
                        executeFilters(uifilters);
                    }));
                    $("#buttons>button,#buttons>input,#buttons>a").eq(0).button({
                        icon: "ui-icon-arrowthick-1-n",
                        showLabel: true
                    }).click((function() {
                        $("#desc").show();
                        $(this).hide();
                        sortByIndicator(asc);
                    })).end().eq(1).button({
                        icon: "ui-icon-arrowthick-1-s",
                        showLabel: true
                    }).click((function() {
                        $("#asc").show();
                        $(this).hide();
                        sortByIndicator(desc);
                    })).end().eq(2).spinner({
                        min: 0,
                        spin: function spin(event, ui) {
                            GM_setValue("tInfoExprHours", ui.value);
                        }
                    }).css({
                        width: "45px"
                    }).val(GM_getValue("tInfoExprHours", configExprMilliseconds / 36e5)).hide().end().eq(3).button({
                        icon: "uiicon-trash",
                        showLabel: true
                    }).click((function() {
                        var keys = GM_listValues();
                        $.each(keys, (function(i, item) {
                            var title = "正在删除第".concat(i, "个教师缓存");
                            common_submit((function(next1) {
                                try {
                                    $("title").html(title);
                                    GM_deleteValue(item);
                                } finally {
                                    next1();
                                }
                            }));
                        }));
                        $(".go-search").click();
                    })).end().eq(4).button({
                        icon: "ui-icon-comment",
                        showLabel: true
                    }).prop("href", "https://github.com/niubilityfrontend/userscripts/issues/new?assignees=&labels=&template=feature_request.md&title=").prop("target", "_blank").end().eq(5).button({
                        icon: "ui-icon-help",
                        showLabel: true
                    }).prop("href", "https://github.com/niubilityfrontend/userscripts/tree/master/findteacherson51talk").prop("target", "_blank").end();
                    $("#buttons1>button").eq(0).button({
                        icon: "ui-icon-seek-next",
                        showLabel: true
                    }).click((function() {
                        $("#timesmutipulecheck>input").each((function(i, item) {
                            $(item).prop("checked", !$(item).is(":checked")).change();
                        }));
                    })).end().eq(1).button({
                        icon: "ui-icon-seek-next",
                        showLabel: true
                    }).click((function() {
                        selectedTimeSlots = [];
                        $("#timesmutipulecheck>input").each((function(i, item) {
                            if ($(item).is(":checked")) {
                                selectedTimeSlots.push($(item).val());
                            }
                        }));
                        setSession("selectedTimeSlots", selectedTimeSlots);
                        setSession("selectedTimeSlotsTotal", selectedTimeSlots.length);
                        isStopShowboxAndAutoGetNextTimeTeachers();
                    })).end();
                    $("div.condition-type:eq(0)>ul.condition-type-time>li").each((function(i, item) {
                        addCheckbox($(item).attr("data-val"), $(item).text());
                    }));
                    var timesstr = sessionStorage.getItem("selectedTimeSlots"), selectedTimeSlots = [];
                    if (timesstr) {
                        selectedTimeSlots = JSON.parse(timesstr);
                        if (selectedTimeSlots.length > 0) {
                            var i = selectedTimeSlots.length;
                            while (i--) {
                                $("#timesmutipulecheck>input[value='" + selectedTimeSlots[i] + "']").attr("checked", true);
                            }
                        } else {
                            $("#timesmutipulecheck>input[value='" + $("input[name='selectTime']").val() + "']").attr("checked", true);
                        }
                    } else {
                        $("#timesmutipulecheck>input[value='" + $("input[name='selectTime']").val() + "']").attr("checked", true);
                    }
                    $("#timesmutipulecheck").find("input").checkboxradio({
                        icon: false
                    });
                    $("#tabs").tabs({
                        active: "#tabs-2",
                        activate: function activate(event, ui) {
                            if (ui.newPanel.attr("id") != "tabs-2") return;
                            var teachers = getCatchedTeachers();
                            $("#teachertab").jqGrid({
                                data: teachers,
                                datatype: "local",
                                height: 240,
                                colNames: [ "查", "类型", "排名", "Name", "爱", "分", "标", "率%", "收藏数", "学", "教龄", "好", "差", "龄", "更新" ],
                                colModel: [ {
                                    name: "batchNumber",
                                    index: "batchNumber",
                                    width: 45,
                                    sorttype: "float",
                                    align: "right",
                                    searchoptions: {
                                        sopt: [ "cn" ]
                                    },
                                    formatter: function formatter(value, options, rData) {
                                        var date = new Date(Number(value));
                                        if (date instanceof Date && !isNaN(date.valueOf())) {
                                            return date.toString("HHmmss");
                                        }
                                        return value;
                                    }
                                }, {
                                    name: "type",
                                    index: "type",
                                    width: 55,
                                    sorttype: "string",
                                    align: "left",
                                    searchoptions: {
                                        sopt: [ "cn" ],
                                        defaultValue: $(".s-t-top-list .li-active").text() == "收藏外教" ? "" : $(".s-t-top-list .li-active").text()
                                    },
                                    formatter: function formatter(value, options, rData) {
                                        if (value) return value; else return "na";
                                    }
                                }, {
                                    name: "rank",
                                    index: "rank",
                                    width: 40,
                                    sorttype: "float",
                                    align: "right",
                                    searchoptions: {
                                        sopt: [ "le" ]
                                    }
                                }, {
                                    name: "name",
                                    index: "name",
                                    width: 125,
                                    sorttype: "string",
                                    formatter: function formatter(value, options, rData) {
                                        return "<a href='http://www.51talk.com/TeacherNew/info/" + rData["tid"] + "' target='_blank' style='color:blue'>" + (value ? value : rData["tid"]) + "</a>";
                                    }
                                }, {
                                    name: "isfavorite",
                                    index: "isfavorite",
                                    width: 39,
                                    sorttype: "string",
                                    align: "left",
                                    searchoptions: {
                                        sopt: [ "cn" ]
                                    },
                                    formatter: function formatter(value, options, rData) {
                                        if (value) return "收藏"; else return "";
                                    }
                                }, {
                                    name: "indicator",
                                    index: "indicator",
                                    width: 50,
                                    sorttype: "float",
                                    align: "right",
                                    searchoptions: {
                                        sopt: [ "ge" ]
                                    }
                                }, {
                                    name: "label",
                                    index: "label",
                                    width: 45,
                                    align: "right",
                                    searchoptions: {
                                        sopt: [ "ge" ]
                                    }
                                }, {
                                    name: "thumbupRate",
                                    index: "thumbupRate",
                                    width: 35,
                                    align: "right",
                                    sorttype: "float",
                                    searchoptions: {
                                        sopt: [ "ge" ]
                                    }
                                }, {
                                    name: "favoritesCount",
                                    index: "favoritesCount",
                                    width: 35,
                                    align: "right",
                                    sorttype: "float",
                                    searchoptions: {
                                        sopt: [ "ge" ]
                                    }
                                }, {
                                    name: "slevel",
                                    index: "slevel",
                                    width: 85,
                                    sorttype: "string",
                                    align: "left",
                                    searchoptions: {
                                        sopt: [ "cn", "nc" ]
                                    }
                                }, {
                                    name: "tage",
                                    index: "tage",
                                    width: 25,
                                    sorttype: "float",
                                    align: "right",
                                    searchoptions: {
                                        sopt: [ "ge" ]
                                    }
                                }, {
                                    name: "thumbup",
                                    index: "thumbup",
                                    width: 45,
                                    align: "right",
                                    sorttype: "float",
                                    searchoptions: {
                                        sopt: [ "ge" ]
                                    }
                                }, {
                                    name: "thumbdown",
                                    index: "thumbdown",
                                    width: 30,
                                    sorttype: "float",
                                    align: "right"
                                }, {
                                    name: "age",
                                    index: "age",
                                    width: 30,
                                    sorttype: "float",
                                    align: "right",
                                    searchoptions: {
                                        sopt: [ "le", "ge", "eq" ]
                                    }
                                }, {
                                    name: "updateTime",
                                    index: "updateTime",
                                    width: 35,
                                    sorttype: "Date",
                                    align: "right",
                                    searchoptions: {
                                        sopt: [ "cn" ]
                                    },
                                    formatter: function formatter(value, options, rData) {
                                        if (value) {
                                            return dayjs_min_default()(value).fromNow(true);
                                        } else return "na";
                                    }
                                } ],
                                multiselect: false,
                                rowNum: 10,
                                rowList: [ 5, 10, 20, 30 ],
                                pager: "#pager5",
                                sortname: "batchNumber desc,indicator desc",
                                viewrecords: true,
                                multiSort: true,
                                sortorder: "desc",
                                grouping: false,
                                responsive: true,
                                del: true,
                                width: 830
                            }).jqGrid("filterToolbar", {
                                searchOperators: true
                            })[0].triggerToolbar();
                            if (settings.isListPage) {
                                $.each($(".item"), (function(i, item) {
                                    var jqel = $(item), tid = jqel.find(".teacher-details-link a").attr("href").replace("https://www.51talk.com/TeacherNew/info/", "").replace("http://www.51talk.com/TeacherNew/info/", ""), t = teachers.find((function(currentValue, index, arr) {
                                        return currentValue.tid == tid;
                                    })), lb = jqel.find(".teacher-name>label:eq(3)");
                                    if (lb.length == 0) jqel.find(".teacher-name").html("".concat(jqel.find(".teacher-name").html(), "| ").concat(getRankHtml(t))); else lb.replaceWith(getRankHtml(t));
                                }));
                            }
                            if (settings.isDetailPage) {
                                var t = teachers.find((function(currentValue, index, arr) {
                                    return currentValue.tid == getTId();
                                }));
                                $("#teacherRank").html(getRankHtml(t));
                            }
                        }
                    });
                    var uifilters_top = getUiFilters();
                    executeFilters(uifilters_top);
                    $("#_tAge").html(uifilters_top.age1 + " - " + uifilters_top.age2);
                    $("#_tLabelCount").html(uifilters_top.l1 + " - " + uifilters_top.l2);
                    $("#_tfc").html(uifilters_top.fc1 + " - " + uifilters_top.fc2 + "");
                    $("#_thumbupRate").html(uifilters_top.rate1 + "% - " + uifilters_top.rate2 + "%");
                } catch (ex) {
                    console.log(ex + "");
                    throw ex;
                } finally {
                    next();
                }
            }));
            common_submit((function(next) {
                $(".s-t-list").before($(".s-t-page").prop("outerHTML"));
                $("#tabs>div:first").append($(".s-t-page").prop("outerHTML"));
                sortByIndicator(desc);
                $("#tabs").tabs("option", "active", 1);
                if (settings.isDetailPage) {
                    $("#tabs").tabs("option", "disabled", [ 0 ]);
                }
                $("#filterdialog").dialog({
                    width: "850"
                });
                $("#filterdialog").parent().scrollFix();
                $("#filterdialog").dialog("open");
                next();
            }));
        }
        if (settings.isCoursePage) {
            common_submit((function(next) {
                $(".course_lock").removeClass("course_lock").addClass("course_unlock");
                $("img.course_mask").removeClass("course_mask").attr("src", "");
                next();
            }));
        }
    }
}, (function(__webpack_require__) {
    (() => {
        __webpack_require__.h = () => "56c985800126c01ae055";
    })();
}));