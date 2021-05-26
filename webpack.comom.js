const extend = require("extend");
const fs = require('fs')
const path = require('path')
const glob = require('glob')
const {
  createLogger,
  format,
  transports
} = require('winston');
const {
  combine,
  timestamp,
  label,
  prettyPrint
} = format;


let getPaddedComp = (comp, len = 2) => {
    if (len < 1) len = 1;
    comp = "" + comp;
    let paddedLen = len - ("" + comp).length;
    if (paddedLen > 0) {
      return [...Array(paddedLen).fill("0"), ...comp].join("");
    } else return comp;
  },
  o = {
    "[y|Y]{4}": (date) => date.getFullYear(), // year
    "[y|Y]{2}": (date) => date.getFullYear().toString().slice(2), // year
    MM: (date) => getPaddedComp(date.getMonth() + 1), //month
    M: (date) => date.getMonth() + 1, //month
    "[d|D]{2}": (date) => getPaddedComp(date.getDate()), //day
    "[d|D]{1}": (date) => date.getDate(), //day
    "h{2}": (date) => getPaddedComp(date.getHours() > 12 ? date.getHours() % 12 : date.getHours()), //hour
    "h{1}": (date) => (date.getHours() > 12 ? date.getHours() % 12 : date.getHours()), //hour
    "H{2}": (date) => getPaddedComp(date.getHours()), //hour
    "H{1}": (date) => date.getHours(), //hour
    "m{2}": (date) => getPaddedComp(date.getMinutes()), //minute
    "m{1}": (date) => date.getMinutes(), //minute
    "s+": (date) => getPaddedComp(date.getSeconds()), //second
    "f+": (date) => getPaddedComp(date.getMilliseconds(), 3), //millisecond,
    "f{1}": (date) => getPaddedComp(date.getMilliseconds(), 0), //millisecond,
    "b+": (date) => (date.getHours() >= 12 ? "PM" : "AM"),
  };
Date.prototype._oldtostr = Date.prototype.toString;
extend(Date.prototype, {
  toString: function (format) {
    if (!format) return this._oldtostr();
    let formattedDate = format;
    for (let k in o) {
      if (new RegExp("(" + k + ")").test(format)) {
        if (!formattedDate) {
          p({
            formattedDate,
            $: RegExp.$1,
            OK: o[k](this),
            o
          })
        }
        formattedDate = formattedDate.replace(RegExp.$1, o[k](this));
      }
    }
    return formattedDate;
  },
});

const p = (...args) => args.forEach((arg, index, all) => console.log(arg))

let stringIncludesAny = function (s, ...arr) {

  return new RegExp(arr.join('|')).test(s);
}

let entries = glob
  .sync(path.resolve('./src/*/*.@(user.js|user.es6|user.mjs|user.cjs|user.ts)'))
  //  .filter((current, index, all) => stringIncludesAny(current, 'findteacher', 'test'))
  .reduce((entries, fullpath) => {
    entries[path.parse(fullpath).name] = fullpath;
    return entries;
  }, {});

const log = createLogger({
  level: 'silly',
  format: format.combine(
    format.timestamp({
      format: 'YYYYMMDD HHmmss.SSS'
    }),
    // utilFormatter(), // <-- this is what changed
    format.colorize(),
    format.printf(({
      level,
      message,
      label,
      timestamp
    }) => `${timestamp} ${label || '-'} ${level}: ${message}`),
  ),
  transports: [
    new transports.Stream({
      stream: process.stderr,

    })
  ],
});


module.exports = {
  entries,
  p,
  stringIncludesAny,
  log
}