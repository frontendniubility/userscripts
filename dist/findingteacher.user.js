// ==UserScript==
// @name        Best Teacher(JQuery)
// @version     2022.10.519162705
// @author      jimbo
// @description 谁是最好的老师？-排序显示，经验值计算|自定义经验值公式|好评率|显示年龄|列表显示所有教师
// @homepage    https://github.com/niubilityfrontend/userscripts#readme
// @supportURL  https://github.com/niubilityfrontend/findteacherson51talk
// @match       *://www.51talk.com/ReserveNew/index*
// @match       *://www.51talk.com/TeacherNew/*
// @match       *://www.51talk.com/user/*
// @match       *://51talk.com/ReserveNew/index*
// @match       *://51talk.com/TeacherNew/*
// @match       *://51talk.com/user/*
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
// @downloadURL https://raw.githubusercontent.com/niubilityfrontend/userscripts/master/dist/findingteacher.user.js
// @updateURL   https://raw.githubusercontent.com/niubilityfrontend/userscripts/master/dist/findingteacher.meta.js
// ==/UserScript==

(() => {
    var __webpack_modules__ = {
        895: () => {
            Pace.Options = {
                ajax: false,
                document: false,
                eventLag: false,
                elements: {
                    selectors: [ "#filterDialog" ]
                }
            };
        },
        484: function(module) {
            !function(t, e) {
                true ? module.exports = e() : 0;
            }(this, (function() {
                "use strict";
                var t = 1e3, e = 6e4, n = 36e5, r = "millisecond", i = "second", s = "minute", u = "hour", a = "day", o = "week", f = "month", h = "quarter", c = "year", d = "date", $ = "Invalid Date", l = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/, y = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g, M = {
                    name: "en",
                    weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
                    months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_")
                }, m = function(t, e, n) {
                    var r = String(t);
                    return !r || r.length >= e ? t : "" + Array(e + 1 - r.length).join(n) + t;
                }, g = {
                    s: m,
                    z: function(t) {
                        var e = -t.utcOffset(), n = Math.abs(e), r = Math.floor(n / 60), i = n % 60;
                        return (e <= 0 ? "+" : "-") + m(r, 2, "0") + ":" + m(i, 2, "0");
                    },
                    m: function t(e, n) {
                        if (e.date() < n.date()) return -t(n, e);
                        var r = 12 * (n.year() - e.year()) + (n.month() - e.month()), i = e.clone().add(r, f), s = n - i < 0, u = e.clone().add(r + (s ? -1 : 1), f);
                        return +(-(r + (n - i) / (s ? i - u : u - i)) || 0);
                    },
                    a: function(t) {
                        return t < 0 ? Math.ceil(t) || 0 : Math.floor(t);
                    },
                    p: function(t) {
                        return {
                            M: f,
                            y: c,
                            w: o,
                            d: a,
                            D: d,
                            h: u,
                            m: s,
                            s: i,
                            ms: r,
                            Q: h
                        }[t] || String(t || "").toLowerCase().replace(/s$/, "");
                    },
                    u: function(t) {
                        return void 0 === t;
                    }
                }, D = "en", v = {};
                v[D] = M;
                var p = function(t) {
                    return t instanceof _;
                }, S = function(t, e, n) {
                    var r;
                    if (!t) return D;
                    if ("string" == typeof t) v[t] && (r = t), e && (v[t] = e, r = t); else {
                        var i = t.name;
                        v[i] = t, r = i;
                    }
                    return !n && r && (D = r), r || !n && D;
                }, w = function(t, e) {
                    if (p(t)) return t.clone();
                    var n = "object" == typeof e ? e : {};
                    return n.date = t, n.args = arguments, new _(n);
                }, O = g;
                O.l = S, O.i = p, O.w = function(t, e) {
                    return w(t, {
                        locale: e.$L,
                        utc: e.$u,
                        x: e.$x,
                        $offset: e.$offset
                    });
                };
                var _ = function() {
                    function M(t) {
                        this.$L = S(t.locale, null, !0), this.parse(t);
                    }
                    var m = M.prototype;
                    return m.parse = function(t) {
                        this.$d = function(t) {
                            var e = t.date, n = t.utc;
                            if (null === e) return new Date(NaN);
                            if (O.u(e)) return new Date;
                            if (e instanceof Date) return new Date(e);
                            if ("string" == typeof e && !/Z$/i.test(e)) {
                                var r = e.match(l);
                                if (r) {
                                    var i = r[2] - 1 || 0, s = (r[7] || "0").substring(0, 3);
                                    return n ? new Date(Date.UTC(r[1], i, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, s)) : new Date(r[1], i, r[3] || 1, r[4] || 0, r[5] || 0, r[6] || 0, s);
                                }
                            }
                            return new Date(e);
                        }(t), this.$x = t.x || {}, this.init();
                    }, m.init = function() {
                        var t = this.$d;
                        this.$y = t.getFullYear(), this.$M = t.getMonth(), this.$D = t.getDate(), this.$W = t.getDay(), 
                        this.$H = t.getHours(), this.$m = t.getMinutes(), this.$s = t.getSeconds(), this.$ms = t.getMilliseconds();
                    }, m.$utils = function() {
                        return O;
                    }, m.isValid = function() {
                        return !(this.$d.toString() === $);
                    }, m.isSame = function(t, e) {
                        var n = w(t);
                        return this.startOf(e) <= n && n <= this.endOf(e);
                    }, m.isAfter = function(t, e) {
                        return w(t) < this.startOf(e);
                    }, m.isBefore = function(t, e) {
                        return this.endOf(e) < w(t);
                    }, m.$g = function(t, e, n) {
                        return O.u(t) ? this[e] : this.set(n, t);
                    }, m.unix = function() {
                        return Math.floor(this.valueOf() / 1e3);
                    }, m.valueOf = function() {
                        return this.$d.getTime();
                    }, m.startOf = function(t, e) {
                        var n = this, r = !!O.u(e) || e, h = O.p(t), $ = function(t, e) {
                            var i = O.w(n.$u ? Date.UTC(n.$y, e, t) : new Date(n.$y, e, t), n);
                            return r ? i : i.endOf(a);
                        }, l = function(t, e) {
                            return O.w(n.toDate()[t].apply(n.toDate("s"), (r ? [ 0, 0, 0, 0 ] : [ 23, 59, 59, 999 ]).slice(e)), n);
                        }, y = this.$W, M = this.$M, m = this.$D, g = "set" + (this.$u ? "UTC" : "");
                        switch (h) {
                          case c:
                            return r ? $(1, 0) : $(31, 11);

                          case f:
                            return r ? $(1, M) : $(0, M + 1);

                          case o:
                            var D = this.$locale().weekStart || 0, v = (y < D ? y + 7 : y) - D;
                            return $(r ? m - v : m + (6 - v), M);

                          case a:
                          case d:
                            return l(g + "Hours", 0);

                          case u:
                            return l(g + "Minutes", 1);

                          case s:
                            return l(g + "Seconds", 2);

                          case i:
                            return l(g + "Milliseconds", 3);

                          default:
                            return this.clone();
                        }
                    }, m.endOf = function(t) {
                        return this.startOf(t, !1);
                    }, m.$set = function(t, e) {
                        var n, o = O.p(t), h = "set" + (this.$u ? "UTC" : ""), $ = (n = {}, n[a] = h + "Date", 
                        n[d] = h + "Date", n[f] = h + "Month", n[c] = h + "FullYear", n[u] = h + "Hours", 
                        n[s] = h + "Minutes", n[i] = h + "Seconds", n[r] = h + "Milliseconds", n)[o], l = o === a ? this.$D + (e - this.$W) : e;
                        if (o === f || o === c) {
                            var y = this.clone().set(d, 1);
                            y.$d[$](l), y.init(), this.$d = y.set(d, Math.min(this.$D, y.daysInMonth())).$d;
                        } else $ && this.$d[$](l);
                        return this.init(), this;
                    }, m.set = function(t, e) {
                        return this.clone().$set(t, e);
                    }, m.get = function(t) {
                        return this[O.p(t)]();
                    }, m.add = function(r, h) {
                        var d, $ = this;
                        r = Number(r);
                        var l = O.p(h), y = function(t) {
                            var e = w($);
                            return O.w(e.date(e.date() + Math.round(t * r)), $);
                        };
                        if (l === f) return this.set(f, this.$M + r);
                        if (l === c) return this.set(c, this.$y + r);
                        if (l === a) return y(1);
                        if (l === o) return y(7);
                        var M = (d = {}, d[s] = e, d[u] = n, d[i] = t, d)[l] || 1, m = this.$d.getTime() + r * M;
                        return O.w(m, this);
                    }, m.subtract = function(t, e) {
                        return this.add(-1 * t, e);
                    }, m.format = function(t) {
                        var e = this, n = this.$locale();
                        if (!this.isValid()) return n.invalidDate || $;
                        var r = t || "YYYY-MM-DDTHH:mm:ssZ", i = O.z(this), s = this.$H, u = this.$m, a = this.$M, o = n.weekdays, f = n.months, h = function(t, n, i, s) {
                            return t && (t[n] || t(e, r)) || i[n].substr(0, s);
                        }, c = function(t) {
                            return O.s(s % 12 || 12, t, "0");
                        }, d = n.meridiem || function(t, e, n) {
                            var r = t < 12 ? "AM" : "PM";
                            return n ? r.toLowerCase() : r;
                        }, l = {
                            YY: String(this.$y).slice(-2),
                            YYYY: this.$y,
                            M: a + 1,
                            MM: O.s(a + 1, 2, "0"),
                            MMM: h(n.monthsShort, a, f, 3),
                            MMMM: h(f, a),
                            D: this.$D,
                            DD: O.s(this.$D, 2, "0"),
                            d: String(this.$W),
                            dd: h(n.weekdaysMin, this.$W, o, 2),
                            ddd: h(n.weekdaysShort, this.$W, o, 3),
                            dddd: o[this.$W],
                            H: String(s),
                            HH: O.s(s, 2, "0"),
                            h: c(1),
                            hh: c(2),
                            a: d(s, u, !0),
                            A: d(s, u, !1),
                            m: String(u),
                            mm: O.s(u, 2, "0"),
                            s: String(this.$s),
                            ss: O.s(this.$s, 2, "0"),
                            SSS: O.s(this.$ms, 3, "0"),
                            Z: i
                        };
                        return r.replace(y, (function(t, e) {
                            return e || l[t] || i.replace(":", "");
                        }));
                    }, m.utcOffset = function() {
                        return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
                    }, m.diff = function(r, d, $) {
                        var l, y = O.p(d), M = w(r), m = (M.utcOffset() - this.utcOffset()) * e, g = this - M, D = O.m(this, M);
                        return D = (l = {}, l[c] = D / 12, l[f] = D, l[h] = D / 3, l[o] = (g - m) / 6048e5, 
                        l[a] = (g - m) / 864e5, l[u] = g / n, l[s] = g / e, l[i] = g / t, l)[y] || g, $ ? D : O.a(D);
                    }, m.daysInMonth = function() {
                        return this.endOf(f).$D;
                    }, m.$locale = function() {
                        return v[this.$L];
                    }, m.locale = function(t, e) {
                        if (!t) return this.$L;
                        var n = this.clone(), r = S(t, e, !0);
                        return r && (n.$L = r), n;
                    }, m.clone = function() {
                        return O.w(this.$d, this);
                    }, m.toDate = function() {
                        return new Date(this.valueOf());
                    }, m.toJSON = function() {
                        return this.isValid() ? this.toISOString() : null;
                    }, m.toISOString = function() {
                        return this.$d.toISOString();
                    }, m.toString = function() {
                        return this.$d.toUTCString();
                    }, M;
                }(), b = _.prototype;
                return w.prototype = b, [ [ "$ms", r ], [ "$s", i ], [ "$m", s ], [ "$H", u ], [ "$W", a ], [ "$M", f ], [ "$y", c ], [ "$D", d ] ].forEach((function(t) {
                    b[t[1]] = function(e) {
                        return this.$g(e, t[0], t[1]);
                    };
                })), w.extend = function(t, e) {
                    return t.$i || (t(e, _, w), t.$i = !0), w;
                }, w.locale = S, w.isDayjs = p, w.unix = function(t) {
                    return w(1e3 * t);
                }, w.en = v[D], w.Ls = v, w.p = {}, w;
            }));
        },
        852: function(module, __unused_webpack_exports, __webpack_require__) {
            !function(e, _) {
                true ? module.exports = _(__webpack_require__(484)) : 0;
            }(this, (function(e) {
                "use strict";
                function _(e) {
                    return e && "object" == typeof e && "default" in e ? e : {
                        default: e
                    };
                }
                var t = _(e), d = {
                    name: "zh-cn",
                    weekdays: "星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),
                    weekdaysShort: "周日_周一_周二_周三_周四_周五_周六".split("_"),
                    weekdaysMin: "日_一_二_三_四_五_六".split("_"),
                    months: "一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),
                    monthsShort: "1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
                    ordinal: function(e, _) {
                        switch (_) {
                          case "W":
                            return e + "周";

                          default:
                            return e + "日";
                        }
                    },
                    weekStart: 1,
                    yearStart: 4,
                    formats: {
                        LT: "HH:mm",
                        LTS: "HH:mm:ss",
                        L: "YYYY/MM/DD",
                        LL: "YYYY年M月D日",
                        LLL: "YYYY年M月D日Ah点mm分",
                        LLLL: "YYYY年M月D日ddddAh点mm分",
                        l: "YYYY/M/D",
                        ll: "YYYY年M月D日",
                        lll: "YYYY年M月D日 HH:mm",
                        llll: "YYYY年M月D日dddd HH:mm"
                    },
                    relativeTime: {
                        future: "%s内",
                        past: "%s前",
                        s: "几秒",
                        m: "1 分钟",
                        mm: "%d 分钟",
                        h: "1 小时",
                        hh: "%d 小时",
                        d: "1 天",
                        dd: "%d 天",
                        M: "1 个月",
                        MM: "%d 个月",
                        y: "1 年",
                        yy: "%d 年"
                    },
                    meridiem: function(e, _) {
                        var t = 100 * e + _;
                        return t < 600 ? "凌晨" : t < 900 ? "早上" : t < 1100 ? "上午" : t < 1300 ? "中午" : t < 1800 ? "下午" : "晚上";
                    }
                };
                return t.default.locale(d, null, !0), d;
            }));
        },
        110: function(module) {
            !function(r, e) {
                true ? module.exports = e() : 0;
            }(this, (function() {
                "use strict";
                return function(r, e, t) {
                    r = r || {};
                    var n = e.prototype, o = {
                        future: "in %s",
                        past: "%s ago",
                        s: "a few seconds",
                        m: "a minute",
                        mm: "%d minutes",
                        h: "an hour",
                        hh: "%d hours",
                        d: "a day",
                        dd: "%d days",
                        M: "a month",
                        MM: "%d months",
                        y: "a year",
                        yy: "%d years"
                    };
                    function i(r, e, t, o) {
                        return n.fromToBase(r, e, t, o);
                    }
                    t.en.relativeTime = o, n.fromToBase = function(e, n, i, d, u) {
                        for (var f, a, s, l = i.$locale().relativeTime || o, h = r.thresholds || [ {
                            l: "s",
                            r: 44,
                            d: "second"
                        }, {
                            l: "m",
                            r: 89
                        }, {
                            l: "mm",
                            r: 44,
                            d: "minute"
                        }, {
                            l: "h",
                            r: 89
                        }, {
                            l: "hh",
                            r: 21,
                            d: "hour"
                        }, {
                            l: "d",
                            r: 35
                        }, {
                            l: "dd",
                            r: 25,
                            d: "day"
                        }, {
                            l: "M",
                            r: 45
                        }, {
                            l: "MM",
                            r: 10,
                            d: "month"
                        }, {
                            l: "y",
                            r: 17
                        }, {
                            l: "yy",
                            d: "year"
                        } ], m = h.length, c = 0; c < m; c += 1) {
                            var y = h[c];
                            y.d && (f = d ? t(e).diff(i, y.d, !0) : i.diff(e, y.d, !0));
                            var p = (r.rounding || Math.round)(Math.abs(f));
                            if (s = f > 0, p <= y.r || !y.r) {
                                p <= 1 && c > 0 && (y = h[c - 1]);
                                var v = l[y.l];
                                u && (p = u("" + p)), a = "string" == typeof v ? v.replace("%d", p) : v(p, n, y.l, s);
                                break;
                            }
                        }
                        if (n) return a;
                        var M = s ? l.future : l.past;
                        return "function" == typeof M ? M(a) : M.replace("%s", a);
                    }, n.to = function(r, e) {
                        return i(r, e, this, !0);
                    }, n.from = function(r, e) {
                        return i(r, e, this);
                    };
                    var d = function(r) {
                        return r.$u ? t.utc() : t();
                    };
                    n.toNow = function(r) {
                        return this.to(d(this), r);
                    }, n.fromNow = function(r) {
                        return this.from(d(this), r);
                    };
                };
            }));
        },
        771: false
    };
    var __webpack_module_cache__ = {};
    function __webpack_require__(moduleId) {
        var cachedModule = __webpack_module_cache__[moduleId];
        if (cachedModule !== undefined) {
            return cachedModule.exports;
        }
        var module = __webpack_module_cache__[moduleId] = {
            exports: {}
        };
        __webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        return module.exports;
    }
    (() => {
        __webpack_require__.n = module => {
            var getter = module && module.__esModule ? () => module["default"] : () => module;
            __webpack_require__.d(getter, {
                a: getter
            });
            return getter;
        };
    })();
    (() => {
        __webpack_require__.d = (exports, definition) => {
            for (var key in definition) {
                if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
                    Object.defineProperty(exports, key, {
                        enumerable: true,
                        get: definition[key]
                    });
                }
            }
        };
    })();
    (() => {
        __webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
    })();
    var __webpack_exports__ = {};
    (() => {
        "use strict";
        var dayjs_min = __webpack_require__(484);
        var dayjs_min_default = __webpack_require__.n(dayjs_min);
        var zh_cn = __webpack_require__(852);
        var zh_cn_default = __webpack_require__.n(zh_cn);
        var relativeTime = __webpack_require__(110);
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
                load,
                save,
                setup
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
            default: 23,
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
            default: 120,
            type: "dropdown",
            values: [ 5, 10, 30, 50, 120, 500, 3e3, 5e3, 10080 ]
        }, {
            key: "calcIndicator",
            label: "[高级]排名公式",
            default: "",
            type: "text",
            placeholder: "Math.ceil((t.label * t.thumbUpRate) / 100) + t.favoritesCount",
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
                    f = new Function("t", "return Math.ceil((t.label * t.thumbUpRate) / 100) + t.favoritesCount");
                    console.debug(error);
                    alert("计算公式错误，排名计算方式使用默认公式。Error:".concat(error));
                }
            } else {
                f = new Function("t", "return Math.ceil((t.label * t.thumbUpRate) / 100) + t.favoritesCount");
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
        function getInfoKey() {
            return "tinfo-" + getTId();
        }
        function calcIndicator(tinfo) {
            if (isNaN(tinfo.label)) tinfo.label = 0;
            if (isNaN(tinfo.thumbUpRate)) tinfo.thumbUpRate = 0;
            if (isNaN(tinfo.favoritesCount)) tinfo.favoritesCount = 0;
            return indicatorCalculator(tinfo);
        }
        function calcThumbRate(tinfo) {
            if (isNaN(tinfo.thumbDown)) tinfo.thumbDown = 0;
            if (isNaN(tinfo.thumbUp)) tinfo.thumbUp = 0;
            var all = tinfo.thumbDown + tinfo.thumbUp;
            if (all < 1) all = 1;
            return ((tinfo.thumbUp + Number.EPSILON) / all).toFixed(2) * 100;
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
                $.each(jqLabelElement.text().match(num).filter((function(x) {
                    return x !== "";
                })), (function(i, val) {
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
            var _jqr$find$text$match$, tinfo_latest = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
            jqr.find(".teacher-name-tit").prop("innerHTML", (function(i, val) {
                return val.replaceAll("<!--", "").replaceAll("-->", "");
            }));
            var tinfo = {
                label: getLabelCount(jqr.find(".t-d-label")),
                updateTime: Date.now(),
                labels: getLabelByItems(jqr.find(".t-d-label>span")),
                teacherStar: Number(jqr.find(".s-t-top>.s-t-top-details.f-cb>.s-t-top-left>.teacher-left-right>.teacher-star").text()),
                certificates: jqr.find(".s-t-top>.s-t-top-details.f-cb>.s-t-top-left>.teacher-left-right>.teacher-icon-tag>span:eq(0)").text(),
                suitable: jqr.find(".s-t-top>.s-t-top-details.f-cb>.s-t-top-left>.teacher-left-right>.suitable>span:not(:first)").map((function(i, v) {
                    return $(v).text();
                })).get().reduce((function(pre, cur) {
                    if (cur) pre.push(cur);
                    return pre;
                }), [])
            };
            if (jqr.find(".evaluate-content-left span").length >= 3) {
                tinfo.thumbUp = Number(jqr.find(".evaluate-content-left span:eq(1)").text().match(num).filter((function(x) {
                    return x !== "";
                }))[0]);
                tinfo.thumbDown = Number(jqr.find(".evaluate-content-left span:eq(2)").text().match(num).filter((function(x) {
                    return x !== "";
                }))[0]);
                tinfo.thumbUpRate = calcThumbRate(tinfo);
                tinfo.thumbUpRate = calcThumbRate(tinfo);
                tinfo.indicator = calcIndicator(tinfo);
                tinfo.sLevel = jqr.find(".sui-students").text();
            }
            tinfo.favoritesCount = Number((_jqr$find$text$match$ = jqr.find(".clear-search").text().match(num).filter((function(x) {
                return x !== "";
            }))[0]) !== null && _jqr$find$text$match$ !== void 0 ? _jqr$find$text$match$ : 0);
            tinfo.isFavorite = jqr.find(".go-search.cancel-collection").length > 0;
            tinfo.name = jqr.find(".t-name").text().trim();
            var agesStr = jqr.find(".teacher-name-tit > .age.age-line").text().match(num).filter((function(x) {
                return x !== "";
            }));
            tinfo.tAge = Number(agesStr[1]);
            tinfo.age = Number(agesStr[0]);
            tinfo.batchNumber = getBatchNumber();
            tinfo = $.extend({}, tinfo_saved, tinfo, tinfo_latest);
            jqr.find(".teacher-name-tit").prop("innerHTML", (function(i, val) {
                return "".concat(val, "\n<span class=\"age age-line\"><label title='指标'>").concat(tinfo_saved.indicator, "</label></span>\n<span class=\"age age-line\"><label title='好评率'>").concat(tinfo_saved.thumbUpRate, "%</label></span>\n<span class=\"age age-line\"><label title='被赞数量'>").concat(tinfo_saved.thumbUp, "</label></span>\n<span class=\"age age-line\"><label title='被踩数量'>").concat(tinfo_saved.thumbDown, "</label></span>\n<span class=\"age age-line\"><label title='评论标签数量'>").concat(tinfo_saved.label, '</label></span>\n<span class="age age-line"><label title=\'在同类别教师中的排名\'><span id="teacherRank"></span></label></span>\n  ');
            }));
            return tinfo;
        }
        var findingteacher_user = __webpack_require__(771);
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
                    value,
                    enumerable: true,
                    configurable: true,
                    writable: true
                });
            } else {
                obj[key] = value;
            }
            return obj;
        }
        function listpage_slicedToArray(arr, i) {
            return listpage_arrayWithHoles(arr) || listpage_iterableToArrayLimit(arr, i) || listpage_unsupportedIterableToArray(arr, i) || listpage_nonIterableRest();
        }
        function listpage_nonIterableRest() {
            throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
        }
        function listpage_unsupportedIterableToArray(o, minLen) {
            if (!o) return;
            if (typeof o === "string") return listpage_arrayLikeToArray(o, minLen);
            var n = Object.prototype.toString.call(o).slice(8, -1);
            if (n === "Object" && o.constructor) n = o.constructor.name;
            if (n === "Map" || n === "Set") return Array.from(o);
            if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return listpage_arrayLikeToArray(o, minLen);
        }
        function listpage_arrayLikeToArray(arr, len) {
            if (len == null || len > arr.length) len = arr.length;
            for (var i = 0, arr2 = new Array(len); i < len; i++) {
                arr2[i] = arr[i];
            }
            return arr2;
        }
        function listpage_iterableToArrayLimit(arr, i) {
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
        function listpage_arrayWithHoles(arr) {
            if (Array.isArray(arr)) return arr;
        }
        config.onsave = function(cfg) {
            console.debug(cfg);
            try {
                new Function("t", "return ".concat(cfg.calcIndicator))({});
            } catch (error) {
                console.debug(error);
                alert("计算公式错误，排名计算方式使用默认公式。Error:".concat(error));
                return false;
            }
            $("#autoGetNextPage").text("自动获取" + getAutoNextPagesCount() + "页");
        };
        var maxRate = 0, minRate = 99999, maxLabel = 0, minLabel = 9999999, maxFc = 0, minFc = 999999, maxAge = 0, minAge = 99999;
        function getLeftPageCount() {
            var pages = Number($(".s-t-page>.next-page:first").prev().text()), curr = Number($(".s-t-page>.active:first").text());
            if (pages) return pages - curr; else return 0;
        }
        function getAutoNextPagesCount() {
            var pages = getLeftPageCount();
            if (settings.pageMaxCount > pages) return pages; else return settings.pageMaxCount;
        }
        function updateTeacherInfoToUI(jqEl, tinfo) {
            if (!isNaN(tinfo.label)) {
                if (tinfo.label > maxLabel) maxLabel = tinfo.label;
                if (tinfo.label < minLabel) minLabel = tinfo.label;
            }
            if (tinfo.favoritesCount && !isNaN(tinfo.favoritesCount)) {
                if (tinfo.favoritesCount > maxFc) maxFc = tinfo.favoritesCount;
                if (tinfo.favoritesCount < minFc) minFc = tinfo.favoritesCount;
            }
            if (!isNaN(tinfo.thumbUpRate)) {
                if (tinfo.thumbUpRate > maxRate) maxRate = tinfo.thumbUpRate;
                if (tinfo.thumbUpRate < minRate) minRate = tinfo.thumbUpRate;
            }
            if (!isNaN(tinfo.age)) {
                if (tinfo.age > maxAge) maxAge = tinfo.age;
                if (tinfo.age < minAge) minAge = tinfo.age;
            }
            jqEl.attr("teacherInfo", JSON.stringify(tinfo));
            jqEl.find(".teacher-name").html(jqEl.find(".teacher-name").html() + "<br /><label title='评论标签数量'>".concat(tinfo.label, "</label>|<label title='好评率'>").concat(tinfo.thumbUpRate, "%</label>\n      | <label title='收藏数量'>").concat(tinfo.favoritesCount, " </label> "));
            jqEl.attr("indicator", tinfo.indicator);
        }
        function executeFilters(uiFilters) {
            var tCount = 0, hideCount = 0;
            console.debug("-----uiFilters", uiFilters);
            $.each($(".item"), (function(i, item) {
                var node = $(item), tInfoJson = node.attr("teacherInfo");
                if (!tInfoJson) {
                    return true;
                }
                var tinfo = JSON.parse(tInfoJson), isShown = true;
                if (!isNaN(tinfo.thumbUpRate)) isShown = tinfo.thumbUpRate >= uiFilters.rate1 && tinfo.thumbUpRate <= uiFilters.rate2 && isShown;
                if (!isNaN(tinfo.label)) isShown = tinfo.label >= uiFilters.l1 && tinfo.label <= uiFilters.l2 && isShown;
                if (!isNaN(tinfo.age)) isShown = tinfo.age >= uiFilters.age1 && tinfo.age <= uiFilters.age2 && isShown;
                if (!isNaN(tinfo.favoritesCount)) isShown = tinfo.favoritesCount >= uiFilters.fc1 && tinfo.favoritesCount <= uiFilters.fc2 && isShown;
                if (isShown) {
                    if (node.is(":hidden")) {
                        node.show().animate({
                            left: "+=50"
                        }, 3500).animate({
                            left: "-=50"
                        }, 3500);
                    } else {}
                    tCount++;
                } else {
                    console.debug("Hide---------------", tinfo);
                    node.css("color", "white").hide(500);
                    hideCount++;
                }
            }));
            $("#tCount").text(tCount);
            $("#tHideCount").text(hideCount);
        }
        function getUiFilters() {
            var _$$slider = $("#labelSlider").slider("values"), _$$slider2 = listpage_slicedToArray(_$$slider, 2), l1 = _$$slider2[0], l2 = _$$slider2[1], _$$slider3 = $("#thumbUpRateSlider").slider("values"), _$$slider4 = listpage_slicedToArray(_$$slider3, 2), rate1 = _$$slider4[0], rate2 = _$$slider4[1], _$$slider5 = $("#tAgeSlider").slider("values"), _$$slider6 = listpage_slicedToArray(_$$slider5, 2), age1 = _$$slider6[0], age2 = _$$slider6[1], _$$slider7 = $("#fcSlider").slider("values"), _$$slider8 = listpage_slicedToArray(_$$slider7, 2), fc1 = _$$slider8[0], fc2 = _$$slider8[1];
            return {
                l1,
                l2,
                rate1,
                rate2,
                age1,
                age2,
                fc1,
                fc2
            };
        }
        function getTeacherInfoFromListPageUI(jqEl) {
            var label = getLabelCount(jqEl.find(".label")), labels = getLabelByItems(jqEl.find(".label>span")), name = jqEl.find(".teacher-name").text(), type = $(".s-t-top-list .li-active").text(), batchNumber = getBatchNumber();
            if (type == "收藏外教") {
                var isFavorite = true;
                return {
                    label,
                    name,
                    batchNumber,
                    isFavorite,
                    labels
                };
            } else return {
                label,
                name,
                batchNumber,
                type,
                labels
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
                            停止获取: function 停止获取() {
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
                        var jqEl = $(el), tid = getTId(jqEl.find(".teacher-details-link a").attr("href")), tInfoKey = "tinfo-" + tid, tinfo = getTeacherInfoFromListPageUI(jqEl), tinfo_saved = GM_getValue(tInfoKey);
                        if (tinfo_saved) {
                            var now = Date.now();
                            if (!tinfo_saved.updateTime) {
                                tinfo_saved.updateTime = new Date(1970, 1, 1).getTime();
                            }
                            tinfo = $.extend({}, tinfo_saved, tinfo);
                            if (now - tinfo_saved.updateTime < configExprMilliseconds) {
                                updateTeacherInfoToUI(jqEl, tinfo);
                                GM_setValue(tInfoKey, tinfo);
                                next();
                                return true;
                            }
                        }
                        var start = Date.now();
                        $.ajax({
                            url: "".concat(window.location.protocol, "//").concat(window.location.host, "/TeacherNew/teacherComment?tid=").concat(tid, "&type=bad&has_msg=1"),
                            type: "GET",
                            dateType: "html",
                            success: function success(r) {
                                var jqr = $(r);
                                tinfo = getTeacherInfoFromDetailPage(tinfo, jqr, {});
                                jqr.remove();
                                updateTeacherInfoToUI(jqEl, tinfo);
                                GM_setValue(tInfoKey, tinfo);
                            },
                            error: function error(data) {
                                console.debug("xhr error when getting teacher " + JSON.stringify(jqEl) + ",error msg:" + JSON.stringify(data));
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
                        if (isStopShowBoxAndAutoGetNextTimeTeachers()) return;
                    } else {
                        $(".s-t-page .next-page")[0].click();
                        return false;
                    }
                } else {
                    if (isStopShowBoxAndAutoGetNextTimeTeachers()) return;
                }
                next();
            }));
        }
        function isStopShowBoxAndAutoGetNextTimeTeachers() {
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
            var container = $("#timesMultipleCheck"), inputs = container.find("input"), id = inputs.length + 1;
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
        function processTeacherDetailPage(jqr) {
            var tinfo_saved = GM_getValue(getInfoKey(), {});
            tinfo_saved = getTeacherInfoFromDetailPage(tinfo_saved, jqr, {});
            GM_setValue(getInfoKey(), tinfo_saved);
        }
        if (settings.isDetailPage) {
            common_submit((function(next) {
                processTeacherDetailPage($(document));
                next();
            }));
        }
        var pacesetup = __webpack_require__(895);
        var code = '<div id="filterDialog" title="Teacher Filter"> <div id="tabs"> <div> <ul> <li><a href="#tabs-1">Search Teachers</a></li> <li><a href="#tabs-2">Sorted Teachers</a></li> </ul> <br/> <div id="filterButtons"> <div id="buttons" style="text-align:center"> <button id="asc" title="当前为降序，点击后按升序排列">升序</button> <button id="desc" title="当前为升序，点击进行降序排列" style="display:none">降序</button> <input id="tInfoExprHours" title="缓存过期时间（小时）"/> <button title="清空缓存，并重新搜索">清除缓存</button> <a>报告BUG</a> <a>帮助</a> </div> <div id="buttons1" style="text-align:center"> <div id="timesMultipleCheck"></div> <button>反选时间段</button> <button id="autogettodaysteachers" title="自动获取上述选择时段的全部教师并缓存">获取选定时段老师</button> </div> </div> </div> <div id="tabs-1"> 当前可选 <span id="tCount"></span> 位,被折叠 <span id="tHideCount"></span> 位。 <br/> 有效经验值 <span id="_tLabelCount"></span> <br/> <div id="labelSlider"></div> 收藏数 <span id="_tfc"></span> <br/> <div id="fcSlider"></div> 好评率 <span id="_thumbUpRate"></span> <br/> <div id="thumbUpRateSlider"></div> 年龄 <span id="_tAge"></span> <br/> <div id="tAgeSlider"></div> </div> <div id="tabs-2"> <table id="teacherTab"> <caption></caption> <th id="vwswslwo"></th> </table> <div id="pager5"></div> </div> </div> </div> ';
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
        }, sortElementsByIndicator = function sortElementsByIndicator(sortBy) {
            var container = $(".s-t-content.f-cb"), sortedElements = container.find(".item").detach().sort(sortBy);
            container.append(sortedElements);
        };
        function getCachedTeachers() {
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
                var colorIf = "";
                if (t.rank <= conf.markRankRed) {
                    colorIf = "style = 'color:red'";
                }
                return "<label title='在同类别教师中的排名' ".concat(colorIf, "> ").concat(t.rank, "名</label>");
            } else {
                return "<label title='未找到该教师' > N名</label>";
            }
        }
        if (settings.isListPage || settings.isDetailPage) {
            common_submit((function(next) {
                try {
                    var config = GM_getValue("filterConfig", {
                        l1: minLabel !== null && minLabel !== void 0 ? minLabel : 300,
                        l2: maxLabel !== null && maxLabel !== void 0 ? maxLabel : 200,
                        rate1: minRate !== null && minRate !== void 0 ? minRate : 97,
                        rate2: maxRate !== null && maxRate !== void 0 ? maxRate : 100,
                        age1: minAge !== null && minAge !== void 0 ? minAge : 0,
                        age2: maxAge !== null && maxAge !== void 0 ? maxAge : 100,
                        fc1: minFc !== null && minFc !== void 0 ? minFc : 0,
                        fc2: maxFc !== null && maxFc !== void 0 ? maxFc : 999999
                    });
                    $("body").append(pluginUITemplate);
                    if (!settings.isListPage) {
                        $("#filterButtons").hide();
                    }
                    $("body").append("<div id='teacherListDialog' style='display:none;'></div>");
                    $("body").append("<div id='wwwww'>已加载选课辅助插件。</div>");
                    $("#labelSlider").slider({
                        range: true,
                        min: minLabel - 1,
                        max: maxLabel + 1,
                        values: [ config.l1 < minLabel - 1 ? minLabel - 1 : config.l1, maxLabel ],
                        slide: function slide(event, ui) {
                            $("#_tLabelCount").html(ui.values[0] + " - " + ui.values[1]);
                        }
                    }).on("slidestop", (function(event, ui) {
                        var l = $(this).slider("values"), uiFilters = getUiFilters(), filterConfig = GM_getValue("filterConfig", uiFilters);
                        filterConfig.l1 = l[0];
                        filterConfig.l2 = l[1];
                        GM_setValue("filterConfig", filterConfig);
                        executeFilters(uiFilters);
                    }));
                    $("#fcSlider").slider({
                        range: true,
                        min: minFc - 1,
                        max: maxFc + 1,
                        values: [ config.fc1, config.fc2 ],
                        slide: function slide(event, ui) {
                            $("#_tfc").html(ui.values[0] + " - " + ui.values[1]);
                        }
                    }).on("slidestop", (function(event, ui) {
                        var fc = $(this).slider("values"), uiFilters = getUiFilters(), filterConfig = GM_getValue("filterConfig", uiFilters);
                        filterConfig.fc1 = fc[0];
                        filterConfig.fc2 = fc[1];
                        GM_setValue("filterConfig", filterConfig);
                        executeFilters(uiFilters);
                    }));
                    $("#thumbUpRateSlider").slider({
                        range: true,
                        min: minRate,
                        max: maxRate,
                        values: [ config.rate1, config.rate2 ],
                        slide: function slide(_event, ui) {
                            $("#_thumbUpRate").html(ui.values[0] + "% - " + ui.values[1] + "%");
                        }
                    }).on("slidestop", (function(event, ui) {
                        var rate = $("#thumbUpRateSlider").slider("values"), uiFilters = getUiFilters(), filterConfig = GM_getValue("filterConfig", uiFilters);
                        filterConfig.rate1 = rate[0];
                        filterConfig.rate2 = rate[1];
                        GM_setValue("filterConfig", filterConfig);
                        executeFilters(uiFilters);
                    }));
                    $("#tAgeSlider").slider({
                        range: true,
                        min: minAge,
                        max: maxAge,
                        values: [ config.age1 < minAge ? minAge : config.age1, config.age2 > maxAge ? maxAge : config.age2 ],
                        slide: function slide(event, ui) {
                            $("#_tAge").html(ui.values[0] + " - " + ui.values[1]);
                        }
                    }).on("slidestop", (function(event, ui) {
                        var age = $(this).slider("values"), uiFilters = getUiFilters(), filterConfig = GM_getValue("filterConfig", uiFilters);
                        filterConfig.age1 = age[0];
                        filterConfig.age2 = age[1];
                        GM_setValue("filterConfig", filterConfig);
                        executeFilters(uiFilters);
                    }));
                    $("#buttons>button,#buttons>input,#buttons>a").eq(0).button({
                        icon: "ui-icon-arrowthick-1-n",
                        showLabel: true
                    }).click((function() {
                        $("#desc").show();
                        $(this).hide();
                        sortElementsByIndicator(asc);
                    })).end().eq(1).button({
                        icon: "ui-icon-arrowthick-1-s",
                        showLabel: true
                    }).click((function() {
                        $("#asc").show();
                        $(this).hide();
                        sortElementsByIndicator(desc);
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
                        $("#timesMultipleCheck>input").each((function(i, item) {
                            $(item).prop("checked", !$(item).is(":checked")).change();
                        }));
                    })).end().eq(1).button({
                        icon: "ui-icon-seek-next",
                        showLabel: true
                    }).click((function() {
                        selectedTimeSlots = [];
                        $("#timesMultipleCheck>input").each((function(i, item) {
                            if ($(item).is(":checked")) {
                                selectedTimeSlots.push($(item).val());
                            }
                        }));
                        setSession("selectedTimeSlots", selectedTimeSlots);
                        setSession("selectedTimeSlotsTotal", selectedTimeSlots.length);
                        isStopShowBoxAndAutoGetNextTimeTeachers();
                    })).end();
                    $("div.condition-type:eq(0)>ul.condition-type-time>li").each((function(i, item) {
                        addCheckbox($(item).attr("data-val"), $(item).text());
                    }));
                    var timesStr = sessionStorage.getItem("selectedTimeSlots"), selectedTimeSlots = [];
                    if (timesStr) {
                        selectedTimeSlots = JSON.parse(timesStr);
                        if (selectedTimeSlots.length > 0) {
                            var i = selectedTimeSlots.length;
                            while (i--) {
                                $("#timesMultipleCheck>input[value='" + selectedTimeSlots[i] + "']").attr("checked", true);
                            }
                        } else {
                            $("#timesMultipleCheck>input[value='" + $("input[name='selectTime']").val() + "']").attr("checked", true);
                        }
                    } else {
                        $("#timesMultipleCheck>input[value='" + $("input[name='selectTime']").val() + "']").attr("checked", true);
                    }
                    $("#timesMultipleCheck").find("input").checkboxradio({
                        icon: false
                    });
                    $("#tabs").tabs({
                        active: "#tabs-2",
                        activate: function activate(event, ui) {
                            if (ui.newPanel.attr("id") != "tabs-2") return;
                            var teachers = getCachedTeachers();
                            $("#teacherTab").jqGrid({
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
                                        var date = dayjs_min_default()(value);
                                        if (date.isValid()) {
                                            return "<span title='".concat(date.format("YY-M-D H:m:s"), "'>").concat(date.format("HHmmss"), "</span>");
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
                                    name: "isFavorite",
                                    index: "isFavorite",
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
                                    name: "thumbUpRate",
                                    index: "thumbUpRate",
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
                                    name: "sLevel",
                                    index: "sLevel",
                                    width: 85,
                                    sorttype: "string",
                                    align: "left",
                                    searchoptions: {
                                        sopt: [ "cn", "nc" ]
                                    }
                                }, {
                                    name: "tAge",
                                    index: "tAge",
                                    width: 25,
                                    sorttype: "float",
                                    align: "right",
                                    searchoptions: {
                                        sopt: [ "ge" ]
                                    }
                                }, {
                                    name: "thumbUp",
                                    index: "thumbUp",
                                    width: 45,
                                    align: "right",
                                    sorttype: "float",
                                    searchoptions: {
                                        sopt: [ "ge" ]
                                    }
                                }, {
                                    name: "thumbDown",
                                    index: "thumbDown",
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
                                    var jqEl = $(item), tid = jqEl.find(".teacher-details-link a").attr("href").replace("".concat(window.location.protocol, "//").concat(window.location.host, "/TeacherNew/info/"), ""), t = teachers.find((function(currentValue, index, arr) {
                                        return currentValue.tid == tid;
                                    })), lb = jqEl.find(".teacher-name>label:eq(3)");
                                    if (lb.length == 0) jqEl.find(".teacher-name").html("".concat(jqEl.find(".teacher-name").html(), "| ").concat(getRankHtml(t))); else lb.replaceWith(getRankHtml(t));
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
                    var uiFilters_top = getUiFilters();
                    executeFilters(uiFilters_top);
                    $("#_tAge").html(uiFilters_top.age1 + " - " + uiFilters_top.age2);
                    $("#_tLabelCount").html(uiFilters_top.l1 + " - " + uiFilters_top.l2);
                    $("#_tfc").html(uiFilters_top.fc1 + " - " + uiFilters_top.fc2 + "");
                    $("#_thumbUpRate").html(uiFilters_top.rate1 + "% - " + uiFilters_top.rate2 + "%");
                } catch (ex) {
                    console.debug(ex + "");
                    throw ex;
                } finally {
                    next();
                }
            }));
            common_submit((function(next) {
                $(".s-t-list").before($(".s-t-page").prop("outerHTML"));
                $("#tabs>div:first").append($(".s-t-page").prop("outerHTML"));
                sortElementsByIndicator(desc);
                $("#tabs").tabs("option", "active", 1);
                if (settings.isDetailPage) {
                    $("#tabs").tabs("option", "disabled", [ 0 ]);
                }
                $("#filterDialog").dialog({
                    width: "850"
                });
                $("#filterDialog").parent().scrollFix();
                $("#filterDialog").dialog("open");
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
    })();
})();
//# sourceMappingURL=findingteacher.user.js.map