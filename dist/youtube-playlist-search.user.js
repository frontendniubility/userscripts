// ==UserScript==
// @name        YouTube Playlist Search
// @version     2023.1005.5024000
// @description Allows you to quickly search through youtube playlists
// @homepage    https://gitee.com/tsharp/userscripts#readme
// @supportURL  https://gitee.com/tsharp/userscripts/issues
// @match       https://www.youtube.com/*
// @namespace   http://www.fuzetsu.com/YPS
// @require     https://cdn.rawgit.com/fuzetsu/userscripts/477063e939b9658b64d2f91878da20a7f831d98b/wait-for-elements/wait-for-elements.js
// @copyright   2014+, fuzetsu
// @grant       none
// @downloadURL https://gitee.com/tsharp/userscripts/raw/master/dist/youtube-playlist-search.user.js
// @updateURL   https://gitee.com/tsharp/userscripts/raw/master/dist/youtube-playlist-search.meta.js
// ==/UserScript==

/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
// ==UserScript==
// @name         YouTube Playlist Search
// @namespace    http://www.fuzetsu.com/YPS
// @version      1.1.3
// @description  Allows you to quickly search through youtube playlists
// @match        https://www.youtube.com/*
// @require      https://cdn.rawgit.com/fuzetsu/userscripts/477063e939b9658b64d2f91878da20a7f831d98b/wait-for-elements/wait-for-elements.js
// @copyright    2014+, fuzetsu
// @grant        none
// ==/UserScript==
var SCRIPT_NAME = 'YouTube Playlist Search',
  ITEM_SELECTOR = '#contents > ytd-playlist-video-renderer,ytd-grid-video-renderer',
  ITEM_PROGRESS_SELECTOR = ITEM_SELECTOR + ' #progress',
  TEXT_SELECTOR = '#meta',
  OFFSET_AREA_SELECTOR = '#masthead-container',
  util = {
    log: function log() {
      for (var _console, _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }
      return (_console = console).log.apply(_console, ["%c".concat(SCRIPT_NAME), 'font-weight: bold;color: hotpink;'].concat(args));
    },
    q: function q(query, context) {
      return (context || document).querySelector(query);
    },
    qq: function qq(query, context) {
      return Array.from((context || document).querySelectorAll(query));
    },
    debounce: function debounce(cb, ms) {
      var id;
      return function () {
        for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
          args[_key2] = arguments[_key2];
        }
        clearTimeout(id);
        id = setTimeout(function () {
          return cb.apply(void 0, args);
        }, ms);
      };
    },
    makeElem: function makeElem(tag, attrs) {
      var elem = document.createElement(tag);
      Object.entries(attrs).forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 2),
          attr = _ref2[0],
          val = _ref2[1];
        return !['style'].includes(attr) && attr in elem ? elem[attr] = val : elem.setAttribute(attr, val);
      });
      return elem;
    }
  },
  yps = {
    _items: [],
    hideWatched: false,
    render: function render() {
      var commonStyles = ['position: fixed', "top: ".concat(util.q(OFFSET_AREA_SELECTOR).clientHeight, "px"), 'z-index: 9000', 'padding: 5px 8px', 'border: 1px solid #999', 'font-size: medium', 'color: var(--yt-primary-text-color)', 'margin: 0', 'box-sizing: border-box', 'background: var(--yt-main-app-background-tmp)'],
        txtSearch = util.makeElem('input', {
          type: 'text',
          placeholder: 'filter - start with ^ for inverse search',
          style: [].concat(commonStyles, ['right: 0', 'width: 300px']).join(';'),
          onkeyup: util.debounce(function (e) {
            var _resultCount;
            return (_resultCount = resultCount).render.apply(_resultCount, _toConsumableArray(yps.search(e.target.value)));
          }, 200)
        }),
        resultCount = util.makeElem('span', {
          style: [].concat(commonStyles, ['right: 300px']).join(';'),
          textContent: '-'
        });
      resultCount.render = function (x, y, invert) {
        return resultCount.childNodes[0].textContent = "Showing ".concat(x, " of ").concat(y, " ").concat(invert ? '(NOT)' : '', " | Hide Watched ");
      };
      var toggleWatched = util.makeElem('input', {
        type: 'checkbox',
        value: yps.hideWatched,
        onchange: function onchange() {
          var _resultCount2;
          return yps.hideWatched = toggleWatched.checked, (_resultCount2 = resultCount).render.apply(_resultCount2, _toConsumableArray(yps.search(txtSearch.value)));
        }
      });
      resultCount.appendChild(toggleWatched);
      [txtSearch, resultCount].forEach(function (elem) {
        return document.body.appendChild(elem);
      });
      return {
        txtSearch: txtSearch,
        resultCount: resultCount
      };
    },
    search: function search() {
      var query = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '',
        invert = query.startsWith('^');
      if (invert) query = query.slice(1);
      query = query.toLowerCase().trim().split(' ').map(function (q) {
        return q.trim();
      }).filter(function (q) {
        return !!q;
      });
      var count = yps._items.map(function (item) {
        var hideBecauseWatched = yps.hideWatched && item.watched;
        var hide = hideBecauseWatched || !query[invert ? 'some' : 'every'](function (q) {
          return item.name.includes(q);
        });
        if (invert && !hideBecauseWatched) hide = !hide;
        item.elem.style.display = hide ? 'none' : '';
        return hide;
      }).filter(function (hide) {
        return !hide;
      }).length;
      return [count, yps._items.length, invert];
    },
    start: function start() {
      util.log('Starting... waiting for playlist');
      waitForUrl(/^https:\/\/www\.youtube\.com\/(playlist\?list=|(user|channel)\/[^\/]+\/videos|feed\/subscriptions).*/, function () {
        util.log('Reached playlist, adding search box');
        var playlistUrl = location.href,
          _yps$render = yps.render(),
          txtSearch = _yps$render.txtSearch,
          resultCount = _yps$render.resultCount,
          refresh = util.debounce(function () {
            return resultCount.render.apply(resultCount, _toConsumableArray(yps.search(txtSearch.value)));
          }, 50),
          itemWait = waitForElems({
            sel: ITEM_SELECTOR,
            onmatch: function onmatch(elem) {
              yps._items.push({
                elem: elem,
                name: util.q(TEXT_SELECTOR, elem).textContent.toLowerCase(),
                watched: false
              });
              refresh();
            }
          }),
          progressWait = waitForElems({
            sel: ITEM_PROGRESS_SELECTOR,
            onmatch: function onmatch(prog) {
              var watched = parseInt(prog.style.width) > 50;
              if (!watched) return;
              var itemElem = prog.closest(ITEM_SELECTOR),
                found = yps._items.find(function (item) {
                  return item.elem === itemElem;
                });
              if (!found) return console.log('error, unable to find item parent', prog, itemElem, found);
              found.watched = watched;
              if (yps.hideWatched && watched) refresh();
            }
          }),
          urlWaitId = waitForUrl(function (url) {
            return url !== playlistUrl;
          }, function () {
            util.log('leaving playlist, cleaning up');
            [progressWait, itemWait, urlWaitId].forEach(function (wait) {
              return wait.stop && wait.stop() || clearInterval(wait);
            });
            [txtSearch, resultCount].forEach(function (elem) {
              return elem.remove();
            });
            yps._items = [];
          }, true);
      });
    }
  };
yps.start();
/******/ })()
;
//# sourceMappingURL=youtube-playlist-search.user.js.map