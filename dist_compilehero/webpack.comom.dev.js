"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var extend = require("extend");

var fs = require('fs');

var parseMeta = function parseMeta(script) {
  return script.slice(script.indexOf('==UserScript=='), script.indexOf('==/UserScript==')).split('\n').map(function (line) {
    return line.match(/^\s*[\/]{2,}\s*@(\S+)\s+(.+)/i);
  }).filter(function (match) {
    return !!match;
  }).reduce(function (result, _ref) {
    var _ref2 = _slicedToArray(_ref, 3),
        key = _ref2[1],
        value = _ref2[2];

    if (Object.keys(result).includes(key)) {
      if (Array.isArray(result[key])) {
        result[key].push(value);
      } else {
        result[key] = [result[key], value];
      }
    } else {
      result[key] = value;
    }

    return result;
  }, {});
};

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

Date.prototype._oldtostr = Date.prototype.toString;
extend(Date.prototype, {
  toString: function toString(format) {
    if (!format) return this._oldtostr();
    var formattedDate = format;

    for (var k in o) {
      if (new RegExp("(" + k + ")").test(format)) {
        if (!formattedDate) {
          p({
            formattedDate: formattedDate,
            $: RegExp.$1,
            OK: o[k](this),
            o: o
          });
        }

        formattedDate = formattedDate.replace(RegExp.$1, o[k](this));
      }
    }

    return formattedDate;
  }
});

var p = function p() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return args.forEach(function (arg, index, all) {
    return console.log(arg);
  });
};

var stringIncludesAny = function stringIncludesAny(s) {
  for (var _len2 = arguments.length, arr = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    arr[_key2 - 1] = arguments[_key2];
  }

  return new RegExp(arr.join('|')).test(s);
};

function a(buildtime) {
  p(buildtime);
  if (typeof buildtime != 'Date') buildtime = new Date(buildtime);
  return "".concat(buildtime.toString('yyyy.M'), ".").concat(buildtime.toString('1DDhhmmss'));
}

module.exports = {
  getVersionString: a,
  parseMeta: parseMeta,
  p: p,
  stringIncludesAny: stringIncludesAny
};