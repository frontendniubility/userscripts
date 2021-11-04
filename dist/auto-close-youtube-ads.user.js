// ==UserScript==
// @name        Auto Close YouTube Ads
// @version     2021.11.5041055
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
    var __webpack_exports__ = {};
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
})();
//# sourceMappingURL=auto-close-youtube-ads.user.js.map