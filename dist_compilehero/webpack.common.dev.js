"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var extend = require('extend');

var fs = require('fs');

var path = require('path');

var glob = require('glob'); ///---------


var logger = require('./log').loggers.get('webpack');

var getPaddedComp = function getPaddedComp(comp) {
  var len = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 2;
  if (len < 1) len = 1;
  comp = '' + comp;
  var paddedLen = len - ('' + comp).length;

  if (paddedLen > 0) {
    return [].concat(_toConsumableArray(Array(paddedLen).fill('0')), _toConsumableArray(comp)).join('');
  } else return comp;
},
    o = {
  '[y|Y]{4}':
  /**@param{Date}date*/
  function yY4(date) {
    return date.getFullYear();
  },
  // year
  '[y|Y]{2}':
  /**@param{Date}date*/
  function yY2(date) {
    return date.getFullYear().toString().slice(2);
  },
  // year
  MM:
  /**@param{Date}date*/
  function MM(date) {
    return getPaddedComp(date.getMonth() + 1);
  },
  //month
  M:
  /**@param{Date}date*/
  function M(date) {
    return date.getMonth() + 1;
  },
  //month
  '[d|D]{2}':
  /**@param{Date}date*/
  function dD2(date) {
    return getPaddedComp(date.getDate());
  },
  //day
  '[d|D]{1}':
  /**@param{Date}date*/
  function dD1(date) {
    return date.getDate();
  },
  //day
  'h{2}':
  /**@param{Date}date*/
  function h2(date) {
    return getPaddedComp(date.getHours() > 12 ? date.getHours() % 12 : date.getHours());
  },
  //hour
  'h{1}':
  /**@param{Date}date*/
  function h1(date) {
    return date.getHours() > 12 ? date.getHours() % 12 : date.getHours();
  },
  //hour
  'H{2}':
  /**@param{Date}date*/
  function H2(date) {
    return getPaddedComp(date.getHours());
  },
  //hour
  'H{1}':
  /**@param{Date}date*/
  function H1(date) {
    return date.getHours();
  },
  //hour
  'm{2}':
  /**@param{Date}date*/
  function m2(date) {
    return getPaddedComp(date.getMinutes());
  },
  //minute
  'm{1}':
  /**@param{Date}date*/
  function m1(date) {
    return date.getMinutes();
  },
  //minute
  's+':
  /**@param{Date}date*/
  function s(date) {
    return getPaddedComp(date.getSeconds());
  },
  //second
  'f+':
  /**@param{Date}date*/
  function f(date) {
    return getPaddedComp(date.getMilliseconds(), 3);
  },
  //millisecond,
  'f{1}':
  /**@param{Date}date*/
  function f1(date) {
    return getPaddedComp(date.getMilliseconds(), 0);
  },
  //millisecond,
  'b+':
  /**@param{Date}date*/
  function b(date) {
    return date.getHours() >= 12 ? 'PM' : 'AM';
  }
};

Date.prototype._oldtostr = Date.prototype.toString;
extend(Date.prototype, {
  toString: function toString(format) {
    if (!format) return this._oldtostr();
    var formattedDate = format;

    for (var k in o) {
      if (new RegExp('(' + k + ')').test(format)) {
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

  return args.forEach(function (item, index, all) {
    if (_typeof(item) == 'object') {
      logger.debug(JSON.stringify(item));
    } else {
      logger.debug(item);
    }
  });
};

var stringIncludesAny = function stringIncludesAny(s) {
  for (var _len2 = arguments.length, arr = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {
    arr[_key2 - 1] = arguments[_key2];
  }

  return new RegExp(arr.join('|')).test(s);
};

var entries = glob.sync('./src/*/*.@(user.js|user.es6|user.mjs|user.cjs|user.ts)').filter(function (current, index, all) {
  return stringIncludesAny(current, 'test.user.es6');
}).reduce(function (entries, fullpath) {
  entries[path.parse(fullpath).name] = fullpath;
  return entries;
}, {});
module.exports = {
  entries: entries,
  p: p,
  stringIncludesAny: stringIncludesAny
};