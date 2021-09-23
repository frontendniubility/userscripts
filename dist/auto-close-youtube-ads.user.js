// ==UserScript==
// @name        Auto Close YouTube Ads
// @version     2021.9.522174353
// @author      fuzetsu
// @description Close and/or Mute YouTube ads automatically!
// @homepage    https://github.com/niubilityfrontend/userscripts#readme
// @supportURL  https://github.com/niubilityfrontend/userscripts/issues
// @match       *://*.youtube.com/*
// @namespace   http://fuzetsu.acypa.com
// @exclude     *://*.youtube.com/subscribe_embed?*
// @grant       GM_getValue
// @grant       GM_setValue
// @grant       GM_deleteValue
// @grant       GM_registerMenuCommand
// @require     https://gitcdn.xyz/repo/fuzetsu/userscripts/b38eabf72c20fa3cf7da84ecd2cefe0d4a2116be/wait-for-elements/wait-for-elements.js
// @require     https://gitcdn.xyz/repo/kufii/My-UserScripts/fa4555701cf5a22eae44f06d9848df6966788fa8/libs/gm_config.js
// @downloadURL https://raw.githubusercontent.com/niubilityfrontend/userscripts/master/dist/auto-close-youtube-ads.user.js
// @updateURL   https://raw.githubusercontent.com/niubilityfrontend/userscripts/master/dist/auto-close-youtube-ads.meta.js
// ==/UserScript==

(() => {
    var __webpack_modules__ = {
        4455: module => {
            "use strict";
            module.exports = ansiHTML;
            var _regANSI = /(?:(?:\u001b\[)|\u009b)(?:(?:[0-9]{1,3})?(?:(?:;[0-9]{0,3})*)?[A-M|f-m])|\u001b[A-M]/;
            var _defColors = {
                reset: [ "fff", "000" ],
                black: "000",
                red: "ff0000",
                green: "209805",
                yellow: "e8bf03",
                blue: "0000ff",
                magenta: "ff00ff",
                cyan: "00ffee",
                lightgrey: "f0f0f0",
                darkgrey: "888"
            };
            var _styles = {
                30: "black",
                31: "red",
                32: "green",
                33: "yellow",
                34: "blue",
                35: "magenta",
                36: "cyan",
                37: "lightgrey"
            };
            var _openTags = {
                1: "font-weight:bold",
                2: "opacity:0.5",
                3: "<i>",
                4: "<u>",
                8: "display:none",
                9: "<del>"
            };
            var _closeTags = {
                23: "</i>",
                24: "</u>",
                29: "</del>"
            };
            [ 0, 21, 22, 27, 28, 39, 49 ].forEach((function(n) {
                _closeTags[n] = "</span>";
            }));
            function ansiHTML(text) {
                if (!_regANSI.test(text)) {
                    return text;
                }
                var ansiCodes = [];
                var ret = text.replace(/\033\[(\d+)*m/g, (function(match, seq) {
                    var ot = _openTags[seq];
                    if (ot) {
                        if (!!~ansiCodes.indexOf(seq)) {
                            ansiCodes.pop();
                            return "</span>";
                        }
                        ansiCodes.push(seq);
                        return ot[0] === "<" ? ot : '<span style="' + ot + ';">';
                    }
                    var ct = _closeTags[seq];
                    if (ct) {
                        ansiCodes.pop();
                        return ct;
                    }
                    return "";
                }));
                var l = ansiCodes.length;
                l > 0 && (ret += Array(l + 1).join("</span>"));
                return ret;
            }
            ansiHTML.setColors = function(colors) {
                if (typeof colors !== "object") {
                    throw new Error("`colors` parameter must be an Object.");
                }
                var _finalColors = {};
                for (var key in _defColors) {
                    var hex = colors.hasOwnProperty(key) ? colors[key] : null;
                    if (!hex) {
                        _finalColors[key] = _defColors[key];
                        continue;
                    }
                    if ("reset" === key) {
                        if (typeof hex === "string") {
                            hex = [ hex ];
                        }
                        if (!Array.isArray(hex) || hex.length === 0 || hex.some((function(h) {
                            return typeof h !== "string";
                        }))) {
                            throw new Error("The value of `" + key + "` property must be an Array and each item could only be a hex string, e.g.: FF0000");
                        }
                        var defHexColor = _defColors[key];
                        if (!hex[0]) {
                            hex[0] = defHexColor[0];
                        }
                        if (hex.length === 1 || !hex[1]) {
                            hex = [ hex[0] ];
                            hex.push(defHexColor[1]);
                        }
                        hex = hex.slice(0, 2);
                    } else if (typeof hex !== "string") {
                        throw new Error("The value of `" + key + "` property must be a hex string, e.g.: FF0000");
                    }
                    _finalColors[key] = hex;
                }
                _setTags(_finalColors);
            };
            ansiHTML.reset = function() {
                _setTags(_defColors);
            };
            ansiHTML.tags = {};
            if (Object.defineProperty) {
                Object.defineProperty(ansiHTML.tags, "open", {
                    get: function() {
                        return _openTags;
                    }
                });
                Object.defineProperty(ansiHTML.tags, "close", {
                    get: function() {
                        return _closeTags;
                    }
                });
            } else {
                ansiHTML.tags.open = _openTags;
                ansiHTML.tags.close = _closeTags;
            }
            function _setTags(colors) {
                _openTags["0"] = "font-weight:normal;opacity:1;color:#" + colors.reset[0] + ";background:#" + colors.reset[1];
                _openTags["7"] = "color:#" + colors.reset[1] + ";background:#" + colors.reset[0];
                _openTags["90"] = "color:#" + colors.darkgrey;
                for (var code in _styles) {
                    var color = _styles[code];
                    var oriColor = colors[color] || "000";
                    _openTags[code] = "color:#" + oriColor;
                    code = parseInt(code);
                    _openTags[(code + 10).toString()] = "background:#" + oriColor;
                }
            }
            ansiHTML.reset();
        },
        1725: () => {
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
            var CSS = {
                skipButton: ".videoAdUiSkipButton,.ytp-ad-skip-button",
                preSkipButton: ".videoAdUiPreSkipButton,.ytp-ad-preview-container",
                closeBannerAd: ".close-padding.contains-svg,a.close-button,.ytp-ad-overlay-close-button",
                muteButton: ".ytp-mute-button",
                muteIndicator: ".ytp-volume-slider-handle",
                adArea: ".videoAdUi,.ytp-ad-player-overlay",
                adLength: ".videoAdUiAttribution,.ytp-ad-duration-remaining",
                homeAdContainer: "#masthead-ad"
            }, util = {
                log: function log() {
                    for (var _console, _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                        args[_key] = arguments[_key];
                    }
                    return (_console = console).log.apply(_console, [ "%c".concat(SCRIPT_NAME, ":"), "font-weight: bold;color: purple;" ].concat(args));
                },
                clearTicks: function clearTicks(ticks) {
                    ticks.forEach((function(tick) {
                        return !tick ? null : typeof tick === "number" ? clearInterval(tick) : tick.stop();
                    }));
                    ticks.length = 0;
                },
                keepTrying: function keepTrying(wait, action) {
                    var tick = setInterval((function() {
                        return action() && clearInterval(tick);
                    }), wait);
                    return tick;
                },
                storeGet: function storeGet(key) {
                    if (typeof GM_getValue === "undefined") {
                        var value = localStorage.getItem(key);
                        return value === "true" ? true : value === "false" ? false : value;
                    }
                    return GM_getValue(key);
                },
                storeSet: function storeSet(key, value) {
                    return typeof GM_setValue === "undefined" ? localStorage.setItem(key, value) : GM_setValue(key, value);
                },
                storeDel: function storeDel(key) {
                    return typeof GM_deleteValue === "undefined" ? localStorage.removeItem(key) : GM_deleteValue(key);
                },
                q: function q(query, context) {
                    return (context || document).querySelector(query);
                },
                qq: function qq(query, context) {
                    return Array.from((context || document).querySelectorAll(query));
                },
                get: function get(obj, str) {
                    return util.getPath(obj, str.split(".").reverse());
                },
                getPath: function getPath(obj, path) {
                    return obj == null ? null : path.length > 0 ? util.getPath(obj[path.pop()], path) : obj;
                }
            }, SCRIPT_NAME = "Auto Close YouTube Ads", SHORT_AD_MSG_LENGTH = 12e3, TICKS = [], DONT_SKIP = false, config = GM_config([ {
                key: "muteAd",
                label: "Mute ads?",
                type: "bool",
                default: true
            }, {
                key: "hideAd",
                label: "Hide video ads?",
                type: "bool",
                default: false
            }, {
                key: "secWaitBanner",
                label: "Banner ad close delay (seconds)",
                type: "number",
                default: 3,
                min: 0
            }, {
                key: "secWaitVideo",
                label: "Video ad skip delay (seconds)",
                type: "number",
                default: 3,
                min: 0
            }, {
                key: "minAdLengthForSkip",
                label: "Dont skip video shorter than this (seconds)",
                type: "number",
                default: 0,
                min: 0
            }, {
                key: "muteEvenIfNotSkipping",
                label: "Mute video even if not skipping",
                type: "bool",
                default: true
            }, {
                key: "debug",
                label: "Show extra debug information.",
                type: "bool",
                default: false
            }, {
                key: "version",
                type: "hidden",
                default: 1
            } ]), configVersion = 2, conf = config.load();
            config.onsave = function(cfg) {
                return conf = cfg;
            };
            function upgradeConfig() {
                var lastVersion;
                while (conf.version < configVersion && lastVersion !== conf.version) {
                    util.log("upgrading config version, current = ", conf.version, ", target = ", configVersion);
                    lastVersion = conf.version;
                    switch (conf.version) {
                      case 1:
                        {
                            var oldConf = {
                                muteAd: util.storeGet("MUTE_AD"),
                                hideAd: util.storeGet("HIDE_AD"),
                                secWait: util.storeGet("SEC_WAIT")
                            };
                            if (oldConf.muteAd != null) conf.muteAd = !!oldConf.muteAd;
                            if (oldConf.hideAd != null) conf.hideAd = !!oldConf.hideAd;
                            if (oldConf.secWait != null && !isNaN(oldConf.secWait)) conf.secWaitBanner = conf.secWaitVideo = parseInt(oldConf.secWait);
                            conf.version = 2;
                            config.save(conf);
                            [ "SEC_WAIT", "HIDE_AD", "MUTE_AD" ].forEach(util.storeDel);
                            break;
                        }
                    }
                }
            }
            upgradeConfig();
            function createMessageElement() {
                var elem = document.createElement("div");
                elem.setAttribute("style", "border: 1px solid white;border-right: none;background: rgb(0,0,0,0.75);color:white;position: absolute;right: 0;z-index: 1000;top: 10px;padding: 10px;padding-right: 20px;cursor: pointer;pointer-events: all;");
                return elem;
            }
            function showMessage(container, text, ms) {
                var message = createMessageElement();
                message.textContent = text;
                container.appendChild(message);
                util.log("showing message [".concat(ms, "ms]: ").concat(text));
                setTimeout((function() {
                    return message.remove();
                }), ms);
            }
            function setupCancelDiv(ad) {
                var skipArea = util.q(CSS.preSkipButton, ad), skipText = skipArea && skipArea.textContent.trim().replace(/\s+/g, " ");
                if (skipText && ![ "will begin", "will play" ].some((function(snip) {
                    return skipText.includes(snip);
                }))) {
                    var cancelClass = "acya-cancel-skip", cancelDiv = util.q("." + cancelClass);
                    if (cancelDiv) cancelDiv.remove();
                    cancelDiv = createMessageElement();
                    cancelDiv.className = cancelClass;
                    cancelDiv.textContent = (conf.muteAd ? "Un-mute & " : "") + "Cancel Auto Skip";
                    cancelDiv.onclick = function() {
                        util.log("cancel clicked");
                        DONT_SKIP = true;
                        cancelDiv.remove();
                        var muteButton = getMuteButton(), muteIndicator = getMuteIndicator();
                        if (conf.muteAd && muteButton && muteIndicator && isMuted(muteIndicator)) muteButton.click();
                    };
                    ad.appendChild(cancelDiv);
                } else {
                    util.log("skip button area wasn't there for some reason.. couldn't place cancel button.");
                }
            }
            function parseTime(str) {
                var _str$split$pop$split$ = str.split(" ").pop().split(":").map((function(num) {
                    return parseInt(num);
                })), _str$split$pop$split$2 = _slicedToArray(_str$split$pop$split$, 2), minutes = _str$split$pop$split$2[0], seconds = _str$split$pop$split$2[1];
                util.log(str, minutes, seconds);
                return minutes * 60 + seconds || 0;
            }
            var getMuteButton = function getMuteButton() {
                return util.q(CSS.muteButton);
            }, getMuteIndicator = function getMuteIndicator() {
                return util.q(CSS.muteIndicator);
            }, isMuted = function isMuted(m) {
                return m.style.left === "0px";
            };
            function getAdLength(ad) {
                if (!ad) return 0;
                var time = ad.querySelector(CSS.adLength);
                return time ? parseTime(time.textContent) : 0;
            }
            function waitForAds() {
                DONT_SKIP = false;
                TICKS.push(waitForElems({
                    sel: CSS.skipButton,
                    onmatch: function onmatch(btn) {
                        util.log("found skip button");
                        util.keepTrying(500, (function() {
                            if (!btn) return true;
                            if (btn.offsetParent === null) return;
                            setTimeout((function() {
                                if (DONT_SKIP) {
                                    util.log("not skipping...");
                                    DONT_SKIP = false;
                                    return;
                                }
                                util.log("clicking skip button");
                                btn.click();
                            }), conf.secWaitVideo * 1e3);
                            return true;
                        }));
                    }
                }), waitAndClick(CSS.closeBannerAd, conf.secWaitBanner * 1e3), waitForElems({
                    sel: CSS.adArea,
                    onmatch: function onmatch(ad) {
                        DONT_SKIP = false;
                        var adLength = getAdLength(ad), isShort = adLength < conf.minAdLengthForSkip, debug = function debug() {
                            return conf.debug ? "[DEBUG adLength = ".concat(adLength, ", minAdLengthForSkip = ").concat(conf.minAdLengthForSkip, "]") : "";
                        };
                        if (isShort && !conf.muteEvenIfNotSkipping) {
                            DONT_SKIP = true;
                            return showMessage(ad, "Shot AD detected, will not skip or mute. ".concat(debug()), SHORT_AD_MSG_LENGTH);
                        }
                        if (conf.hideAd) {
                            ad.style.zIndex = 10;
                            ad.style.background = "black";
                        }
                        if (!isShort) setupCancelDiv(ad);
                        if (!conf.muteAd) return;
                        var muteButton = getMuteButton(), muteIndicator = getMuteIndicator();
                        if (!muteIndicator) return util.log("unable to determine mute state, skipping mute");
                        muteButton.click();
                        util.log("Video ad detected, muting audio");
                        util.keepTrying(250, (function() {
                            if (!util.q(CSS.adArea)) {
                                if (isMuted(muteIndicator)) {
                                    muteButton.click();
                                    util.log("Video ad ended, unmuting audio");
                                } else {
                                    util.log("Video ad ended, audio already unmuted");
                                }
                                return true;
                            }
                        }));
                        if (isShort) {
                            DONT_SKIP = true;
                            return showMessage(ad, "Short AD detected, will not skip but will mute. ".concat(debug()), SHORT_AD_MSG_LENGTH);
                        }
                    }
                }));
            }
            var waitAndClick = function waitAndClick(sel, ms, cb) {
                return waitForElems({
                    sel,
                    onmatch: function onmatch(btn) {
                        util.log("Found ad, closing in", ms, "ms");
                        setTimeout((function() {
                            btn.click();
                            if (cb) cb(btn);
                        }), ms);
                    }
                });
            };
            util.log("Started");
            if (window.self === window.top) {
                var videoUrl;
                waitForElems({
                    sel: CSS.homeAdContainer,
                    onmatch: function onmatch(ad) {
                        return ad.remove();
                    }
                });
                waitForUrl(/^https:\/\/www\.youtube\.com\/watch\?.*v=.+/, (function() {
                    if (videoUrl && location.href !== videoUrl) {
                        util.log("Changed video, removing old wait");
                        util.clearTicks(TICKS);
                    }
                    videoUrl = location.href;
                    util.log("Entered video, waiting for ads");
                    waitForAds();
                    TICKS.push(waitForUrl((function(url) {
                        return url !== videoUrl;
                    }), (function() {
                        videoUrl = null;
                        util.clearTicks(TICKS);
                        util.log("Left video, stopped waiting for ads");
                    }), true));
                }));
            } else {
                if (/^https:\/\/www\.youtube\.com\/embed\//.test(location.href)) {
                    util.log("Found embedded video, waiting for ads");
                    waitForAds();
                }
            }
            GM_registerMenuCommand("Auto Close Youtube Ads - Manage Settings", config.setup);
        },
        7187: module => {
            "use strict";
            var R = typeof Reflect === "object" ? Reflect : null;
            var ReflectApply = R && typeof R.apply === "function" ? R.apply : function ReflectApply(target, receiver, args) {
                return Function.prototype.apply.call(target, receiver, args);
            };
            var ReflectOwnKeys;
            if (R && typeof R.ownKeys === "function") {
                ReflectOwnKeys = R.ownKeys;
            } else if (Object.getOwnPropertySymbols) {
                ReflectOwnKeys = function ReflectOwnKeys(target) {
                    return Object.getOwnPropertyNames(target).concat(Object.getOwnPropertySymbols(target));
                };
            } else {
                ReflectOwnKeys = function ReflectOwnKeys(target) {
                    return Object.getOwnPropertyNames(target);
                };
            }
            function ProcessEmitWarning(warning) {
                if (console && console.warn) console.warn(warning);
            }
            var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
                return value !== value;
            };
            function EventEmitter() {
                EventEmitter.init.call(this);
            }
            module.exports = EventEmitter;
            module.exports.once = once;
            EventEmitter.EventEmitter = EventEmitter;
            EventEmitter.prototype._events = undefined;
            EventEmitter.prototype._eventsCount = 0;
            EventEmitter.prototype._maxListeners = undefined;
            var defaultMaxListeners = 10;
            function checkListener(listener) {
                if (typeof listener !== "function") {
                    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
                }
            }
            Object.defineProperty(EventEmitter, "defaultMaxListeners", {
                enumerable: true,
                get: function() {
                    return defaultMaxListeners;
                },
                set: function(arg) {
                    if (typeof arg !== "number" || arg < 0 || NumberIsNaN(arg)) {
                        throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + ".");
                    }
                    defaultMaxListeners = arg;
                }
            });
            EventEmitter.init = function() {
                if (this._events === undefined || this._events === Object.getPrototypeOf(this)._events) {
                    this._events = Object.create(null);
                    this._eventsCount = 0;
                }
                this._maxListeners = this._maxListeners || undefined;
            };
            EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
                if (typeof n !== "number" || n < 0 || NumberIsNaN(n)) {
                    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + ".");
                }
                this._maxListeners = n;
                return this;
            };
            function _getMaxListeners(that) {
                if (that._maxListeners === undefined) return EventEmitter.defaultMaxListeners;
                return that._maxListeners;
            }
            EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
                return _getMaxListeners(this);
            };
            EventEmitter.prototype.emit = function emit(type) {
                var args = [];
                for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
                var doError = type === "error";
                var events = this._events;
                if (events !== undefined) doError = doError && events.error === undefined; else if (!doError) return false;
                if (doError) {
                    var er;
                    if (args.length > 0) er = args[0];
                    if (er instanceof Error) {
                        throw er;
                    }
                    var err = new Error("Unhandled error." + (er ? " (" + er.message + ")" : ""));
                    err.context = er;
                    throw err;
                }
                var handler = events[type];
                if (handler === undefined) return false;
                if (typeof handler === "function") {
                    ReflectApply(handler, this, args);
                } else {
                    var len = handler.length;
                    var listeners = arrayClone(handler, len);
                    for (var i = 0; i < len; ++i) ReflectApply(listeners[i], this, args);
                }
                return true;
            };
            function _addListener(target, type, listener, prepend) {
                var m;
                var events;
                var existing;
                checkListener(listener);
                events = target._events;
                if (events === undefined) {
                    events = target._events = Object.create(null);
                    target._eventsCount = 0;
                } else {
                    if (events.newListener !== undefined) {
                        target.emit("newListener", type, listener.listener ? listener.listener : listener);
                        events = target._events;
                    }
                    existing = events[type];
                }
                if (existing === undefined) {
                    existing = events[type] = listener;
                    ++target._eventsCount;
                } else {
                    if (typeof existing === "function") {
                        existing = events[type] = prepend ? [ listener, existing ] : [ existing, listener ];
                    } else if (prepend) {
                        existing.unshift(listener);
                    } else {
                        existing.push(listener);
                    }
                    m = _getMaxListeners(target);
                    if (m > 0 && existing.length > m && !existing.warned) {
                        existing.warned = true;
                        var w = new Error("Possible EventEmitter memory leak detected. " + existing.length + " " + String(type) + " listeners " + "added. Use emitter.setMaxListeners() to " + "increase limit");
                        w.name = "MaxListenersExceededWarning";
                        w.emitter = target;
                        w.type = type;
                        w.count = existing.length;
                        ProcessEmitWarning(w);
                    }
                }
                return target;
            }
            EventEmitter.prototype.addListener = function addListener(type, listener) {
                return _addListener(this, type, listener, false);
            };
            EventEmitter.prototype.on = EventEmitter.prototype.addListener;
            EventEmitter.prototype.prependListener = function prependListener(type, listener) {
                return _addListener(this, type, listener, true);
            };
            function onceWrapper() {
                if (!this.fired) {
                    this.target.removeListener(this.type, this.wrapFn);
                    this.fired = true;
                    if (arguments.length === 0) return this.listener.call(this.target);
                    return this.listener.apply(this.target, arguments);
                }
            }
            function _onceWrap(target, type, listener) {
                var state = {
                    fired: false,
                    wrapFn: undefined,
                    target,
                    type,
                    listener
                };
                var wrapped = onceWrapper.bind(state);
                wrapped.listener = listener;
                state.wrapFn = wrapped;
                return wrapped;
            }
            EventEmitter.prototype.once = function once(type, listener) {
                checkListener(listener);
                this.on(type, _onceWrap(this, type, listener));
                return this;
            };
            EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
                checkListener(listener);
                this.prependListener(type, _onceWrap(this, type, listener));
                return this;
            };
            EventEmitter.prototype.removeListener = function removeListener(type, listener) {
                var list, events, position, i, originalListener;
                checkListener(listener);
                events = this._events;
                if (events === undefined) return this;
                list = events[type];
                if (list === undefined) return this;
                if (list === listener || list.listener === listener) {
                    if (--this._eventsCount === 0) this._events = Object.create(null); else {
                        delete events[type];
                        if (events.removeListener) this.emit("removeListener", type, list.listener || listener);
                    }
                } else if (typeof list !== "function") {
                    position = -1;
                    for (i = list.length - 1; i >= 0; i--) {
                        if (list[i] === listener || list[i].listener === listener) {
                            originalListener = list[i].listener;
                            position = i;
                            break;
                        }
                    }
                    if (position < 0) return this;
                    if (position === 0) list.shift(); else {
                        spliceOne(list, position);
                    }
                    if (list.length === 1) events[type] = list[0];
                    if (events.removeListener !== undefined) this.emit("removeListener", type, originalListener || listener);
                }
                return this;
            };
            EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
            EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
                var listeners, events, i;
                events = this._events;
                if (events === undefined) return this;
                if (events.removeListener === undefined) {
                    if (arguments.length === 0) {
                        this._events = Object.create(null);
                        this._eventsCount = 0;
                    } else if (events[type] !== undefined) {
                        if (--this._eventsCount === 0) this._events = Object.create(null); else delete events[type];
                    }
                    return this;
                }
                if (arguments.length === 0) {
                    var keys = Object.keys(events);
                    var key;
                    for (i = 0; i < keys.length; ++i) {
                        key = keys[i];
                        if (key === "removeListener") continue;
                        this.removeAllListeners(key);
                    }
                    this.removeAllListeners("removeListener");
                    this._events = Object.create(null);
                    this._eventsCount = 0;
                    return this;
                }
                listeners = events[type];
                if (typeof listeners === "function") {
                    this.removeListener(type, listeners);
                } else if (listeners !== undefined) {
                    for (i = listeners.length - 1; i >= 0; i--) {
                        this.removeListener(type, listeners[i]);
                    }
                }
                return this;
            };
            function _listeners(target, type, unwrap) {
                var events = target._events;
                if (events === undefined) return [];
                var evlistener = events[type];
                if (evlistener === undefined) return [];
                if (typeof evlistener === "function") return unwrap ? [ evlistener.listener || evlistener ] : [ evlistener ];
                return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
            }
            EventEmitter.prototype.listeners = function listeners(type) {
                return _listeners(this, type, true);
            };
            EventEmitter.prototype.rawListeners = function rawListeners(type) {
                return _listeners(this, type, false);
            };
            EventEmitter.listenerCount = function(emitter, type) {
                if (typeof emitter.listenerCount === "function") {
                    return emitter.listenerCount(type);
                } else {
                    return listenerCount.call(emitter, type);
                }
            };
            EventEmitter.prototype.listenerCount = listenerCount;
            function listenerCount(type) {
                var events = this._events;
                if (events !== undefined) {
                    var evlistener = events[type];
                    if (typeof evlistener === "function") {
                        return 1;
                    } else if (evlistener !== undefined) {
                        return evlistener.length;
                    }
                }
                return 0;
            }
            EventEmitter.prototype.eventNames = function eventNames() {
                return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
            };
            function arrayClone(arr, n) {
                var copy = new Array(n);
                for (var i = 0; i < n; ++i) copy[i] = arr[i];
                return copy;
            }
            function spliceOne(list, index) {
                for (;index + 1 < list.length; index++) list[index] = list[index + 1];
                list.pop();
            }
            function unwrapListeners(arr) {
                var ret = new Array(arr.length);
                for (var i = 0; i < ret.length; ++i) {
                    ret[i] = arr[i].listener || arr[i];
                }
                return ret;
            }
            function once(emitter, name) {
                return new Promise((function(resolve, reject) {
                    function errorListener(err) {
                        emitter.removeListener(name, resolver);
                        reject(err);
                    }
                    function resolver() {
                        if (typeof emitter.removeListener === "function") {
                            emitter.removeListener("error", errorListener);
                        }
                        resolve([].slice.call(arguments));
                    }
                    eventTargetAgnosticAddListener(emitter, name, resolver, {
                        once: true
                    });
                    if (name !== "error") {
                        addErrorHandlerIfEventEmitter(emitter, errorListener, {
                            once: true
                        });
                    }
                }));
            }
            function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
                if (typeof emitter.on === "function") {
                    eventTargetAgnosticAddListener(emitter, "error", handler, flags);
                }
            }
            function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
                if (typeof emitter.on === "function") {
                    if (flags.once) {
                        emitter.once(name, listener);
                    } else {
                        emitter.on(name, listener);
                    }
                } else if (typeof emitter.addEventListener === "function") {
                    emitter.addEventListener(name, (function wrapListener(arg) {
                        if (flags.once) {
                            emitter.removeEventListener(name, wrapListener);
                        }
                        listener(arg);
                    }));
                } else {
                    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
                }
            }
        },
        9111: function(__unused_webpack_module, exports, __webpack_require__) {
            "use strict";
            var __assign = this && this.__assign || function() {
                __assign = Object.assign || function(t) {
                    for (var s, i = 1, n = arguments.length; i < n; i++) {
                        s = arguments[i];
                        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
                    }
                    return t;
                };
                return __assign.apply(this, arguments);
            };
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            var named_references_1 = __webpack_require__(7206);
            var numeric_unicode_map_1 = __webpack_require__(2642);
            var surrogate_pairs_1 = __webpack_require__(9726);
            var allNamedReferences = __assign(__assign({}, named_references_1.namedReferences), {
                all: named_references_1.namedReferences.html5
            });
            var encodeRegExps = {
                specialChars: /[<>'"&]/g,
                nonAscii: /(?:[<>'"&\u0080-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g,
                nonAsciiPrintable: /(?:[<>'"&\x01-\x08\x11-\x15\x17-\x1F\x7f-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g,
                extensive: /(?:[\x01-\x0c\x0e-\x1f\x21-\x2c\x2e-\x2f\x3a-\x40\x5b-\x60\x7b-\x7d\x7f-\uD7FF\uE000-\uFFFF]|[\uD800-\uDBFF][\uDC00-\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/g
            };
            var defaultEncodeOptions = {
                mode: "specialChars",
                level: "all",
                numeric: "decimal"
            };
            function encode(text, _a) {
                var _b = _a === void 0 ? defaultEncodeOptions : _a, _c = _b.mode, mode = _c === void 0 ? "specialChars" : _c, _d = _b.numeric, numeric = _d === void 0 ? "decimal" : _d, _e = _b.level, level = _e === void 0 ? "all" : _e;
                if (!text) {
                    return "";
                }
                var encodeRegExp = encodeRegExps[mode];
                var references = allNamedReferences[level].characters;
                var isHex = numeric === "hexadecimal";
                encodeRegExp.lastIndex = 0;
                var _b = encodeRegExp.exec(text);
                var _c;
                if (_b) {
                    _c = "";
                    var _d = 0;
                    do {
                        if (_d !== _b.index) {
                            _c += text.substring(_d, _b.index);
                        }
                        var _e = _b[0];
                        var result_1 = references[_e];
                        if (!result_1) {
                            var code_1 = _e.length > 1 ? surrogate_pairs_1.getCodePoint(_e, 0) : _e.charCodeAt(0);
                            result_1 = (isHex ? "&#x" + code_1.toString(16) : "&#" + code_1) + ";";
                        }
                        _c += result_1;
                        _d = _b.index + _e.length;
                    } while (_b = encodeRegExp.exec(text));
                    if (_d !== text.length) {
                        _c += text.substring(_d);
                    }
                } else {
                    _c = text;
                }
                return _c;
            }
            exports.encode = encode;
            var defaultDecodeOptions = {
                scope: "body",
                level: "all"
            };
            var strict = /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);/g;
            var attribute = /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+)[;=]?/g;
            var baseDecodeRegExps = {
                xml: {
                    strict,
                    attribute,
                    body: named_references_1.bodyRegExps.xml
                },
                html4: {
                    strict,
                    attribute,
                    body: named_references_1.bodyRegExps.html4
                },
                html5: {
                    strict,
                    attribute,
                    body: named_references_1.bodyRegExps.html5
                }
            };
            var decodeRegExps = __assign(__assign({}, baseDecodeRegExps), {
                all: baseDecodeRegExps.html5
            });
            var fromCharCode = String.fromCharCode;
            var outOfBoundsChar = fromCharCode(65533);
            var defaultDecodeEntityOptions = {
                level: "all"
            };
            function decodeEntity(entity, _a) {
                var _b = (_a === void 0 ? defaultDecodeEntityOptions : _a).level, level = _b === void 0 ? "all" : _b;
                if (!entity) {
                    return "";
                }
                var _b = entity;
                var decodeEntityLastChar_1 = entity[entity.length - 1];
                if (false) {} else if (false) {} else {
                    var decodeResultByReference_1 = allNamedReferences[level].entities[entity];
                    if (decodeResultByReference_1) {
                        _b = decodeResultByReference_1;
                    } else if (entity[0] === "&" && entity[1] === "#") {
                        var decodeSecondChar_1 = entity[2];
                        var decodeCode_1 = decodeSecondChar_1 == "x" || decodeSecondChar_1 == "X" ? parseInt(entity.substr(3), 16) : parseInt(entity.substr(2));
                        _b = decodeCode_1 >= 1114111 ? outOfBoundsChar : decodeCode_1 > 65535 ? surrogate_pairs_1.fromCodePoint(decodeCode_1) : fromCharCode(numeric_unicode_map_1.numericUnicodeMap[decodeCode_1] || decodeCode_1);
                    }
                }
                return _b;
            }
            exports.decodeEntity = decodeEntity;
            function decode(text, _a) {
                var decodeSecondChar_1 = _a === void 0 ? defaultDecodeOptions : _a, decodeCode_1 = decodeSecondChar_1.level, level = decodeCode_1 === void 0 ? "all" : decodeCode_1, _b = decodeSecondChar_1.scope, scope = _b === void 0 ? level === "xml" ? "strict" : "body" : _b;
                if (!text) {
                    return "";
                }
                var decodeRegExp = decodeRegExps[level][scope];
                var references = allNamedReferences[level].entities;
                var isAttribute = scope === "attribute";
                var isStrict = scope === "strict";
                decodeRegExp.lastIndex = 0;
                var replaceMatch_1 = decodeRegExp.exec(text);
                var replaceResult_1;
                if (replaceMatch_1) {
                    replaceResult_1 = "";
                    var replaceLastIndex_1 = 0;
                    do {
                        if (replaceLastIndex_1 !== replaceMatch_1.index) {
                            replaceResult_1 += text.substring(replaceLastIndex_1, replaceMatch_1.index);
                        }
                        var replaceInput_1 = replaceMatch_1[0];
                        var decodeResult_1 = replaceInput_1;
                        var decodeEntityLastChar_2 = replaceInput_1[replaceInput_1.length - 1];
                        if (isAttribute && decodeEntityLastChar_2 === "=") {
                            decodeResult_1 = replaceInput_1;
                        } else if (isStrict && decodeEntityLastChar_2 !== ";") {
                            decodeResult_1 = replaceInput_1;
                        } else {
                            var decodeResultByReference_2 = references[replaceInput_1];
                            if (decodeResultByReference_2) {
                                decodeResult_1 = decodeResultByReference_2;
                            } else if (replaceInput_1[0] === "&" && replaceInput_1[1] === "#") {
                                var decodeSecondChar_2 = replaceInput_1[2];
                                var decodeCode_2 = decodeSecondChar_2 == "x" || decodeSecondChar_2 == "X" ? parseInt(replaceInput_1.substr(3), 16) : parseInt(replaceInput_1.substr(2));
                                decodeResult_1 = decodeCode_2 >= 1114111 ? outOfBoundsChar : decodeCode_2 > 65535 ? surrogate_pairs_1.fromCodePoint(decodeCode_2) : fromCharCode(numeric_unicode_map_1.numericUnicodeMap[decodeCode_2] || decodeCode_2);
                            }
                        }
                        replaceResult_1 += decodeResult_1;
                        replaceLastIndex_1 = replaceMatch_1.index + replaceInput_1.length;
                    } while (replaceMatch_1 = decodeRegExp.exec(text));
                    if (replaceLastIndex_1 !== text.length) {
                        replaceResult_1 += text.substring(replaceLastIndex_1);
                    }
                } else {
                    replaceResult_1 = text;
                }
                return replaceResult_1;
            }
            exports.decode = decode;
        },
        7206: (__unused_webpack_module, exports) => {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.bodyRegExps = {
                xml: /&(?:#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g,
                html4: /&(?:nbsp|iexcl|cent|pound|curren|yen|brvbar|sect|uml|copy|ordf|laquo|not|shy|reg|macr|deg|plusmn|sup2|sup3|acute|micro|para|middot|cedil|sup1|ordm|raquo|frac14|frac12|frac34|iquest|Agrave|Aacute|Acirc|Atilde|Auml|Aring|AElig|Ccedil|Egrave|Eacute|Ecirc|Euml|Igrave|Iacute|Icirc|Iuml|ETH|Ntilde|Ograve|Oacute|Ocirc|Otilde|Ouml|times|Oslash|Ugrave|Uacute|Ucirc|Uuml|Yacute|THORN|szlig|agrave|aacute|acirc|atilde|auml|aring|aelig|ccedil|egrave|eacute|ecirc|euml|igrave|iacute|icirc|iuml|eth|ntilde|ograve|oacute|ocirc|otilde|ouml|divide|oslash|ugrave|uacute|ucirc|uuml|yacute|thorn|yuml|quot|amp|lt|gt|#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g,
                html5: /&(?:AElig|AMP|Aacute|Acirc|Agrave|Aring|Atilde|Auml|COPY|Ccedil|ETH|Eacute|Ecirc|Egrave|Euml|GT|Iacute|Icirc|Igrave|Iuml|LT|Ntilde|Oacute|Ocirc|Ograve|Oslash|Otilde|Ouml|QUOT|REG|THORN|Uacute|Ucirc|Ugrave|Uuml|Yacute|aacute|acirc|acute|aelig|agrave|amp|aring|atilde|auml|brvbar|ccedil|cedil|cent|copy|curren|deg|divide|eacute|ecirc|egrave|eth|euml|frac12|frac14|frac34|gt|iacute|icirc|iexcl|igrave|iquest|iuml|laquo|lt|macr|micro|middot|nbsp|not|ntilde|oacute|ocirc|ograve|ordf|ordm|oslash|otilde|ouml|para|plusmn|pound|quot|raquo|reg|sect|shy|sup1|sup2|sup3|szlig|thorn|times|uacute|ucirc|ugrave|uml|uuml|yacute|yen|yuml|#\d+|#[xX][\da-fA-F]+|[0-9a-zA-Z]+);?/g
            };
            exports.namedReferences = {
                xml: {
                    entities: {
                        "&lt;": "<",
                        "&gt;": ">",
                        "&quot;": '"',
                        "&apos;": "'",
                        "&amp;": "&"
                    },
                    characters: {
                        "<": "&lt;",
                        ">": "&gt;",
                        '"': "&quot;",
                        "'": "&apos;",
                        "&": "&amp;"
                    }
                },
                html4: {
                    entities: {
                        "&apos;": "'",
                        "&nbsp": " ",
                        "&nbsp;": " ",
                        "&iexcl": "¡",
                        "&iexcl;": "¡",
                        "&cent": "¢",
                        "&cent;": "¢",
                        "&pound": "£",
                        "&pound;": "£",
                        "&curren": "¤",
                        "&curren;": "¤",
                        "&yen": "¥",
                        "&yen;": "¥",
                        "&brvbar": "¦",
                        "&brvbar;": "¦",
                        "&sect": "§",
                        "&sect;": "§",
                        "&uml": "¨",
                        "&uml;": "¨",
                        "&copy": "©",
                        "&copy;": "©",
                        "&ordf": "ª",
                        "&ordf;": "ª",
                        "&laquo": "«",
                        "&laquo;": "«",
                        "&not": "¬",
                        "&not;": "¬",
                        "&shy": "­",
                        "&shy;": "­",
                        "&reg": "®",
                        "&reg;": "®",
                        "&macr": "¯",
                        "&macr;": "¯",
                        "&deg": "°",
                        "&deg;": "°",
                        "&plusmn": "±",
                        "&plusmn;": "±",
                        "&sup2": "²",
                        "&sup2;": "²",
                        "&sup3": "³",
                        "&sup3;": "³",
                        "&acute": "´",
                        "&acute;": "´",
                        "&micro": "µ",
                        "&micro;": "µ",
                        "&para": "¶",
                        "&para;": "¶",
                        "&middot": "·",
                        "&middot;": "·",
                        "&cedil": "¸",
                        "&cedil;": "¸",
                        "&sup1": "¹",
                        "&sup1;": "¹",
                        "&ordm": "º",
                        "&ordm;": "º",
                        "&raquo": "»",
                        "&raquo;": "»",
                        "&frac14": "¼",
                        "&frac14;": "¼",
                        "&frac12": "½",
                        "&frac12;": "½",
                        "&frac34": "¾",
                        "&frac34;": "¾",
                        "&iquest": "¿",
                        "&iquest;": "¿",
                        "&Agrave": "À",
                        "&Agrave;": "À",
                        "&Aacute": "Á",
                        "&Aacute;": "Á",
                        "&Acirc": "Â",
                        "&Acirc;": "Â",
                        "&Atilde": "Ã",
                        "&Atilde;": "Ã",
                        "&Auml": "Ä",
                        "&Auml;": "Ä",
                        "&Aring": "Å",
                        "&Aring;": "Å",
                        "&AElig": "Æ",
                        "&AElig;": "Æ",
                        "&Ccedil": "Ç",
                        "&Ccedil;": "Ç",
                        "&Egrave": "È",
                        "&Egrave;": "È",
                        "&Eacute": "É",
                        "&Eacute;": "É",
                        "&Ecirc": "Ê",
                        "&Ecirc;": "Ê",
                        "&Euml": "Ë",
                        "&Euml;": "Ë",
                        "&Igrave": "Ì",
                        "&Igrave;": "Ì",
                        "&Iacute": "Í",
                        "&Iacute;": "Í",
                        "&Icirc": "Î",
                        "&Icirc;": "Î",
                        "&Iuml": "Ï",
                        "&Iuml;": "Ï",
                        "&ETH": "Ð",
                        "&ETH;": "Ð",
                        "&Ntilde": "Ñ",
                        "&Ntilde;": "Ñ",
                        "&Ograve": "Ò",
                        "&Ograve;": "Ò",
                        "&Oacute": "Ó",
                        "&Oacute;": "Ó",
                        "&Ocirc": "Ô",
                        "&Ocirc;": "Ô",
                        "&Otilde": "Õ",
                        "&Otilde;": "Õ",
                        "&Ouml": "Ö",
                        "&Ouml;": "Ö",
                        "&times": "×",
                        "&times;": "×",
                        "&Oslash": "Ø",
                        "&Oslash;": "Ø",
                        "&Ugrave": "Ù",
                        "&Ugrave;": "Ù",
                        "&Uacute": "Ú",
                        "&Uacute;": "Ú",
                        "&Ucirc": "Û",
                        "&Ucirc;": "Û",
                        "&Uuml": "Ü",
                        "&Uuml;": "Ü",
                        "&Yacute": "Ý",
                        "&Yacute;": "Ý",
                        "&THORN": "Þ",
                        "&THORN;": "Þ",
                        "&szlig": "ß",
                        "&szlig;": "ß",
                        "&agrave": "à",
                        "&agrave;": "à",
                        "&aacute": "á",
                        "&aacute;": "á",
                        "&acirc": "â",
                        "&acirc;": "â",
                        "&atilde": "ã",
                        "&atilde;": "ã",
                        "&auml": "ä",
                        "&auml;": "ä",
                        "&aring": "å",
                        "&aring;": "å",
                        "&aelig": "æ",
                        "&aelig;": "æ",
                        "&ccedil": "ç",
                        "&ccedil;": "ç",
                        "&egrave": "è",
                        "&egrave;": "è",
                        "&eacute": "é",
                        "&eacute;": "é",
                        "&ecirc": "ê",
                        "&ecirc;": "ê",
                        "&euml": "ë",
                        "&euml;": "ë",
                        "&igrave": "ì",
                        "&igrave;": "ì",
                        "&iacute": "í",
                        "&iacute;": "í",
                        "&icirc": "î",
                        "&icirc;": "î",
                        "&iuml": "ï",
                        "&iuml;": "ï",
                        "&eth": "ð",
                        "&eth;": "ð",
                        "&ntilde": "ñ",
                        "&ntilde;": "ñ",
                        "&ograve": "ò",
                        "&ograve;": "ò",
                        "&oacute": "ó",
                        "&oacute;": "ó",
                        "&ocirc": "ô",
                        "&ocirc;": "ô",
                        "&otilde": "õ",
                        "&otilde;": "õ",
                        "&ouml": "ö",
                        "&ouml;": "ö",
                        "&divide": "÷",
                        "&divide;": "÷",
                        "&oslash": "ø",
                        "&oslash;": "ø",
                        "&ugrave": "ù",
                        "&ugrave;": "ù",
                        "&uacute": "ú",
                        "&uacute;": "ú",
                        "&ucirc": "û",
                        "&ucirc;": "û",
                        "&uuml": "ü",
                        "&uuml;": "ü",
                        "&yacute": "ý",
                        "&yacute;": "ý",
                        "&thorn": "þ",
                        "&thorn;": "þ",
                        "&yuml": "ÿ",
                        "&yuml;": "ÿ",
                        "&quot": '"',
                        "&quot;": '"',
                        "&amp": "&",
                        "&amp;": "&",
                        "&lt": "<",
                        "&lt;": "<",
                        "&gt": ">",
                        "&gt;": ">",
                        "&OElig;": "Œ",
                        "&oelig;": "œ",
                        "&Scaron;": "Š",
                        "&scaron;": "š",
                        "&Yuml;": "Ÿ",
                        "&circ;": "ˆ",
                        "&tilde;": "˜",
                        "&ensp;": " ",
                        "&emsp;": " ",
                        "&thinsp;": " ",
                        "&zwnj;": "‌",
                        "&zwj;": "‍",
                        "&lrm;": "‎",
                        "&rlm;": "‏",
                        "&ndash;": "–",
                        "&mdash;": "—",
                        "&lsquo;": "‘",
                        "&rsquo;": "’",
                        "&sbquo;": "‚",
                        "&ldquo;": "“",
                        "&rdquo;": "”",
                        "&bdquo;": "„",
                        "&dagger;": "†",
                        "&Dagger;": "‡",
                        "&permil;": "‰",
                        "&lsaquo;": "‹",
                        "&rsaquo;": "›",
                        "&euro;": "€",
                        "&fnof;": "ƒ",
                        "&Alpha;": "Α",
                        "&Beta;": "Β",
                        "&Gamma;": "Γ",
                        "&Delta;": "Δ",
                        "&Epsilon;": "Ε",
                        "&Zeta;": "Ζ",
                        "&Eta;": "Η",
                        "&Theta;": "Θ",
                        "&Iota;": "Ι",
                        "&Kappa;": "Κ",
                        "&Lambda;": "Λ",
                        "&Mu;": "Μ",
                        "&Nu;": "Ν",
                        "&Xi;": "Ξ",
                        "&Omicron;": "Ο",
                        "&Pi;": "Π",
                        "&Rho;": "Ρ",
                        "&Sigma;": "Σ",
                        "&Tau;": "Τ",
                        "&Upsilon;": "Υ",
                        "&Phi;": "Φ",
                        "&Chi;": "Χ",
                        "&Psi;": "Ψ",
                        "&Omega;": "Ω",
                        "&alpha;": "α",
                        "&beta;": "β",
                        "&gamma;": "γ",
                        "&delta;": "δ",
                        "&epsilon;": "ε",
                        "&zeta;": "ζ",
                        "&eta;": "η",
                        "&theta;": "θ",
                        "&iota;": "ι",
                        "&kappa;": "κ",
                        "&lambda;": "λ",
                        "&mu;": "μ",
                        "&nu;": "ν",
                        "&xi;": "ξ",
                        "&omicron;": "ο",
                        "&pi;": "π",
                        "&rho;": "ρ",
                        "&sigmaf;": "ς",
                        "&sigma;": "σ",
                        "&tau;": "τ",
                        "&upsilon;": "υ",
                        "&phi;": "φ",
                        "&chi;": "χ",
                        "&psi;": "ψ",
                        "&omega;": "ω",
                        "&thetasym;": "ϑ",
                        "&upsih;": "ϒ",
                        "&piv;": "ϖ",
                        "&bull;": "•",
                        "&hellip;": "…",
                        "&prime;": "′",
                        "&Prime;": "″",
                        "&oline;": "‾",
                        "&frasl;": "⁄",
                        "&weierp;": "℘",
                        "&image;": "ℑ",
                        "&real;": "ℜ",
                        "&trade;": "™",
                        "&alefsym;": "ℵ",
                        "&larr;": "←",
                        "&uarr;": "↑",
                        "&rarr;": "→",
                        "&darr;": "↓",
                        "&harr;": "↔",
                        "&crarr;": "↵",
                        "&lArr;": "⇐",
                        "&uArr;": "⇑",
                        "&rArr;": "⇒",
                        "&dArr;": "⇓",
                        "&hArr;": "⇔",
                        "&forall;": "∀",
                        "&part;": "∂",
                        "&exist;": "∃",
                        "&empty;": "∅",
                        "&nabla;": "∇",
                        "&isin;": "∈",
                        "&notin;": "∉",
                        "&ni;": "∋",
                        "&prod;": "∏",
                        "&sum;": "∑",
                        "&minus;": "−",
                        "&lowast;": "∗",
                        "&radic;": "√",
                        "&prop;": "∝",
                        "&infin;": "∞",
                        "&ang;": "∠",
                        "&and;": "∧",
                        "&or;": "∨",
                        "&cap;": "∩",
                        "&cup;": "∪",
                        "&int;": "∫",
                        "&there4;": "∴",
                        "&sim;": "∼",
                        "&cong;": "≅",
                        "&asymp;": "≈",
                        "&ne;": "≠",
                        "&equiv;": "≡",
                        "&le;": "≤",
                        "&ge;": "≥",
                        "&sub;": "⊂",
                        "&sup;": "⊃",
                        "&nsub;": "⊄",
                        "&sube;": "⊆",
                        "&supe;": "⊇",
                        "&oplus;": "⊕",
                        "&otimes;": "⊗",
                        "&perp;": "⊥",
                        "&sdot;": "⋅",
                        "&lceil;": "⌈",
                        "&rceil;": "⌉",
                        "&lfloor;": "⌊",
                        "&rfloor;": "⌋",
                        "&lang;": "〈",
                        "&rang;": "〉",
                        "&loz;": "◊",
                        "&spades;": "♠",
                        "&clubs;": "♣",
                        "&hearts;": "♥",
                        "&diams;": "♦"
                    },
                    characters: {
                        "'": "&apos;",
                        " ": "&nbsp;",
                        "¡": "&iexcl;",
                        "¢": "&cent;",
                        "£": "&pound;",
                        "¤": "&curren;",
                        "¥": "&yen;",
                        "¦": "&brvbar;",
                        "§": "&sect;",
                        "¨": "&uml;",
                        "©": "&copy;",
                        ª: "&ordf;",
                        "«": "&laquo;",
                        "¬": "&not;",
                        "­": "&shy;",
                        "®": "&reg;",
                        "¯": "&macr;",
                        "°": "&deg;",
                        "±": "&plusmn;",
                        "²": "&sup2;",
                        "³": "&sup3;",
                        "´": "&acute;",
                        µ: "&micro;",
                        "¶": "&para;",
                        "·": "&middot;",
                        "¸": "&cedil;",
                        "¹": "&sup1;",
                        º: "&ordm;",
                        "»": "&raquo;",
                        "¼": "&frac14;",
                        "½": "&frac12;",
                        "¾": "&frac34;",
                        "¿": "&iquest;",
                        À: "&Agrave;",
                        Á: "&Aacute;",
                        Â: "&Acirc;",
                        Ã: "&Atilde;",
                        Ä: "&Auml;",
                        Å: "&Aring;",
                        Æ: "&AElig;",
                        Ç: "&Ccedil;",
                        È: "&Egrave;",
                        É: "&Eacute;",
                        Ê: "&Ecirc;",
                        Ë: "&Euml;",
                        Ì: "&Igrave;",
                        Í: "&Iacute;",
                        Î: "&Icirc;",
                        Ï: "&Iuml;",
                        Ð: "&ETH;",
                        Ñ: "&Ntilde;",
                        Ò: "&Ograve;",
                        Ó: "&Oacute;",
                        Ô: "&Ocirc;",
                        Õ: "&Otilde;",
                        Ö: "&Ouml;",
                        "×": "&times;",
                        Ø: "&Oslash;",
                        Ù: "&Ugrave;",
                        Ú: "&Uacute;",
                        Û: "&Ucirc;",
                        Ü: "&Uuml;",
                        Ý: "&Yacute;",
                        Þ: "&THORN;",
                        ß: "&szlig;",
                        à: "&agrave;",
                        á: "&aacute;",
                        â: "&acirc;",
                        ã: "&atilde;",
                        ä: "&auml;",
                        å: "&aring;",
                        æ: "&aelig;",
                        ç: "&ccedil;",
                        è: "&egrave;",
                        é: "&eacute;",
                        ê: "&ecirc;",
                        ë: "&euml;",
                        ì: "&igrave;",
                        í: "&iacute;",
                        î: "&icirc;",
                        ï: "&iuml;",
                        ð: "&eth;",
                        ñ: "&ntilde;",
                        ò: "&ograve;",
                        ó: "&oacute;",
                        ô: "&ocirc;",
                        õ: "&otilde;",
                        ö: "&ouml;",
                        "÷": "&divide;",
                        ø: "&oslash;",
                        ù: "&ugrave;",
                        ú: "&uacute;",
                        û: "&ucirc;",
                        ü: "&uuml;",
                        ý: "&yacute;",
                        þ: "&thorn;",
                        ÿ: "&yuml;",
                        '"': "&quot;",
                        "&": "&amp;",
                        "<": "&lt;",
                        ">": "&gt;",
                        Œ: "&OElig;",
                        œ: "&oelig;",
                        Š: "&Scaron;",
                        š: "&scaron;",
                        Ÿ: "&Yuml;",
                        ˆ: "&circ;",
                        "˜": "&tilde;",
                        " ": "&ensp;",
                        " ": "&emsp;",
                        " ": "&thinsp;",
                        "‌": "&zwnj;",
                        "‍": "&zwj;",
                        "‎": "&lrm;",
                        "‏": "&rlm;",
                        "–": "&ndash;",
                        "—": "&mdash;",
                        "‘": "&lsquo;",
                        "’": "&rsquo;",
                        "‚": "&sbquo;",
                        "“": "&ldquo;",
                        "”": "&rdquo;",
                        "„": "&bdquo;",
                        "†": "&dagger;",
                        "‡": "&Dagger;",
                        "‰": "&permil;",
                        "‹": "&lsaquo;",
                        "›": "&rsaquo;",
                        "€": "&euro;",
                        ƒ: "&fnof;",
                        Α: "&Alpha;",
                        Β: "&Beta;",
                        Γ: "&Gamma;",
                        Δ: "&Delta;",
                        Ε: "&Epsilon;",
                        Ζ: "&Zeta;",
                        Η: "&Eta;",
                        Θ: "&Theta;",
                        Ι: "&Iota;",
                        Κ: "&Kappa;",
                        Λ: "&Lambda;",
                        Μ: "&Mu;",
                        Ν: "&Nu;",
                        Ξ: "&Xi;",
                        Ο: "&Omicron;",
                        Π: "&Pi;",
                        Ρ: "&Rho;",
                        Σ: "&Sigma;",
                        Τ: "&Tau;",
                        Υ: "&Upsilon;",
                        Φ: "&Phi;",
                        Χ: "&Chi;",
                        Ψ: "&Psi;",
                        Ω: "&Omega;",
                        α: "&alpha;",
                        β: "&beta;",
                        γ: "&gamma;",
                        δ: "&delta;",
                        ε: "&epsilon;",
                        ζ: "&zeta;",
                        η: "&eta;",
                        θ: "&theta;",
                        ι: "&iota;",
                        κ: "&kappa;",
                        λ: "&lambda;",
                        μ: "&mu;",
                        ν: "&nu;",
                        ξ: "&xi;",
                        ο: "&omicron;",
                        π: "&pi;",
                        ρ: "&rho;",
                        ς: "&sigmaf;",
                        σ: "&sigma;",
                        τ: "&tau;",
                        υ: "&upsilon;",
                        φ: "&phi;",
                        χ: "&chi;",
                        ψ: "&psi;",
                        ω: "&omega;",
                        ϑ: "&thetasym;",
                        ϒ: "&upsih;",
                        ϖ: "&piv;",
                        "•": "&bull;",
                        "…": "&hellip;",
                        "′": "&prime;",
                        "″": "&Prime;",
                        "‾": "&oline;",
                        "⁄": "&frasl;",
                        ℘: "&weierp;",
                        ℑ: "&image;",
                        ℜ: "&real;",
                        "™": "&trade;",
                        ℵ: "&alefsym;",
                        "←": "&larr;",
                        "↑": "&uarr;",
                        "→": "&rarr;",
                        "↓": "&darr;",
                        "↔": "&harr;",
                        "↵": "&crarr;",
                        "⇐": "&lArr;",
                        "⇑": "&uArr;",
                        "⇒": "&rArr;",
                        "⇓": "&dArr;",
                        "⇔": "&hArr;",
                        "∀": "&forall;",
                        "∂": "&part;",
                        "∃": "&exist;",
                        "∅": "&empty;",
                        "∇": "&nabla;",
                        "∈": "&isin;",
                        "∉": "&notin;",
                        "∋": "&ni;",
                        "∏": "&prod;",
                        "∑": "&sum;",
                        "−": "&minus;",
                        "∗": "&lowast;",
                        "√": "&radic;",
                        "∝": "&prop;",
                        "∞": "&infin;",
                        "∠": "&ang;",
                        "∧": "&and;",
                        "∨": "&or;",
                        "∩": "&cap;",
                        "∪": "&cup;",
                        "∫": "&int;",
                        "∴": "&there4;",
                        "∼": "&sim;",
                        "≅": "&cong;",
                        "≈": "&asymp;",
                        "≠": "&ne;",
                        "≡": "&equiv;",
                        "≤": "&le;",
                        "≥": "&ge;",
                        "⊂": "&sub;",
                        "⊃": "&sup;",
                        "⊄": "&nsub;",
                        "⊆": "&sube;",
                        "⊇": "&supe;",
                        "⊕": "&oplus;",
                        "⊗": "&otimes;",
                        "⊥": "&perp;",
                        "⋅": "&sdot;",
                        "⌈": "&lceil;",
                        "⌉": "&rceil;",
                        "⌊": "&lfloor;",
                        "⌋": "&rfloor;",
                        "〈": "&lang;",
                        "〉": "&rang;",
                        "◊": "&loz;",
                        "♠": "&spades;",
                        "♣": "&clubs;",
                        "♥": "&hearts;",
                        "♦": "&diams;"
                    }
                },
                html5: {
                    entities: {
                        "&AElig": "Æ",
                        "&AElig;": "Æ",
                        "&AMP": "&",
                        "&AMP;": "&",
                        "&Aacute": "Á",
                        "&Aacute;": "Á",
                        "&Abreve;": "Ă",
                        "&Acirc": "Â",
                        "&Acirc;": "Â",
                        "&Acy;": "А",
                        "&Afr;": "𝔄",
                        "&Agrave": "À",
                        "&Agrave;": "À",
                        "&Alpha;": "Α",
                        "&Amacr;": "Ā",
                        "&And;": "⩓",
                        "&Aogon;": "Ą",
                        "&Aopf;": "𝔸",
                        "&ApplyFunction;": "⁡",
                        "&Aring": "Å",
                        "&Aring;": "Å",
                        "&Ascr;": "𝒜",
                        "&Assign;": "≔",
                        "&Atilde": "Ã",
                        "&Atilde;": "Ã",
                        "&Auml": "Ä",
                        "&Auml;": "Ä",
                        "&Backslash;": "∖",
                        "&Barv;": "⫧",
                        "&Barwed;": "⌆",
                        "&Bcy;": "Б",
                        "&Because;": "∵",
                        "&Bernoullis;": "ℬ",
                        "&Beta;": "Β",
                        "&Bfr;": "𝔅",
                        "&Bopf;": "𝔹",
                        "&Breve;": "˘",
                        "&Bscr;": "ℬ",
                        "&Bumpeq;": "≎",
                        "&CHcy;": "Ч",
                        "&COPY": "©",
                        "&COPY;": "©",
                        "&Cacute;": "Ć",
                        "&Cap;": "⋒",
                        "&CapitalDifferentialD;": "ⅅ",
                        "&Cayleys;": "ℭ",
                        "&Ccaron;": "Č",
                        "&Ccedil": "Ç",
                        "&Ccedil;": "Ç",
                        "&Ccirc;": "Ĉ",
                        "&Cconint;": "∰",
                        "&Cdot;": "Ċ",
                        "&Cedilla;": "¸",
                        "&CenterDot;": "·",
                        "&Cfr;": "ℭ",
                        "&Chi;": "Χ",
                        "&CircleDot;": "⊙",
                        "&CircleMinus;": "⊖",
                        "&CirclePlus;": "⊕",
                        "&CircleTimes;": "⊗",
                        "&ClockwiseContourIntegral;": "∲",
                        "&CloseCurlyDoubleQuote;": "”",
                        "&CloseCurlyQuote;": "’",
                        "&Colon;": "∷",
                        "&Colone;": "⩴",
                        "&Congruent;": "≡",
                        "&Conint;": "∯",
                        "&ContourIntegral;": "∮",
                        "&Copf;": "ℂ",
                        "&Coproduct;": "∐",
                        "&CounterClockwiseContourIntegral;": "∳",
                        "&Cross;": "⨯",
                        "&Cscr;": "𝒞",
                        "&Cup;": "⋓",
                        "&CupCap;": "≍",
                        "&DD;": "ⅅ",
                        "&DDotrahd;": "⤑",
                        "&DJcy;": "Ђ",
                        "&DScy;": "Ѕ",
                        "&DZcy;": "Џ",
                        "&Dagger;": "‡",
                        "&Darr;": "↡",
                        "&Dashv;": "⫤",
                        "&Dcaron;": "Ď",
                        "&Dcy;": "Д",
                        "&Del;": "∇",
                        "&Delta;": "Δ",
                        "&Dfr;": "𝔇",
                        "&DiacriticalAcute;": "´",
                        "&DiacriticalDot;": "˙",
                        "&DiacriticalDoubleAcute;": "˝",
                        "&DiacriticalGrave;": "`",
                        "&DiacriticalTilde;": "˜",
                        "&Diamond;": "⋄",
                        "&DifferentialD;": "ⅆ",
                        "&Dopf;": "𝔻",
                        "&Dot;": "¨",
                        "&DotDot;": "⃜",
                        "&DotEqual;": "≐",
                        "&DoubleContourIntegral;": "∯",
                        "&DoubleDot;": "¨",
                        "&DoubleDownArrow;": "⇓",
                        "&DoubleLeftArrow;": "⇐",
                        "&DoubleLeftRightArrow;": "⇔",
                        "&DoubleLeftTee;": "⫤",
                        "&DoubleLongLeftArrow;": "⟸",
                        "&DoubleLongLeftRightArrow;": "⟺",
                        "&DoubleLongRightArrow;": "⟹",
                        "&DoubleRightArrow;": "⇒",
                        "&DoubleRightTee;": "⊨",
                        "&DoubleUpArrow;": "⇑",
                        "&DoubleUpDownArrow;": "⇕",
                        "&DoubleVerticalBar;": "∥",
                        "&DownArrow;": "↓",
                        "&DownArrowBar;": "⤓",
                        "&DownArrowUpArrow;": "⇵",
                        "&DownBreve;": "̑",
                        "&DownLeftRightVector;": "⥐",
                        "&DownLeftTeeVector;": "⥞",
                        "&DownLeftVector;": "↽",
                        "&DownLeftVectorBar;": "⥖",
                        "&DownRightTeeVector;": "⥟",
                        "&DownRightVector;": "⇁",
                        "&DownRightVectorBar;": "⥗",
                        "&DownTee;": "⊤",
                        "&DownTeeArrow;": "↧",
                        "&Downarrow;": "⇓",
                        "&Dscr;": "𝒟",
                        "&Dstrok;": "Đ",
                        "&ENG;": "Ŋ",
                        "&ETH": "Ð",
                        "&ETH;": "Ð",
                        "&Eacute": "É",
                        "&Eacute;": "É",
                        "&Ecaron;": "Ě",
                        "&Ecirc": "Ê",
                        "&Ecirc;": "Ê",
                        "&Ecy;": "Э",
                        "&Edot;": "Ė",
                        "&Efr;": "𝔈",
                        "&Egrave": "È",
                        "&Egrave;": "È",
                        "&Element;": "∈",
                        "&Emacr;": "Ē",
                        "&EmptySmallSquare;": "◻",
                        "&EmptyVerySmallSquare;": "▫",
                        "&Eogon;": "Ę",
                        "&Eopf;": "𝔼",
                        "&Epsilon;": "Ε",
                        "&Equal;": "⩵",
                        "&EqualTilde;": "≂",
                        "&Equilibrium;": "⇌",
                        "&Escr;": "ℰ",
                        "&Esim;": "⩳",
                        "&Eta;": "Η",
                        "&Euml": "Ë",
                        "&Euml;": "Ë",
                        "&Exists;": "∃",
                        "&ExponentialE;": "ⅇ",
                        "&Fcy;": "Ф",
                        "&Ffr;": "𝔉",
                        "&FilledSmallSquare;": "◼",
                        "&FilledVerySmallSquare;": "▪",
                        "&Fopf;": "𝔽",
                        "&ForAll;": "∀",
                        "&Fouriertrf;": "ℱ",
                        "&Fscr;": "ℱ",
                        "&GJcy;": "Ѓ",
                        "&GT": ">",
                        "&GT;": ">",
                        "&Gamma;": "Γ",
                        "&Gammad;": "Ϝ",
                        "&Gbreve;": "Ğ",
                        "&Gcedil;": "Ģ",
                        "&Gcirc;": "Ĝ",
                        "&Gcy;": "Г",
                        "&Gdot;": "Ġ",
                        "&Gfr;": "𝔊",
                        "&Gg;": "⋙",
                        "&Gopf;": "𝔾",
                        "&GreaterEqual;": "≥",
                        "&GreaterEqualLess;": "⋛",
                        "&GreaterFullEqual;": "≧",
                        "&GreaterGreater;": "⪢",
                        "&GreaterLess;": "≷",
                        "&GreaterSlantEqual;": "⩾",
                        "&GreaterTilde;": "≳",
                        "&Gscr;": "𝒢",
                        "&Gt;": "≫",
                        "&HARDcy;": "Ъ",
                        "&Hacek;": "ˇ",
                        "&Hat;": "^",
                        "&Hcirc;": "Ĥ",
                        "&Hfr;": "ℌ",
                        "&HilbertSpace;": "ℋ",
                        "&Hopf;": "ℍ",
                        "&HorizontalLine;": "─",
                        "&Hscr;": "ℋ",
                        "&Hstrok;": "Ħ",
                        "&HumpDownHump;": "≎",
                        "&HumpEqual;": "≏",
                        "&IEcy;": "Е",
                        "&IJlig;": "Ĳ",
                        "&IOcy;": "Ё",
                        "&Iacute": "Í",
                        "&Iacute;": "Í",
                        "&Icirc": "Î",
                        "&Icirc;": "Î",
                        "&Icy;": "И",
                        "&Idot;": "İ",
                        "&Ifr;": "ℑ",
                        "&Igrave": "Ì",
                        "&Igrave;": "Ì",
                        "&Im;": "ℑ",
                        "&Imacr;": "Ī",
                        "&ImaginaryI;": "ⅈ",
                        "&Implies;": "⇒",
                        "&Int;": "∬",
                        "&Integral;": "∫",
                        "&Intersection;": "⋂",
                        "&InvisibleComma;": "⁣",
                        "&InvisibleTimes;": "⁢",
                        "&Iogon;": "Į",
                        "&Iopf;": "𝕀",
                        "&Iota;": "Ι",
                        "&Iscr;": "ℐ",
                        "&Itilde;": "Ĩ",
                        "&Iukcy;": "І",
                        "&Iuml": "Ï",
                        "&Iuml;": "Ï",
                        "&Jcirc;": "Ĵ",
                        "&Jcy;": "Й",
                        "&Jfr;": "𝔍",
                        "&Jopf;": "𝕁",
                        "&Jscr;": "𝒥",
                        "&Jsercy;": "Ј",
                        "&Jukcy;": "Є",
                        "&KHcy;": "Х",
                        "&KJcy;": "Ќ",
                        "&Kappa;": "Κ",
                        "&Kcedil;": "Ķ",
                        "&Kcy;": "К",
                        "&Kfr;": "𝔎",
                        "&Kopf;": "𝕂",
                        "&Kscr;": "𝒦",
                        "&LJcy;": "Љ",
                        "&LT": "<",
                        "&LT;": "<",
                        "&Lacute;": "Ĺ",
                        "&Lambda;": "Λ",
                        "&Lang;": "⟪",
                        "&Laplacetrf;": "ℒ",
                        "&Larr;": "↞",
                        "&Lcaron;": "Ľ",
                        "&Lcedil;": "Ļ",
                        "&Lcy;": "Л",
                        "&LeftAngleBracket;": "⟨",
                        "&LeftArrow;": "←",
                        "&LeftArrowBar;": "⇤",
                        "&LeftArrowRightArrow;": "⇆",
                        "&LeftCeiling;": "⌈",
                        "&LeftDoubleBracket;": "⟦",
                        "&LeftDownTeeVector;": "⥡",
                        "&LeftDownVector;": "⇃",
                        "&LeftDownVectorBar;": "⥙",
                        "&LeftFloor;": "⌊",
                        "&LeftRightArrow;": "↔",
                        "&LeftRightVector;": "⥎",
                        "&LeftTee;": "⊣",
                        "&LeftTeeArrow;": "↤",
                        "&LeftTeeVector;": "⥚",
                        "&LeftTriangle;": "⊲",
                        "&LeftTriangleBar;": "⧏",
                        "&LeftTriangleEqual;": "⊴",
                        "&LeftUpDownVector;": "⥑",
                        "&LeftUpTeeVector;": "⥠",
                        "&LeftUpVector;": "↿",
                        "&LeftUpVectorBar;": "⥘",
                        "&LeftVector;": "↼",
                        "&LeftVectorBar;": "⥒",
                        "&Leftarrow;": "⇐",
                        "&Leftrightarrow;": "⇔",
                        "&LessEqualGreater;": "⋚",
                        "&LessFullEqual;": "≦",
                        "&LessGreater;": "≶",
                        "&LessLess;": "⪡",
                        "&LessSlantEqual;": "⩽",
                        "&LessTilde;": "≲",
                        "&Lfr;": "𝔏",
                        "&Ll;": "⋘",
                        "&Lleftarrow;": "⇚",
                        "&Lmidot;": "Ŀ",
                        "&LongLeftArrow;": "⟵",
                        "&LongLeftRightArrow;": "⟷",
                        "&LongRightArrow;": "⟶",
                        "&Longleftarrow;": "⟸",
                        "&Longleftrightarrow;": "⟺",
                        "&Longrightarrow;": "⟹",
                        "&Lopf;": "𝕃",
                        "&LowerLeftArrow;": "↙",
                        "&LowerRightArrow;": "↘",
                        "&Lscr;": "ℒ",
                        "&Lsh;": "↰",
                        "&Lstrok;": "Ł",
                        "&Lt;": "≪",
                        "&Map;": "⤅",
                        "&Mcy;": "М",
                        "&MediumSpace;": " ",
                        "&Mellintrf;": "ℳ",
                        "&Mfr;": "𝔐",
                        "&MinusPlus;": "∓",
                        "&Mopf;": "𝕄",
                        "&Mscr;": "ℳ",
                        "&Mu;": "Μ",
                        "&NJcy;": "Њ",
                        "&Nacute;": "Ń",
                        "&Ncaron;": "Ň",
                        "&Ncedil;": "Ņ",
                        "&Ncy;": "Н",
                        "&NegativeMediumSpace;": "​",
                        "&NegativeThickSpace;": "​",
                        "&NegativeThinSpace;": "​",
                        "&NegativeVeryThinSpace;": "​",
                        "&NestedGreaterGreater;": "≫",
                        "&NestedLessLess;": "≪",
                        "&NewLine;": "\n",
                        "&Nfr;": "𝔑",
                        "&NoBreak;": "⁠",
                        "&NonBreakingSpace;": " ",
                        "&Nopf;": "ℕ",
                        "&Not;": "⫬",
                        "&NotCongruent;": "≢",
                        "&NotCupCap;": "≭",
                        "&NotDoubleVerticalBar;": "∦",
                        "&NotElement;": "∉",
                        "&NotEqual;": "≠",
                        "&NotEqualTilde;": "≂̸",
                        "&NotExists;": "∄",
                        "&NotGreater;": "≯",
                        "&NotGreaterEqual;": "≱",
                        "&NotGreaterFullEqual;": "≧̸",
                        "&NotGreaterGreater;": "≫̸",
                        "&NotGreaterLess;": "≹",
                        "&NotGreaterSlantEqual;": "⩾̸",
                        "&NotGreaterTilde;": "≵",
                        "&NotHumpDownHump;": "≎̸",
                        "&NotHumpEqual;": "≏̸",
                        "&NotLeftTriangle;": "⋪",
                        "&NotLeftTriangleBar;": "⧏̸",
                        "&NotLeftTriangleEqual;": "⋬",
                        "&NotLess;": "≮",
                        "&NotLessEqual;": "≰",
                        "&NotLessGreater;": "≸",
                        "&NotLessLess;": "≪̸",
                        "&NotLessSlantEqual;": "⩽̸",
                        "&NotLessTilde;": "≴",
                        "&NotNestedGreaterGreater;": "⪢̸",
                        "&NotNestedLessLess;": "⪡̸",
                        "&NotPrecedes;": "⊀",
                        "&NotPrecedesEqual;": "⪯̸",
                        "&NotPrecedesSlantEqual;": "⋠",
                        "&NotReverseElement;": "∌",
                        "&NotRightTriangle;": "⋫",
                        "&NotRightTriangleBar;": "⧐̸",
                        "&NotRightTriangleEqual;": "⋭",
                        "&NotSquareSubset;": "⊏̸",
                        "&NotSquareSubsetEqual;": "⋢",
                        "&NotSquareSuperset;": "⊐̸",
                        "&NotSquareSupersetEqual;": "⋣",
                        "&NotSubset;": "⊂⃒",
                        "&NotSubsetEqual;": "⊈",
                        "&NotSucceeds;": "⊁",
                        "&NotSucceedsEqual;": "⪰̸",
                        "&NotSucceedsSlantEqual;": "⋡",
                        "&NotSucceedsTilde;": "≿̸",
                        "&NotSuperset;": "⊃⃒",
                        "&NotSupersetEqual;": "⊉",
                        "&NotTilde;": "≁",
                        "&NotTildeEqual;": "≄",
                        "&NotTildeFullEqual;": "≇",
                        "&NotTildeTilde;": "≉",
                        "&NotVerticalBar;": "∤",
                        "&Nscr;": "𝒩",
                        "&Ntilde": "Ñ",
                        "&Ntilde;": "Ñ",
                        "&Nu;": "Ν",
                        "&OElig;": "Œ",
                        "&Oacute": "Ó",
                        "&Oacute;": "Ó",
                        "&Ocirc": "Ô",
                        "&Ocirc;": "Ô",
                        "&Ocy;": "О",
                        "&Odblac;": "Ő",
                        "&Ofr;": "𝔒",
                        "&Ograve": "Ò",
                        "&Ograve;": "Ò",
                        "&Omacr;": "Ō",
                        "&Omega;": "Ω",
                        "&Omicron;": "Ο",
                        "&Oopf;": "𝕆",
                        "&OpenCurlyDoubleQuote;": "“",
                        "&OpenCurlyQuote;": "‘",
                        "&Or;": "⩔",
                        "&Oscr;": "𝒪",
                        "&Oslash": "Ø",
                        "&Oslash;": "Ø",
                        "&Otilde": "Õ",
                        "&Otilde;": "Õ",
                        "&Otimes;": "⨷",
                        "&Ouml": "Ö",
                        "&Ouml;": "Ö",
                        "&OverBar;": "‾",
                        "&OverBrace;": "⏞",
                        "&OverBracket;": "⎴",
                        "&OverParenthesis;": "⏜",
                        "&PartialD;": "∂",
                        "&Pcy;": "П",
                        "&Pfr;": "𝔓",
                        "&Phi;": "Φ",
                        "&Pi;": "Π",
                        "&PlusMinus;": "±",
                        "&Poincareplane;": "ℌ",
                        "&Popf;": "ℙ",
                        "&Pr;": "⪻",
                        "&Precedes;": "≺",
                        "&PrecedesEqual;": "⪯",
                        "&PrecedesSlantEqual;": "≼",
                        "&PrecedesTilde;": "≾",
                        "&Prime;": "″",
                        "&Product;": "∏",
                        "&Proportion;": "∷",
                        "&Proportional;": "∝",
                        "&Pscr;": "𝒫",
                        "&Psi;": "Ψ",
                        "&QUOT": '"',
                        "&QUOT;": '"',
                        "&Qfr;": "𝔔",
                        "&Qopf;": "ℚ",
                        "&Qscr;": "𝒬",
                        "&RBarr;": "⤐",
                        "&REG": "®",
                        "&REG;": "®",
                        "&Racute;": "Ŕ",
                        "&Rang;": "⟫",
                        "&Rarr;": "↠",
                        "&Rarrtl;": "⤖",
                        "&Rcaron;": "Ř",
                        "&Rcedil;": "Ŗ",
                        "&Rcy;": "Р",
                        "&Re;": "ℜ",
                        "&ReverseElement;": "∋",
                        "&ReverseEquilibrium;": "⇋",
                        "&ReverseUpEquilibrium;": "⥯",
                        "&Rfr;": "ℜ",
                        "&Rho;": "Ρ",
                        "&RightAngleBracket;": "⟩",
                        "&RightArrow;": "→",
                        "&RightArrowBar;": "⇥",
                        "&RightArrowLeftArrow;": "⇄",
                        "&RightCeiling;": "⌉",
                        "&RightDoubleBracket;": "⟧",
                        "&RightDownTeeVector;": "⥝",
                        "&RightDownVector;": "⇂",
                        "&RightDownVectorBar;": "⥕",
                        "&RightFloor;": "⌋",
                        "&RightTee;": "⊢",
                        "&RightTeeArrow;": "↦",
                        "&RightTeeVector;": "⥛",
                        "&RightTriangle;": "⊳",
                        "&RightTriangleBar;": "⧐",
                        "&RightTriangleEqual;": "⊵",
                        "&RightUpDownVector;": "⥏",
                        "&RightUpTeeVector;": "⥜",
                        "&RightUpVector;": "↾",
                        "&RightUpVectorBar;": "⥔",
                        "&RightVector;": "⇀",
                        "&RightVectorBar;": "⥓",
                        "&Rightarrow;": "⇒",
                        "&Ropf;": "ℝ",
                        "&RoundImplies;": "⥰",
                        "&Rrightarrow;": "⇛",
                        "&Rscr;": "ℛ",
                        "&Rsh;": "↱",
                        "&RuleDelayed;": "⧴",
                        "&SHCHcy;": "Щ",
                        "&SHcy;": "Ш",
                        "&SOFTcy;": "Ь",
                        "&Sacute;": "Ś",
                        "&Sc;": "⪼",
                        "&Scaron;": "Š",
                        "&Scedil;": "Ş",
                        "&Scirc;": "Ŝ",
                        "&Scy;": "С",
                        "&Sfr;": "𝔖",
                        "&ShortDownArrow;": "↓",
                        "&ShortLeftArrow;": "←",
                        "&ShortRightArrow;": "→",
                        "&ShortUpArrow;": "↑",
                        "&Sigma;": "Σ",
                        "&SmallCircle;": "∘",
                        "&Sopf;": "𝕊",
                        "&Sqrt;": "√",
                        "&Square;": "□",
                        "&SquareIntersection;": "⊓",
                        "&SquareSubset;": "⊏",
                        "&SquareSubsetEqual;": "⊑",
                        "&SquareSuperset;": "⊐",
                        "&SquareSupersetEqual;": "⊒",
                        "&SquareUnion;": "⊔",
                        "&Sscr;": "𝒮",
                        "&Star;": "⋆",
                        "&Sub;": "⋐",
                        "&Subset;": "⋐",
                        "&SubsetEqual;": "⊆",
                        "&Succeeds;": "≻",
                        "&SucceedsEqual;": "⪰",
                        "&SucceedsSlantEqual;": "≽",
                        "&SucceedsTilde;": "≿",
                        "&SuchThat;": "∋",
                        "&Sum;": "∑",
                        "&Sup;": "⋑",
                        "&Superset;": "⊃",
                        "&SupersetEqual;": "⊇",
                        "&Supset;": "⋑",
                        "&THORN": "Þ",
                        "&THORN;": "Þ",
                        "&TRADE;": "™",
                        "&TSHcy;": "Ћ",
                        "&TScy;": "Ц",
                        "&Tab;": "\t",
                        "&Tau;": "Τ",
                        "&Tcaron;": "Ť",
                        "&Tcedil;": "Ţ",
                        "&Tcy;": "Т",
                        "&Tfr;": "𝔗",
                        "&Therefore;": "∴",
                        "&Theta;": "Θ",
                        "&ThickSpace;": "  ",
                        "&ThinSpace;": " ",
                        "&Tilde;": "∼",
                        "&TildeEqual;": "≃",
                        "&TildeFullEqual;": "≅",
                        "&TildeTilde;": "≈",
                        "&Topf;": "𝕋",
                        "&TripleDot;": "⃛",
                        "&Tscr;": "𝒯",
                        "&Tstrok;": "Ŧ",
                        "&Uacute": "Ú",
                        "&Uacute;": "Ú",
                        "&Uarr;": "↟",
                        "&Uarrocir;": "⥉",
                        "&Ubrcy;": "Ў",
                        "&Ubreve;": "Ŭ",
                        "&Ucirc": "Û",
                        "&Ucirc;": "Û",
                        "&Ucy;": "У",
                        "&Udblac;": "Ű",
                        "&Ufr;": "𝔘",
                        "&Ugrave": "Ù",
                        "&Ugrave;": "Ù",
                        "&Umacr;": "Ū",
                        "&UnderBar;": "_",
                        "&UnderBrace;": "⏟",
                        "&UnderBracket;": "⎵",
                        "&UnderParenthesis;": "⏝",
                        "&Union;": "⋃",
                        "&UnionPlus;": "⊎",
                        "&Uogon;": "Ų",
                        "&Uopf;": "𝕌",
                        "&UpArrow;": "↑",
                        "&UpArrowBar;": "⤒",
                        "&UpArrowDownArrow;": "⇅",
                        "&UpDownArrow;": "↕",
                        "&UpEquilibrium;": "⥮",
                        "&UpTee;": "⊥",
                        "&UpTeeArrow;": "↥",
                        "&Uparrow;": "⇑",
                        "&Updownarrow;": "⇕",
                        "&UpperLeftArrow;": "↖",
                        "&UpperRightArrow;": "↗",
                        "&Upsi;": "ϒ",
                        "&Upsilon;": "Υ",
                        "&Uring;": "Ů",
                        "&Uscr;": "𝒰",
                        "&Utilde;": "Ũ",
                        "&Uuml": "Ü",
                        "&Uuml;": "Ü",
                        "&VDash;": "⊫",
                        "&Vbar;": "⫫",
                        "&Vcy;": "В",
                        "&Vdash;": "⊩",
                        "&Vdashl;": "⫦",
                        "&Vee;": "⋁",
                        "&Verbar;": "‖",
                        "&Vert;": "‖",
                        "&VerticalBar;": "∣",
                        "&VerticalLine;": "|",
                        "&VerticalSeparator;": "❘",
                        "&VerticalTilde;": "≀",
                        "&VeryThinSpace;": " ",
                        "&Vfr;": "𝔙",
                        "&Vopf;": "𝕍",
                        "&Vscr;": "𝒱",
                        "&Vvdash;": "⊪",
                        "&Wcirc;": "Ŵ",
                        "&Wedge;": "⋀",
                        "&Wfr;": "𝔚",
                        "&Wopf;": "𝕎",
                        "&Wscr;": "𝒲",
                        "&Xfr;": "𝔛",
                        "&Xi;": "Ξ",
                        "&Xopf;": "𝕏",
                        "&Xscr;": "𝒳",
                        "&YAcy;": "Я",
                        "&YIcy;": "Ї",
                        "&YUcy;": "Ю",
                        "&Yacute": "Ý",
                        "&Yacute;": "Ý",
                        "&Ycirc;": "Ŷ",
                        "&Ycy;": "Ы",
                        "&Yfr;": "𝔜",
                        "&Yopf;": "𝕐",
                        "&Yscr;": "𝒴",
                        "&Yuml;": "Ÿ",
                        "&ZHcy;": "Ж",
                        "&Zacute;": "Ź",
                        "&Zcaron;": "Ž",
                        "&Zcy;": "З",
                        "&Zdot;": "Ż",
                        "&ZeroWidthSpace;": "​",
                        "&Zeta;": "Ζ",
                        "&Zfr;": "ℨ",
                        "&Zopf;": "ℤ",
                        "&Zscr;": "𝒵",
                        "&aacute": "á",
                        "&aacute;": "á",
                        "&abreve;": "ă",
                        "&ac;": "∾",
                        "&acE;": "∾̳",
                        "&acd;": "∿",
                        "&acirc": "â",
                        "&acirc;": "â",
                        "&acute": "´",
                        "&acute;": "´",
                        "&acy;": "а",
                        "&aelig": "æ",
                        "&aelig;": "æ",
                        "&af;": "⁡",
                        "&afr;": "𝔞",
                        "&agrave": "à",
                        "&agrave;": "à",
                        "&alefsym;": "ℵ",
                        "&aleph;": "ℵ",
                        "&alpha;": "α",
                        "&amacr;": "ā",
                        "&amalg;": "⨿",
                        "&amp": "&",
                        "&amp;": "&",
                        "&and;": "∧",
                        "&andand;": "⩕",
                        "&andd;": "⩜",
                        "&andslope;": "⩘",
                        "&andv;": "⩚",
                        "&ang;": "∠",
                        "&ange;": "⦤",
                        "&angle;": "∠",
                        "&angmsd;": "∡",
                        "&angmsdaa;": "⦨",
                        "&angmsdab;": "⦩",
                        "&angmsdac;": "⦪",
                        "&angmsdad;": "⦫",
                        "&angmsdae;": "⦬",
                        "&angmsdaf;": "⦭",
                        "&angmsdag;": "⦮",
                        "&angmsdah;": "⦯",
                        "&angrt;": "∟",
                        "&angrtvb;": "⊾",
                        "&angrtvbd;": "⦝",
                        "&angsph;": "∢",
                        "&angst;": "Å",
                        "&angzarr;": "⍼",
                        "&aogon;": "ą",
                        "&aopf;": "𝕒",
                        "&ap;": "≈",
                        "&apE;": "⩰",
                        "&apacir;": "⩯",
                        "&ape;": "≊",
                        "&apid;": "≋",
                        "&apos;": "'",
                        "&approx;": "≈",
                        "&approxeq;": "≊",
                        "&aring": "å",
                        "&aring;": "å",
                        "&ascr;": "𝒶",
                        "&ast;": "*",
                        "&asymp;": "≈",
                        "&asympeq;": "≍",
                        "&atilde": "ã",
                        "&atilde;": "ã",
                        "&auml": "ä",
                        "&auml;": "ä",
                        "&awconint;": "∳",
                        "&awint;": "⨑",
                        "&bNot;": "⫭",
                        "&backcong;": "≌",
                        "&backepsilon;": "϶",
                        "&backprime;": "‵",
                        "&backsim;": "∽",
                        "&backsimeq;": "⋍",
                        "&barvee;": "⊽",
                        "&barwed;": "⌅",
                        "&barwedge;": "⌅",
                        "&bbrk;": "⎵",
                        "&bbrktbrk;": "⎶",
                        "&bcong;": "≌",
                        "&bcy;": "б",
                        "&bdquo;": "„",
                        "&becaus;": "∵",
                        "&because;": "∵",
                        "&bemptyv;": "⦰",
                        "&bepsi;": "϶",
                        "&bernou;": "ℬ",
                        "&beta;": "β",
                        "&beth;": "ℶ",
                        "&between;": "≬",
                        "&bfr;": "𝔟",
                        "&bigcap;": "⋂",
                        "&bigcirc;": "◯",
                        "&bigcup;": "⋃",
                        "&bigodot;": "⨀",
                        "&bigoplus;": "⨁",
                        "&bigotimes;": "⨂",
                        "&bigsqcup;": "⨆",
                        "&bigstar;": "★",
                        "&bigtriangledown;": "▽",
                        "&bigtriangleup;": "△",
                        "&biguplus;": "⨄",
                        "&bigvee;": "⋁",
                        "&bigwedge;": "⋀",
                        "&bkarow;": "⤍",
                        "&blacklozenge;": "⧫",
                        "&blacksquare;": "▪",
                        "&blacktriangle;": "▴",
                        "&blacktriangledown;": "▾",
                        "&blacktriangleleft;": "◂",
                        "&blacktriangleright;": "▸",
                        "&blank;": "␣",
                        "&blk12;": "▒",
                        "&blk14;": "░",
                        "&blk34;": "▓",
                        "&block;": "█",
                        "&bne;": "=⃥",
                        "&bnequiv;": "≡⃥",
                        "&bnot;": "⌐",
                        "&bopf;": "𝕓",
                        "&bot;": "⊥",
                        "&bottom;": "⊥",
                        "&bowtie;": "⋈",
                        "&boxDL;": "╗",
                        "&boxDR;": "╔",
                        "&boxDl;": "╖",
                        "&boxDr;": "╓",
                        "&boxH;": "═",
                        "&boxHD;": "╦",
                        "&boxHU;": "╩",
                        "&boxHd;": "╤",
                        "&boxHu;": "╧",
                        "&boxUL;": "╝",
                        "&boxUR;": "╚",
                        "&boxUl;": "╜",
                        "&boxUr;": "╙",
                        "&boxV;": "║",
                        "&boxVH;": "╬",
                        "&boxVL;": "╣",
                        "&boxVR;": "╠",
                        "&boxVh;": "╫",
                        "&boxVl;": "╢",
                        "&boxVr;": "╟",
                        "&boxbox;": "⧉",
                        "&boxdL;": "╕",
                        "&boxdR;": "╒",
                        "&boxdl;": "┐",
                        "&boxdr;": "┌",
                        "&boxh;": "─",
                        "&boxhD;": "╥",
                        "&boxhU;": "╨",
                        "&boxhd;": "┬",
                        "&boxhu;": "┴",
                        "&boxminus;": "⊟",
                        "&boxplus;": "⊞",
                        "&boxtimes;": "⊠",
                        "&boxuL;": "╛",
                        "&boxuR;": "╘",
                        "&boxul;": "┘",
                        "&boxur;": "└",
                        "&boxv;": "│",
                        "&boxvH;": "╪",
                        "&boxvL;": "╡",
                        "&boxvR;": "╞",
                        "&boxvh;": "┼",
                        "&boxvl;": "┤",
                        "&boxvr;": "├",
                        "&bprime;": "‵",
                        "&breve;": "˘",
                        "&brvbar": "¦",
                        "&brvbar;": "¦",
                        "&bscr;": "𝒷",
                        "&bsemi;": "⁏",
                        "&bsim;": "∽",
                        "&bsime;": "⋍",
                        "&bsol;": "\\",
                        "&bsolb;": "⧅",
                        "&bsolhsub;": "⟈",
                        "&bull;": "•",
                        "&bullet;": "•",
                        "&bump;": "≎",
                        "&bumpE;": "⪮",
                        "&bumpe;": "≏",
                        "&bumpeq;": "≏",
                        "&cacute;": "ć",
                        "&cap;": "∩",
                        "&capand;": "⩄",
                        "&capbrcup;": "⩉",
                        "&capcap;": "⩋",
                        "&capcup;": "⩇",
                        "&capdot;": "⩀",
                        "&caps;": "∩︀",
                        "&caret;": "⁁",
                        "&caron;": "ˇ",
                        "&ccaps;": "⩍",
                        "&ccaron;": "č",
                        "&ccedil": "ç",
                        "&ccedil;": "ç",
                        "&ccirc;": "ĉ",
                        "&ccups;": "⩌",
                        "&ccupssm;": "⩐",
                        "&cdot;": "ċ",
                        "&cedil": "¸",
                        "&cedil;": "¸",
                        "&cemptyv;": "⦲",
                        "&cent": "¢",
                        "&cent;": "¢",
                        "&centerdot;": "·",
                        "&cfr;": "𝔠",
                        "&chcy;": "ч",
                        "&check;": "✓",
                        "&checkmark;": "✓",
                        "&chi;": "χ",
                        "&cir;": "○",
                        "&cirE;": "⧃",
                        "&circ;": "ˆ",
                        "&circeq;": "≗",
                        "&circlearrowleft;": "↺",
                        "&circlearrowright;": "↻",
                        "&circledR;": "®",
                        "&circledS;": "Ⓢ",
                        "&circledast;": "⊛",
                        "&circledcirc;": "⊚",
                        "&circleddash;": "⊝",
                        "&cire;": "≗",
                        "&cirfnint;": "⨐",
                        "&cirmid;": "⫯",
                        "&cirscir;": "⧂",
                        "&clubs;": "♣",
                        "&clubsuit;": "♣",
                        "&colon;": ":",
                        "&colone;": "≔",
                        "&coloneq;": "≔",
                        "&comma;": ",",
                        "&commat;": "@",
                        "&comp;": "∁",
                        "&compfn;": "∘",
                        "&complement;": "∁",
                        "&complexes;": "ℂ",
                        "&cong;": "≅",
                        "&congdot;": "⩭",
                        "&conint;": "∮",
                        "&copf;": "𝕔",
                        "&coprod;": "∐",
                        "&copy": "©",
                        "&copy;": "©",
                        "&copysr;": "℗",
                        "&crarr;": "↵",
                        "&cross;": "✗",
                        "&cscr;": "𝒸",
                        "&csub;": "⫏",
                        "&csube;": "⫑",
                        "&csup;": "⫐",
                        "&csupe;": "⫒",
                        "&ctdot;": "⋯",
                        "&cudarrl;": "⤸",
                        "&cudarrr;": "⤵",
                        "&cuepr;": "⋞",
                        "&cuesc;": "⋟",
                        "&cularr;": "↶",
                        "&cularrp;": "⤽",
                        "&cup;": "∪",
                        "&cupbrcap;": "⩈",
                        "&cupcap;": "⩆",
                        "&cupcup;": "⩊",
                        "&cupdot;": "⊍",
                        "&cupor;": "⩅",
                        "&cups;": "∪︀",
                        "&curarr;": "↷",
                        "&curarrm;": "⤼",
                        "&curlyeqprec;": "⋞",
                        "&curlyeqsucc;": "⋟",
                        "&curlyvee;": "⋎",
                        "&curlywedge;": "⋏",
                        "&curren": "¤",
                        "&curren;": "¤",
                        "&curvearrowleft;": "↶",
                        "&curvearrowright;": "↷",
                        "&cuvee;": "⋎",
                        "&cuwed;": "⋏",
                        "&cwconint;": "∲",
                        "&cwint;": "∱",
                        "&cylcty;": "⌭",
                        "&dArr;": "⇓",
                        "&dHar;": "⥥",
                        "&dagger;": "†",
                        "&daleth;": "ℸ",
                        "&darr;": "↓",
                        "&dash;": "‐",
                        "&dashv;": "⊣",
                        "&dbkarow;": "⤏",
                        "&dblac;": "˝",
                        "&dcaron;": "ď",
                        "&dcy;": "д",
                        "&dd;": "ⅆ",
                        "&ddagger;": "‡",
                        "&ddarr;": "⇊",
                        "&ddotseq;": "⩷",
                        "&deg": "°",
                        "&deg;": "°",
                        "&delta;": "δ",
                        "&demptyv;": "⦱",
                        "&dfisht;": "⥿",
                        "&dfr;": "𝔡",
                        "&dharl;": "⇃",
                        "&dharr;": "⇂",
                        "&diam;": "⋄",
                        "&diamond;": "⋄",
                        "&diamondsuit;": "♦",
                        "&diams;": "♦",
                        "&die;": "¨",
                        "&digamma;": "ϝ",
                        "&disin;": "⋲",
                        "&div;": "÷",
                        "&divide": "÷",
                        "&divide;": "÷",
                        "&divideontimes;": "⋇",
                        "&divonx;": "⋇",
                        "&djcy;": "ђ",
                        "&dlcorn;": "⌞",
                        "&dlcrop;": "⌍",
                        "&dollar;": "$",
                        "&dopf;": "𝕕",
                        "&dot;": "˙",
                        "&doteq;": "≐",
                        "&doteqdot;": "≑",
                        "&dotminus;": "∸",
                        "&dotplus;": "∔",
                        "&dotsquare;": "⊡",
                        "&doublebarwedge;": "⌆",
                        "&downarrow;": "↓",
                        "&downdownarrows;": "⇊",
                        "&downharpoonleft;": "⇃",
                        "&downharpoonright;": "⇂",
                        "&drbkarow;": "⤐",
                        "&drcorn;": "⌟",
                        "&drcrop;": "⌌",
                        "&dscr;": "𝒹",
                        "&dscy;": "ѕ",
                        "&dsol;": "⧶",
                        "&dstrok;": "đ",
                        "&dtdot;": "⋱",
                        "&dtri;": "▿",
                        "&dtrif;": "▾",
                        "&duarr;": "⇵",
                        "&duhar;": "⥯",
                        "&dwangle;": "⦦",
                        "&dzcy;": "џ",
                        "&dzigrarr;": "⟿",
                        "&eDDot;": "⩷",
                        "&eDot;": "≑",
                        "&eacute": "é",
                        "&eacute;": "é",
                        "&easter;": "⩮",
                        "&ecaron;": "ě",
                        "&ecir;": "≖",
                        "&ecirc": "ê",
                        "&ecirc;": "ê",
                        "&ecolon;": "≕",
                        "&ecy;": "э",
                        "&edot;": "ė",
                        "&ee;": "ⅇ",
                        "&efDot;": "≒",
                        "&efr;": "𝔢",
                        "&eg;": "⪚",
                        "&egrave": "è",
                        "&egrave;": "è",
                        "&egs;": "⪖",
                        "&egsdot;": "⪘",
                        "&el;": "⪙",
                        "&elinters;": "⏧",
                        "&ell;": "ℓ",
                        "&els;": "⪕",
                        "&elsdot;": "⪗",
                        "&emacr;": "ē",
                        "&empty;": "∅",
                        "&emptyset;": "∅",
                        "&emptyv;": "∅",
                        "&emsp13;": " ",
                        "&emsp14;": " ",
                        "&emsp;": " ",
                        "&eng;": "ŋ",
                        "&ensp;": " ",
                        "&eogon;": "ę",
                        "&eopf;": "𝕖",
                        "&epar;": "⋕",
                        "&eparsl;": "⧣",
                        "&eplus;": "⩱",
                        "&epsi;": "ε",
                        "&epsilon;": "ε",
                        "&epsiv;": "ϵ",
                        "&eqcirc;": "≖",
                        "&eqcolon;": "≕",
                        "&eqsim;": "≂",
                        "&eqslantgtr;": "⪖",
                        "&eqslantless;": "⪕",
                        "&equals;": "=",
                        "&equest;": "≟",
                        "&equiv;": "≡",
                        "&equivDD;": "⩸",
                        "&eqvparsl;": "⧥",
                        "&erDot;": "≓",
                        "&erarr;": "⥱",
                        "&escr;": "ℯ",
                        "&esdot;": "≐",
                        "&esim;": "≂",
                        "&eta;": "η",
                        "&eth": "ð",
                        "&eth;": "ð",
                        "&euml": "ë",
                        "&euml;": "ë",
                        "&euro;": "€",
                        "&excl;": "!",
                        "&exist;": "∃",
                        "&expectation;": "ℰ",
                        "&exponentiale;": "ⅇ",
                        "&fallingdotseq;": "≒",
                        "&fcy;": "ф",
                        "&female;": "♀",
                        "&ffilig;": "ﬃ",
                        "&fflig;": "ﬀ",
                        "&ffllig;": "ﬄ",
                        "&ffr;": "𝔣",
                        "&filig;": "ﬁ",
                        "&fjlig;": "fj",
                        "&flat;": "♭",
                        "&fllig;": "ﬂ",
                        "&fltns;": "▱",
                        "&fnof;": "ƒ",
                        "&fopf;": "𝕗",
                        "&forall;": "∀",
                        "&fork;": "⋔",
                        "&forkv;": "⫙",
                        "&fpartint;": "⨍",
                        "&frac12": "½",
                        "&frac12;": "½",
                        "&frac13;": "⅓",
                        "&frac14": "¼",
                        "&frac14;": "¼",
                        "&frac15;": "⅕",
                        "&frac16;": "⅙",
                        "&frac18;": "⅛",
                        "&frac23;": "⅔",
                        "&frac25;": "⅖",
                        "&frac34": "¾",
                        "&frac34;": "¾",
                        "&frac35;": "⅗",
                        "&frac38;": "⅜",
                        "&frac45;": "⅘",
                        "&frac56;": "⅚",
                        "&frac58;": "⅝",
                        "&frac78;": "⅞",
                        "&frasl;": "⁄",
                        "&frown;": "⌢",
                        "&fscr;": "𝒻",
                        "&gE;": "≧",
                        "&gEl;": "⪌",
                        "&gacute;": "ǵ",
                        "&gamma;": "γ",
                        "&gammad;": "ϝ",
                        "&gap;": "⪆",
                        "&gbreve;": "ğ",
                        "&gcirc;": "ĝ",
                        "&gcy;": "г",
                        "&gdot;": "ġ",
                        "&ge;": "≥",
                        "&gel;": "⋛",
                        "&geq;": "≥",
                        "&geqq;": "≧",
                        "&geqslant;": "⩾",
                        "&ges;": "⩾",
                        "&gescc;": "⪩",
                        "&gesdot;": "⪀",
                        "&gesdoto;": "⪂",
                        "&gesdotol;": "⪄",
                        "&gesl;": "⋛︀",
                        "&gesles;": "⪔",
                        "&gfr;": "𝔤",
                        "&gg;": "≫",
                        "&ggg;": "⋙",
                        "&gimel;": "ℷ",
                        "&gjcy;": "ѓ",
                        "&gl;": "≷",
                        "&glE;": "⪒",
                        "&gla;": "⪥",
                        "&glj;": "⪤",
                        "&gnE;": "≩",
                        "&gnap;": "⪊",
                        "&gnapprox;": "⪊",
                        "&gne;": "⪈",
                        "&gneq;": "⪈",
                        "&gneqq;": "≩",
                        "&gnsim;": "⋧",
                        "&gopf;": "𝕘",
                        "&grave;": "`",
                        "&gscr;": "ℊ",
                        "&gsim;": "≳",
                        "&gsime;": "⪎",
                        "&gsiml;": "⪐",
                        "&gt": ">",
                        "&gt;": ">",
                        "&gtcc;": "⪧",
                        "&gtcir;": "⩺",
                        "&gtdot;": "⋗",
                        "&gtlPar;": "⦕",
                        "&gtquest;": "⩼",
                        "&gtrapprox;": "⪆",
                        "&gtrarr;": "⥸",
                        "&gtrdot;": "⋗",
                        "&gtreqless;": "⋛",
                        "&gtreqqless;": "⪌",
                        "&gtrless;": "≷",
                        "&gtrsim;": "≳",
                        "&gvertneqq;": "≩︀",
                        "&gvnE;": "≩︀",
                        "&hArr;": "⇔",
                        "&hairsp;": " ",
                        "&half;": "½",
                        "&hamilt;": "ℋ",
                        "&hardcy;": "ъ",
                        "&harr;": "↔",
                        "&harrcir;": "⥈",
                        "&harrw;": "↭",
                        "&hbar;": "ℏ",
                        "&hcirc;": "ĥ",
                        "&hearts;": "♥",
                        "&heartsuit;": "♥",
                        "&hellip;": "…",
                        "&hercon;": "⊹",
                        "&hfr;": "𝔥",
                        "&hksearow;": "⤥",
                        "&hkswarow;": "⤦",
                        "&hoarr;": "⇿",
                        "&homtht;": "∻",
                        "&hookleftarrow;": "↩",
                        "&hookrightarrow;": "↪",
                        "&hopf;": "𝕙",
                        "&horbar;": "―",
                        "&hscr;": "𝒽",
                        "&hslash;": "ℏ",
                        "&hstrok;": "ħ",
                        "&hybull;": "⁃",
                        "&hyphen;": "‐",
                        "&iacute": "í",
                        "&iacute;": "í",
                        "&ic;": "⁣",
                        "&icirc": "î",
                        "&icirc;": "î",
                        "&icy;": "и",
                        "&iecy;": "е",
                        "&iexcl": "¡",
                        "&iexcl;": "¡",
                        "&iff;": "⇔",
                        "&ifr;": "𝔦",
                        "&igrave": "ì",
                        "&igrave;": "ì",
                        "&ii;": "ⅈ",
                        "&iiiint;": "⨌",
                        "&iiint;": "∭",
                        "&iinfin;": "⧜",
                        "&iiota;": "℩",
                        "&ijlig;": "ĳ",
                        "&imacr;": "ī",
                        "&image;": "ℑ",
                        "&imagline;": "ℐ",
                        "&imagpart;": "ℑ",
                        "&imath;": "ı",
                        "&imof;": "⊷",
                        "&imped;": "Ƶ",
                        "&in;": "∈",
                        "&incare;": "℅",
                        "&infin;": "∞",
                        "&infintie;": "⧝",
                        "&inodot;": "ı",
                        "&int;": "∫",
                        "&intcal;": "⊺",
                        "&integers;": "ℤ",
                        "&intercal;": "⊺",
                        "&intlarhk;": "⨗",
                        "&intprod;": "⨼",
                        "&iocy;": "ё",
                        "&iogon;": "į",
                        "&iopf;": "𝕚",
                        "&iota;": "ι",
                        "&iprod;": "⨼",
                        "&iquest": "¿",
                        "&iquest;": "¿",
                        "&iscr;": "𝒾",
                        "&isin;": "∈",
                        "&isinE;": "⋹",
                        "&isindot;": "⋵",
                        "&isins;": "⋴",
                        "&isinsv;": "⋳",
                        "&isinv;": "∈",
                        "&it;": "⁢",
                        "&itilde;": "ĩ",
                        "&iukcy;": "і",
                        "&iuml": "ï",
                        "&iuml;": "ï",
                        "&jcirc;": "ĵ",
                        "&jcy;": "й",
                        "&jfr;": "𝔧",
                        "&jmath;": "ȷ",
                        "&jopf;": "𝕛",
                        "&jscr;": "𝒿",
                        "&jsercy;": "ј",
                        "&jukcy;": "є",
                        "&kappa;": "κ",
                        "&kappav;": "ϰ",
                        "&kcedil;": "ķ",
                        "&kcy;": "к",
                        "&kfr;": "𝔨",
                        "&kgreen;": "ĸ",
                        "&khcy;": "х",
                        "&kjcy;": "ќ",
                        "&kopf;": "𝕜",
                        "&kscr;": "𝓀",
                        "&lAarr;": "⇚",
                        "&lArr;": "⇐",
                        "&lAtail;": "⤛",
                        "&lBarr;": "⤎",
                        "&lE;": "≦",
                        "&lEg;": "⪋",
                        "&lHar;": "⥢",
                        "&lacute;": "ĺ",
                        "&laemptyv;": "⦴",
                        "&lagran;": "ℒ",
                        "&lambda;": "λ",
                        "&lang;": "⟨",
                        "&langd;": "⦑",
                        "&langle;": "⟨",
                        "&lap;": "⪅",
                        "&laquo": "«",
                        "&laquo;": "«",
                        "&larr;": "←",
                        "&larrb;": "⇤",
                        "&larrbfs;": "⤟",
                        "&larrfs;": "⤝",
                        "&larrhk;": "↩",
                        "&larrlp;": "↫",
                        "&larrpl;": "⤹",
                        "&larrsim;": "⥳",
                        "&larrtl;": "↢",
                        "&lat;": "⪫",
                        "&latail;": "⤙",
                        "&late;": "⪭",
                        "&lates;": "⪭︀",
                        "&lbarr;": "⤌",
                        "&lbbrk;": "❲",
                        "&lbrace;": "{",
                        "&lbrack;": "[",
                        "&lbrke;": "⦋",
                        "&lbrksld;": "⦏",
                        "&lbrkslu;": "⦍",
                        "&lcaron;": "ľ",
                        "&lcedil;": "ļ",
                        "&lceil;": "⌈",
                        "&lcub;": "{",
                        "&lcy;": "л",
                        "&ldca;": "⤶",
                        "&ldquo;": "“",
                        "&ldquor;": "„",
                        "&ldrdhar;": "⥧",
                        "&ldrushar;": "⥋",
                        "&ldsh;": "↲",
                        "&le;": "≤",
                        "&leftarrow;": "←",
                        "&leftarrowtail;": "↢",
                        "&leftharpoondown;": "↽",
                        "&leftharpoonup;": "↼",
                        "&leftleftarrows;": "⇇",
                        "&leftrightarrow;": "↔",
                        "&leftrightarrows;": "⇆",
                        "&leftrightharpoons;": "⇋",
                        "&leftrightsquigarrow;": "↭",
                        "&leftthreetimes;": "⋋",
                        "&leg;": "⋚",
                        "&leq;": "≤",
                        "&leqq;": "≦",
                        "&leqslant;": "⩽",
                        "&les;": "⩽",
                        "&lescc;": "⪨",
                        "&lesdot;": "⩿",
                        "&lesdoto;": "⪁",
                        "&lesdotor;": "⪃",
                        "&lesg;": "⋚︀",
                        "&lesges;": "⪓",
                        "&lessapprox;": "⪅",
                        "&lessdot;": "⋖",
                        "&lesseqgtr;": "⋚",
                        "&lesseqqgtr;": "⪋",
                        "&lessgtr;": "≶",
                        "&lesssim;": "≲",
                        "&lfisht;": "⥼",
                        "&lfloor;": "⌊",
                        "&lfr;": "𝔩",
                        "&lg;": "≶",
                        "&lgE;": "⪑",
                        "&lhard;": "↽",
                        "&lharu;": "↼",
                        "&lharul;": "⥪",
                        "&lhblk;": "▄",
                        "&ljcy;": "љ",
                        "&ll;": "≪",
                        "&llarr;": "⇇",
                        "&llcorner;": "⌞",
                        "&llhard;": "⥫",
                        "&lltri;": "◺",
                        "&lmidot;": "ŀ",
                        "&lmoust;": "⎰",
                        "&lmoustache;": "⎰",
                        "&lnE;": "≨",
                        "&lnap;": "⪉",
                        "&lnapprox;": "⪉",
                        "&lne;": "⪇",
                        "&lneq;": "⪇",
                        "&lneqq;": "≨",
                        "&lnsim;": "⋦",
                        "&loang;": "⟬",
                        "&loarr;": "⇽",
                        "&lobrk;": "⟦",
                        "&longleftarrow;": "⟵",
                        "&longleftrightarrow;": "⟷",
                        "&longmapsto;": "⟼",
                        "&longrightarrow;": "⟶",
                        "&looparrowleft;": "↫",
                        "&looparrowright;": "↬",
                        "&lopar;": "⦅",
                        "&lopf;": "𝕝",
                        "&loplus;": "⨭",
                        "&lotimes;": "⨴",
                        "&lowast;": "∗",
                        "&lowbar;": "_",
                        "&loz;": "◊",
                        "&lozenge;": "◊",
                        "&lozf;": "⧫",
                        "&lpar;": "(",
                        "&lparlt;": "⦓",
                        "&lrarr;": "⇆",
                        "&lrcorner;": "⌟",
                        "&lrhar;": "⇋",
                        "&lrhard;": "⥭",
                        "&lrm;": "‎",
                        "&lrtri;": "⊿",
                        "&lsaquo;": "‹",
                        "&lscr;": "𝓁",
                        "&lsh;": "↰",
                        "&lsim;": "≲",
                        "&lsime;": "⪍",
                        "&lsimg;": "⪏",
                        "&lsqb;": "[",
                        "&lsquo;": "‘",
                        "&lsquor;": "‚",
                        "&lstrok;": "ł",
                        "&lt": "<",
                        "&lt;": "<",
                        "&ltcc;": "⪦",
                        "&ltcir;": "⩹",
                        "&ltdot;": "⋖",
                        "&lthree;": "⋋",
                        "&ltimes;": "⋉",
                        "&ltlarr;": "⥶",
                        "&ltquest;": "⩻",
                        "&ltrPar;": "⦖",
                        "&ltri;": "◃",
                        "&ltrie;": "⊴",
                        "&ltrif;": "◂",
                        "&lurdshar;": "⥊",
                        "&luruhar;": "⥦",
                        "&lvertneqq;": "≨︀",
                        "&lvnE;": "≨︀",
                        "&mDDot;": "∺",
                        "&macr": "¯",
                        "&macr;": "¯",
                        "&male;": "♂",
                        "&malt;": "✠",
                        "&maltese;": "✠",
                        "&map;": "↦",
                        "&mapsto;": "↦",
                        "&mapstodown;": "↧",
                        "&mapstoleft;": "↤",
                        "&mapstoup;": "↥",
                        "&marker;": "▮",
                        "&mcomma;": "⨩",
                        "&mcy;": "м",
                        "&mdash;": "—",
                        "&measuredangle;": "∡",
                        "&mfr;": "𝔪",
                        "&mho;": "℧",
                        "&micro": "µ",
                        "&micro;": "µ",
                        "&mid;": "∣",
                        "&midast;": "*",
                        "&midcir;": "⫰",
                        "&middot": "·",
                        "&middot;": "·",
                        "&minus;": "−",
                        "&minusb;": "⊟",
                        "&minusd;": "∸",
                        "&minusdu;": "⨪",
                        "&mlcp;": "⫛",
                        "&mldr;": "…",
                        "&mnplus;": "∓",
                        "&models;": "⊧",
                        "&mopf;": "𝕞",
                        "&mp;": "∓",
                        "&mscr;": "𝓂",
                        "&mstpos;": "∾",
                        "&mu;": "μ",
                        "&multimap;": "⊸",
                        "&mumap;": "⊸",
                        "&nGg;": "⋙̸",
                        "&nGt;": "≫⃒",
                        "&nGtv;": "≫̸",
                        "&nLeftarrow;": "⇍",
                        "&nLeftrightarrow;": "⇎",
                        "&nLl;": "⋘̸",
                        "&nLt;": "≪⃒",
                        "&nLtv;": "≪̸",
                        "&nRightarrow;": "⇏",
                        "&nVDash;": "⊯",
                        "&nVdash;": "⊮",
                        "&nabla;": "∇",
                        "&nacute;": "ń",
                        "&nang;": "∠⃒",
                        "&nap;": "≉",
                        "&napE;": "⩰̸",
                        "&napid;": "≋̸",
                        "&napos;": "ŉ",
                        "&napprox;": "≉",
                        "&natur;": "♮",
                        "&natural;": "♮",
                        "&naturals;": "ℕ",
                        "&nbsp": " ",
                        "&nbsp;": " ",
                        "&nbump;": "≎̸",
                        "&nbumpe;": "≏̸",
                        "&ncap;": "⩃",
                        "&ncaron;": "ň",
                        "&ncedil;": "ņ",
                        "&ncong;": "≇",
                        "&ncongdot;": "⩭̸",
                        "&ncup;": "⩂",
                        "&ncy;": "н",
                        "&ndash;": "–",
                        "&ne;": "≠",
                        "&neArr;": "⇗",
                        "&nearhk;": "⤤",
                        "&nearr;": "↗",
                        "&nearrow;": "↗",
                        "&nedot;": "≐̸",
                        "&nequiv;": "≢",
                        "&nesear;": "⤨",
                        "&nesim;": "≂̸",
                        "&nexist;": "∄",
                        "&nexists;": "∄",
                        "&nfr;": "𝔫",
                        "&ngE;": "≧̸",
                        "&nge;": "≱",
                        "&ngeq;": "≱",
                        "&ngeqq;": "≧̸",
                        "&ngeqslant;": "⩾̸",
                        "&nges;": "⩾̸",
                        "&ngsim;": "≵",
                        "&ngt;": "≯",
                        "&ngtr;": "≯",
                        "&nhArr;": "⇎",
                        "&nharr;": "↮",
                        "&nhpar;": "⫲",
                        "&ni;": "∋",
                        "&nis;": "⋼",
                        "&nisd;": "⋺",
                        "&niv;": "∋",
                        "&njcy;": "њ",
                        "&nlArr;": "⇍",
                        "&nlE;": "≦̸",
                        "&nlarr;": "↚",
                        "&nldr;": "‥",
                        "&nle;": "≰",
                        "&nleftarrow;": "↚",
                        "&nleftrightarrow;": "↮",
                        "&nleq;": "≰",
                        "&nleqq;": "≦̸",
                        "&nleqslant;": "⩽̸",
                        "&nles;": "⩽̸",
                        "&nless;": "≮",
                        "&nlsim;": "≴",
                        "&nlt;": "≮",
                        "&nltri;": "⋪",
                        "&nltrie;": "⋬",
                        "&nmid;": "∤",
                        "&nopf;": "𝕟",
                        "&not": "¬",
                        "&not;": "¬",
                        "&notin;": "∉",
                        "&notinE;": "⋹̸",
                        "&notindot;": "⋵̸",
                        "&notinva;": "∉",
                        "&notinvb;": "⋷",
                        "&notinvc;": "⋶",
                        "&notni;": "∌",
                        "&notniva;": "∌",
                        "&notnivb;": "⋾",
                        "&notnivc;": "⋽",
                        "&npar;": "∦",
                        "&nparallel;": "∦",
                        "&nparsl;": "⫽⃥",
                        "&npart;": "∂̸",
                        "&npolint;": "⨔",
                        "&npr;": "⊀",
                        "&nprcue;": "⋠",
                        "&npre;": "⪯̸",
                        "&nprec;": "⊀",
                        "&npreceq;": "⪯̸",
                        "&nrArr;": "⇏",
                        "&nrarr;": "↛",
                        "&nrarrc;": "⤳̸",
                        "&nrarrw;": "↝̸",
                        "&nrightarrow;": "↛",
                        "&nrtri;": "⋫",
                        "&nrtrie;": "⋭",
                        "&nsc;": "⊁",
                        "&nsccue;": "⋡",
                        "&nsce;": "⪰̸",
                        "&nscr;": "𝓃",
                        "&nshortmid;": "∤",
                        "&nshortparallel;": "∦",
                        "&nsim;": "≁",
                        "&nsime;": "≄",
                        "&nsimeq;": "≄",
                        "&nsmid;": "∤",
                        "&nspar;": "∦",
                        "&nsqsube;": "⋢",
                        "&nsqsupe;": "⋣",
                        "&nsub;": "⊄",
                        "&nsubE;": "⫅̸",
                        "&nsube;": "⊈",
                        "&nsubset;": "⊂⃒",
                        "&nsubseteq;": "⊈",
                        "&nsubseteqq;": "⫅̸",
                        "&nsucc;": "⊁",
                        "&nsucceq;": "⪰̸",
                        "&nsup;": "⊅",
                        "&nsupE;": "⫆̸",
                        "&nsupe;": "⊉",
                        "&nsupset;": "⊃⃒",
                        "&nsupseteq;": "⊉",
                        "&nsupseteqq;": "⫆̸",
                        "&ntgl;": "≹",
                        "&ntilde": "ñ",
                        "&ntilde;": "ñ",
                        "&ntlg;": "≸",
                        "&ntriangleleft;": "⋪",
                        "&ntrianglelefteq;": "⋬",
                        "&ntriangleright;": "⋫",
                        "&ntrianglerighteq;": "⋭",
                        "&nu;": "ν",
                        "&num;": "#",
                        "&numero;": "№",
                        "&numsp;": " ",
                        "&nvDash;": "⊭",
                        "&nvHarr;": "⤄",
                        "&nvap;": "≍⃒",
                        "&nvdash;": "⊬",
                        "&nvge;": "≥⃒",
                        "&nvgt;": ">⃒",
                        "&nvinfin;": "⧞",
                        "&nvlArr;": "⤂",
                        "&nvle;": "≤⃒",
                        "&nvlt;": "<⃒",
                        "&nvltrie;": "⊴⃒",
                        "&nvrArr;": "⤃",
                        "&nvrtrie;": "⊵⃒",
                        "&nvsim;": "∼⃒",
                        "&nwArr;": "⇖",
                        "&nwarhk;": "⤣",
                        "&nwarr;": "↖",
                        "&nwarrow;": "↖",
                        "&nwnear;": "⤧",
                        "&oS;": "Ⓢ",
                        "&oacute": "ó",
                        "&oacute;": "ó",
                        "&oast;": "⊛",
                        "&ocir;": "⊚",
                        "&ocirc": "ô",
                        "&ocirc;": "ô",
                        "&ocy;": "о",
                        "&odash;": "⊝",
                        "&odblac;": "ő",
                        "&odiv;": "⨸",
                        "&odot;": "⊙",
                        "&odsold;": "⦼",
                        "&oelig;": "œ",
                        "&ofcir;": "⦿",
                        "&ofr;": "𝔬",
                        "&ogon;": "˛",
                        "&ograve": "ò",
                        "&ograve;": "ò",
                        "&ogt;": "⧁",
                        "&ohbar;": "⦵",
                        "&ohm;": "Ω",
                        "&oint;": "∮",
                        "&olarr;": "↺",
                        "&olcir;": "⦾",
                        "&olcross;": "⦻",
                        "&oline;": "‾",
                        "&olt;": "⧀",
                        "&omacr;": "ō",
                        "&omega;": "ω",
                        "&omicron;": "ο",
                        "&omid;": "⦶",
                        "&ominus;": "⊖",
                        "&oopf;": "𝕠",
                        "&opar;": "⦷",
                        "&operp;": "⦹",
                        "&oplus;": "⊕",
                        "&or;": "∨",
                        "&orarr;": "↻",
                        "&ord;": "⩝",
                        "&order;": "ℴ",
                        "&orderof;": "ℴ",
                        "&ordf": "ª",
                        "&ordf;": "ª",
                        "&ordm": "º",
                        "&ordm;": "º",
                        "&origof;": "⊶",
                        "&oror;": "⩖",
                        "&orslope;": "⩗",
                        "&orv;": "⩛",
                        "&oscr;": "ℴ",
                        "&oslash": "ø",
                        "&oslash;": "ø",
                        "&osol;": "⊘",
                        "&otilde": "õ",
                        "&otilde;": "õ",
                        "&otimes;": "⊗",
                        "&otimesas;": "⨶",
                        "&ouml": "ö",
                        "&ouml;": "ö",
                        "&ovbar;": "⌽",
                        "&par;": "∥",
                        "&para": "¶",
                        "&para;": "¶",
                        "&parallel;": "∥",
                        "&parsim;": "⫳",
                        "&parsl;": "⫽",
                        "&part;": "∂",
                        "&pcy;": "п",
                        "&percnt;": "%",
                        "&period;": ".",
                        "&permil;": "‰",
                        "&perp;": "⊥",
                        "&pertenk;": "‱",
                        "&pfr;": "𝔭",
                        "&phi;": "φ",
                        "&phiv;": "ϕ",
                        "&phmmat;": "ℳ",
                        "&phone;": "☎",
                        "&pi;": "π",
                        "&pitchfork;": "⋔",
                        "&piv;": "ϖ",
                        "&planck;": "ℏ",
                        "&planckh;": "ℎ",
                        "&plankv;": "ℏ",
                        "&plus;": "+",
                        "&plusacir;": "⨣",
                        "&plusb;": "⊞",
                        "&pluscir;": "⨢",
                        "&plusdo;": "∔",
                        "&plusdu;": "⨥",
                        "&pluse;": "⩲",
                        "&plusmn": "±",
                        "&plusmn;": "±",
                        "&plussim;": "⨦",
                        "&plustwo;": "⨧",
                        "&pm;": "±",
                        "&pointint;": "⨕",
                        "&popf;": "𝕡",
                        "&pound": "£",
                        "&pound;": "£",
                        "&pr;": "≺",
                        "&prE;": "⪳",
                        "&prap;": "⪷",
                        "&prcue;": "≼",
                        "&pre;": "⪯",
                        "&prec;": "≺",
                        "&precapprox;": "⪷",
                        "&preccurlyeq;": "≼",
                        "&preceq;": "⪯",
                        "&precnapprox;": "⪹",
                        "&precneqq;": "⪵",
                        "&precnsim;": "⋨",
                        "&precsim;": "≾",
                        "&prime;": "′",
                        "&primes;": "ℙ",
                        "&prnE;": "⪵",
                        "&prnap;": "⪹",
                        "&prnsim;": "⋨",
                        "&prod;": "∏",
                        "&profalar;": "⌮",
                        "&profline;": "⌒",
                        "&profsurf;": "⌓",
                        "&prop;": "∝",
                        "&propto;": "∝",
                        "&prsim;": "≾",
                        "&prurel;": "⊰",
                        "&pscr;": "𝓅",
                        "&psi;": "ψ",
                        "&puncsp;": " ",
                        "&qfr;": "𝔮",
                        "&qint;": "⨌",
                        "&qopf;": "𝕢",
                        "&qprime;": "⁗",
                        "&qscr;": "𝓆",
                        "&quaternions;": "ℍ",
                        "&quatint;": "⨖",
                        "&quest;": "?",
                        "&questeq;": "≟",
                        "&quot": '"',
                        "&quot;": '"',
                        "&rAarr;": "⇛",
                        "&rArr;": "⇒",
                        "&rAtail;": "⤜",
                        "&rBarr;": "⤏",
                        "&rHar;": "⥤",
                        "&race;": "∽̱",
                        "&racute;": "ŕ",
                        "&radic;": "√",
                        "&raemptyv;": "⦳",
                        "&rang;": "⟩",
                        "&rangd;": "⦒",
                        "&range;": "⦥",
                        "&rangle;": "⟩",
                        "&raquo": "»",
                        "&raquo;": "»",
                        "&rarr;": "→",
                        "&rarrap;": "⥵",
                        "&rarrb;": "⇥",
                        "&rarrbfs;": "⤠",
                        "&rarrc;": "⤳",
                        "&rarrfs;": "⤞",
                        "&rarrhk;": "↪",
                        "&rarrlp;": "↬",
                        "&rarrpl;": "⥅",
                        "&rarrsim;": "⥴",
                        "&rarrtl;": "↣",
                        "&rarrw;": "↝",
                        "&ratail;": "⤚",
                        "&ratio;": "∶",
                        "&rationals;": "ℚ",
                        "&rbarr;": "⤍",
                        "&rbbrk;": "❳",
                        "&rbrace;": "}",
                        "&rbrack;": "]",
                        "&rbrke;": "⦌",
                        "&rbrksld;": "⦎",
                        "&rbrkslu;": "⦐",
                        "&rcaron;": "ř",
                        "&rcedil;": "ŗ",
                        "&rceil;": "⌉",
                        "&rcub;": "}",
                        "&rcy;": "р",
                        "&rdca;": "⤷",
                        "&rdldhar;": "⥩",
                        "&rdquo;": "”",
                        "&rdquor;": "”",
                        "&rdsh;": "↳",
                        "&real;": "ℜ",
                        "&realine;": "ℛ",
                        "&realpart;": "ℜ",
                        "&reals;": "ℝ",
                        "&rect;": "▭",
                        "&reg": "®",
                        "&reg;": "®",
                        "&rfisht;": "⥽",
                        "&rfloor;": "⌋",
                        "&rfr;": "𝔯",
                        "&rhard;": "⇁",
                        "&rharu;": "⇀",
                        "&rharul;": "⥬",
                        "&rho;": "ρ",
                        "&rhov;": "ϱ",
                        "&rightarrow;": "→",
                        "&rightarrowtail;": "↣",
                        "&rightharpoondown;": "⇁",
                        "&rightharpoonup;": "⇀",
                        "&rightleftarrows;": "⇄",
                        "&rightleftharpoons;": "⇌",
                        "&rightrightarrows;": "⇉",
                        "&rightsquigarrow;": "↝",
                        "&rightthreetimes;": "⋌",
                        "&ring;": "˚",
                        "&risingdotseq;": "≓",
                        "&rlarr;": "⇄",
                        "&rlhar;": "⇌",
                        "&rlm;": "‏",
                        "&rmoust;": "⎱",
                        "&rmoustache;": "⎱",
                        "&rnmid;": "⫮",
                        "&roang;": "⟭",
                        "&roarr;": "⇾",
                        "&robrk;": "⟧",
                        "&ropar;": "⦆",
                        "&ropf;": "𝕣",
                        "&roplus;": "⨮",
                        "&rotimes;": "⨵",
                        "&rpar;": ")",
                        "&rpargt;": "⦔",
                        "&rppolint;": "⨒",
                        "&rrarr;": "⇉",
                        "&rsaquo;": "›",
                        "&rscr;": "𝓇",
                        "&rsh;": "↱",
                        "&rsqb;": "]",
                        "&rsquo;": "’",
                        "&rsquor;": "’",
                        "&rthree;": "⋌",
                        "&rtimes;": "⋊",
                        "&rtri;": "▹",
                        "&rtrie;": "⊵",
                        "&rtrif;": "▸",
                        "&rtriltri;": "⧎",
                        "&ruluhar;": "⥨",
                        "&rx;": "℞",
                        "&sacute;": "ś",
                        "&sbquo;": "‚",
                        "&sc;": "≻",
                        "&scE;": "⪴",
                        "&scap;": "⪸",
                        "&scaron;": "š",
                        "&sccue;": "≽",
                        "&sce;": "⪰",
                        "&scedil;": "ş",
                        "&scirc;": "ŝ",
                        "&scnE;": "⪶",
                        "&scnap;": "⪺",
                        "&scnsim;": "⋩",
                        "&scpolint;": "⨓",
                        "&scsim;": "≿",
                        "&scy;": "с",
                        "&sdot;": "⋅",
                        "&sdotb;": "⊡",
                        "&sdote;": "⩦",
                        "&seArr;": "⇘",
                        "&searhk;": "⤥",
                        "&searr;": "↘",
                        "&searrow;": "↘",
                        "&sect": "§",
                        "&sect;": "§",
                        "&semi;": ";",
                        "&seswar;": "⤩",
                        "&setminus;": "∖",
                        "&setmn;": "∖",
                        "&sext;": "✶",
                        "&sfr;": "𝔰",
                        "&sfrown;": "⌢",
                        "&sharp;": "♯",
                        "&shchcy;": "щ",
                        "&shcy;": "ш",
                        "&shortmid;": "∣",
                        "&shortparallel;": "∥",
                        "&shy": "­",
                        "&shy;": "­",
                        "&sigma;": "σ",
                        "&sigmaf;": "ς",
                        "&sigmav;": "ς",
                        "&sim;": "∼",
                        "&simdot;": "⩪",
                        "&sime;": "≃",
                        "&simeq;": "≃",
                        "&simg;": "⪞",
                        "&simgE;": "⪠",
                        "&siml;": "⪝",
                        "&simlE;": "⪟",
                        "&simne;": "≆",
                        "&simplus;": "⨤",
                        "&simrarr;": "⥲",
                        "&slarr;": "←",
                        "&smallsetminus;": "∖",
                        "&smashp;": "⨳",
                        "&smeparsl;": "⧤",
                        "&smid;": "∣",
                        "&smile;": "⌣",
                        "&smt;": "⪪",
                        "&smte;": "⪬",
                        "&smtes;": "⪬︀",
                        "&softcy;": "ь",
                        "&sol;": "/",
                        "&solb;": "⧄",
                        "&solbar;": "⌿",
                        "&sopf;": "𝕤",
                        "&spades;": "♠",
                        "&spadesuit;": "♠",
                        "&spar;": "∥",
                        "&sqcap;": "⊓",
                        "&sqcaps;": "⊓︀",
                        "&sqcup;": "⊔",
                        "&sqcups;": "⊔︀",
                        "&sqsub;": "⊏",
                        "&sqsube;": "⊑",
                        "&sqsubset;": "⊏",
                        "&sqsubseteq;": "⊑",
                        "&sqsup;": "⊐",
                        "&sqsupe;": "⊒",
                        "&sqsupset;": "⊐",
                        "&sqsupseteq;": "⊒",
                        "&squ;": "□",
                        "&square;": "□",
                        "&squarf;": "▪",
                        "&squf;": "▪",
                        "&srarr;": "→",
                        "&sscr;": "𝓈",
                        "&ssetmn;": "∖",
                        "&ssmile;": "⌣",
                        "&sstarf;": "⋆",
                        "&star;": "☆",
                        "&starf;": "★",
                        "&straightepsilon;": "ϵ",
                        "&straightphi;": "ϕ",
                        "&strns;": "¯",
                        "&sub;": "⊂",
                        "&subE;": "⫅",
                        "&subdot;": "⪽",
                        "&sube;": "⊆",
                        "&subedot;": "⫃",
                        "&submult;": "⫁",
                        "&subnE;": "⫋",
                        "&subne;": "⊊",
                        "&subplus;": "⪿",
                        "&subrarr;": "⥹",
                        "&subset;": "⊂",
                        "&subseteq;": "⊆",
                        "&subseteqq;": "⫅",
                        "&subsetneq;": "⊊",
                        "&subsetneqq;": "⫋",
                        "&subsim;": "⫇",
                        "&subsub;": "⫕",
                        "&subsup;": "⫓",
                        "&succ;": "≻",
                        "&succapprox;": "⪸",
                        "&succcurlyeq;": "≽",
                        "&succeq;": "⪰",
                        "&succnapprox;": "⪺",
                        "&succneqq;": "⪶",
                        "&succnsim;": "⋩",
                        "&succsim;": "≿",
                        "&sum;": "∑",
                        "&sung;": "♪",
                        "&sup1": "¹",
                        "&sup1;": "¹",
                        "&sup2": "²",
                        "&sup2;": "²",
                        "&sup3": "³",
                        "&sup3;": "³",
                        "&sup;": "⊃",
                        "&supE;": "⫆",
                        "&supdot;": "⪾",
                        "&supdsub;": "⫘",
                        "&supe;": "⊇",
                        "&supedot;": "⫄",
                        "&suphsol;": "⟉",
                        "&suphsub;": "⫗",
                        "&suplarr;": "⥻",
                        "&supmult;": "⫂",
                        "&supnE;": "⫌",
                        "&supne;": "⊋",
                        "&supplus;": "⫀",
                        "&supset;": "⊃",
                        "&supseteq;": "⊇",
                        "&supseteqq;": "⫆",
                        "&supsetneq;": "⊋",
                        "&supsetneqq;": "⫌",
                        "&supsim;": "⫈",
                        "&supsub;": "⫔",
                        "&supsup;": "⫖",
                        "&swArr;": "⇙",
                        "&swarhk;": "⤦",
                        "&swarr;": "↙",
                        "&swarrow;": "↙",
                        "&swnwar;": "⤪",
                        "&szlig": "ß",
                        "&szlig;": "ß",
                        "&target;": "⌖",
                        "&tau;": "τ",
                        "&tbrk;": "⎴",
                        "&tcaron;": "ť",
                        "&tcedil;": "ţ",
                        "&tcy;": "т",
                        "&tdot;": "⃛",
                        "&telrec;": "⌕",
                        "&tfr;": "𝔱",
                        "&there4;": "∴",
                        "&therefore;": "∴",
                        "&theta;": "θ",
                        "&thetasym;": "ϑ",
                        "&thetav;": "ϑ",
                        "&thickapprox;": "≈",
                        "&thicksim;": "∼",
                        "&thinsp;": " ",
                        "&thkap;": "≈",
                        "&thksim;": "∼",
                        "&thorn": "þ",
                        "&thorn;": "þ",
                        "&tilde;": "˜",
                        "&times": "×",
                        "&times;": "×",
                        "&timesb;": "⊠",
                        "&timesbar;": "⨱",
                        "&timesd;": "⨰",
                        "&tint;": "∭",
                        "&toea;": "⤨",
                        "&top;": "⊤",
                        "&topbot;": "⌶",
                        "&topcir;": "⫱",
                        "&topf;": "𝕥",
                        "&topfork;": "⫚",
                        "&tosa;": "⤩",
                        "&tprime;": "‴",
                        "&trade;": "™",
                        "&triangle;": "▵",
                        "&triangledown;": "▿",
                        "&triangleleft;": "◃",
                        "&trianglelefteq;": "⊴",
                        "&triangleq;": "≜",
                        "&triangleright;": "▹",
                        "&trianglerighteq;": "⊵",
                        "&tridot;": "◬",
                        "&trie;": "≜",
                        "&triminus;": "⨺",
                        "&triplus;": "⨹",
                        "&trisb;": "⧍",
                        "&tritime;": "⨻",
                        "&trpezium;": "⏢",
                        "&tscr;": "𝓉",
                        "&tscy;": "ц",
                        "&tshcy;": "ћ",
                        "&tstrok;": "ŧ",
                        "&twixt;": "≬",
                        "&twoheadleftarrow;": "↞",
                        "&twoheadrightarrow;": "↠",
                        "&uArr;": "⇑",
                        "&uHar;": "⥣",
                        "&uacute": "ú",
                        "&uacute;": "ú",
                        "&uarr;": "↑",
                        "&ubrcy;": "ў",
                        "&ubreve;": "ŭ",
                        "&ucirc": "û",
                        "&ucirc;": "û",
                        "&ucy;": "у",
                        "&udarr;": "⇅",
                        "&udblac;": "ű",
                        "&udhar;": "⥮",
                        "&ufisht;": "⥾",
                        "&ufr;": "𝔲",
                        "&ugrave": "ù",
                        "&ugrave;": "ù",
                        "&uharl;": "↿",
                        "&uharr;": "↾",
                        "&uhblk;": "▀",
                        "&ulcorn;": "⌜",
                        "&ulcorner;": "⌜",
                        "&ulcrop;": "⌏",
                        "&ultri;": "◸",
                        "&umacr;": "ū",
                        "&uml": "¨",
                        "&uml;": "¨",
                        "&uogon;": "ų",
                        "&uopf;": "𝕦",
                        "&uparrow;": "↑",
                        "&updownarrow;": "↕",
                        "&upharpoonleft;": "↿",
                        "&upharpoonright;": "↾",
                        "&uplus;": "⊎",
                        "&upsi;": "υ",
                        "&upsih;": "ϒ",
                        "&upsilon;": "υ",
                        "&upuparrows;": "⇈",
                        "&urcorn;": "⌝",
                        "&urcorner;": "⌝",
                        "&urcrop;": "⌎",
                        "&uring;": "ů",
                        "&urtri;": "◹",
                        "&uscr;": "𝓊",
                        "&utdot;": "⋰",
                        "&utilde;": "ũ",
                        "&utri;": "▵",
                        "&utrif;": "▴",
                        "&uuarr;": "⇈",
                        "&uuml": "ü",
                        "&uuml;": "ü",
                        "&uwangle;": "⦧",
                        "&vArr;": "⇕",
                        "&vBar;": "⫨",
                        "&vBarv;": "⫩",
                        "&vDash;": "⊨",
                        "&vangrt;": "⦜",
                        "&varepsilon;": "ϵ",
                        "&varkappa;": "ϰ",
                        "&varnothing;": "∅",
                        "&varphi;": "ϕ",
                        "&varpi;": "ϖ",
                        "&varpropto;": "∝",
                        "&varr;": "↕",
                        "&varrho;": "ϱ",
                        "&varsigma;": "ς",
                        "&varsubsetneq;": "⊊︀",
                        "&varsubsetneqq;": "⫋︀",
                        "&varsupsetneq;": "⊋︀",
                        "&varsupsetneqq;": "⫌︀",
                        "&vartheta;": "ϑ",
                        "&vartriangleleft;": "⊲",
                        "&vartriangleright;": "⊳",
                        "&vcy;": "в",
                        "&vdash;": "⊢",
                        "&vee;": "∨",
                        "&veebar;": "⊻",
                        "&veeeq;": "≚",
                        "&vellip;": "⋮",
                        "&verbar;": "|",
                        "&vert;": "|",
                        "&vfr;": "𝔳",
                        "&vltri;": "⊲",
                        "&vnsub;": "⊂⃒",
                        "&vnsup;": "⊃⃒",
                        "&vopf;": "𝕧",
                        "&vprop;": "∝",
                        "&vrtri;": "⊳",
                        "&vscr;": "𝓋",
                        "&vsubnE;": "⫋︀",
                        "&vsubne;": "⊊︀",
                        "&vsupnE;": "⫌︀",
                        "&vsupne;": "⊋︀",
                        "&vzigzag;": "⦚",
                        "&wcirc;": "ŵ",
                        "&wedbar;": "⩟",
                        "&wedge;": "∧",
                        "&wedgeq;": "≙",
                        "&weierp;": "℘",
                        "&wfr;": "𝔴",
                        "&wopf;": "𝕨",
                        "&wp;": "℘",
                        "&wr;": "≀",
                        "&wreath;": "≀",
                        "&wscr;": "𝓌",
                        "&xcap;": "⋂",
                        "&xcirc;": "◯",
                        "&xcup;": "⋃",
                        "&xdtri;": "▽",
                        "&xfr;": "𝔵",
                        "&xhArr;": "⟺",
                        "&xharr;": "⟷",
                        "&xi;": "ξ",
                        "&xlArr;": "⟸",
                        "&xlarr;": "⟵",
                        "&xmap;": "⟼",
                        "&xnis;": "⋻",
                        "&xodot;": "⨀",
                        "&xopf;": "𝕩",
                        "&xoplus;": "⨁",
                        "&xotime;": "⨂",
                        "&xrArr;": "⟹",
                        "&xrarr;": "⟶",
                        "&xscr;": "𝓍",
                        "&xsqcup;": "⨆",
                        "&xuplus;": "⨄",
                        "&xutri;": "△",
                        "&xvee;": "⋁",
                        "&xwedge;": "⋀",
                        "&yacute": "ý",
                        "&yacute;": "ý",
                        "&yacy;": "я",
                        "&ycirc;": "ŷ",
                        "&ycy;": "ы",
                        "&yen": "¥",
                        "&yen;": "¥",
                        "&yfr;": "𝔶",
                        "&yicy;": "ї",
                        "&yopf;": "𝕪",
                        "&yscr;": "𝓎",
                        "&yucy;": "ю",
                        "&yuml": "ÿ",
                        "&yuml;": "ÿ",
                        "&zacute;": "ź",
                        "&zcaron;": "ž",
                        "&zcy;": "з",
                        "&zdot;": "ż",
                        "&zeetrf;": "ℨ",
                        "&zeta;": "ζ",
                        "&zfr;": "𝔷",
                        "&zhcy;": "ж",
                        "&zigrarr;": "⇝",
                        "&zopf;": "𝕫",
                        "&zscr;": "𝓏",
                        "&zwj;": "‍",
                        "&zwnj;": "‌"
                    },
                    characters: {
                        Æ: "&AElig;",
                        "&": "&amp;",
                        Á: "&Aacute;",
                        Ă: "&Abreve;",
                        Â: "&Acirc;",
                        А: "&Acy;",
                        𝔄: "&Afr;",
                        À: "&Agrave;",
                        Α: "&Alpha;",
                        Ā: "&Amacr;",
                        "⩓": "&And;",
                        Ą: "&Aogon;",
                        𝔸: "&Aopf;",
                        "⁡": "&af;",
                        Å: "&angst;",
                        𝒜: "&Ascr;",
                        "≔": "&coloneq;",
                        Ã: "&Atilde;",
                        Ä: "&Auml;",
                        "∖": "&ssetmn;",
                        "⫧": "&Barv;",
                        "⌆": "&doublebarwedge;",
                        Б: "&Bcy;",
                        "∵": "&because;",
                        ℬ: "&bernou;",
                        Β: "&Beta;",
                        𝔅: "&Bfr;",
                        𝔹: "&Bopf;",
                        "˘": "&breve;",
                        "≎": "&bump;",
                        Ч: "&CHcy;",
                        "©": "&copy;",
                        Ć: "&Cacute;",
                        "⋒": "&Cap;",
                        ⅅ: "&DD;",
                        ℭ: "&Cfr;",
                        Č: "&Ccaron;",
                        Ç: "&Ccedil;",
                        Ĉ: "&Ccirc;",
                        "∰": "&Cconint;",
                        Ċ: "&Cdot;",
                        "¸": "&cedil;",
                        "·": "&middot;",
                        Χ: "&Chi;",
                        "⊙": "&odot;",
                        "⊖": "&ominus;",
                        "⊕": "&oplus;",
                        "⊗": "&otimes;",
                        "∲": "&cwconint;",
                        "”": "&rdquor;",
                        "’": "&rsquor;",
                        "∷": "&Proportion;",
                        "⩴": "&Colone;",
                        "≡": "&equiv;",
                        "∯": "&DoubleContourIntegral;",
                        "∮": "&oint;",
                        ℂ: "&complexes;",
                        "∐": "&coprod;",
                        "∳": "&awconint;",
                        "⨯": "&Cross;",
                        𝒞: "&Cscr;",
                        "⋓": "&Cup;",
                        "≍": "&asympeq;",
                        "⤑": "&DDotrahd;",
                        Ђ: "&DJcy;",
                        Ѕ: "&DScy;",
                        Џ: "&DZcy;",
                        "‡": "&ddagger;",
                        "↡": "&Darr;",
                        "⫤": "&DoubleLeftTee;",
                        Ď: "&Dcaron;",
                        Д: "&Dcy;",
                        "∇": "&nabla;",
                        Δ: "&Delta;",
                        𝔇: "&Dfr;",
                        "´": "&acute;",
                        "˙": "&dot;",
                        "˝": "&dblac;",
                        "`": "&grave;",
                        "˜": "&tilde;",
                        "⋄": "&diamond;",
                        ⅆ: "&dd;",
                        𝔻: "&Dopf;",
                        "¨": "&uml;",
                        "⃜": "&DotDot;",
                        "≐": "&esdot;",
                        "⇓": "&dArr;",
                        "⇐": "&lArr;",
                        "⇔": "&iff;",
                        "⟸": "&xlArr;",
                        "⟺": "&xhArr;",
                        "⟹": "&xrArr;",
                        "⇒": "&rArr;",
                        "⊨": "&vDash;",
                        "⇑": "&uArr;",
                        "⇕": "&vArr;",
                        "∥": "&spar;",
                        "↓": "&downarrow;",
                        "⤓": "&DownArrowBar;",
                        "⇵": "&duarr;",
                        "̑": "&DownBreve;",
                        "⥐": "&DownLeftRightVector;",
                        "⥞": "&DownLeftTeeVector;",
                        "↽": "&lhard;",
                        "⥖": "&DownLeftVectorBar;",
                        "⥟": "&DownRightTeeVector;",
                        "⇁": "&rightharpoondown;",
                        "⥗": "&DownRightVectorBar;",
                        "⊤": "&top;",
                        "↧": "&mapstodown;",
                        𝒟: "&Dscr;",
                        Đ: "&Dstrok;",
                        Ŋ: "&ENG;",
                        Ð: "&ETH;",
                        É: "&Eacute;",
                        Ě: "&Ecaron;",
                        Ê: "&Ecirc;",
                        Э: "&Ecy;",
                        Ė: "&Edot;",
                        𝔈: "&Efr;",
                        È: "&Egrave;",
                        "∈": "&isinv;",
                        Ē: "&Emacr;",
                        "◻": "&EmptySmallSquare;",
                        "▫": "&EmptyVerySmallSquare;",
                        Ę: "&Eogon;",
                        𝔼: "&Eopf;",
                        Ε: "&Epsilon;",
                        "⩵": "&Equal;",
                        "≂": "&esim;",
                        "⇌": "&rlhar;",
                        ℰ: "&expectation;",
                        "⩳": "&Esim;",
                        Η: "&Eta;",
                        Ë: "&Euml;",
                        "∃": "&exist;",
                        ⅇ: "&exponentiale;",
                        Ф: "&Fcy;",
                        𝔉: "&Ffr;",
                        "◼": "&FilledSmallSquare;",
                        "▪": "&squf;",
                        𝔽: "&Fopf;",
                        "∀": "&forall;",
                        ℱ: "&Fscr;",
                        Ѓ: "&GJcy;",
                        ">": "&gt;",
                        Γ: "&Gamma;",
                        Ϝ: "&Gammad;",
                        Ğ: "&Gbreve;",
                        Ģ: "&Gcedil;",
                        Ĝ: "&Gcirc;",
                        Г: "&Gcy;",
                        Ġ: "&Gdot;",
                        𝔊: "&Gfr;",
                        "⋙": "&ggg;",
                        𝔾: "&Gopf;",
                        "≥": "&geq;",
                        "⋛": "&gtreqless;",
                        "≧": "&geqq;",
                        "⪢": "&GreaterGreater;",
                        "≷": "&gtrless;",
                        "⩾": "&ges;",
                        "≳": "&gtrsim;",
                        𝒢: "&Gscr;",
                        "≫": "&gg;",
                        Ъ: "&HARDcy;",
                        ˇ: "&caron;",
                        "^": "&Hat;",
                        Ĥ: "&Hcirc;",
                        ℌ: "&Poincareplane;",
                        ℋ: "&hamilt;",
                        ℍ: "&quaternions;",
                        "─": "&boxh;",
                        Ħ: "&Hstrok;",
                        "≏": "&bumpeq;",
                        Е: "&IEcy;",
                        Ĳ: "&IJlig;",
                        Ё: "&IOcy;",
                        Í: "&Iacute;",
                        Î: "&Icirc;",
                        И: "&Icy;",
                        İ: "&Idot;",
                        ℑ: "&imagpart;",
                        Ì: "&Igrave;",
                        Ī: "&Imacr;",
                        ⅈ: "&ii;",
                        "∬": "&Int;",
                        "∫": "&int;",
                        "⋂": "&xcap;",
                        "⁣": "&ic;",
                        "⁢": "&it;",
                        Į: "&Iogon;",
                        𝕀: "&Iopf;",
                        Ι: "&Iota;",
                        ℐ: "&imagline;",
                        Ĩ: "&Itilde;",
                        І: "&Iukcy;",
                        Ï: "&Iuml;",
                        Ĵ: "&Jcirc;",
                        Й: "&Jcy;",
                        𝔍: "&Jfr;",
                        𝕁: "&Jopf;",
                        𝒥: "&Jscr;",
                        Ј: "&Jsercy;",
                        Є: "&Jukcy;",
                        Х: "&KHcy;",
                        Ќ: "&KJcy;",
                        Κ: "&Kappa;",
                        Ķ: "&Kcedil;",
                        К: "&Kcy;",
                        𝔎: "&Kfr;",
                        𝕂: "&Kopf;",
                        𝒦: "&Kscr;",
                        Љ: "&LJcy;",
                        "<": "&lt;",
                        Ĺ: "&Lacute;",
                        Λ: "&Lambda;",
                        "⟪": "&Lang;",
                        ℒ: "&lagran;",
                        "↞": "&twoheadleftarrow;",
                        Ľ: "&Lcaron;",
                        Ļ: "&Lcedil;",
                        Л: "&Lcy;",
                        "⟨": "&langle;",
                        "←": "&slarr;",
                        "⇤": "&larrb;",
                        "⇆": "&lrarr;",
                        "⌈": "&lceil;",
                        "⟦": "&lobrk;",
                        "⥡": "&LeftDownTeeVector;",
                        "⇃": "&downharpoonleft;",
                        "⥙": "&LeftDownVectorBar;",
                        "⌊": "&lfloor;",
                        "↔": "&leftrightarrow;",
                        "⥎": "&LeftRightVector;",
                        "⊣": "&dashv;",
                        "↤": "&mapstoleft;",
                        "⥚": "&LeftTeeVector;",
                        "⊲": "&vltri;",
                        "⧏": "&LeftTriangleBar;",
                        "⊴": "&trianglelefteq;",
                        "⥑": "&LeftUpDownVector;",
                        "⥠": "&LeftUpTeeVector;",
                        "↿": "&upharpoonleft;",
                        "⥘": "&LeftUpVectorBar;",
                        "↼": "&lharu;",
                        "⥒": "&LeftVectorBar;",
                        "⋚": "&lesseqgtr;",
                        "≦": "&leqq;",
                        "≶": "&lg;",
                        "⪡": "&LessLess;",
                        "⩽": "&les;",
                        "≲": "&lsim;",
                        𝔏: "&Lfr;",
                        "⋘": "&Ll;",
                        "⇚": "&lAarr;",
                        Ŀ: "&Lmidot;",
                        "⟵": "&xlarr;",
                        "⟷": "&xharr;",
                        "⟶": "&xrarr;",
                        𝕃: "&Lopf;",
                        "↙": "&swarrow;",
                        "↘": "&searrow;",
                        "↰": "&lsh;",
                        Ł: "&Lstrok;",
                        "≪": "&ll;",
                        "⤅": "&Map;",
                        М: "&Mcy;",
                        " ": "&MediumSpace;",
                        ℳ: "&phmmat;",
                        𝔐: "&Mfr;",
                        "∓": "&mp;",
                        𝕄: "&Mopf;",
                        Μ: "&Mu;",
                        Њ: "&NJcy;",
                        Ń: "&Nacute;",
                        Ň: "&Ncaron;",
                        Ņ: "&Ncedil;",
                        Н: "&Ncy;",
                        "​": "&ZeroWidthSpace;",
                        "\n": "&NewLine;",
                        𝔑: "&Nfr;",
                        "⁠": "&NoBreak;",
                        " ": "&nbsp;",
                        ℕ: "&naturals;",
                        "⫬": "&Not;",
                        "≢": "&nequiv;",
                        "≭": "&NotCupCap;",
                        "∦": "&nspar;",
                        "∉": "&notinva;",
                        "≠": "&ne;",
                        "≂̸": "&nesim;",
                        "∄": "&nexists;",
                        "≯": "&ngtr;",
                        "≱": "&ngeq;",
                        "≧̸": "&ngeqq;",
                        "≫̸": "&nGtv;",
                        "≹": "&ntgl;",
                        "⩾̸": "&nges;",
                        "≵": "&ngsim;",
                        "≎̸": "&nbump;",
                        "≏̸": "&nbumpe;",
                        "⋪": "&ntriangleleft;",
                        "⧏̸": "&NotLeftTriangleBar;",
                        "⋬": "&ntrianglelefteq;",
                        "≮": "&nlt;",
                        "≰": "&nleq;",
                        "≸": "&ntlg;",
                        "≪̸": "&nLtv;",
                        "⩽̸": "&nles;",
                        "≴": "&nlsim;",
                        "⪢̸": "&NotNestedGreaterGreater;",
                        "⪡̸": "&NotNestedLessLess;",
                        "⊀": "&nprec;",
                        "⪯̸": "&npreceq;",
                        "⋠": "&nprcue;",
                        "∌": "&notniva;",
                        "⋫": "&ntriangleright;",
                        "⧐̸": "&NotRightTriangleBar;",
                        "⋭": "&ntrianglerighteq;",
                        "⊏̸": "&NotSquareSubset;",
                        "⋢": "&nsqsube;",
                        "⊐̸": "&NotSquareSuperset;",
                        "⋣": "&nsqsupe;",
                        "⊂⃒": "&vnsub;",
                        "⊈": "&nsubseteq;",
                        "⊁": "&nsucc;",
                        "⪰̸": "&nsucceq;",
                        "⋡": "&nsccue;",
                        "≿̸": "&NotSucceedsTilde;",
                        "⊃⃒": "&vnsup;",
                        "⊉": "&nsupseteq;",
                        "≁": "&nsim;",
                        "≄": "&nsimeq;",
                        "≇": "&ncong;",
                        "≉": "&napprox;",
                        "∤": "&nsmid;",
                        𝒩: "&Nscr;",
                        Ñ: "&Ntilde;",
                        Ν: "&Nu;",
                        Œ: "&OElig;",
                        Ó: "&Oacute;",
                        Ô: "&Ocirc;",
                        О: "&Ocy;",
                        Ő: "&Odblac;",
                        𝔒: "&Ofr;",
                        Ò: "&Ograve;",
                        Ō: "&Omacr;",
                        Ω: "&ohm;",
                        Ο: "&Omicron;",
                        𝕆: "&Oopf;",
                        "“": "&ldquo;",
                        "‘": "&lsquo;",
                        "⩔": "&Or;",
                        𝒪: "&Oscr;",
                        Ø: "&Oslash;",
                        Õ: "&Otilde;",
                        "⨷": "&Otimes;",
                        Ö: "&Ouml;",
                        "‾": "&oline;",
                        "⏞": "&OverBrace;",
                        "⎴": "&tbrk;",
                        "⏜": "&OverParenthesis;",
                        "∂": "&part;",
                        П: "&Pcy;",
                        𝔓: "&Pfr;",
                        Φ: "&Phi;",
                        Π: "&Pi;",
                        "±": "&pm;",
                        ℙ: "&primes;",
                        "⪻": "&Pr;",
                        "≺": "&prec;",
                        "⪯": "&preceq;",
                        "≼": "&preccurlyeq;",
                        "≾": "&prsim;",
                        "″": "&Prime;",
                        "∏": "&prod;",
                        "∝": "&vprop;",
                        𝒫: "&Pscr;",
                        Ψ: "&Psi;",
                        '"': "&quot;",
                        𝔔: "&Qfr;",
                        ℚ: "&rationals;",
                        𝒬: "&Qscr;",
                        "⤐": "&drbkarow;",
                        "®": "&reg;",
                        Ŕ: "&Racute;",
                        "⟫": "&Rang;",
                        "↠": "&twoheadrightarrow;",
                        "⤖": "&Rarrtl;",
                        Ř: "&Rcaron;",
                        Ŗ: "&Rcedil;",
                        Р: "&Rcy;",
                        ℜ: "&realpart;",
                        "∋": "&niv;",
                        "⇋": "&lrhar;",
                        "⥯": "&duhar;",
                        Ρ: "&Rho;",
                        "⟩": "&rangle;",
                        "→": "&srarr;",
                        "⇥": "&rarrb;",
                        "⇄": "&rlarr;",
                        "⌉": "&rceil;",
                        "⟧": "&robrk;",
                        "⥝": "&RightDownTeeVector;",
                        "⇂": "&downharpoonright;",
                        "⥕": "&RightDownVectorBar;",
                        "⌋": "&rfloor;",
                        "⊢": "&vdash;",
                        "↦": "&mapsto;",
                        "⥛": "&RightTeeVector;",
                        "⊳": "&vrtri;",
                        "⧐": "&RightTriangleBar;",
                        "⊵": "&trianglerighteq;",
                        "⥏": "&RightUpDownVector;",
                        "⥜": "&RightUpTeeVector;",
                        "↾": "&upharpoonright;",
                        "⥔": "&RightUpVectorBar;",
                        "⇀": "&rightharpoonup;",
                        "⥓": "&RightVectorBar;",
                        ℝ: "&reals;",
                        "⥰": "&RoundImplies;",
                        "⇛": "&rAarr;",
                        ℛ: "&realine;",
                        "↱": "&rsh;",
                        "⧴": "&RuleDelayed;",
                        Щ: "&SHCHcy;",
                        Ш: "&SHcy;",
                        Ь: "&SOFTcy;",
                        Ś: "&Sacute;",
                        "⪼": "&Sc;",
                        Š: "&Scaron;",
                        Ş: "&Scedil;",
                        Ŝ: "&Scirc;",
                        С: "&Scy;",
                        𝔖: "&Sfr;",
                        "↑": "&uparrow;",
                        Σ: "&Sigma;",
                        "∘": "&compfn;",
                        𝕊: "&Sopf;",
                        "√": "&radic;",
                        "□": "&square;",
                        "⊓": "&sqcap;",
                        "⊏": "&sqsubset;",
                        "⊑": "&sqsubseteq;",
                        "⊐": "&sqsupset;",
                        "⊒": "&sqsupseteq;",
                        "⊔": "&sqcup;",
                        𝒮: "&Sscr;",
                        "⋆": "&sstarf;",
                        "⋐": "&Subset;",
                        "⊆": "&subseteq;",
                        "≻": "&succ;",
                        "⪰": "&succeq;",
                        "≽": "&succcurlyeq;",
                        "≿": "&succsim;",
                        "∑": "&sum;",
                        "⋑": "&Supset;",
                        "⊃": "&supset;",
                        "⊇": "&supseteq;",
                        Þ: "&THORN;",
                        "™": "&trade;",
                        Ћ: "&TSHcy;",
                        Ц: "&TScy;",
                        "\t": "&Tab;",
                        Τ: "&Tau;",
                        Ť: "&Tcaron;",
                        Ţ: "&Tcedil;",
                        Т: "&Tcy;",
                        𝔗: "&Tfr;",
                        "∴": "&therefore;",
                        Θ: "&Theta;",
                        "  ": "&ThickSpace;",
                        " ": "&thinsp;",
                        "∼": "&thksim;",
                        "≃": "&simeq;",
                        "≅": "&cong;",
                        "≈": "&thkap;",
                        𝕋: "&Topf;",
                        "⃛": "&tdot;",
                        𝒯: "&Tscr;",
                        Ŧ: "&Tstrok;",
                        Ú: "&Uacute;",
                        "↟": "&Uarr;",
                        "⥉": "&Uarrocir;",
                        Ў: "&Ubrcy;",
                        Ŭ: "&Ubreve;",
                        Û: "&Ucirc;",
                        У: "&Ucy;",
                        Ű: "&Udblac;",
                        𝔘: "&Ufr;",
                        Ù: "&Ugrave;",
                        Ū: "&Umacr;",
                        _: "&lowbar;",
                        "⏟": "&UnderBrace;",
                        "⎵": "&bbrk;",
                        "⏝": "&UnderParenthesis;",
                        "⋃": "&xcup;",
                        "⊎": "&uplus;",
                        Ų: "&Uogon;",
                        𝕌: "&Uopf;",
                        "⤒": "&UpArrowBar;",
                        "⇅": "&udarr;",
                        "↕": "&varr;",
                        "⥮": "&udhar;",
                        "⊥": "&perp;",
                        "↥": "&mapstoup;",
                        "↖": "&nwarrow;",
                        "↗": "&nearrow;",
                        ϒ: "&upsih;",
                        Υ: "&Upsilon;",
                        Ů: "&Uring;",
                        𝒰: "&Uscr;",
                        Ũ: "&Utilde;",
                        Ü: "&Uuml;",
                        "⊫": "&VDash;",
                        "⫫": "&Vbar;",
                        В: "&Vcy;",
                        "⊩": "&Vdash;",
                        "⫦": "&Vdashl;",
                        "⋁": "&xvee;",
                        "‖": "&Vert;",
                        "∣": "&smid;",
                        "|": "&vert;",
                        "❘": "&VerticalSeparator;",
                        "≀": "&wreath;",
                        " ": "&hairsp;",
                        𝔙: "&Vfr;",
                        𝕍: "&Vopf;",
                        𝒱: "&Vscr;",
                        "⊪": "&Vvdash;",
                        Ŵ: "&Wcirc;",
                        "⋀": "&xwedge;",
                        𝔚: "&Wfr;",
                        𝕎: "&Wopf;",
                        𝒲: "&Wscr;",
                        𝔛: "&Xfr;",
                        Ξ: "&Xi;",
                        𝕏: "&Xopf;",
                        𝒳: "&Xscr;",
                        Я: "&YAcy;",
                        Ї: "&YIcy;",
                        Ю: "&YUcy;",
                        Ý: "&Yacute;",
                        Ŷ: "&Ycirc;",
                        Ы: "&Ycy;",
                        𝔜: "&Yfr;",
                        𝕐: "&Yopf;",
                        𝒴: "&Yscr;",
                        Ÿ: "&Yuml;",
                        Ж: "&ZHcy;",
                        Ź: "&Zacute;",
                        Ž: "&Zcaron;",
                        З: "&Zcy;",
                        Ż: "&Zdot;",
                        Ζ: "&Zeta;",
                        ℨ: "&zeetrf;",
                        ℤ: "&integers;",
                        𝒵: "&Zscr;",
                        á: "&aacute;",
                        ă: "&abreve;",
                        "∾": "&mstpos;",
                        "∾̳": "&acE;",
                        "∿": "&acd;",
                        â: "&acirc;",
                        а: "&acy;",
                        æ: "&aelig;",
                        𝔞: "&afr;",
                        à: "&agrave;",
                        ℵ: "&aleph;",
                        α: "&alpha;",
                        ā: "&amacr;",
                        "⨿": "&amalg;",
                        "∧": "&wedge;",
                        "⩕": "&andand;",
                        "⩜": "&andd;",
                        "⩘": "&andslope;",
                        "⩚": "&andv;",
                        "∠": "&angle;",
                        "⦤": "&ange;",
                        "∡": "&measuredangle;",
                        "⦨": "&angmsdaa;",
                        "⦩": "&angmsdab;",
                        "⦪": "&angmsdac;",
                        "⦫": "&angmsdad;",
                        "⦬": "&angmsdae;",
                        "⦭": "&angmsdaf;",
                        "⦮": "&angmsdag;",
                        "⦯": "&angmsdah;",
                        "∟": "&angrt;",
                        "⊾": "&angrtvb;",
                        "⦝": "&angrtvbd;",
                        "∢": "&angsph;",
                        "⍼": "&angzarr;",
                        ą: "&aogon;",
                        𝕒: "&aopf;",
                        "⩰": "&apE;",
                        "⩯": "&apacir;",
                        "≊": "&approxeq;",
                        "≋": "&apid;",
                        "'": "&apos;",
                        å: "&aring;",
                        𝒶: "&ascr;",
                        "*": "&midast;",
                        ã: "&atilde;",
                        ä: "&auml;",
                        "⨑": "&awint;",
                        "⫭": "&bNot;",
                        "≌": "&bcong;",
                        "϶": "&bepsi;",
                        "‵": "&bprime;",
                        "∽": "&bsim;",
                        "⋍": "&bsime;",
                        "⊽": "&barvee;",
                        "⌅": "&barwedge;",
                        "⎶": "&bbrktbrk;",
                        б: "&bcy;",
                        "„": "&ldquor;",
                        "⦰": "&bemptyv;",
                        β: "&beta;",
                        ℶ: "&beth;",
                        "≬": "&twixt;",
                        𝔟: "&bfr;",
                        "◯": "&xcirc;",
                        "⨀": "&xodot;",
                        "⨁": "&xoplus;",
                        "⨂": "&xotime;",
                        "⨆": "&xsqcup;",
                        "★": "&starf;",
                        "▽": "&xdtri;",
                        "△": "&xutri;",
                        "⨄": "&xuplus;",
                        "⤍": "&rbarr;",
                        "⧫": "&lozf;",
                        "▴": "&utrif;",
                        "▾": "&dtrif;",
                        "◂": "&ltrif;",
                        "▸": "&rtrif;",
                        "␣": "&blank;",
                        "▒": "&blk12;",
                        "░": "&blk14;",
                        "▓": "&blk34;",
                        "█": "&block;",
                        "=⃥": "&bne;",
                        "≡⃥": "&bnequiv;",
                        "⌐": "&bnot;",
                        𝕓: "&bopf;",
                        "⋈": "&bowtie;",
                        "╗": "&boxDL;",
                        "╔": "&boxDR;",
                        "╖": "&boxDl;",
                        "╓": "&boxDr;",
                        "═": "&boxH;",
                        "╦": "&boxHD;",
                        "╩": "&boxHU;",
                        "╤": "&boxHd;",
                        "╧": "&boxHu;",
                        "╝": "&boxUL;",
                        "╚": "&boxUR;",
                        "╜": "&boxUl;",
                        "╙": "&boxUr;",
                        "║": "&boxV;",
                        "╬": "&boxVH;",
                        "╣": "&boxVL;",
                        "╠": "&boxVR;",
                        "╫": "&boxVh;",
                        "╢": "&boxVl;",
                        "╟": "&boxVr;",
                        "⧉": "&boxbox;",
                        "╕": "&boxdL;",
                        "╒": "&boxdR;",
                        "┐": "&boxdl;",
                        "┌": "&boxdr;",
                        "╥": "&boxhD;",
                        "╨": "&boxhU;",
                        "┬": "&boxhd;",
                        "┴": "&boxhu;",
                        "⊟": "&minusb;",
                        "⊞": "&plusb;",
                        "⊠": "&timesb;",
                        "╛": "&boxuL;",
                        "╘": "&boxuR;",
                        "┘": "&boxul;",
                        "└": "&boxur;",
                        "│": "&boxv;",
                        "╪": "&boxvH;",
                        "╡": "&boxvL;",
                        "╞": "&boxvR;",
                        "┼": "&boxvh;",
                        "┤": "&boxvl;",
                        "├": "&boxvr;",
                        "¦": "&brvbar;",
                        𝒷: "&bscr;",
                        "⁏": "&bsemi;",
                        "\\": "&bsol;",
                        "⧅": "&bsolb;",
                        "⟈": "&bsolhsub;",
                        "•": "&bullet;",
                        "⪮": "&bumpE;",
                        ć: "&cacute;",
                        "∩": "&cap;",
                        "⩄": "&capand;",
                        "⩉": "&capbrcup;",
                        "⩋": "&capcap;",
                        "⩇": "&capcup;",
                        "⩀": "&capdot;",
                        "∩︀": "&caps;",
                        "⁁": "&caret;",
                        "⩍": "&ccaps;",
                        č: "&ccaron;",
                        ç: "&ccedil;",
                        ĉ: "&ccirc;",
                        "⩌": "&ccups;",
                        "⩐": "&ccupssm;",
                        ċ: "&cdot;",
                        "⦲": "&cemptyv;",
                        "¢": "&cent;",
                        𝔠: "&cfr;",
                        ч: "&chcy;",
                        "✓": "&checkmark;",
                        χ: "&chi;",
                        "○": "&cir;",
                        "⧃": "&cirE;",
                        ˆ: "&circ;",
                        "≗": "&cire;",
                        "↺": "&olarr;",
                        "↻": "&orarr;",
                        "Ⓢ": "&oS;",
                        "⊛": "&oast;",
                        "⊚": "&ocir;",
                        "⊝": "&odash;",
                        "⨐": "&cirfnint;",
                        "⫯": "&cirmid;",
                        "⧂": "&cirscir;",
                        "♣": "&clubsuit;",
                        ":": "&colon;",
                        ",": "&comma;",
                        "@": "&commat;",
                        "∁": "&complement;",
                        "⩭": "&congdot;",
                        𝕔: "&copf;",
                        "℗": "&copysr;",
                        "↵": "&crarr;",
                        "✗": "&cross;",
                        𝒸: "&cscr;",
                        "⫏": "&csub;",
                        "⫑": "&csube;",
                        "⫐": "&csup;",
                        "⫒": "&csupe;",
                        "⋯": "&ctdot;",
                        "⤸": "&cudarrl;",
                        "⤵": "&cudarrr;",
                        "⋞": "&curlyeqprec;",
                        "⋟": "&curlyeqsucc;",
                        "↶": "&curvearrowleft;",
                        "⤽": "&cularrp;",
                        "∪": "&cup;",
                        "⩈": "&cupbrcap;",
                        "⩆": "&cupcap;",
                        "⩊": "&cupcup;",
                        "⊍": "&cupdot;",
                        "⩅": "&cupor;",
                        "∪︀": "&cups;",
                        "↷": "&curvearrowright;",
                        "⤼": "&curarrm;",
                        "⋎": "&cuvee;",
                        "⋏": "&cuwed;",
                        "¤": "&curren;",
                        "∱": "&cwint;",
                        "⌭": "&cylcty;",
                        "⥥": "&dHar;",
                        "†": "&dagger;",
                        ℸ: "&daleth;",
                        "‐": "&hyphen;",
                        "⤏": "&rBarr;",
                        ď: "&dcaron;",
                        д: "&dcy;",
                        "⇊": "&downdownarrows;",
                        "⩷": "&eDDot;",
                        "°": "&deg;",
                        δ: "&delta;",
                        "⦱": "&demptyv;",
                        "⥿": "&dfisht;",
                        𝔡: "&dfr;",
                        "♦": "&diams;",
                        ϝ: "&gammad;",
                        "⋲": "&disin;",
                        "÷": "&divide;",
                        "⋇": "&divonx;",
                        ђ: "&djcy;",
                        "⌞": "&llcorner;",
                        "⌍": "&dlcrop;",
                        $: "&dollar;",
                        𝕕: "&dopf;",
                        "≑": "&eDot;",
                        "∸": "&minusd;",
                        "∔": "&plusdo;",
                        "⊡": "&sdotb;",
                        "⌟": "&lrcorner;",
                        "⌌": "&drcrop;",
                        𝒹: "&dscr;",
                        ѕ: "&dscy;",
                        "⧶": "&dsol;",
                        đ: "&dstrok;",
                        "⋱": "&dtdot;",
                        "▿": "&triangledown;",
                        "⦦": "&dwangle;",
                        џ: "&dzcy;",
                        "⟿": "&dzigrarr;",
                        é: "&eacute;",
                        "⩮": "&easter;",
                        ě: "&ecaron;",
                        "≖": "&eqcirc;",
                        ê: "&ecirc;",
                        "≕": "&eqcolon;",
                        э: "&ecy;",
                        ė: "&edot;",
                        "≒": "&fallingdotseq;",
                        𝔢: "&efr;",
                        "⪚": "&eg;",
                        è: "&egrave;",
                        "⪖": "&eqslantgtr;",
                        "⪘": "&egsdot;",
                        "⪙": "&el;",
                        "⏧": "&elinters;",
                        ℓ: "&ell;",
                        "⪕": "&eqslantless;",
                        "⪗": "&elsdot;",
                        ē: "&emacr;",
                        "∅": "&varnothing;",
                        " ": "&emsp13;",
                        " ": "&emsp14;",
                        " ": "&emsp;",
                        ŋ: "&eng;",
                        " ": "&ensp;",
                        ę: "&eogon;",
                        𝕖: "&eopf;",
                        "⋕": "&epar;",
                        "⧣": "&eparsl;",
                        "⩱": "&eplus;",
                        ε: "&epsilon;",
                        ϵ: "&varepsilon;",
                        "=": "&equals;",
                        "≟": "&questeq;",
                        "⩸": "&equivDD;",
                        "⧥": "&eqvparsl;",
                        "≓": "&risingdotseq;",
                        "⥱": "&erarr;",
                        ℯ: "&escr;",
                        η: "&eta;",
                        ð: "&eth;",
                        ë: "&euml;",
                        "€": "&euro;",
                        "!": "&excl;",
                        ф: "&fcy;",
                        "♀": "&female;",
                        ﬃ: "&ffilig;",
                        ﬀ: "&fflig;",
                        ﬄ: "&ffllig;",
                        𝔣: "&ffr;",
                        ﬁ: "&filig;",
                        fj: "&fjlig;",
                        "♭": "&flat;",
                        ﬂ: "&fllig;",
                        "▱": "&fltns;",
                        ƒ: "&fnof;",
                        𝕗: "&fopf;",
                        "⋔": "&pitchfork;",
                        "⫙": "&forkv;",
                        "⨍": "&fpartint;",
                        "½": "&half;",
                        "⅓": "&frac13;",
                        "¼": "&frac14;",
                        "⅕": "&frac15;",
                        "⅙": "&frac16;",
                        "⅛": "&frac18;",
                        "⅔": "&frac23;",
                        "⅖": "&frac25;",
                        "¾": "&frac34;",
                        "⅗": "&frac35;",
                        "⅜": "&frac38;",
                        "⅘": "&frac45;",
                        "⅚": "&frac56;",
                        "⅝": "&frac58;",
                        "⅞": "&frac78;",
                        "⁄": "&frasl;",
                        "⌢": "&sfrown;",
                        𝒻: "&fscr;",
                        "⪌": "&gtreqqless;",
                        ǵ: "&gacute;",
                        γ: "&gamma;",
                        "⪆": "&gtrapprox;",
                        ğ: "&gbreve;",
                        ĝ: "&gcirc;",
                        г: "&gcy;",
                        ġ: "&gdot;",
                        "⪩": "&gescc;",
                        "⪀": "&gesdot;",
                        "⪂": "&gesdoto;",
                        "⪄": "&gesdotol;",
                        "⋛︀": "&gesl;",
                        "⪔": "&gesles;",
                        𝔤: "&gfr;",
                        ℷ: "&gimel;",
                        ѓ: "&gjcy;",
                        "⪒": "&glE;",
                        "⪥": "&gla;",
                        "⪤": "&glj;",
                        "≩": "&gneqq;",
                        "⪊": "&gnapprox;",
                        "⪈": "&gneq;",
                        "⋧": "&gnsim;",
                        𝕘: "&gopf;",
                        ℊ: "&gscr;",
                        "⪎": "&gsime;",
                        "⪐": "&gsiml;",
                        "⪧": "&gtcc;",
                        "⩺": "&gtcir;",
                        "⋗": "&gtrdot;",
                        "⦕": "&gtlPar;",
                        "⩼": "&gtquest;",
                        "⥸": "&gtrarr;",
                        "≩︀": "&gvnE;",
                        ъ: "&hardcy;",
                        "⥈": "&harrcir;",
                        "↭": "&leftrightsquigarrow;",
                        ℏ: "&plankv;",
                        ĥ: "&hcirc;",
                        "♥": "&heartsuit;",
                        "…": "&mldr;",
                        "⊹": "&hercon;",
                        𝔥: "&hfr;",
                        "⤥": "&searhk;",
                        "⤦": "&swarhk;",
                        "⇿": "&hoarr;",
                        "∻": "&homtht;",
                        "↩": "&larrhk;",
                        "↪": "&rarrhk;",
                        𝕙: "&hopf;",
                        "―": "&horbar;",
                        𝒽: "&hscr;",
                        ħ: "&hstrok;",
                        "⁃": "&hybull;",
                        í: "&iacute;",
                        î: "&icirc;",
                        и: "&icy;",
                        е: "&iecy;",
                        "¡": "&iexcl;",
                        𝔦: "&ifr;",
                        ì: "&igrave;",
                        "⨌": "&qint;",
                        "∭": "&tint;",
                        "⧜": "&iinfin;",
                        "℩": "&iiota;",
                        ĳ: "&ijlig;",
                        ī: "&imacr;",
                        ı: "&inodot;",
                        "⊷": "&imof;",
                        Ƶ: "&imped;",
                        "℅": "&incare;",
                        "∞": "&infin;",
                        "⧝": "&infintie;",
                        "⊺": "&intercal;",
                        "⨗": "&intlarhk;",
                        "⨼": "&iprod;",
                        ё: "&iocy;",
                        į: "&iogon;",
                        𝕚: "&iopf;",
                        ι: "&iota;",
                        "¿": "&iquest;",
                        𝒾: "&iscr;",
                        "⋹": "&isinE;",
                        "⋵": "&isindot;",
                        "⋴": "&isins;",
                        "⋳": "&isinsv;",
                        ĩ: "&itilde;",
                        і: "&iukcy;",
                        ï: "&iuml;",
                        ĵ: "&jcirc;",
                        й: "&jcy;",
                        𝔧: "&jfr;",
                        ȷ: "&jmath;",
                        𝕛: "&jopf;",
                        𝒿: "&jscr;",
                        ј: "&jsercy;",
                        є: "&jukcy;",
                        κ: "&kappa;",
                        ϰ: "&varkappa;",
                        ķ: "&kcedil;",
                        к: "&kcy;",
                        𝔨: "&kfr;",
                        ĸ: "&kgreen;",
                        х: "&khcy;",
                        ќ: "&kjcy;",
                        𝕜: "&kopf;",
                        𝓀: "&kscr;",
                        "⤛": "&lAtail;",
                        "⤎": "&lBarr;",
                        "⪋": "&lesseqqgtr;",
                        "⥢": "&lHar;",
                        ĺ: "&lacute;",
                        "⦴": "&laemptyv;",
                        λ: "&lambda;",
                        "⦑": "&langd;",
                        "⪅": "&lessapprox;",
                        "«": "&laquo;",
                        "⤟": "&larrbfs;",
                        "⤝": "&larrfs;",
                        "↫": "&looparrowleft;",
                        "⤹": "&larrpl;",
                        "⥳": "&larrsim;",
                        "↢": "&leftarrowtail;",
                        "⪫": "&lat;",
                        "⤙": "&latail;",
                        "⪭": "&late;",
                        "⪭︀": "&lates;",
                        "⤌": "&lbarr;",
                        "❲": "&lbbrk;",
                        "{": "&lcub;",
                        "[": "&lsqb;",
                        "⦋": "&lbrke;",
                        "⦏": "&lbrksld;",
                        "⦍": "&lbrkslu;",
                        ľ: "&lcaron;",
                        ļ: "&lcedil;",
                        л: "&lcy;",
                        "⤶": "&ldca;",
                        "⥧": "&ldrdhar;",
                        "⥋": "&ldrushar;",
                        "↲": "&ldsh;",
                        "≤": "&leq;",
                        "⇇": "&llarr;",
                        "⋋": "&lthree;",
                        "⪨": "&lescc;",
                        "⩿": "&lesdot;",
                        "⪁": "&lesdoto;",
                        "⪃": "&lesdotor;",
                        "⋚︀": "&lesg;",
                        "⪓": "&lesges;",
                        "⋖": "&ltdot;",
                        "⥼": "&lfisht;",
                        𝔩: "&lfr;",
                        "⪑": "&lgE;",
                        "⥪": "&lharul;",
                        "▄": "&lhblk;",
                        љ: "&ljcy;",
                        "⥫": "&llhard;",
                        "◺": "&lltri;",
                        ŀ: "&lmidot;",
                        "⎰": "&lmoustache;",
                        "≨": "&lneqq;",
                        "⪉": "&lnapprox;",
                        "⪇": "&lneq;",
                        "⋦": "&lnsim;",
                        "⟬": "&loang;",
                        "⇽": "&loarr;",
                        "⟼": "&xmap;",
                        "↬": "&rarrlp;",
                        "⦅": "&lopar;",
                        𝕝: "&lopf;",
                        "⨭": "&loplus;",
                        "⨴": "&lotimes;",
                        "∗": "&lowast;",
                        "◊": "&lozenge;",
                        "(": "&lpar;",
                        "⦓": "&lparlt;",
                        "⥭": "&lrhard;",
                        "‎": "&lrm;",
                        "⊿": "&lrtri;",
                        "‹": "&lsaquo;",
                        𝓁: "&lscr;",
                        "⪍": "&lsime;",
                        "⪏": "&lsimg;",
                        "‚": "&sbquo;",
                        ł: "&lstrok;",
                        "⪦": "&ltcc;",
                        "⩹": "&ltcir;",
                        "⋉": "&ltimes;",
                        "⥶": "&ltlarr;",
                        "⩻": "&ltquest;",
                        "⦖": "&ltrPar;",
                        "◃": "&triangleleft;",
                        "⥊": "&lurdshar;",
                        "⥦": "&luruhar;",
                        "≨︀": "&lvnE;",
                        "∺": "&mDDot;",
                        "¯": "&strns;",
                        "♂": "&male;",
                        "✠": "&maltese;",
                        "▮": "&marker;",
                        "⨩": "&mcomma;",
                        м: "&mcy;",
                        "—": "&mdash;",
                        𝔪: "&mfr;",
                        "℧": "&mho;",
                        µ: "&micro;",
                        "⫰": "&midcir;",
                        "−": "&minus;",
                        "⨪": "&minusdu;",
                        "⫛": "&mlcp;",
                        "⊧": "&models;",
                        𝕞: "&mopf;",
                        𝓂: "&mscr;",
                        μ: "&mu;",
                        "⊸": "&mumap;",
                        "⋙̸": "&nGg;",
                        "≫⃒": "&nGt;",
                        "⇍": "&nlArr;",
                        "⇎": "&nhArr;",
                        "⋘̸": "&nLl;",
                        "≪⃒": "&nLt;",
                        "⇏": "&nrArr;",
                        "⊯": "&nVDash;",
                        "⊮": "&nVdash;",
                        ń: "&nacute;",
                        "∠⃒": "&nang;",
                        "⩰̸": "&napE;",
                        "≋̸": "&napid;",
                        ŉ: "&napos;",
                        "♮": "&natural;",
                        "⩃": "&ncap;",
                        ň: "&ncaron;",
                        ņ: "&ncedil;",
                        "⩭̸": "&ncongdot;",
                        "⩂": "&ncup;",
                        н: "&ncy;",
                        "–": "&ndash;",
                        "⇗": "&neArr;",
                        "⤤": "&nearhk;",
                        "≐̸": "&nedot;",
                        "⤨": "&toea;",
                        𝔫: "&nfr;",
                        "↮": "&nleftrightarrow;",
                        "⫲": "&nhpar;",
                        "⋼": "&nis;",
                        "⋺": "&nisd;",
                        њ: "&njcy;",
                        "≦̸": "&nleqq;",
                        "↚": "&nleftarrow;",
                        "‥": "&nldr;",
                        𝕟: "&nopf;",
                        "¬": "&not;",
                        "⋹̸": "&notinE;",
                        "⋵̸": "&notindot;",
                        "⋷": "&notinvb;",
                        "⋶": "&notinvc;",
                        "⋾": "&notnivb;",
                        "⋽": "&notnivc;",
                        "⫽⃥": "&nparsl;",
                        "∂̸": "&npart;",
                        "⨔": "&npolint;",
                        "↛": "&nrightarrow;",
                        "⤳̸": "&nrarrc;",
                        "↝̸": "&nrarrw;",
                        𝓃: "&nscr;",
                        "⊄": "&nsub;",
                        "⫅̸": "&nsubseteqq;",
                        "⊅": "&nsup;",
                        "⫆̸": "&nsupseteqq;",
                        ñ: "&ntilde;",
                        ν: "&nu;",
                        "#": "&num;",
                        "№": "&numero;",
                        " ": "&numsp;",
                        "⊭": "&nvDash;",
                        "⤄": "&nvHarr;",
                        "≍⃒": "&nvap;",
                        "⊬": "&nvdash;",
                        "≥⃒": "&nvge;",
                        ">⃒": "&nvgt;",
                        "⧞": "&nvinfin;",
                        "⤂": "&nvlArr;",
                        "≤⃒": "&nvle;",
                        "<⃒": "&nvlt;",
                        "⊴⃒": "&nvltrie;",
                        "⤃": "&nvrArr;",
                        "⊵⃒": "&nvrtrie;",
                        "∼⃒": "&nvsim;",
                        "⇖": "&nwArr;",
                        "⤣": "&nwarhk;",
                        "⤧": "&nwnear;",
                        ó: "&oacute;",
                        ô: "&ocirc;",
                        о: "&ocy;",
                        ő: "&odblac;",
                        "⨸": "&odiv;",
                        "⦼": "&odsold;",
                        œ: "&oelig;",
                        "⦿": "&ofcir;",
                        𝔬: "&ofr;",
                        "˛": "&ogon;",
                        ò: "&ograve;",
                        "⧁": "&ogt;",
                        "⦵": "&ohbar;",
                        "⦾": "&olcir;",
                        "⦻": "&olcross;",
                        "⧀": "&olt;",
                        ō: "&omacr;",
                        ω: "&omega;",
                        ο: "&omicron;",
                        "⦶": "&omid;",
                        𝕠: "&oopf;",
                        "⦷": "&opar;",
                        "⦹": "&operp;",
                        "∨": "&vee;",
                        "⩝": "&ord;",
                        ℴ: "&oscr;",
                        ª: "&ordf;",
                        º: "&ordm;",
                        "⊶": "&origof;",
                        "⩖": "&oror;",
                        "⩗": "&orslope;",
                        "⩛": "&orv;",
                        ø: "&oslash;",
                        "⊘": "&osol;",
                        õ: "&otilde;",
                        "⨶": "&otimesas;",
                        ö: "&ouml;",
                        "⌽": "&ovbar;",
                        "¶": "&para;",
                        "⫳": "&parsim;",
                        "⫽": "&parsl;",
                        п: "&pcy;",
                        "%": "&percnt;",
                        ".": "&period;",
                        "‰": "&permil;",
                        "‱": "&pertenk;",
                        𝔭: "&pfr;",
                        φ: "&phi;",
                        ϕ: "&varphi;",
                        "☎": "&phone;",
                        π: "&pi;",
                        ϖ: "&varpi;",
                        ℎ: "&planckh;",
                        "+": "&plus;",
                        "⨣": "&plusacir;",
                        "⨢": "&pluscir;",
                        "⨥": "&plusdu;",
                        "⩲": "&pluse;",
                        "⨦": "&plussim;",
                        "⨧": "&plustwo;",
                        "⨕": "&pointint;",
                        𝕡: "&popf;",
                        "£": "&pound;",
                        "⪳": "&prE;",
                        "⪷": "&precapprox;",
                        "⪹": "&prnap;",
                        "⪵": "&prnE;",
                        "⋨": "&prnsim;",
                        "′": "&prime;",
                        "⌮": "&profalar;",
                        "⌒": "&profline;",
                        "⌓": "&profsurf;",
                        "⊰": "&prurel;",
                        𝓅: "&pscr;",
                        ψ: "&psi;",
                        " ": "&puncsp;",
                        𝔮: "&qfr;",
                        𝕢: "&qopf;",
                        "⁗": "&qprime;",
                        𝓆: "&qscr;",
                        "⨖": "&quatint;",
                        "?": "&quest;",
                        "⤜": "&rAtail;",
                        "⥤": "&rHar;",
                        "∽̱": "&race;",
                        ŕ: "&racute;",
                        "⦳": "&raemptyv;",
                        "⦒": "&rangd;",
                        "⦥": "&range;",
                        "»": "&raquo;",
                        "⥵": "&rarrap;",
                        "⤠": "&rarrbfs;",
                        "⤳": "&rarrc;",
                        "⤞": "&rarrfs;",
                        "⥅": "&rarrpl;",
                        "⥴": "&rarrsim;",
                        "↣": "&rightarrowtail;",
                        "↝": "&rightsquigarrow;",
                        "⤚": "&ratail;",
                        "∶": "&ratio;",
                        "❳": "&rbbrk;",
                        "}": "&rcub;",
                        "]": "&rsqb;",
                        "⦌": "&rbrke;",
                        "⦎": "&rbrksld;",
                        "⦐": "&rbrkslu;",
                        ř: "&rcaron;",
                        ŗ: "&rcedil;",
                        р: "&rcy;",
                        "⤷": "&rdca;",
                        "⥩": "&rdldhar;",
                        "↳": "&rdsh;",
                        "▭": "&rect;",
                        "⥽": "&rfisht;",
                        𝔯: "&rfr;",
                        "⥬": "&rharul;",
                        ρ: "&rho;",
                        ϱ: "&varrho;",
                        "⇉": "&rrarr;",
                        "⋌": "&rthree;",
                        "˚": "&ring;",
                        "‏": "&rlm;",
                        "⎱": "&rmoustache;",
                        "⫮": "&rnmid;",
                        "⟭": "&roang;",
                        "⇾": "&roarr;",
                        "⦆": "&ropar;",
                        𝕣: "&ropf;",
                        "⨮": "&roplus;",
                        "⨵": "&rotimes;",
                        ")": "&rpar;",
                        "⦔": "&rpargt;",
                        "⨒": "&rppolint;",
                        "›": "&rsaquo;",
                        𝓇: "&rscr;",
                        "⋊": "&rtimes;",
                        "▹": "&triangleright;",
                        "⧎": "&rtriltri;",
                        "⥨": "&ruluhar;",
                        "℞": "&rx;",
                        ś: "&sacute;",
                        "⪴": "&scE;",
                        "⪸": "&succapprox;",
                        š: "&scaron;",
                        ş: "&scedil;",
                        ŝ: "&scirc;",
                        "⪶": "&succneqq;",
                        "⪺": "&succnapprox;",
                        "⋩": "&succnsim;",
                        "⨓": "&scpolint;",
                        с: "&scy;",
                        "⋅": "&sdot;",
                        "⩦": "&sdote;",
                        "⇘": "&seArr;",
                        "§": "&sect;",
                        ";": "&semi;",
                        "⤩": "&tosa;",
                        "✶": "&sext;",
                        𝔰: "&sfr;",
                        "♯": "&sharp;",
                        щ: "&shchcy;",
                        ш: "&shcy;",
                        "­": "&shy;",
                        σ: "&sigma;",
                        ς: "&varsigma;",
                        "⩪": "&simdot;",
                        "⪞": "&simg;",
                        "⪠": "&simgE;",
                        "⪝": "&siml;",
                        "⪟": "&simlE;",
                        "≆": "&simne;",
                        "⨤": "&simplus;",
                        "⥲": "&simrarr;",
                        "⨳": "&smashp;",
                        "⧤": "&smeparsl;",
                        "⌣": "&ssmile;",
                        "⪪": "&smt;",
                        "⪬": "&smte;",
                        "⪬︀": "&smtes;",
                        ь: "&softcy;",
                        "/": "&sol;",
                        "⧄": "&solb;",
                        "⌿": "&solbar;",
                        𝕤: "&sopf;",
                        "♠": "&spadesuit;",
                        "⊓︀": "&sqcaps;",
                        "⊔︀": "&sqcups;",
                        𝓈: "&sscr;",
                        "☆": "&star;",
                        "⊂": "&subset;",
                        "⫅": "&subseteqq;",
                        "⪽": "&subdot;",
                        "⫃": "&subedot;",
                        "⫁": "&submult;",
                        "⫋": "&subsetneqq;",
                        "⊊": "&subsetneq;",
                        "⪿": "&subplus;",
                        "⥹": "&subrarr;",
                        "⫇": "&subsim;",
                        "⫕": "&subsub;",
                        "⫓": "&subsup;",
                        "♪": "&sung;",
                        "¹": "&sup1;",
                        "²": "&sup2;",
                        "³": "&sup3;",
                        "⫆": "&supseteqq;",
                        "⪾": "&supdot;",
                        "⫘": "&supdsub;",
                        "⫄": "&supedot;",
                        "⟉": "&suphsol;",
                        "⫗": "&suphsub;",
                        "⥻": "&suplarr;",
                        "⫂": "&supmult;",
                        "⫌": "&supsetneqq;",
                        "⊋": "&supsetneq;",
                        "⫀": "&supplus;",
                        "⫈": "&supsim;",
                        "⫔": "&supsub;",
                        "⫖": "&supsup;",
                        "⇙": "&swArr;",
                        "⤪": "&swnwar;",
                        ß: "&szlig;",
                        "⌖": "&target;",
                        τ: "&tau;",
                        ť: "&tcaron;",
                        ţ: "&tcedil;",
                        т: "&tcy;",
                        "⌕": "&telrec;",
                        𝔱: "&tfr;",
                        θ: "&theta;",
                        ϑ: "&vartheta;",
                        þ: "&thorn;",
                        "×": "&times;",
                        "⨱": "&timesbar;",
                        "⨰": "&timesd;",
                        "⌶": "&topbot;",
                        "⫱": "&topcir;",
                        𝕥: "&topf;",
                        "⫚": "&topfork;",
                        "‴": "&tprime;",
                        "▵": "&utri;",
                        "≜": "&trie;",
                        "◬": "&tridot;",
                        "⨺": "&triminus;",
                        "⨹": "&triplus;",
                        "⧍": "&trisb;",
                        "⨻": "&tritime;",
                        "⏢": "&trpezium;",
                        𝓉: "&tscr;",
                        ц: "&tscy;",
                        ћ: "&tshcy;",
                        ŧ: "&tstrok;",
                        "⥣": "&uHar;",
                        ú: "&uacute;",
                        ў: "&ubrcy;",
                        ŭ: "&ubreve;",
                        û: "&ucirc;",
                        у: "&ucy;",
                        ű: "&udblac;",
                        "⥾": "&ufisht;",
                        𝔲: "&ufr;",
                        ù: "&ugrave;",
                        "▀": "&uhblk;",
                        "⌜": "&ulcorner;",
                        "⌏": "&ulcrop;",
                        "◸": "&ultri;",
                        ū: "&umacr;",
                        ų: "&uogon;",
                        𝕦: "&uopf;",
                        υ: "&upsilon;",
                        "⇈": "&uuarr;",
                        "⌝": "&urcorner;",
                        "⌎": "&urcrop;",
                        ů: "&uring;",
                        "◹": "&urtri;",
                        𝓊: "&uscr;",
                        "⋰": "&utdot;",
                        ũ: "&utilde;",
                        ü: "&uuml;",
                        "⦧": "&uwangle;",
                        "⫨": "&vBar;",
                        "⫩": "&vBarv;",
                        "⦜": "&vangrt;",
                        "⊊︀": "&vsubne;",
                        "⫋︀": "&vsubnE;",
                        "⊋︀": "&vsupne;",
                        "⫌︀": "&vsupnE;",
                        в: "&vcy;",
                        "⊻": "&veebar;",
                        "≚": "&veeeq;",
                        "⋮": "&vellip;",
                        𝔳: "&vfr;",
                        𝕧: "&vopf;",
                        𝓋: "&vscr;",
                        "⦚": "&vzigzag;",
                        ŵ: "&wcirc;",
                        "⩟": "&wedbar;",
                        "≙": "&wedgeq;",
                        ℘: "&wp;",
                        𝔴: "&wfr;",
                        𝕨: "&wopf;",
                        𝓌: "&wscr;",
                        𝔵: "&xfr;",
                        ξ: "&xi;",
                        "⋻": "&xnis;",
                        𝕩: "&xopf;",
                        𝓍: "&xscr;",
                        ý: "&yacute;",
                        я: "&yacy;",
                        ŷ: "&ycirc;",
                        ы: "&ycy;",
                        "¥": "&yen;",
                        𝔶: "&yfr;",
                        ї: "&yicy;",
                        𝕪: "&yopf;",
                        𝓎: "&yscr;",
                        ю: "&yucy;",
                        ÿ: "&yuml;",
                        ź: "&zacute;",
                        ž: "&zcaron;",
                        з: "&zcy;",
                        ż: "&zdot;",
                        ζ: "&zeta;",
                        𝔷: "&zfr;",
                        ж: "&zhcy;",
                        "⇝": "&zigrarr;",
                        𝕫: "&zopf;",
                        𝓏: "&zscr;",
                        "‍": "&zwj;",
                        "‌": "&zwnj;"
                    }
                }
            };
        },
        2642: (__unused_webpack_module, exports) => {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.numericUnicodeMap = {
                0: 65533,
                128: 8364,
                130: 8218,
                131: 402,
                132: 8222,
                133: 8230,
                134: 8224,
                135: 8225,
                136: 710,
                137: 8240,
                138: 352,
                139: 8249,
                140: 338,
                142: 381,
                145: 8216,
                146: 8217,
                147: 8220,
                148: 8221,
                149: 8226,
                150: 8211,
                151: 8212,
                152: 732,
                153: 8482,
                154: 353,
                155: 8250,
                156: 339,
                158: 382,
                159: 376
            };
        },
        9726: (__unused_webpack_module, exports) => {
            "use strict";
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
            exports.fromCodePoint = String.fromCodePoint || function(astralCodePoint) {
                return String.fromCharCode(Math.floor((astralCodePoint - 65536) / 1024) + 55296, (astralCodePoint - 65536) % 1024 + 56320);
            };
            exports.getCodePoint = String.prototype.codePointAt ? function(input, position) {
                return input.codePointAt(position);
            } : function(input, position) {
                return (input.charCodeAt(position) - 55296) * 1024 + input.charCodeAt(position + 1) - 56320 + 65536;
            };
            exports.highSurrogateFrom = 55296;
            exports.highSurrogateTo = 56319;
        },
        3689: (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            __webpack_require__.d(__webpack_exports__, {
                ucs2decode: () => ucs2decode,
                ucs2encode: () => ucs2encode,
                decode: () => decode,
                encode: () => encode,
                toASCII: () => toASCII,
                toUnicode: () => toUnicode,
                default: () => __WEBPACK_DEFAULT_EXPORT__
            });
            const maxInt = 2147483647;
            const base = 36;
            const tMin = 1;
            const tMax = 26;
            const skew = 38;
            const damp = 700;
            const initialBias = 72;
            const initialN = 128;
            const delimiter = "-";
            const regexPunycode = /^xn--/;
            const regexNonASCII = /[^\0-\x7E]/;
            const regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g;
            const errors = {
                overflow: "Overflow: input needs wider integers to process",
                "not-basic": "Illegal input >= 0x80 (not a basic code point)",
                "invalid-input": "Invalid input"
            };
            const baseMinusTMin = base - tMin;
            const floor = Math.floor;
            const stringFromCharCode = String.fromCharCode;
            function error(type) {
                throw new RangeError(errors[type]);
            }
            function map(array, fn) {
                const result = [];
                let length = array.length;
                while (length--) {
                    result[length] = fn(array[length]);
                }
                return result;
            }
            function mapDomain(string, fn) {
                const parts = string.split("@");
                let result = "";
                if (parts.length > 1) {
                    result = parts[0] + "@";
                    string = parts[1];
                }
                string = string.replace(regexSeparators, ".");
                const labels = string.split(".");
                const encoded = map(labels, fn).join(".");
                return result + encoded;
            }
            function ucs2decode(string) {
                const output = [];
                let counter = 0;
                const length = string.length;
                while (counter < length) {
                    const value = string.charCodeAt(counter++);
                    if (value >= 55296 && value <= 56319 && counter < length) {
                        const extra = string.charCodeAt(counter++);
                        if ((extra & 64512) == 56320) {
                            output.push(((value & 1023) << 10) + (extra & 1023) + 65536);
                        } else {
                            output.push(value);
                            counter--;
                        }
                    } else {
                        output.push(value);
                    }
                }
                return output;
            }
            const ucs2encode = array => String.fromCodePoint(...array);
            const basicToDigit = function(codePoint) {
                if (codePoint - 48 < 10) {
                    return codePoint - 22;
                }
                if (codePoint - 65 < 26) {
                    return codePoint - 65;
                }
                if (codePoint - 97 < 26) {
                    return codePoint - 97;
                }
                return base;
            };
            const digitToBasic = function(digit, flag) {
                return digit + 22 + 75 * (digit < 26) - ((flag != 0) << 5);
            };
            const adapt = function(delta, numPoints, firstTime) {
                let k = 0;
                delta = firstTime ? floor(delta / damp) : delta >> 1;
                delta += floor(delta / numPoints);
                for (;delta > baseMinusTMin * tMax >> 1; k += base) {
                    delta = floor(delta / baseMinusTMin);
                }
                return floor(k + (baseMinusTMin + 1) * delta / (delta + skew));
            };
            const decode = function(input) {
                const output = [];
                const inputLength = input.length;
                let i = 0;
                let n = initialN;
                let bias = initialBias;
                let basic = input.lastIndexOf(delimiter);
                if (basic < 0) {
                    basic = 0;
                }
                for (let j = 0; j < basic; ++j) {
                    if (input.charCodeAt(j) >= 128) {
                        error("not-basic");
                    }
                    output.push(input.charCodeAt(j));
                }
                for (let index = basic > 0 ? basic + 1 : 0; index < inputLength; ) {
                    let oldi = i;
                    for (let w = 1, k = base; ;k += base) {
                        if (index >= inputLength) {
                            error("invalid-input");
                        }
                        const digit = basicToDigit(input.charCodeAt(index++));
                        if (digit >= base || digit > floor((maxInt - i) / w)) {
                            error("overflow");
                        }
                        i += digit * w;
                        const t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
                        if (digit < t) {
                            break;
                        }
                        const baseMinusT = base - t;
                        if (w > floor(maxInt / baseMinusT)) {
                            error("overflow");
                        }
                        w *= baseMinusT;
                    }
                    const out = output.length + 1;
                    bias = adapt(i - oldi, out, oldi == 0);
                    if (floor(i / out) > maxInt - n) {
                        error("overflow");
                    }
                    n += floor(i / out);
                    i %= out;
                    output.splice(i++, 0, n);
                }
                return String.fromCodePoint(...output);
            };
            const encode = function(input) {
                const output = [];
                input = ucs2decode(input);
                let inputLength = input.length;
                let n = initialN;
                let delta = 0;
                let bias = initialBias;
                for (const currentValue of input) {
                    if (currentValue < 128) {
                        output.push(stringFromCharCode(currentValue));
                    }
                }
                let basicLength = output.length;
                let handledCPCount = basicLength;
                if (basicLength) {
                    output.push(delimiter);
                }
                while (handledCPCount < inputLength) {
                    let m = maxInt;
                    for (const currentValue of input) {
                        if (currentValue >= n && currentValue < m) {
                            m = currentValue;
                        }
                    }
                    const handledCPCountPlusOne = handledCPCount + 1;
                    if (m - n > floor((maxInt - delta) / handledCPCountPlusOne)) {
                        error("overflow");
                    }
                    delta += (m - n) * handledCPCountPlusOne;
                    n = m;
                    for (const currentValue of input) {
                        if (currentValue < n && ++delta > maxInt) {
                            error("overflow");
                        }
                        if (currentValue == n) {
                            let q = delta;
                            for (let k = base; ;k += base) {
                                const t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
                                if (q < t) {
                                    break;
                                }
                                const qMinusT = q - t;
                                const baseMinusT = base - t;
                                output.push(stringFromCharCode(digitToBasic(t + qMinusT % baseMinusT, 0)));
                                q = floor(qMinusT / baseMinusT);
                            }
                            output.push(stringFromCharCode(digitToBasic(q, 0)));
                            bias = adapt(delta, handledCPCountPlusOne, handledCPCount == basicLength);
                            delta = 0;
                            ++handledCPCount;
                        }
                    }
                    ++delta;
                    ++n;
                }
                return output.join("");
            };
            const toUnicode = function(input) {
                return mapDomain(input, (function(string) {
                    return regexPunycode.test(string) ? decode(string.slice(4).toLowerCase()) : string;
                }));
            };
            const toASCII = function(input) {
                return mapDomain(input, (function(string) {
                    return regexNonASCII.test(string) ? "xn--" + encode(string) : string;
                }));
            };
            const punycode = {
                version: "2.1.0",
                ucs2: {
                    decode: ucs2decode,
                    encode: ucs2encode
                },
                decode,
                encode,
                toASCII,
                toUnicode
            };
            const __WEBPACK_DEFAULT_EXPORT__ = punycode;
        },
        2587: module => {
            "use strict";
            function hasOwnProperty(obj, prop) {
                return Object.prototype.hasOwnProperty.call(obj, prop);
            }
            module.exports = function(qs, sep, eq, options) {
                sep = sep || "&";
                eq = eq || "=";
                var obj = {};
                if (typeof qs !== "string" || qs.length === 0) {
                    return obj;
                }
                var regexp = /\+/g;
                qs = qs.split(sep);
                var maxKeys = 1e3;
                if (options && typeof options.maxKeys === "number") {
                    maxKeys = options.maxKeys;
                }
                var len = qs.length;
                if (maxKeys > 0 && len > maxKeys) {
                    len = maxKeys;
                }
                for (var i = 0; i < len; ++i) {
                    var x = qs[i].replace(regexp, "%20"), idx = x.indexOf(eq), kstr, vstr, k, v;
                    if (idx >= 0) {
                        kstr = x.substr(0, idx);
                        vstr = x.substr(idx + 1);
                    } else {
                        kstr = x;
                        vstr = "";
                    }
                    k = decodeURIComponent(kstr);
                    v = decodeURIComponent(vstr);
                    if (!hasOwnProperty(obj, k)) {
                        obj[k] = v;
                    } else if (Array.isArray(obj[k])) {
                        obj[k].push(v);
                    } else {
                        obj[k] = [ obj[k], v ];
                    }
                }
                return obj;
            };
        },
        2361: module => {
            "use strict";
            var stringifyPrimitive = function(v) {
                switch (typeof v) {
                  case "string":
                    return v;

                  case "boolean":
                    return v ? "true" : "false";

                  case "number":
                    return isFinite(v) ? v : "";

                  default:
                    return "";
                }
            };
            module.exports = function(obj, sep, eq, name) {
                sep = sep || "&";
                eq = eq || "=";
                if (obj === null) {
                    obj = undefined;
                }
                if (typeof obj === "object") {
                    return Object.keys(obj).map((function(k) {
                        var ks = encodeURIComponent(stringifyPrimitive(k)) + eq;
                        if (Array.isArray(obj[k])) {
                            return obj[k].map((function(v) {
                                return ks + encodeURIComponent(stringifyPrimitive(v));
                            })).join(sep);
                        } else {
                            return ks + encodeURIComponent(stringifyPrimitive(obj[k]));
                        }
                    })).join(sep);
                }
                if (!name) return "";
                return encodeURIComponent(stringifyPrimitive(name)) + eq + encodeURIComponent(stringifyPrimitive(obj));
            };
        },
        7673: (__unused_webpack_module, exports, __webpack_require__) => {
            "use strict";
            exports.decode = exports.parse = __webpack_require__(2587);
            exports.encode = exports.stringify = __webpack_require__(2361);
        },
        8575: (__unused_webpack_module, exports, __webpack_require__) => {
            "use strict";
            var punycode = __webpack_require__(3689);
            var util = __webpack_require__(2502);
            exports.parse = urlParse;
            exports.resolve = urlResolve;
            exports.resolveObject = urlResolveObject;
            exports.format = urlFormat;
            exports.Url = Url;
            function Url() {
                this.protocol = null;
                this.slashes = null;
                this.auth = null;
                this.host = null;
                this.port = null;
                this.hostname = null;
                this.hash = null;
                this.search = null;
                this.query = null;
                this.pathname = null;
                this.path = null;
                this.href = null;
            }
            var protocolPattern = /^([a-z0-9.+-]+:)/i, portPattern = /:[0-9]*$/, simplePathPattern = /^(\/\/?(?!\/)[^\?\s]*)(\?[^\s]*)?$/, delims = [ "<", ">", '"', "`", " ", "\r", "\n", "\t" ], unwise = [ "{", "}", "|", "\\", "^", "`" ].concat(delims), autoEscape = [ "'" ].concat(unwise), nonHostChars = [ "%", "/", "?", ";", "#" ].concat(autoEscape), hostEndingChars = [ "/", "?", "#" ], hostnameMaxLen = 255, hostnamePartPattern = /^[+a-z0-9A-Z_-]{0,63}$/, hostnamePartStart = /^([+a-z0-9A-Z_-]{0,63})(.*)$/, unsafeProtocol = {
                javascript: true,
                "javascript:": true
            }, hostlessProtocol = {
                javascript: true,
                "javascript:": true
            }, slashedProtocol = {
                http: true,
                https: true,
                ftp: true,
                gopher: true,
                file: true,
                "http:": true,
                "https:": true,
                "ftp:": true,
                "gopher:": true,
                "file:": true
            }, querystring = __webpack_require__(7673);
            function urlParse(url, parseQueryString, slashesDenoteHost) {
                if (url && util.isObject(url) && url instanceof Url) return url;
                var u = new Url;
                u.parse(url, parseQueryString, slashesDenoteHost);
                return u;
            }
            Url.prototype.parse = function(url, parseQueryString, slashesDenoteHost) {
                if (!util.isString(url)) {
                    throw new TypeError("Parameter 'url' must be a string, not " + typeof url);
                }
                var queryIndex = url.indexOf("?"), splitter = queryIndex !== -1 && queryIndex < url.indexOf("#") ? "?" : "#", uSplit = url.split(splitter), slashRegex = /\\/g;
                uSplit[0] = uSplit[0].replace(slashRegex, "/");
                url = uSplit.join(splitter);
                var rest = url;
                rest = rest.trim();
                if (!slashesDenoteHost && url.split("#").length === 1) {
                    var simplePath = simplePathPattern.exec(rest);
                    if (simplePath) {
                        this.path = rest;
                        this.href = rest;
                        this.pathname = simplePath[1];
                        if (simplePath[2]) {
                            this.search = simplePath[2];
                            if (parseQueryString) {
                                this.query = querystring.parse(this.search.substr(1));
                            } else {
                                this.query = this.search.substr(1);
                            }
                        } else if (parseQueryString) {
                            this.search = "";
                            this.query = {};
                        }
                        return this;
                    }
                }
                var proto = protocolPattern.exec(rest);
                if (proto) {
                    proto = proto[0];
                    var lowerProto = proto.toLowerCase();
                    this.protocol = lowerProto;
                    rest = rest.substr(proto.length);
                }
                if (slashesDenoteHost || proto || rest.match(/^\/\/[^@\/]+@[^@\/]+/)) {
                    var slashes = rest.substr(0, 2) === "//";
                    if (slashes && !(proto && hostlessProtocol[proto])) {
                        rest = rest.substr(2);
                        this.slashes = true;
                    }
                }
                if (!hostlessProtocol[proto] && (slashes || proto && !slashedProtocol[proto])) {
                    var hostEnd = -1;
                    for (var i = 0; i < hostEndingChars.length; i++) {
                        var hec = rest.indexOf(hostEndingChars[i]);
                        if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) hostEnd = hec;
                    }
                    var auth, atSign;
                    if (hostEnd === -1) {
                        atSign = rest.lastIndexOf("@");
                    } else {
                        atSign = rest.lastIndexOf("@", hostEnd);
                    }
                    if (atSign !== -1) {
                        auth = rest.slice(0, atSign);
                        rest = rest.slice(atSign + 1);
                        this.auth = decodeURIComponent(auth);
                    }
                    hostEnd = -1;
                    for (var i = 0; i < nonHostChars.length; i++) {
                        var hec = rest.indexOf(nonHostChars[i]);
                        if (hec !== -1 && (hostEnd === -1 || hec < hostEnd)) hostEnd = hec;
                    }
                    if (hostEnd === -1) hostEnd = rest.length;
                    this.host = rest.slice(0, hostEnd);
                    rest = rest.slice(hostEnd);
                    this.parseHost();
                    this.hostname = this.hostname || "";
                    var ipv6Hostname = this.hostname[0] === "[" && this.hostname[this.hostname.length - 1] === "]";
                    if (!ipv6Hostname) {
                        var hostparts = this.hostname.split(/\./);
                        for (var i = 0, l = hostparts.length; i < l; i++) {
                            var part = hostparts[i];
                            if (!part) continue;
                            if (!part.match(hostnamePartPattern)) {
                                var newpart = "";
                                for (var j = 0, k = part.length; j < k; j++) {
                                    if (part.charCodeAt(j) > 127) {
                                        newpart += "x";
                                    } else {
                                        newpart += part[j];
                                    }
                                }
                                if (!newpart.match(hostnamePartPattern)) {
                                    var validParts = hostparts.slice(0, i);
                                    var notHost = hostparts.slice(i + 1);
                                    var bit = part.match(hostnamePartStart);
                                    if (bit) {
                                        validParts.push(bit[1]);
                                        notHost.unshift(bit[2]);
                                    }
                                    if (notHost.length) {
                                        rest = "/" + notHost.join(".") + rest;
                                    }
                                    this.hostname = validParts.join(".");
                                    break;
                                }
                            }
                        }
                    }
                    if (this.hostname.length > hostnameMaxLen) {
                        this.hostname = "";
                    } else {
                        this.hostname = this.hostname.toLowerCase();
                    }
                    if (!ipv6Hostname) {
                        this.hostname = punycode.toASCII(this.hostname);
                    }
                    var p = this.port ? ":" + this.port : "";
                    var h = this.hostname || "";
                    this.host = h + p;
                    this.href += this.host;
                    if (ipv6Hostname) {
                        this.hostname = this.hostname.substr(1, this.hostname.length - 2);
                        if (rest[0] !== "/") {
                            rest = "/" + rest;
                        }
                    }
                }
                if (!unsafeProtocol[lowerProto]) {
                    for (var i = 0, l = autoEscape.length; i < l; i++) {
                        var ae = autoEscape[i];
                        if (rest.indexOf(ae) === -1) continue;
                        var esc = encodeURIComponent(ae);
                        if (esc === ae) {
                            esc = escape(ae);
                        }
                        rest = rest.split(ae).join(esc);
                    }
                }
                var hash = rest.indexOf("#");
                if (hash !== -1) {
                    this.hash = rest.substr(hash);
                    rest = rest.slice(0, hash);
                }
                var qm = rest.indexOf("?");
                if (qm !== -1) {
                    this.search = rest.substr(qm);
                    this.query = rest.substr(qm + 1);
                    if (parseQueryString) {
                        this.query = querystring.parse(this.query);
                    }
                    rest = rest.slice(0, qm);
                } else if (parseQueryString) {
                    this.search = "";
                    this.query = {};
                }
                if (rest) this.pathname = rest;
                if (slashedProtocol[lowerProto] && this.hostname && !this.pathname) {
                    this.pathname = "/";
                }
                if (this.pathname || this.search) {
                    var p = this.pathname || "";
                    var s = this.search || "";
                    this.path = p + s;
                }
                this.href = this.format();
                return this;
            };
            function urlFormat(obj) {
                if (util.isString(obj)) obj = urlParse(obj);
                if (!(obj instanceof Url)) return Url.prototype.format.call(obj);
                return obj.format();
            }
            Url.prototype.format = function() {
                var auth = this.auth || "";
                if (auth) {
                    auth = encodeURIComponent(auth);
                    auth = auth.replace(/%3A/i, ":");
                    auth += "@";
                }
                var protocol = this.protocol || "", pathname = this.pathname || "", hash = this.hash || "", host = false, query = "";
                if (this.host) {
                    host = auth + this.host;
                } else if (this.hostname) {
                    host = auth + (this.hostname.indexOf(":") === -1 ? this.hostname : "[" + this.hostname + "]");
                    if (this.port) {
                        host += ":" + this.port;
                    }
                }
                if (this.query && util.isObject(this.query) && Object.keys(this.query).length) {
                    query = querystring.stringify(this.query);
                }
                var search = this.search || query && "?" + query || "";
                if (protocol && protocol.substr(-1) !== ":") protocol += ":";
                if (this.slashes || (!protocol || slashedProtocol[protocol]) && host !== false) {
                    host = "//" + (host || "");
                    if (pathname && pathname.charAt(0) !== "/") pathname = "/" + pathname;
                } else if (!host) {
                    host = "";
                }
                if (hash && hash.charAt(0) !== "#") hash = "#" + hash;
                if (search && search.charAt(0) !== "?") search = "?" + search;
                pathname = pathname.replace(/[?#]/g, (function(match) {
                    return encodeURIComponent(match);
                }));
                search = search.replace("#", "%23");
                return protocol + host + pathname + search + hash;
            };
            function urlResolve(source, relative) {
                return urlParse(source, false, true).resolve(relative);
            }
            Url.prototype.resolve = function(relative) {
                return this.resolveObject(urlParse(relative, false, true)).format();
            };
            function urlResolveObject(source, relative) {
                if (!source) return relative;
                return urlParse(source, false, true).resolveObject(relative);
            }
            Url.prototype.resolveObject = function(relative) {
                if (util.isString(relative)) {
                    var rel = new Url;
                    rel.parse(relative, false, true);
                    relative = rel;
                }
                var result = new Url;
                var tkeys = Object.keys(this);
                for (var tk = 0; tk < tkeys.length; tk++) {
                    var tkey = tkeys[tk];
                    result[tkey] = this[tkey];
                }
                result.hash = relative.hash;
                if (relative.href === "") {
                    result.href = result.format();
                    return result;
                }
                if (relative.slashes && !relative.protocol) {
                    var rkeys = Object.keys(relative);
                    for (var rk = 0; rk < rkeys.length; rk++) {
                        var rkey = rkeys[rk];
                        if (rkey !== "protocol") result[rkey] = relative[rkey];
                    }
                    if (slashedProtocol[result.protocol] && result.hostname && !result.pathname) {
                        result.path = result.pathname = "/";
                    }
                    result.href = result.format();
                    return result;
                }
                if (relative.protocol && relative.protocol !== result.protocol) {
                    if (!slashedProtocol[relative.protocol]) {
                        var keys = Object.keys(relative);
                        for (var v = 0; v < keys.length; v++) {
                            var k = keys[v];
                            result[k] = relative[k];
                        }
                        result.href = result.format();
                        return result;
                    }
                    result.protocol = relative.protocol;
                    if (!relative.host && !hostlessProtocol[relative.protocol]) {
                        var relPath = (relative.pathname || "").split("/");
                        while (relPath.length && !(relative.host = relPath.shift())) ;
                        if (!relative.host) relative.host = "";
                        if (!relative.hostname) relative.hostname = "";
                        if (relPath[0] !== "") relPath.unshift("");
                        if (relPath.length < 2) relPath.unshift("");
                        result.pathname = relPath.join("/");
                    } else {
                        result.pathname = relative.pathname;
                    }
                    result.search = relative.search;
                    result.query = relative.query;
                    result.host = relative.host || "";
                    result.auth = relative.auth;
                    result.hostname = relative.hostname || relative.host;
                    result.port = relative.port;
                    if (result.pathname || result.search) {
                        var p = result.pathname || "";
                        var s = result.search || "";
                        result.path = p + s;
                    }
                    result.slashes = result.slashes || relative.slashes;
                    result.href = result.format();
                    return result;
                }
                var isSourceAbs = result.pathname && result.pathname.charAt(0) === "/", isRelAbs = relative.host || relative.pathname && relative.pathname.charAt(0) === "/", mustEndAbs = isRelAbs || isSourceAbs || result.host && relative.pathname, removeAllDots = mustEndAbs, srcPath = result.pathname && result.pathname.split("/") || [], relPath = relative.pathname && relative.pathname.split("/") || [], psychotic = result.protocol && !slashedProtocol[result.protocol];
                if (psychotic) {
                    result.hostname = "";
                    result.port = null;
                    if (result.host) {
                        if (srcPath[0] === "") srcPath[0] = result.host; else srcPath.unshift(result.host);
                    }
                    result.host = "";
                    if (relative.protocol) {
                        relative.hostname = null;
                        relative.port = null;
                        if (relative.host) {
                            if (relPath[0] === "") relPath[0] = relative.host; else relPath.unshift(relative.host);
                        }
                        relative.host = null;
                    }
                    mustEndAbs = mustEndAbs && (relPath[0] === "" || srcPath[0] === "");
                }
                if (isRelAbs) {
                    result.host = relative.host || relative.host === "" ? relative.host : result.host;
                    result.hostname = relative.hostname || relative.hostname === "" ? relative.hostname : result.hostname;
                    result.search = relative.search;
                    result.query = relative.query;
                    srcPath = relPath;
                } else if (relPath.length) {
                    if (!srcPath) srcPath = [];
                    srcPath.pop();
                    srcPath = srcPath.concat(relPath);
                    result.search = relative.search;
                    result.query = relative.query;
                } else if (!util.isNullOrUndefined(relative.search)) {
                    if (psychotic) {
                        result.hostname = result.host = srcPath.shift();
                        var authInHost = result.host && result.host.indexOf("@") > 0 ? result.host.split("@") : false;
                        if (authInHost) {
                            result.auth = authInHost.shift();
                            result.host = result.hostname = authInHost.shift();
                        }
                    }
                    result.search = relative.search;
                    result.query = relative.query;
                    if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
                        result.path = (result.pathname ? result.pathname : "") + (result.search ? result.search : "");
                    }
                    result.href = result.format();
                    return result;
                }
                if (!srcPath.length) {
                    result.pathname = null;
                    if (result.search) {
                        result.path = "/" + result.search;
                    } else {
                        result.path = null;
                    }
                    result.href = result.format();
                    return result;
                }
                var last = srcPath.slice(-1)[0];
                var hasTrailingSlash = (result.host || relative.host || srcPath.length > 1) && (last === "." || last === "..") || last === "";
                var up = 0;
                for (var i = srcPath.length; i >= 0; i--) {
                    last = srcPath[i];
                    if (last === ".") {
                        srcPath.splice(i, 1);
                    } else if (last === "..") {
                        srcPath.splice(i, 1);
                        up++;
                    } else if (up) {
                        srcPath.splice(i, 1);
                        up--;
                    }
                }
                if (!mustEndAbs && !removeAllDots) {
                    for (;up--; up) {
                        srcPath.unshift("..");
                    }
                }
                if (mustEndAbs && srcPath[0] !== "" && (!srcPath[0] || srcPath[0].charAt(0) !== "/")) {
                    srcPath.unshift("");
                }
                if (hasTrailingSlash && srcPath.join("/").substr(-1) !== "/") {
                    srcPath.push("");
                }
                var isAbsolute = srcPath[0] === "" || srcPath[0] && srcPath[0].charAt(0) === "/";
                if (psychotic) {
                    result.hostname = result.host = isAbsolute ? "" : srcPath.length ? srcPath.shift() : "";
                    var authInHost = result.host && result.host.indexOf("@") > 0 ? result.host.split("@") : false;
                    if (authInHost) {
                        result.auth = authInHost.shift();
                        result.host = result.hostname = authInHost.shift();
                    }
                }
                mustEndAbs = mustEndAbs || result.host && srcPath.length;
                if (mustEndAbs && !isAbsolute) {
                    srcPath.unshift("");
                }
                if (!srcPath.length) {
                    result.pathname = null;
                    result.path = null;
                } else {
                    result.pathname = srcPath.join("/");
                }
                if (!util.isNull(result.pathname) || !util.isNull(result.search)) {
                    result.path = (result.pathname ? result.pathname : "") + (result.search ? result.search : "");
                }
                result.auth = relative.auth || result.auth;
                result.slashes = result.slashes || relative.slashes;
                result.href = result.format();
                return result;
            };
            Url.prototype.parseHost = function() {
                var host = this.host;
                var port = portPattern.exec(host);
                if (port) {
                    port = port[0];
                    if (port !== ":") {
                        this.port = port.substr(1);
                    }
                    host = host.substr(0, host.length - port.length);
                }
                if (host) this.hostname = host;
            };
        },
        2502: module => {
            "use strict";
            module.exports = {
                isString: function(arg) {
                    return typeof arg === "string";
                },
                isObject: function(arg) {
                    return typeof arg === "object" && arg !== null;
                },
                isNull: function(arg) {
                    return arg === null;
                },
                isNullOrUndefined: function(arg) {
                    return arg == null;
                }
            };
        },
        2999: (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
            "use strict";
            __webpack_require__.r(__webpack_exports__);
            __webpack_require__.d(__webpack_exports__, {
                default: () => WebSocketClient
            });
            var _utils_log_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9935);
            function _classCallCheck(instance, Constructor) {
                if (!(instance instanceof Constructor)) {
                    throw new TypeError("Cannot call a class as a function");
                }
            }
            function _defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }
            function _createClass(Constructor, protoProps, staticProps) {
                if (protoProps) _defineProperties(Constructor.prototype, protoProps);
                if (staticProps) _defineProperties(Constructor, staticProps);
                return Constructor;
            }
            var WebSocketClient = function() {
                function WebSocketClient(url) {
                    _classCallCheck(this, WebSocketClient);
                    this.client = new WebSocket(url);
                    this.client.onerror = function(error) {
                        _utils_log_js__WEBPACK_IMPORTED_MODULE_0__.c.error(error);
                    };
                }
                _createClass(WebSocketClient, [ {
                    key: "onOpen",
                    value: function onOpen(f) {
                        this.client.onopen = f;
                    }
                }, {
                    key: "onClose",
                    value: function onClose(f) {
                        this.client.onclose = f;
                    }
                }, {
                    key: "onMessage",
                    value: function onMessage(f) {
                        this.client.onmessage = function(e) {
                            f(e.data);
                        };
                    }
                } ]);
                return WebSocketClient;
            }();
        },
        8174: (__unused_webpack_module, __unused_webpack___webpack_exports__, __webpack_require__) => {
            "use strict";
            var log = __webpack_require__(1919);
            var log_default = __webpack_require__.n(log);
            var strip_ansi = __webpack_require__(6596);
            var strip_ansi_default = __webpack_require__.n(strip_ansi);
            var url = __webpack_require__(8575);
            function getCurrentScriptSource() {
                if (document.currentScript) {
                    return document.currentScript.getAttribute("src");
                }
                var scriptElements = document.scripts || [];
                var scriptElementsWithSrc = Array.prototype.filter.call(scriptElements, (function(element) {
                    return element.getAttribute("src");
                }));
                if (scriptElementsWithSrc.length > 0) {
                    var currentScript = scriptElementsWithSrc[scriptElementsWithSrc.length - 1];
                    return currentScript.getAttribute("src");
                }
                throw new Error("[webpack-dev-server] Failed to get current script source.");
            }
            const utils_getCurrentScriptSource = getCurrentScriptSource;
            function parseURL(resourceQuery) {
                var options = {};
                if (typeof resourceQuery === "string" && resourceQuery !== "") {
                    var searchParams = resourceQuery.substr(1).split("&");
                    for (var i = 0; i < searchParams.length; i++) {
                        var pair = searchParams[i].split("=");
                        options[pair[0]] = decodeURIComponent(pair[1]);
                    }
                } else {
                    var scriptSource = utils_getCurrentScriptSource();
                    if (scriptSource) {
                        var scriptSourceURL;
                        try {
                            scriptSourceURL = new URL(scriptSource, self.location.href);
                        } catch (error) {}
                        if (scriptSourceURL) {
                            options = scriptSourceURL;
                            options.fromCurrentScript = true;
                        }
                    } else {
                        options = url.parse(self.location.href, true, true);
                        options.fromCurrentScript = true;
                    }
                }
                return options;
            }
            const utils_parseURL = parseURL;
            var WebSocketClient = __webpack_require__(2999);
            var __webpack_dev_server_client__ = __webpack_require__(2999);
            var Client = typeof __webpack_dev_server_client__ !== "undefined" ? typeof __webpack_dev_server_client__.default !== "undefined" ? __webpack_dev_server_client__.default : __webpack_dev_server_client__ : WebSocketClient.default;
            var retries = 0;
            var client = null;
            var socket = function initSocket(url, handlers) {
                client = new Client(url);
                client.onOpen((function() {
                    retries = 0;
                }));
                client.onClose((function() {
                    if (retries === 0) {
                        handlers.close();
                    }
                    client = null;
                    if (retries <= 10) {
                        var retryInMs = 1e3 * Math.pow(2, retries) + Math.random() * 100;
                        retries += 1;
                        setTimeout((function() {
                            socket(url, handlers);
                        }), retryInMs);
                    }
                }));
                client.onMessage((function(data) {
                    var message = JSON.parse(data);
                    if (handlers[message.type]) {
                        handlers[message.type](message.data);
                    }
                }));
            };
            const client_socket = socket;
            var ansi_html = __webpack_require__(4455);
            var ansi_html_default = __webpack_require__.n(ansi_html);
            var lib = __webpack_require__(9111);
            var colors = {
                reset: [ "transparent", "transparent" ],
                black: "181818",
                red: "E36049",
                green: "B3CB74",
                yellow: "FFD080",
                blue: "7CAFC2",
                magenta: "7FACCA",
                cyan: "C3C2EF",
                lightgrey: "EBE7E3",
                darkgrey: "6D7891"
            };
            var iframeContainerElement;
            var containerElement;
            var onLoadQueue = [];
            ansi_html_default().setColors(colors);
            function createContainer() {
                iframeContainerElement = document.createElement("iframe");
                iframeContainerElement.id = "webpack-dev-server-client-overlay";
                iframeContainerElement.src = "about:blank";
                iframeContainerElement.style.position = "fixed";
                iframeContainerElement.style.left = 0;
                iframeContainerElement.style.top = 0;
                iframeContainerElement.style.right = 0;
                iframeContainerElement.style.bottom = 0;
                iframeContainerElement.style.width = "100vw";
                iframeContainerElement.style.height = "100vh";
                iframeContainerElement.style.border = "none";
                iframeContainerElement.style.zIndex = 9999999999;
                iframeContainerElement.onload = function() {
                    containerElement = iframeContainerElement.contentDocument.createElement("div");
                    containerElement.id = "webpack-dev-server-client-overlay-div";
                    containerElement.style.position = "fixed";
                    containerElement.style.boxSizing = "border-box";
                    containerElement.style.left = 0;
                    containerElement.style.top = 0;
                    containerElement.style.right = 0;
                    containerElement.style.bottom = 0;
                    containerElement.style.width = "100vw";
                    containerElement.style.height = "100vh";
                    containerElement.style.backgroundColor = "rgba(0, 0, 0, 0.85)";
                    containerElement.style.color = "#E8E8E8";
                    containerElement.style.fontFamily = "Menlo, Consolas, monospace";
                    containerElement.style.fontSize = "large";
                    containerElement.style.padding = "2rem";
                    containerElement.style.lineHeight = "1.2";
                    containerElement.style.whiteSpace = "pre-wrap";
                    containerElement.style.overflow = "auto";
                    var headerElement = document.createElement("span");
                    headerElement.innerText = "Compiled with problems:";
                    var closeButtonElement = document.createElement("button");
                    closeButtonElement.innerText = "X";
                    closeButtonElement.style.background = "transparent";
                    closeButtonElement.style.border = "none";
                    closeButtonElement.style.fontSize = "20px";
                    closeButtonElement.style.fontWeight = "bold";
                    closeButtonElement.style.color = "white";
                    closeButtonElement.style.cursor = "pointer";
                    closeButtonElement.style.cssFloat = "right";
                    closeButtonElement.style.styleFloat = "right";
                    closeButtonElement.addEventListener("click", (function() {
                        hide();
                    }));
                    containerElement.appendChild(headerElement);
                    containerElement.appendChild(closeButtonElement);
                    containerElement.appendChild(document.createElement("br"));
                    containerElement.appendChild(document.createElement("br"));
                    iframeContainerElement.contentDocument.body.appendChild(containerElement);
                    onLoadQueue.forEach((function(onLoad) {
                        onLoad(containerElement);
                    }));
                    onLoadQueue = [];
                    iframeContainerElement.onload = null;
                };
                document.body.appendChild(iframeContainerElement);
            }
            function ensureOverlayExists(callback) {
                if (containerElement) {
                    callback(containerElement);
                    return;
                }
                onLoadQueue.push(callback);
                if (iframeContainerElement) {
                    return;
                }
                createContainer();
            }
            function hide() {
                if (!iframeContainerElement) {
                    return;
                }
                document.body.removeChild(iframeContainerElement);
                iframeContainerElement = null;
                containerElement = null;
            }
            function show(messages, type) {
                ensureOverlayExists((function() {
                    messages.forEach((function(message) {
                        var entryElement = document.createElement("div");
                        var typeElement = document.createElement("span");
                        typeElement.innerText = type === "warnings" ? "Warning:" : "Error:";
                        typeElement.style.color = "#".concat(colors.red);
                        var errorMessage = message.message || messages[0];
                        var text = ansi_html_default()((0, lib.encode)(errorMessage));
                        var messageTextNode = document.createElement("div");
                        messageTextNode.innerHTML = text;
                        entryElement.appendChild(typeElement);
                        entryElement.appendChild(document.createElement("br"));
                        entryElement.appendChild(document.createElement("br"));
                        entryElement.appendChild(messageTextNode);
                        entryElement.appendChild(document.createElement("br"));
                        entryElement.appendChild(document.createElement("br"));
                        containerElement.appendChild(entryElement);
                    }));
                }));
            }
            var utils_log = __webpack_require__(9935);
            function sendMsg(type, data) {
                if (typeof self !== "undefined" && (typeof WorkerGlobalScope === "undefined" || !(self instanceof WorkerGlobalScope))) {
                    self.postMessage({
                        type: "webpack".concat(type),
                        data
                    }, "*");
                }
            }
            const sendMessage = sendMsg;
            var emitter = __webpack_require__(5208);
            var emitter_default = __webpack_require__.n(emitter);
            function reloadApp(_ref, status) {
                var hot = _ref.hot, liveReload = _ref.liveReload;
                if (status.isUnloading) {
                    return;
                }
                var webpackHash = true ? __webpack_require__.h() : 0;
                var isInitial = status.currentHash.indexOf(webpackHash) === 0;
                if (isInitial) {
                    var isLegacyInitial = webpackHash === "" && hot === false && liveReload === true;
                    if (isLegacyInitial) {
                        status.previousHash = status.currentHash;
                    }
                    return;
                }
                function applyReload(rootWindow, intervalId) {
                    clearInterval(intervalId);
                    utils_log.c.info("App updated. Reloading...");
                    rootWindow.location.reload();
                }
                var search = self.location.search.toLowerCase();
                var allowToHot = search.indexOf("webpack-dev-server-hot=false") === -1;
                var allowToLiveReload = search.indexOf("webpack-dev-server-live-reload=false") === -1;
                if (hot && allowToHot) {
                    utils_log.c.info("App hot update...");
                    emitter_default().emit("webpackHotUpdate", status.currentHash);
                    if (typeof self !== "undefined" && self.window) {
                        self.postMessage("webpackHotUpdate".concat(status.currentHash), "*");
                    }
                } else if (liveReload && allowToLiveReload) {
                    var rootWindow = self;
                    var intervalId = self.setInterval((function() {
                        if (rootWindow.location.protocol !== "about:") {
                            applyReload(rootWindow, intervalId);
                        } else {
                            rootWindow = rootWindow.parent;
                            if (rootWindow.parent === rootWindow) {
                                applyReload(rootWindow, intervalId);
                            }
                        }
                    }));
                }
            }
            const utils_reloadApp = reloadApp;
            function createSocketURL(parsedURL) {
                var hostname = parsedURL.hostname;
                var isInAddrAny = hostname === "0.0.0.0" || hostname === "::" || hostname === "[::]";
                if (isInAddrAny && self.location.hostname && self.location.protocol.indexOf("http") === 0) {
                    hostname = self.location.hostname;
                }
                var socketURLProtocol = parsedURL.protocol || self.location.protocol;
                if (socketURLProtocol === "auto:" || hostname && isInAddrAny && self.location.protocol === "https:") {
                    socketURLProtocol = self.location.protocol;
                }
                socketURLProtocol = socketURLProtocol.replace(/^(?:http|.+-extension|file)/i, "ws");
                var socketURLAuth = "";
                if (parsedURL.username) {
                    socketURLAuth = parsedURL.username;
                    if (parsedURL.password) {
                        socketURLAuth = socketURLAuth.concat(":", parsedURL.password);
                    }
                }
                var socketURLHostname = (hostname || self.location.hostname || "localhost").replace(/^\[(.*)\]$/, "$1");
                var socketURLPort = parsedURL.port;
                if (!socketURLPort || socketURLPort === "0") {
                    socketURLPort = self.location.port;
                }
                var socketURLPathname = "/ws";
                if (parsedURL.pathname && !parsedURL.fromCurrentScript) {
                    socketURLPathname = parsedURL.pathname;
                }
                return url.format({
                    protocol: socketURLProtocol,
                    auth: socketURLAuth,
                    hostname: socketURLHostname,
                    port: socketURLPort,
                    pathname: socketURLPathname,
                    slashes: true
                });
            }
            const utils_createSocketURL = createSocketURL;
            var __resourceQuery = "?protocol=ws%3A&hostname=0.0.0.0&port=8080&pathname=%2Fws&logging=info";
            var clientprotocol_ws_3A_hostname_0_0_0_0_port_8080_pathname_2Fws_logging_info_status = {
                isUnloading: false,
                currentHash: true ? __webpack_require__.h() : 0
            };
            var options = {
                hot: false,
                liveReload: false,
                progress: false,
                overlay: false
            };
            var parsedResourceQuery = utils_parseURL(__resourceQuery);
            if (parsedResourceQuery.logging) {
                options.logging = parsedResourceQuery.logging;
            }
            function setAllLogLevel(level) {
                log_default().setLogLevel(level === "verbose" || level === "log" ? "info" : level);
                (0, utils_log.U)(level);
            }
            if (options.logging) {
                setAllLogLevel(options.logging);
            }
            self.addEventListener("beforeunload", (function() {
                clientprotocol_ws_3A_hostname_0_0_0_0_port_8080_pathname_2Fws_logging_info_status.isUnloading = true;
            }));
            var onSocketMessage = {
                hot: function hot() {
                    if (parsedResourceQuery.hot === "false") {
                        return;
                    }
                    options.hot = true;
                    utils_log.c.info("Hot Module Replacement enabled.");
                },
                liveReload: function liveReload() {
                    if (parsedResourceQuery["live-reload"] === "false") {
                        return;
                    }
                    options.liveReload = true;
                    utils_log.c.info("Live Reloading enabled.");
                },
                invalid: function invalid() {
                    utils_log.c.info("App updated. Recompiling...");
                    if (options.overlay) {
                        hide();
                    }
                    sendMessage("Invalid");
                },
                hash: function hash(_hash) {
                    clientprotocol_ws_3A_hostname_0_0_0_0_port_8080_pathname_2Fws_logging_info_status.currentHash = _hash;
                },
                logging: setAllLogLevel,
                overlay: function overlay(value) {
                    if (typeof document === "undefined") {
                        return;
                    }
                    options.overlay = value;
                },
                progress: function progress(_progress) {
                    options.progress = _progress;
                },
                "progress-update": function progressUpdate(data) {
                    if (options.progress) {
                        utils_log.c.info("".concat(data.pluginName ? "[".concat(data.pluginName, "] ") : "").concat(data.percent, "% - ").concat(data.msg, "."));
                    }
                    sendMessage("Progress", data);
                },
                "still-ok": function stillOk() {
                    utils_log.c.info("Nothing changed.");
                    if (options.overlay) {
                        hide();
                    }
                    sendMessage("StillOk");
                },
                ok: function ok() {
                    sendMessage("Ok");
                    if (options.overlay) {
                        hide();
                    }
                    utils_reloadApp(options, clientprotocol_ws_3A_hostname_0_0_0_0_port_8080_pathname_2Fws_logging_info_status);
                },
                "content-changed": function contentChanged(file) {
                    utils_log.c.info("".concat(file ? '"'.concat(file, '"') : "Content", " from static directory was changed. Reloading..."));
                    self.location.reload();
                },
                "static-changed": function staticChanged(file) {
                    utils_log.c.info("".concat(file ? '"'.concat(file, '"') : "Content", " from static directory was changed. Reloading..."));
                    self.location.reload();
                },
                warnings: function warnings(_warnings) {
                    utils_log.c.warn("Warnings while compiling.");
                    var strippedWarnings = _warnings.map((function(warning) {
                        return strip_ansi_default()(warning.message ? warning.message : warning);
                    }));
                    sendMessage("Warnings", strippedWarnings);
                    for (var i = 0; i < strippedWarnings.length; i++) {
                        utils_log.c.warn(strippedWarnings[i]);
                    }
                    var needShowOverlay = typeof options.overlay === "boolean" ? options.overlay : options.overlay && options.overlay.warnings;
                    if (needShowOverlay) {
                        show(_warnings, "warnings");
                    }
                    utils_reloadApp(options, clientprotocol_ws_3A_hostname_0_0_0_0_port_8080_pathname_2Fws_logging_info_status);
                },
                errors: function errors(_errors) {
                    utils_log.c.error("Errors while compiling. Reload prevented.");
                    var strippedErrors = _errors.map((function(error) {
                        return strip_ansi_default()(error.message ? error.message : error);
                    }));
                    sendMessage("Errors", strippedErrors);
                    for (var i = 0; i < strippedErrors.length; i++) {
                        utils_log.c.error(strippedErrors[i]);
                    }
                    var needShowOverlay = typeof options.overlay === "boolean" ? options.overlay : options.overlay && options.overlay.errors;
                    if (needShowOverlay) {
                        show(_errors, "errors");
                    }
                },
                error: function error(_error) {
                    utils_log.c.error(_error);
                },
                close: function close() {
                    utils_log.c.error("Disconnected!");
                    sendMessage("Close");
                }
            };
            var socketURL = utils_createSocketURL(parsedResourceQuery);
            client_socket(socketURL, onSocketMessage);
        },
        5503: (__unused_webpack_module, exports) => {
            (function() {
                "use strict";
                var __webpack_modules__ = {
                    "./client-src/modules/logger/SyncBailHookFake.js": function(module) {
                        module.exports = function clientTapableSyncBailHook() {
                            return {
                                call: function call() {}
                            };
                        };
                    },
                    "./node_modules/webpack/lib/logging/Logger.js": function(__unused_webpack_module, exports) {
                        function _toConsumableArray(arr) {
                            return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
                        }
                        function _nonIterableSpread() {
                            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
                        }
                        function _unsupportedIterableToArray(o, minLen) {
                            if (!o) return;
                            if (typeof o === "string") return _arrayLikeToArray(o, minLen);
                            var n = Object.prototype.toString.call(o).slice(8, -1);
                            if (n === "Object" && o.constructor) n = o.constructor.name;
                            if (n === "Map" || n === "Set") return Array.from(o);
                            if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
                        }
                        function _iterableToArray(iter) {
                            if (typeof (typeof Symbol !== "undefined" ? Symbol : function(i) {
                                return i;
                            }) !== "undefined" && iter[(typeof Symbol !== "undefined" ? Symbol : function(i) {
                                return i;
                            }).iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
                        }
                        function _arrayWithoutHoles(arr) {
                            if (Array.isArray(arr)) return _arrayLikeToArray(arr);
                        }
                        function _arrayLikeToArray(arr, len) {
                            if (len == null || len > arr.length) len = arr.length;
                            for (var i = 0, arr2 = new Array(len); i < len; i++) {
                                arr2[i] = arr[i];
                            }
                            return arr2;
                        }
                        function _classCallCheck(instance, Constructor) {
                            if (!(instance instanceof Constructor)) {
                                throw new TypeError("Cannot call a class as a function");
                            }
                        }
                        function _defineProperties(target, props) {
                            for (var i = 0; i < props.length; i++) {
                                var descriptor = props[i];
                                descriptor.enumerable = descriptor.enumerable || false;
                                descriptor.configurable = true;
                                if ("value" in descriptor) descriptor.writable = true;
                                Object.defineProperty(target, descriptor.key, descriptor);
                            }
                        }
                        function _createClass(Constructor, protoProps, staticProps) {
                            if (protoProps) _defineProperties(Constructor.prototype, protoProps);
                            if (staticProps) _defineProperties(Constructor, staticProps);
                            return Constructor;
                        }
                        var LogType = Object.freeze({
                            error: "error",
                            warn: "warn",
                            info: "info",
                            log: "log",
                            debug: "debug",
                            trace: "trace",
                            group: "group",
                            groupCollapsed: "groupCollapsed",
                            groupEnd: "groupEnd",
                            profile: "profile",
                            profileEnd: "profileEnd",
                            time: "time",
                            clear: "clear",
                            status: "status"
                        });
                        exports.LogType = LogType;
                        var LOG_SYMBOL = (typeof Symbol !== "undefined" ? Symbol : function(i) {
                            return i;
                        })("webpack logger raw log method");
                        var TIMERS_SYMBOL = (typeof Symbol !== "undefined" ? Symbol : function(i) {
                            return i;
                        })("webpack logger times");
                        var TIMERS_AGGREGATES_SYMBOL = (typeof Symbol !== "undefined" ? Symbol : function(i) {
                            return i;
                        })("webpack logger aggregated times");
                        var WebpackLogger = function() {
                            function WebpackLogger(log, getChildLogger) {
                                _classCallCheck(this, WebpackLogger);
                                this[LOG_SYMBOL] = log;
                                this.getChildLogger = getChildLogger;
                            }
                            _createClass(WebpackLogger, [ {
                                key: "error",
                                value: function error() {
                                    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                                        args[_key] = arguments[_key];
                                    }
                                    this[LOG_SYMBOL](LogType.error, args);
                                }
                            }, {
                                key: "warn",
                                value: function warn() {
                                    for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
                                        args[_key2] = arguments[_key2];
                                    }
                                    this[LOG_SYMBOL](LogType.warn, args);
                                }
                            }, {
                                key: "info",
                                value: function info() {
                                    for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
                                        args[_key3] = arguments[_key3];
                                    }
                                    this[LOG_SYMBOL](LogType.info, args);
                                }
                            }, {
                                key: "log",
                                value: function log() {
                                    for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
                                        args[_key4] = arguments[_key4];
                                    }
                                    this[LOG_SYMBOL](LogType.log, args);
                                }
                            }, {
                                key: "debug",
                                value: function debug() {
                                    for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
                                        args[_key5] = arguments[_key5];
                                    }
                                    this[LOG_SYMBOL](LogType.debug, args);
                                }
                            }, {
                                key: "assert",
                                value: function assert(assertion) {
                                    if (!assertion) {
                                        for (var _len6 = arguments.length, args = new Array(_len6 > 1 ? _len6 - 1 : 0), _key6 = 1; _key6 < _len6; _key6++) {
                                            args[_key6 - 1] = arguments[_key6];
                                        }
                                        this[LOG_SYMBOL](LogType.error, args);
                                    }
                                }
                            }, {
                                key: "trace",
                                value: function trace() {
                                    this[LOG_SYMBOL](LogType.trace, [ "Trace" ]);
                                }
                            }, {
                                key: "clear",
                                value: function clear() {
                                    this[LOG_SYMBOL](LogType.clear);
                                }
                            }, {
                                key: "status",
                                value: function status() {
                                    for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {
                                        args[_key7] = arguments[_key7];
                                    }
                                    this[LOG_SYMBOL](LogType.status, args);
                                }
                            }, {
                                key: "group",
                                value: function group() {
                                    for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {
                                        args[_key8] = arguments[_key8];
                                    }
                                    this[LOG_SYMBOL](LogType.group, args);
                                }
                            }, {
                                key: "groupCollapsed",
                                value: function groupCollapsed() {
                                    for (var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++) {
                                        args[_key9] = arguments[_key9];
                                    }
                                    this[LOG_SYMBOL](LogType.groupCollapsed, args);
                                }
                            }, {
                                key: "groupEnd",
                                value: function groupEnd() {
                                    for (var _len10 = arguments.length, args = new Array(_len10), _key10 = 0; _key10 < _len10; _key10++) {
                                        args[_key10] = arguments[_key10];
                                    }
                                    this[LOG_SYMBOL](LogType.groupEnd, args);
                                }
                            }, {
                                key: "profile",
                                value: function profile(label) {
                                    this[LOG_SYMBOL](LogType.profile, [ label ]);
                                }
                            }, {
                                key: "profileEnd",
                                value: function profileEnd(label) {
                                    this[LOG_SYMBOL](LogType.profileEnd, [ label ]);
                                }
                            }, {
                                key: "time",
                                value: function time(label) {
                                    this[TIMERS_SYMBOL] = this[TIMERS_SYMBOL] || new Map;
                                    this[TIMERS_SYMBOL].set(label, process.hrtime());
                                }
                            }, {
                                key: "timeLog",
                                value: function timeLog(label) {
                                    var prev = this[TIMERS_SYMBOL] && this[TIMERS_SYMBOL].get(label);
                                    if (!prev) {
                                        throw new Error("No such label '".concat(label, "' for WebpackLogger.timeLog()"));
                                    }
                                    var time = process.hrtime(prev);
                                    this[LOG_SYMBOL](LogType.time, [ label ].concat(_toConsumableArray(time)));
                                }
                            }, {
                                key: "timeEnd",
                                value: function timeEnd(label) {
                                    var prev = this[TIMERS_SYMBOL] && this[TIMERS_SYMBOL].get(label);
                                    if (!prev) {
                                        throw new Error("No such label '".concat(label, "' for WebpackLogger.timeEnd()"));
                                    }
                                    var time = process.hrtime(prev);
                                    this[TIMERS_SYMBOL].delete(label);
                                    this[LOG_SYMBOL](LogType.time, [ label ].concat(_toConsumableArray(time)));
                                }
                            }, {
                                key: "timeAggregate",
                                value: function timeAggregate(label) {
                                    var prev = this[TIMERS_SYMBOL] && this[TIMERS_SYMBOL].get(label);
                                    if (!prev) {
                                        throw new Error("No such label '".concat(label, "' for WebpackLogger.timeAggregate()"));
                                    }
                                    var time = process.hrtime(prev);
                                    this[TIMERS_SYMBOL].delete(label);
                                    this[TIMERS_AGGREGATES_SYMBOL] = this[TIMERS_AGGREGATES_SYMBOL] || new Map;
                                    var current = this[TIMERS_AGGREGATES_SYMBOL].get(label);
                                    if (current !== undefined) {
                                        if (time[1] + current[1] > 1e9) {
                                            time[0] += current[0] + 1;
                                            time[1] = time[1] - 1e9 + current[1];
                                        } else {
                                            time[0] += current[0];
                                            time[1] += current[1];
                                        }
                                    }
                                    this[TIMERS_AGGREGATES_SYMBOL].set(label, time);
                                }
                            }, {
                                key: "timeAggregateEnd",
                                value: function timeAggregateEnd(label) {
                                    if (this[TIMERS_AGGREGATES_SYMBOL] === undefined) return;
                                    var time = this[TIMERS_AGGREGATES_SYMBOL].get(label);
                                    if (time === undefined) return;
                                    this[LOG_SYMBOL](LogType.time, [ label ].concat(_toConsumableArray(time)));
                                }
                            } ]);
                            return WebpackLogger;
                        }();
                        exports.Logger = WebpackLogger;
                    },
                    "./node_modules/webpack/lib/logging/createConsoleLogger.js": function(module, __unused_webpack_exports, __nested_webpack_require_10262__) {
                        function _toConsumableArray(arr) {
                            return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
                        }
                        function _nonIterableSpread() {
                            throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
                        }
                        function _unsupportedIterableToArray(o, minLen) {
                            if (!o) return;
                            if (typeof o === "string") return _arrayLikeToArray(o, minLen);
                            var n = Object.prototype.toString.call(o).slice(8, -1);
                            if (n === "Object" && o.constructor) n = o.constructor.name;
                            if (n === "Map" || n === "Set") return Array.from(o);
                            if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
                        }
                        function _iterableToArray(iter) {
                            if (typeof (typeof Symbol !== "undefined" ? Symbol : function(i) {
                                return i;
                            }) !== "undefined" && iter[(typeof Symbol !== "undefined" ? Symbol : function(i) {
                                return i;
                            }).iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
                        }
                        function _arrayWithoutHoles(arr) {
                            if (Array.isArray(arr)) return _arrayLikeToArray(arr);
                        }
                        function _arrayLikeToArray(arr, len) {
                            if (len == null || len > arr.length) len = arr.length;
                            for (var i = 0, arr2 = new Array(len); i < len; i++) {
                                arr2[i] = arr[i];
                            }
                            return arr2;
                        }
                        var _require = __nested_webpack_require_10262__("./node_modules/webpack/lib/logging/Logger.js"), LogType = _require.LogType;
                        var filterToFunction = function filterToFunction(item) {
                            if (typeof item === "string") {
                                var regExp = new RegExp("[\\\\/]".concat(item.replace(/[-[\]{}()*+?.\\^$|]/g, "\\$&"), "([\\\\/]|$|!|\\?)"));
                                return function(ident) {
                                    return regExp.test(ident);
                                };
                            }
                            if (item && typeof item === "object" && typeof item.test === "function") {
                                return function(ident) {
                                    return item.test(ident);
                                };
                            }
                            if (typeof item === "function") {
                                return item;
                            }
                            if (typeof item === "boolean") {
                                return function() {
                                    return item;
                                };
                            }
                        };
                        var LogLevel = {
                            none: 6,
                            false: 6,
                            error: 5,
                            warn: 4,
                            info: 3,
                            log: 2,
                            true: 2,
                            verbose: 1
                        };
                        module.exports = function(_ref) {
                            var _ref$level = _ref.level, level = _ref$level === void 0 ? "info" : _ref$level, _ref$debug = _ref.debug, debug = _ref$debug === void 0 ? false : _ref$debug, console = _ref.console;
                            var debugFilters = typeof debug === "boolean" ? [ function() {
                                return debug;
                            } ] : [].concat(debug).map(filterToFunction);
                            var loglevel = LogLevel["".concat(level)] || 0;
                            var logger = function logger(name, type, args) {
                                var labeledArgs = function labeledArgs() {
                                    if (Array.isArray(args)) {
                                        if (args.length > 0 && typeof args[0] === "string") {
                                            return [ "[".concat(name, "] ").concat(args[0]) ].concat(_toConsumableArray(args.slice(1)));
                                        } else {
                                            return [ "[".concat(name, "]") ].concat(_toConsumableArray(args));
                                        }
                                    } else {
                                        return [];
                                    }
                                };
                                var debug = debugFilters.some((function(f) {
                                    return f(name);
                                }));
                                switch (type) {
                                  case LogType.debug:
                                    if (!debug) return;
                                    if (typeof console.debug === "function") {
                                        console.debug.apply(console, _toConsumableArray(labeledArgs()));
                                    } else {
                                        console.log.apply(console, _toConsumableArray(labeledArgs()));
                                    }
                                    break;

                                  case LogType.log:
                                    if (!debug && loglevel > LogLevel.log) return;
                                    console.log.apply(console, _toConsumableArray(labeledArgs()));
                                    break;

                                  case LogType.info:
                                    if (!debug && loglevel > LogLevel.info) return;
                                    console.info.apply(console, _toConsumableArray(labeledArgs()));
                                    break;

                                  case LogType.warn:
                                    if (!debug && loglevel > LogLevel.warn) return;
                                    console.warn.apply(console, _toConsumableArray(labeledArgs()));
                                    break;

                                  case LogType.error:
                                    if (!debug && loglevel > LogLevel.error) return;
                                    console.error.apply(console, _toConsumableArray(labeledArgs()));
                                    break;

                                  case LogType.trace:
                                    if (!debug) return;
                                    console.trace();
                                    break;

                                  case LogType.groupCollapsed:
                                    if (!debug && loglevel > LogLevel.log) return;
                                    if (!debug && loglevel > LogLevel.verbose) {
                                        if (typeof console.groupCollapsed === "function") {
                                            console.groupCollapsed.apply(console, _toConsumableArray(labeledArgs()));
                                        } else {
                                            console.log.apply(console, _toConsumableArray(labeledArgs()));
                                        }
                                        break;
                                    }

                                  case LogType.group:
                                    if (!debug && loglevel > LogLevel.log) return;
                                    if (typeof console.group === "function") {
                                        console.group.apply(console, _toConsumableArray(labeledArgs()));
                                    } else {
                                        console.log.apply(console, _toConsumableArray(labeledArgs()));
                                    }
                                    break;

                                  case LogType.groupEnd:
                                    if (!debug && loglevel > LogLevel.log) return;
                                    if (typeof console.groupEnd === "function") {
                                        console.groupEnd();
                                    }
                                    break;

                                  case LogType.time:
                                    {
                                        if (!debug && loglevel > LogLevel.log) return;
                                        var ms = args[1] * 1e3 + args[2] / 1e6;
                                        var msg = "[".concat(name, "] ").concat(args[0], ": ").concat(ms, " ms");
                                        if (typeof console.logTime === "function") {
                                            console.logTime(msg);
                                        } else {
                                            console.log(msg);
                                        }
                                        break;
                                    }

                                  case LogType.profile:
                                    if (typeof console.profile === "function") {
                                        console.profile.apply(console, _toConsumableArray(labeledArgs()));
                                    }
                                    break;

                                  case LogType.profileEnd:
                                    if (typeof console.profileEnd === "function") {
                                        console.profileEnd.apply(console, _toConsumableArray(labeledArgs()));
                                    }
                                    break;

                                  case LogType.clear:
                                    if (!debug && loglevel > LogLevel.log) return;
                                    if (typeof console.clear === "function") {
                                        console.clear();
                                    }
                                    break;

                                  case LogType.status:
                                    if (!debug && loglevel > LogLevel.info) return;
                                    if (typeof console.status === "function") {
                                        if (args.length === 0) {
                                            console.status();
                                        } else {
                                            console.status.apply(console, _toConsumableArray(labeledArgs()));
                                        }
                                    } else {
                                        if (args.length !== 0) {
                                            console.info.apply(console, _toConsumableArray(labeledArgs()));
                                        }
                                    }
                                    break;

                                  default:
                                    throw new Error("Unexpected LogType ".concat(type));
                                }
                            };
                            return logger;
                        };
                    },
                    "./node_modules/webpack/lib/logging/runtime.js": function(__unused_webpack_module, exports, __nested_webpack_require_20349__) {
                        function _extends() {
                            _extends = Object.assign || function(target) {
                                for (var i = 1; i < arguments.length; i++) {
                                    var source = arguments[i];
                                    for (var key in source) {
                                        if (Object.prototype.hasOwnProperty.call(source, key)) {
                                            target[key] = source[key];
                                        }
                                    }
                                }
                                return target;
                            };
                            return _extends.apply(this, arguments);
                        }
                        var SyncBailHook = __nested_webpack_require_20349__("./client-src/modules/logger/SyncBailHookFake.js");
                        var _require = __nested_webpack_require_20349__("./node_modules/webpack/lib/logging/Logger.js"), Logger = _require.Logger;
                        var createConsoleLogger = __nested_webpack_require_20349__("./node_modules/webpack/lib/logging/createConsoleLogger.js");
                        var currentDefaultLoggerOptions = {
                            level: "info",
                            debug: false,
                            console
                        };
                        var currentDefaultLogger = createConsoleLogger(currentDefaultLoggerOptions);
                        exports.getLogger = function(name) {
                            return new Logger((function(type, args) {
                                if (exports.hooks.log.call(name, type, args) === undefined) {
                                    currentDefaultLogger(name, type, args);
                                }
                            }), (function(childName) {
                                return exports.getLogger("".concat(name, "/").concat(childName));
                            }));
                        };
                        exports.configureDefaultLogger = function(options) {
                            _extends(currentDefaultLoggerOptions, options);
                            currentDefaultLogger = createConsoleLogger(currentDefaultLoggerOptions);
                        };
                        exports.hooks = {
                            log: new SyncBailHook([ "origin", "type", "args" ])
                        };
                    }
                };
                var __webpack_module_cache__ = {};
                function __nested_webpack_require_22465__(moduleId) {
                    var cachedModule = __webpack_module_cache__[moduleId];
                    if (cachedModule !== undefined) {
                        return cachedModule.exports;
                    }
                    var module = __webpack_module_cache__[moduleId] = {
                        exports: {}
                    };
                    __webpack_modules__[moduleId](module, module.exports, __nested_webpack_require_22465__);
                    return module.exports;
                }
                !function() {
                    __nested_webpack_require_22465__.d = function(exports, definition) {
                        for (var key in definition) {
                            if (__nested_webpack_require_22465__.o(definition, key) && !__nested_webpack_require_22465__.o(exports, key)) {
                                Object.defineProperty(exports, key, {
                                    enumerable: true,
                                    get: definition[key]
                                });
                            }
                        }
                    };
                }();
                !function() {
                    __nested_webpack_require_22465__.o = function(obj, prop) {
                        return Object.prototype.hasOwnProperty.call(obj, prop);
                    };
                }();
                !function() {
                    __nested_webpack_require_22465__.r = function(exports) {
                        if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
                            Object.defineProperty(exports, Symbol.toStringTag, {
                                value: "Module"
                            });
                        }
                        Object.defineProperty(exports, "__esModule", {
                            value: true
                        });
                    };
                }();
                var __webpack_exports__ = {};
                !function() {
                    __nested_webpack_require_22465__.r(__webpack_exports__);
                    __nested_webpack_require_22465__.d(__webpack_exports__, {
                        default: function() {
                            return webpack_lib_logging_runtime_js__WEBPACK_IMPORTED_MODULE_0__;
                        }
                    });
                    var webpack_lib_logging_runtime_js__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_22465__("./node_modules/webpack/lib/logging/runtime.js");
                }();
                var __webpack_export_target__ = exports;
                for (var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
                if (__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", {
                    value: true
                });
            })();
        },
        6596: (__unused_webpack_module, exports) => {
            (function() {
                "use strict";
                var __webpack_modules__ = {
                    "./node_modules/strip-ansi/index.js": function(__unused_webpack___webpack_module__, __webpack_exports__, __nested_webpack_require_368__) {
                        __nested_webpack_require_368__.r(__webpack_exports__);
                        __nested_webpack_require_368__.d(__webpack_exports__, {
                            default: function() {
                                return stripAnsi;
                            }
                        });
                        var ansi_regex__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_368__("./node_modules/strip-ansi/node_modules/ansi-regex/index.js");
                        function stripAnsi(string) {
                            if (typeof string !== "string") {
                                throw new TypeError("Expected a `string`, got `".concat(typeof string, "`"));
                            }
                            return string.replace((0, ansi_regex__WEBPACK_IMPORTED_MODULE_0__.default)(), "");
                        }
                    },
                    "./node_modules/strip-ansi/node_modules/ansi-regex/index.js": function(__unused_webpack___webpack_module__, __webpack_exports__, __nested_webpack_require_1384__) {
                        __nested_webpack_require_1384__.r(__webpack_exports__);
                        __nested_webpack_require_1384__.d(__webpack_exports__, {
                            default: function() {
                                return ansiRegex;
                            }
                        });
                        function ansiRegex() {
                            var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {}, _ref$onlyFirst = _ref.onlyFirst, onlyFirst = _ref$onlyFirst === void 0 ? false : _ref$onlyFirst;
                            var pattern = [ "[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)", "(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))" ].join("|");
                            return new RegExp(pattern, onlyFirst ? undefined : "g");
                        }
                    }
                };
                var __webpack_module_cache__ = {};
                function __nested_webpack_require_2316__(moduleId) {
                    var cachedModule = __webpack_module_cache__[moduleId];
                    if (cachedModule !== undefined) {
                        return cachedModule.exports;
                    }
                    var module = __webpack_module_cache__[moduleId] = {
                        exports: {}
                    };
                    __webpack_modules__[moduleId](module, module.exports, __nested_webpack_require_2316__);
                    return module.exports;
                }
                !function() {
                    __nested_webpack_require_2316__.d = function(exports, definition) {
                        for (var key in definition) {
                            if (__nested_webpack_require_2316__.o(definition, key) && !__nested_webpack_require_2316__.o(exports, key)) {
                                Object.defineProperty(exports, key, {
                                    enumerable: true,
                                    get: definition[key]
                                });
                            }
                        }
                    };
                }();
                !function() {
                    __nested_webpack_require_2316__.o = function(obj, prop) {
                        return Object.prototype.hasOwnProperty.call(obj, prop);
                    };
                }();
                !function() {
                    __nested_webpack_require_2316__.r = function(exports) {
                        if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
                            Object.defineProperty(exports, Symbol.toStringTag, {
                                value: "Module"
                            });
                        }
                        Object.defineProperty(exports, "__esModule", {
                            value: true
                        });
                    };
                }();
                var __webpack_exports__ = {};
                !function() {
                    __nested_webpack_require_2316__.r(__webpack_exports__);
                    var strip_ansi__WEBPACK_IMPORTED_MODULE_0__ = __nested_webpack_require_2316__("./node_modules/strip-ansi/index.js");
                    __webpack_exports__["default"] = strip_ansi__WEBPACK_IMPORTED_MODULE_0__.default;
                }();
                var __webpack_export_target__ = exports;
                for (var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
                if (__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", {
                    value: true
                });
            })();
        },
        9935: (__unused_webpack_module, __webpack_exports__, __webpack_require__) => {
            "use strict";
            __webpack_require__.d(__webpack_exports__, {
                c: () => log,
                U: () => setLogLevel
            });
            var _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5503);
            var _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0___default = __webpack_require__.n(_modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0__);
            var name = "webpack-dev-server";
            var defaultLevel = "info";
            function setLogLevel(level) {
                _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0___default().configureDefaultLogger({
                    level
                });
            }
            setLogLevel(defaultLevel);
            var log = _modules_logger_index_js__WEBPACK_IMPORTED_MODULE_0___default().getLogger(name);
        },
        6952: (module, __unused_webpack_exports, __webpack_require__) => {
            if (true) {
                var lastHash;
                var upToDate = function upToDate() {
                    return lastHash.indexOf(__webpack_require__.h()) >= 0;
                };
                var log = __webpack_require__(1919);
                var check = function check() {
                    module.hot.check(true).then((function(updatedModules) {
                        if (!updatedModules) {
                            log("warning", "[HMR] Cannot find update. Need to do a full reload!");
                            log("warning", "[HMR] (Probably because of restarting the webpack-dev-server)");
                            window.location.reload();
                            return;
                        }
                        if (!upToDate()) {
                            check();
                        }
                        __webpack_require__(5374)(updatedModules, updatedModules);
                        if (upToDate()) {
                            log("info", "[HMR] App is up to date.");
                        }
                    })).catch((function(err) {
                        var status = module.hot.status();
                        if ([ "abort", "fail" ].indexOf(status) >= 0) {
                            log("warning", "[HMR] Cannot apply update. Need to do a full reload!");
                            log("warning", "[HMR] " + log.formatError(err));
                            window.location.reload();
                        } else {
                            log("warning", "[HMR] Update failed: " + log.formatError(err));
                        }
                    }));
                };
                var hotEmitter = __webpack_require__(5208);
                hotEmitter.on("webpackHotUpdate", (function(currentHash) {
                    lastHash = currentHash;
                    if (!upToDate() && module.hot.status() === "idle") {
                        log("info", "[HMR] Checking for updates on the server...");
                        check();
                    }
                }));
                log("info", "[HMR] Waiting for update signal from WDS...");
            } else {}
        },
        5208: (module, __unused_webpack_exports, __webpack_require__) => {
            var EventEmitter = __webpack_require__(7187);
            module.exports = new EventEmitter;
        },
        5374: (module, __unused_webpack_exports, __webpack_require__) => {
            module.exports = function(updatedModules, renewedModules) {
                var unacceptedModules = updatedModules.filter((function(moduleId) {
                    return renewedModules && renewedModules.indexOf(moduleId) < 0;
                }));
                var log = __webpack_require__(1919);
                if (unacceptedModules.length > 0) {
                    log("warning", "[HMR] The following modules couldn't be hot updated: (They would need a full reload!)");
                    unacceptedModules.forEach((function(moduleId) {
                        log("warning", "[HMR]  - " + moduleId);
                    }));
                }
                if (!renewedModules || renewedModules.length === 0) {
                    log("info", "[HMR] Nothing hot updated.");
                } else {
                    log("info", "[HMR] Updated modules:");
                    renewedModules.forEach((function(moduleId) {
                        if (typeof moduleId === "string" && moduleId.indexOf("!") !== -1) {
                            var parts = moduleId.split("!");
                            log.groupCollapsed("info", "[HMR]  - " + parts.pop());
                            log("info", "[HMR]  - " + moduleId);
                            log.groupEnd("info");
                        } else {
                            log("info", "[HMR]  - " + moduleId);
                        }
                    }));
                    var numberIds = renewedModules.every((function(moduleId) {
                        return typeof moduleId === "number";
                    }));
                    if (numberIds) log("info", '[HMR] Consider using the optimization.moduleIds: "named" for module names.');
                }
            };
        },
        1919: module => {
            var logLevel = "info";
            function dummy() {}
            function shouldLog(level) {
                var shouldLog = logLevel === "info" && level === "info" || [ "info", "warning" ].indexOf(logLevel) >= 0 && level === "warning" || [ "info", "warning", "error" ].indexOf(logLevel) >= 0 && level === "error";
                return shouldLog;
            }
            function logGroup(logFn) {
                return function(level, msg) {
                    if (shouldLog(level)) {
                        logFn(msg);
                    }
                };
            }
            module.exports = function(level, msg) {
                if (shouldLog(level)) {
                    if (level === "info") {
                        console.log(msg);
                    } else if (level === "warning") {
                        console.warn(msg);
                    } else if (level === "error") {
                        console.error(msg);
                    }
                }
            };
            var group = console.group || dummy;
            var groupCollapsed = console.groupCollapsed || dummy;
            var groupEnd = console.groupEnd || dummy;
            module.exports.group = logGroup(group);
            module.exports.groupCollapsed = logGroup(groupCollapsed);
            module.exports.groupEnd = logGroup(groupEnd);
            module.exports.setLogLevel = function(level) {
                logLevel = level;
            };
            module.exports.formatError = function(err) {
                var message = err.message;
                var stack = err.stack;
                if (!stack) {
                    return message;
                } else if (stack.indexOf(message) < 0) {
                    return message + "\n" + stack;
                } else {
                    return stack;
                }
            };
        }
    };
    var __webpack_module_cache__ = {};
    function __webpack_require__(moduleId) {
        var cachedModule = __webpack_module_cache__[moduleId];
        if (cachedModule !== undefined) {
            if (cachedModule.error !== undefined) throw cachedModule.error;
            return cachedModule.exports;
        }
        var module = __webpack_module_cache__[moduleId] = {
            exports: {}
        };
        try {
            var execOptions = {
                id: moduleId,
                module,
                factory: __webpack_modules__[moduleId],
                require: __webpack_require__
            };
            __webpack_require__.i.forEach((function(handler) {
                handler(execOptions);
            }));
            module = execOptions.module;
            execOptions.factory.call(module.exports, module, module.exports, execOptions.require);
        } catch (e) {
            module.error = e;
            throw e;
        }
        return module.exports;
    }
    __webpack_require__.m = __webpack_modules__;
    __webpack_require__.c = __webpack_module_cache__;
    __webpack_require__.i = [];
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
        __webpack_require__.hu = chunkId => "" + chunkId + "." + __webpack_require__.h() + ".hot-update.js";
    })();
    (() => {
        __webpack_require__.hmrF = () => "auto-close-youtube-ads_user." + __webpack_require__.h() + ".hot-update.json";
    })();
    (() => {
        __webpack_require__.h = () => "92651e0761375d916b05";
    })();
    (() => {
        __webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
    })();
    (() => {
        var inProgress = {};
        var dataWebpackPrefix = "userscripts:";
        __webpack_require__.l = (url, done, key, chunkId) => {
            if (inProgress[url]) {
                inProgress[url].push(done);
                return;
            }
            var script, needAttach;
            if (key !== undefined) {
                var scripts = document.getElementsByTagName("script");
                for (var i = 0; i < scripts.length; i++) {
                    var s = scripts[i];
                    if (s.getAttribute("src") == url || s.getAttribute("data-webpack") == dataWebpackPrefix + key) {
                        script = s;
                        break;
                    }
                }
            }
            if (!script) {
                needAttach = true;
                script = document.createElement("script");
                script.charset = "utf-8";
                script.timeout = 120;
                if (__webpack_require__.nc) {
                    script.setAttribute("nonce", __webpack_require__.nc);
                }
                script.setAttribute("data-webpack", dataWebpackPrefix + key);
                script.src = url;
            }
            inProgress[url] = [ done ];
            var onScriptComplete = (prev, event) => {
                script.onerror = script.onload = null;
                clearTimeout(timeout);
                var doneFns = inProgress[url];
                delete inProgress[url];
                script.parentNode && script.parentNode.removeChild(script);
                doneFns && doneFns.forEach((fn => fn(event)));
                if (prev) return prev(event);
            };
            var timeout = setTimeout(onScriptComplete.bind(null, undefined, {
                type: "timeout",
                target: script
            }), 12e4);
            script.onerror = onScriptComplete.bind(null, script.onerror);
            script.onload = onScriptComplete.bind(null, script.onload);
            needAttach && document.head.appendChild(script);
        };
    })();
    (() => {
        __webpack_require__.r = exports => {
            if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
                Object.defineProperty(exports, Symbol.toStringTag, {
                    value: "Module"
                });
            }
            Object.defineProperty(exports, "__esModule", {
                value: true
            });
        };
    })();
    (() => {
        var currentModuleData = {};
        var installedModules = __webpack_require__.c;
        var currentChildModule;
        var currentParents = [];
        var registeredStatusHandlers = [];
        var currentStatus = "idle";
        var blockingPromises;
        var currentUpdateApplyHandlers;
        var queuedInvalidatedModules;
        __webpack_require__.hmrD = currentModuleData;
        __webpack_require__.i.push((function(options) {
            var module = options.module;
            var require = createRequire(options.require, options.id);
            module.hot = createModuleHotObject(options.id, module);
            module.parents = currentParents;
            module.children = [];
            currentParents = [];
            options.require = require;
        }));
        __webpack_require__.hmrC = {};
        __webpack_require__.hmrI = {};
        function createRequire(require, moduleId) {
            var me = installedModules[moduleId];
            if (!me) return require;
            var fn = function(request) {
                if (me.hot.active) {
                    if (installedModules[request]) {
                        var parents = installedModules[request].parents;
                        if (parents.indexOf(moduleId) === -1) {
                            parents.push(moduleId);
                        }
                    } else {
                        currentParents = [ moduleId ];
                        currentChildModule = request;
                    }
                    if (me.children.indexOf(request) === -1) {
                        me.children.push(request);
                    }
                } else {
                    console.warn("[HMR] unexpected require(" + request + ") from disposed module " + moduleId);
                    currentParents = [];
                }
                return require(request);
            };
            var createPropertyDescriptor = function(name) {
                return {
                    configurable: true,
                    enumerable: true,
                    get: function() {
                        return require[name];
                    },
                    set: function(value) {
                        require[name] = value;
                    }
                };
            };
            for (var name in require) {
                if (Object.prototype.hasOwnProperty.call(require, name) && name !== "e") {
                    Object.defineProperty(fn, name, createPropertyDescriptor(name));
                }
            }
            fn.e = function(chunkId) {
                return trackBlockingPromise(require.e(chunkId));
            };
            return fn;
        }
        function createModuleHotObject(moduleId, me) {
            var _main = currentChildModule !== moduleId;
            var hot = {
                _acceptedDependencies: {},
                _acceptedErrorHandlers: {},
                _declinedDependencies: {},
                _selfAccepted: false,
                _selfDeclined: false,
                _selfInvalidated: false,
                _disposeHandlers: [],
                _main,
                _requireSelf: function() {
                    currentParents = me.parents.slice();
                    currentChildModule = _main ? undefined : moduleId;
                    __webpack_require__(moduleId);
                },
                active: true,
                accept: function(dep, callback, errorHandler) {
                    if (dep === undefined) hot._selfAccepted = true; else if (typeof dep === "function") hot._selfAccepted = dep; else if (typeof dep === "object" && dep !== null) {
                        for (var i = 0; i < dep.length; i++) {
                            hot._acceptedDependencies[dep[i]] = callback || function() {};
                            hot._acceptedErrorHandlers[dep[i]] = errorHandler;
                        }
                    } else {
                        hot._acceptedDependencies[dep] = callback || function() {};
                        hot._acceptedErrorHandlers[dep] = errorHandler;
                    }
                },
                decline: function(dep) {
                    if (dep === undefined) hot._selfDeclined = true; else if (typeof dep === "object" && dep !== null) for (var i = 0; i < dep.length; i++) hot._declinedDependencies[dep[i]] = true; else hot._declinedDependencies[dep] = true;
                },
                dispose: function(callback) {
                    hot._disposeHandlers.push(callback);
                },
                addDisposeHandler: function(callback) {
                    hot._disposeHandlers.push(callback);
                },
                removeDisposeHandler: function(callback) {
                    var idx = hot._disposeHandlers.indexOf(callback);
                    if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
                },
                invalidate: function() {
                    this._selfInvalidated = true;
                    switch (currentStatus) {
                      case "idle":
                        currentUpdateApplyHandlers = [];
                        Object.keys(__webpack_require__.hmrI).forEach((function(key) {
                            __webpack_require__.hmrI[key](moduleId, currentUpdateApplyHandlers);
                        }));
                        setStatus("ready");
                        break;

                      case "ready":
                        Object.keys(__webpack_require__.hmrI).forEach((function(key) {
                            __webpack_require__.hmrI[key](moduleId, currentUpdateApplyHandlers);
                        }));
                        break;

                      case "prepare":
                      case "check":
                      case "dispose":
                      case "apply":
                        (queuedInvalidatedModules = queuedInvalidatedModules || []).push(moduleId);
                        break;

                      default:
                        break;
                    }
                },
                check: hotCheck,
                apply: hotApply,
                status: function(l) {
                    if (!l) return currentStatus;
                    registeredStatusHandlers.push(l);
                },
                addStatusHandler: function(l) {
                    registeredStatusHandlers.push(l);
                },
                removeStatusHandler: function(l) {
                    var idx = registeredStatusHandlers.indexOf(l);
                    if (idx >= 0) registeredStatusHandlers.splice(idx, 1);
                },
                data: currentModuleData[moduleId]
            };
            currentChildModule = undefined;
            return hot;
        }
        function setStatus(newStatus) {
            currentStatus = newStatus;
            var results = [];
            for (var i = 0; i < registeredStatusHandlers.length; i++) results[i] = registeredStatusHandlers[i].call(null, newStatus);
            return Promise.all(results);
        }
        function trackBlockingPromise(promise) {
            switch (currentStatus) {
              case "ready":
                setStatus("prepare");
                blockingPromises.push(promise);
                waitForBlockingPromises((function() {
                    return setStatus("ready");
                }));
                return promise;

              case "prepare":
                blockingPromises.push(promise);
                return promise;

              default:
                return promise;
            }
        }
        function waitForBlockingPromises(fn) {
            if (blockingPromises.length === 0) return fn();
            var blocker = blockingPromises;
            blockingPromises = [];
            return Promise.all(blocker).then((function() {
                return waitForBlockingPromises(fn);
            }));
        }
        function hotCheck(applyOnUpdate) {
            if (currentStatus !== "idle") {
                throw new Error("check() is only allowed in idle status");
            }
            return setStatus("check").then(__webpack_require__.hmrM).then((function(update) {
                if (!update) {
                    return setStatus(applyInvalidatedModules() ? "ready" : "idle").then((function() {
                        return null;
                    }));
                }
                return setStatus("prepare").then((function() {
                    var updatedModules = [];
                    blockingPromises = [];
                    currentUpdateApplyHandlers = [];
                    return Promise.all(Object.keys(__webpack_require__.hmrC).reduce((function(promises, key) {
                        __webpack_require__.hmrC[key](update.c, update.r, update.m, promises, currentUpdateApplyHandlers, updatedModules);
                        return promises;
                    }), [])).then((function() {
                        return waitForBlockingPromises((function() {
                            if (applyOnUpdate) {
                                return internalApply(applyOnUpdate);
                            } else {
                                return setStatus("ready").then((function() {
                                    return updatedModules;
                                }));
                            }
                        }));
                    }));
                }));
            }));
        }
        function hotApply(options) {
            if (currentStatus !== "ready") {
                return Promise.resolve().then((function() {
                    throw new Error("apply() is only allowed in ready status");
                }));
            }
            return internalApply(options);
        }
        function internalApply(options) {
            options = options || {};
            applyInvalidatedModules();
            var results = currentUpdateApplyHandlers.map((function(handler) {
                return handler(options);
            }));
            currentUpdateApplyHandlers = undefined;
            var errors = results.map((function(r) {
                return r.error;
            })).filter(Boolean);
            if (errors.length > 0) {
                return setStatus("abort").then((function() {
                    throw errors[0];
                }));
            }
            var disposePromise = setStatus("dispose");
            results.forEach((function(result) {
                if (result.dispose) result.dispose();
            }));
            var applyPromise = setStatus("apply");
            var error;
            var reportError = function(err) {
                if (!error) error = err;
            };
            var outdatedModules = [];
            results.forEach((function(result) {
                if (result.apply) {
                    var modules = result.apply(reportError);
                    if (modules) {
                        for (var i = 0; i < modules.length; i++) {
                            outdatedModules.push(modules[i]);
                        }
                    }
                }
            }));
            return Promise.all([ disposePromise, applyPromise ]).then((function() {
                if (error) {
                    return setStatus("fail").then((function() {
                        throw error;
                    }));
                }
                if (queuedInvalidatedModules) {
                    return internalApply(options).then((function(list) {
                        outdatedModules.forEach((function(moduleId) {
                            if (list.indexOf(moduleId) < 0) list.push(moduleId);
                        }));
                        return list;
                    }));
                }
                return setStatus("idle").then((function() {
                    return outdatedModules;
                }));
            }));
        }
        function applyInvalidatedModules() {
            if (queuedInvalidatedModules) {
                if (!currentUpdateApplyHandlers) currentUpdateApplyHandlers = [];
                Object.keys(__webpack_require__.hmrI).forEach((function(key) {
                    queuedInvalidatedModules.forEach((function(moduleId) {
                        __webpack_require__.hmrI[key](moduleId, currentUpdateApplyHandlers);
                    }));
                }));
                queuedInvalidatedModules = undefined;
                return true;
            }
        }
    })();
    (() => {
        __webpack_require__.p = "/dist/";
    })();
    (() => {
        var installedChunks = __webpack_require__.hmrS_jsonp = __webpack_require__.hmrS_jsonp || {
            839: 0
        };
        var currentUpdatedModulesList;
        var waitingUpdateResolves = {};
        function loadUpdateChunk(chunkId) {
            return new Promise(((resolve, reject) => {
                waitingUpdateResolves[chunkId] = resolve;
                var url = __webpack_require__.p + __webpack_require__.hu(chunkId);
                var error = new Error;
                var loadingEnded = event => {
                    if (waitingUpdateResolves[chunkId]) {
                        waitingUpdateResolves[chunkId] = undefined;
                        var errorType = event && (event.type === "load" ? "missing" : event.type);
                        var realSrc = event && event.target && event.target.src;
                        error.message = "Loading hot update chunk " + chunkId + " failed.\n(" + errorType + ": " + realSrc + ")";
                        error.name = "ChunkLoadError";
                        error.type = errorType;
                        error.request = realSrc;
                        reject(error);
                    }
                };
                __webpack_require__.l(url, loadingEnded);
            }));
        }
        self["webpackHotUpdateuserscripts"] = (chunkId, moreModules, runtime) => {
            for (var moduleId in moreModules) {
                if (__webpack_require__.o(moreModules, moduleId)) {
                    currentUpdate[moduleId] = moreModules[moduleId];
                    if (currentUpdatedModulesList) currentUpdatedModulesList.push(moduleId);
                }
            }
            if (runtime) currentUpdateRuntime.push(runtime);
            if (waitingUpdateResolves[chunkId]) {
                waitingUpdateResolves[chunkId]();
                waitingUpdateResolves[chunkId] = undefined;
            }
        };
        var currentUpdateChunks;
        var currentUpdate;
        var currentUpdateRemovedChunks;
        var currentUpdateRuntime;
        function applyHandler(options) {
            if (__webpack_require__.f) delete __webpack_require__.f.jsonpHmr;
            currentUpdateChunks = undefined;
            function getAffectedModuleEffects(updateModuleId) {
                var outdatedModules = [ updateModuleId ];
                var outdatedDependencies = {};
                var queue = outdatedModules.map((function(id) {
                    return {
                        chain: [ id ],
                        id
                    };
                }));
                while (queue.length > 0) {
                    var queueItem = queue.pop();
                    var moduleId = queueItem.id;
                    var chain = queueItem.chain;
                    var module = __webpack_require__.c[moduleId];
                    if (!module || module.hot._selfAccepted && !module.hot._selfInvalidated) continue;
                    if (module.hot._selfDeclined) {
                        return {
                            type: "self-declined",
                            chain,
                            moduleId
                        };
                    }
                    if (module.hot._main) {
                        return {
                            type: "unaccepted",
                            chain,
                            moduleId
                        };
                    }
                    for (var i = 0; i < module.parents.length; i++) {
                        var parentId = module.parents[i];
                        var parent = __webpack_require__.c[parentId];
                        if (!parent) continue;
                        if (parent.hot._declinedDependencies[moduleId]) {
                            return {
                                type: "declined",
                                chain: chain.concat([ parentId ]),
                                moduleId,
                                parentId
                            };
                        }
                        if (outdatedModules.indexOf(parentId) !== -1) continue;
                        if (parent.hot._acceptedDependencies[moduleId]) {
                            if (!outdatedDependencies[parentId]) outdatedDependencies[parentId] = [];
                            addAllToSet(outdatedDependencies[parentId], [ moduleId ]);
                            continue;
                        }
                        delete outdatedDependencies[parentId];
                        outdatedModules.push(parentId);
                        queue.push({
                            chain: chain.concat([ parentId ]),
                            id: parentId
                        });
                    }
                }
                return {
                    type: "accepted",
                    moduleId: updateModuleId,
                    outdatedModules,
                    outdatedDependencies
                };
            }
            function addAllToSet(a, b) {
                for (var i = 0; i < b.length; i++) {
                    var item = b[i];
                    if (a.indexOf(item) === -1) a.push(item);
                }
            }
            var outdatedDependencies = {};
            var outdatedModules = [];
            var appliedUpdate = {};
            var warnUnexpectedRequire = function warnUnexpectedRequire(module) {
                console.warn("[HMR] unexpected require(" + module.id + ") to disposed module");
            };
            for (var moduleId in currentUpdate) {
                if (__webpack_require__.o(currentUpdate, moduleId)) {
                    var newModuleFactory = currentUpdate[moduleId];
                    var result;
                    if (newModuleFactory) {
                        result = getAffectedModuleEffects(moduleId);
                    } else {
                        result = {
                            type: "disposed",
                            moduleId
                        };
                    }
                    var abortError = false;
                    var doApply = false;
                    var doDispose = false;
                    var chainInfo = "";
                    if (result.chain) {
                        chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
                    }
                    switch (result.type) {
                      case "self-declined":
                        if (options.onDeclined) options.onDeclined(result);
                        if (!options.ignoreDeclined) abortError = new Error("Aborted because of self decline: " + result.moduleId + chainInfo);
                        break;

                      case "declined":
                        if (options.onDeclined) options.onDeclined(result);
                        if (!options.ignoreDeclined) abortError = new Error("Aborted because of declined dependency: " + result.moduleId + " in " + result.parentId + chainInfo);
                        break;

                      case "unaccepted":
                        if (options.onUnaccepted) options.onUnaccepted(result);
                        if (!options.ignoreUnaccepted) abortError = new Error("Aborted because " + moduleId + " is not accepted" + chainInfo);
                        break;

                      case "accepted":
                        if (options.onAccepted) options.onAccepted(result);
                        doApply = true;
                        break;

                      case "disposed":
                        if (options.onDisposed) options.onDisposed(result);
                        doDispose = true;
                        break;

                      default:
                        throw new Error("Unexception type " + result.type);
                    }
                    if (abortError) {
                        return {
                            error: abortError
                        };
                    }
                    if (doApply) {
                        appliedUpdate[moduleId] = newModuleFactory;
                        addAllToSet(outdatedModules, result.outdatedModules);
                        for (moduleId in result.outdatedDependencies) {
                            if (__webpack_require__.o(result.outdatedDependencies, moduleId)) {
                                if (!outdatedDependencies[moduleId]) outdatedDependencies[moduleId] = [];
                                addAllToSet(outdatedDependencies[moduleId], result.outdatedDependencies[moduleId]);
                            }
                        }
                    }
                    if (doDispose) {
                        addAllToSet(outdatedModules, [ result.moduleId ]);
                        appliedUpdate[moduleId] = warnUnexpectedRequire;
                    }
                }
            }
            currentUpdate = undefined;
            var outdatedSelfAcceptedModules = [];
            for (var j = 0; j < outdatedModules.length; j++) {
                var outdatedModuleId = outdatedModules[j];
                var module = __webpack_require__.c[outdatedModuleId];
                if (module && (module.hot._selfAccepted || module.hot._main) && appliedUpdate[outdatedModuleId] !== warnUnexpectedRequire && !module.hot._selfInvalidated) {
                    outdatedSelfAcceptedModules.push({
                        module: outdatedModuleId,
                        require: module.hot._requireSelf,
                        errorHandler: module.hot._selfAccepted
                    });
                }
            }
            var moduleOutdatedDependencies;
            return {
                dispose: function() {
                    currentUpdateRemovedChunks.forEach((function(chunkId) {
                        delete installedChunks[chunkId];
                    }));
                    currentUpdateRemovedChunks = undefined;
                    var idx;
                    var queue = outdatedModules.slice();
                    while (queue.length > 0) {
                        var moduleId = queue.pop();
                        var module = __webpack_require__.c[moduleId];
                        if (!module) continue;
                        var data = {};
                        var disposeHandlers = module.hot._disposeHandlers;
                        for (j = 0; j < disposeHandlers.length; j++) {
                            disposeHandlers[j].call(null, data);
                        }
                        __webpack_require__.hmrD[moduleId] = data;
                        module.hot.active = false;
                        delete __webpack_require__.c[moduleId];
                        delete outdatedDependencies[moduleId];
                        for (j = 0; j < module.children.length; j++) {
                            var child = __webpack_require__.c[module.children[j]];
                            if (!child) continue;
                            idx = child.parents.indexOf(moduleId);
                            if (idx >= 0) {
                                child.parents.splice(idx, 1);
                            }
                        }
                    }
                    var dependency;
                    for (var outdatedModuleId in outdatedDependencies) {
                        if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
                            module = __webpack_require__.c[outdatedModuleId];
                            if (module) {
                                moduleOutdatedDependencies = outdatedDependencies[outdatedModuleId];
                                for (j = 0; j < moduleOutdatedDependencies.length; j++) {
                                    dependency = moduleOutdatedDependencies[j];
                                    idx = module.children.indexOf(dependency);
                                    if (idx >= 0) module.children.splice(idx, 1);
                                }
                            }
                        }
                    }
                },
                apply: function(reportError) {
                    for (var updateModuleId in appliedUpdate) {
                        if (__webpack_require__.o(appliedUpdate, updateModuleId)) {
                            __webpack_require__.m[updateModuleId] = appliedUpdate[updateModuleId];
                        }
                    }
                    for (var i = 0; i < currentUpdateRuntime.length; i++) {
                        currentUpdateRuntime[i](__webpack_require__);
                    }
                    for (var outdatedModuleId in outdatedDependencies) {
                        if (__webpack_require__.o(outdatedDependencies, outdatedModuleId)) {
                            var module = __webpack_require__.c[outdatedModuleId];
                            if (module) {
                                moduleOutdatedDependencies = outdatedDependencies[outdatedModuleId];
                                var callbacks = [];
                                var errorHandlers = [];
                                var dependenciesForCallbacks = [];
                                for (var j = 0; j < moduleOutdatedDependencies.length; j++) {
                                    var dependency = moduleOutdatedDependencies[j];
                                    var acceptCallback = module.hot._acceptedDependencies[dependency];
                                    var errorHandler = module.hot._acceptedErrorHandlers[dependency];
                                    if (acceptCallback) {
                                        if (callbacks.indexOf(acceptCallback) !== -1) continue;
                                        callbacks.push(acceptCallback);
                                        errorHandlers.push(errorHandler);
                                        dependenciesForCallbacks.push(dependency);
                                    }
                                }
                                for (var k = 0; k < callbacks.length; k++) {
                                    try {
                                        callbacks[k].call(null, moduleOutdatedDependencies);
                                    } catch (err) {
                                        if (typeof errorHandlers[k] === "function") {
                                            try {
                                                errorHandlers[k](err, {
                                                    moduleId: outdatedModuleId,
                                                    dependencyId: dependenciesForCallbacks[k]
                                                });
                                            } catch (err2) {
                                                if (options.onErrored) {
                                                    options.onErrored({
                                                        type: "accept-error-handler-errored",
                                                        moduleId: outdatedModuleId,
                                                        dependencyId: dependenciesForCallbacks[k],
                                                        error: err2,
                                                        originalError: err
                                                    });
                                                }
                                                if (!options.ignoreErrored) {
                                                    reportError(err2);
                                                    reportError(err);
                                                }
                                            }
                                        } else {
                                            if (options.onErrored) {
                                                options.onErrored({
                                                    type: "accept-errored",
                                                    moduleId: outdatedModuleId,
                                                    dependencyId: dependenciesForCallbacks[k],
                                                    error: err
                                                });
                                            }
                                            if (!options.ignoreErrored) {
                                                reportError(err);
                                            }
                                        }
                                    }
                                }
                            }
                        }
                    }
                    for (var o = 0; o < outdatedSelfAcceptedModules.length; o++) {
                        var item = outdatedSelfAcceptedModules[o];
                        var moduleId = item.module;
                        try {
                            item.require(moduleId);
                        } catch (err) {
                            if (typeof item.errorHandler === "function") {
                                try {
                                    item.errorHandler(err, {
                                        moduleId,
                                        module: __webpack_require__.c[moduleId]
                                    });
                                } catch (err2) {
                                    if (options.onErrored) {
                                        options.onErrored({
                                            type: "self-accept-error-handler-errored",
                                            moduleId,
                                            error: err2,
                                            originalError: err
                                        });
                                    }
                                    if (!options.ignoreErrored) {
                                        reportError(err2);
                                        reportError(err);
                                    }
                                }
                            } else {
                                if (options.onErrored) {
                                    options.onErrored({
                                        type: "self-accept-errored",
                                        moduleId,
                                        error: err
                                    });
                                }
                                if (!options.ignoreErrored) {
                                    reportError(err);
                                }
                            }
                        }
                    }
                    return outdatedModules;
                }
            };
        }
        __webpack_require__.hmrI.jsonp = function(moduleId, applyHandlers) {
            if (!currentUpdate) {
                currentUpdate = {};
                currentUpdateRuntime = [];
                currentUpdateRemovedChunks = [];
                applyHandlers.push(applyHandler);
            }
            if (!__webpack_require__.o(currentUpdate, moduleId)) {
                currentUpdate[moduleId] = __webpack_require__.m[moduleId];
            }
        };
        __webpack_require__.hmrC.jsonp = function(chunkIds, removedChunks, removedModules, promises, applyHandlers, updatedModulesList) {
            applyHandlers.push(applyHandler);
            currentUpdateChunks = {};
            currentUpdateRemovedChunks = removedChunks;
            currentUpdate = removedModules.reduce((function(obj, key) {
                obj[key] = false;
                return obj;
            }), {});
            currentUpdateRuntime = [];
            chunkIds.forEach((function(chunkId) {
                if (__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId] !== undefined) {
                    promises.push(loadUpdateChunk(chunkId, updatedModulesList));
                    currentUpdateChunks[chunkId] = true;
                }
            }));
            if (__webpack_require__.f) {
                __webpack_require__.f.jsonpHmr = function(chunkId, promises) {
                    if (currentUpdateChunks && !__webpack_require__.o(currentUpdateChunks, chunkId) && __webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId] !== undefined) {
                        promises.push(loadUpdateChunk(chunkId));
                        currentUpdateChunks[chunkId] = true;
                    }
                };
            }
        };
        __webpack_require__.hmrM = () => {
            if (typeof fetch === "undefined") throw new Error("No browser support: need fetch API");
            return fetch(__webpack_require__.p + __webpack_require__.hmrF()).then((response => {
                if (response.status === 404) return;
                if (!response.ok) throw new Error("Failed to fetch update manifest " + response.statusText);
                return response.json();
            }));
        };
    })();
    __webpack_require__(8174);
    __webpack_require__(6952);
    var __webpack_exports__ = __webpack_require__(1725);
})();