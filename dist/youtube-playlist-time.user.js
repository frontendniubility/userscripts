// ==UserScript==
// @name        YouTube Playlist Time
// @version     2022.12.529171553
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

(() => {
    var __webpack_exports__ = {};
    var SCRIPT_NAME = "YouTube Playlist Time", HOLDER_SELECTOR = "#stats", TIMESTAMP_SELECTOR = "ytd-browse:not([hidden]) .ytd-thumbnail-overlay-time-status-renderer", EL_ID = "us-total-time", EL_TYPE = "yt-formatted-string", EL_CLASS = "style-scope ytd-playlist-sidebar-primary-info-renderer", util = {
        log: function log() {
            var args = [].slice.call(arguments);
            args.unshift("%c" + SCRIPT_NAME + ":", "font-weight: bold;color: #233c7b;");
            console.log.apply(console, args);
        },
        q: function q(query, context) {
            return (context || document).querySelector(query);
        },
        qq: function qq(query, context) {
            return [].slice.call((context || document).querySelectorAll(query));
        },
        bindEvt: function bindEvt(target, events) {
            events.forEach((function(evt) {
                target.addEventListener(evt[0], evt[1]);
            }));
        },
        unbindEvt: function unbindEvt(target, events) {
            events.forEach((function(evt) {
                target.removeEventListener(evt[0], evt[1]);
            }));
        },
        throttle: function throttle(callback, limit) {
            var wait = false;
            return function() {
                if (!wait) {
                    callback.apply(this, arguments);
                    wait = true;
                    setTimeout((function() {
                        wait = false;
                    }), limit);
                }
            };
        }
    }, calcTimeString = function calcTimeString(str) {
        return str.split(":").reverse().reduce((function(last, cur, idx) {
            cur = parseInt(cur, 10);
            switch (idx) {
              case 0:
                return last + cur;

              case 1:
                return last + cur * 60;

              case 2:
                return last + cur * 60 * 60;

              default:
                return 0;
            }
        }), 0);
    }, padTime = function padTime(time) {
        return ("0" + time).slice(-2);
    }, setTime = function setTime(seconds) {
        var loc = getTimeLoc(), hours = Math.floor(seconds / 60 / 60);
        seconds = seconds % (60 * 60);
        var minutes = Math.floor(seconds / 60);
        seconds = seconds % 60;
        loc.innerHTML = (((hours || "") && hours + " hours ") + ((minutes || "") && minutes + " minutes ") + ((seconds || "") && seconds + " seconds")).trim();
    }, getTimeLoc = function getTimeLoc() {
        var loc = util.q("#" + EL_ID);
        if (!loc) {
            loc = util.q(HOLDER_SELECTOR).appendChild(document.createElement(EL_TYPE));
            loc.id = EL_ID;
            loc.className = EL_CLASS;
        }
        return loc;
    }, timeLocExists = function timeLocExists() {
        return !!util.q("#" + EL_ID);
    }, lastLength = 0, calcTotalTime = function calcTotalTime(force) {
        var timestamps = util.qq(TIMESTAMP_SELECTOR);
        if (!force && timestamps.length === lastLength && timeLocExists()) return;
        lastLength = timestamps.length;
        var totalSeconds = timestamps.reduce((function(total, ts) {
            return total + calcTimeString(ts.textContent.trim());
        }), 0);
        setTime(totalSeconds);
    }, events = [ [ "mousemove", util.throttle(calcTotalTime.bind(null, false), 500) ] ];
    util.log("Started, waiting for playlist");
    waitForUrl(/^https:\/\/www\.youtube\.com\/playlist\?list=.+/, (function() {
        var playlistUrl = location.href, urlWaitId, oid, seconds = 0;
        util.log("Reached playlist, waiting for display area to load");
        waitForElems({
            sel: HOLDER_SELECTOR,
            stop: true,
            onmatch: function onmatch(holder) {
                clearTimeout(oid);
                util.log("display area loaded, calculating time.");
                oid = setTimeout((function() {
                    util.bindEvt(window, events);
                    calcTotalTime(true);
                    urlWaitId = waitForUrl((function(url) {
                        return url !== playlistUrl;
                    }), (function() {
                        util.log("Leaving playlist, removing listeners");
                        util.unbindEvt(window, events);
                        var loc = getTimeLoc();
                        if (loc) loc.remove();
                    }), true);
                }), 500);
            }
        });
    }));
})();
//# sourceMappingURL=youtube-playlist-time.user.js.map