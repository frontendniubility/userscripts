const extend = require("extend");
const fs = require('fs')


let parseMeta = script =>
  script
  .slice(script.indexOf('==UserScript=='), script.indexOf('==/UserScript=='))
  .split('\n')
  .map(line => line.match(/^\s*[\/]{2,}\s*@(\S+)\s+(.+)/i))
  .filter(match => !!match)
  .reduce((result, [, key, value]) => {
    if (Object.keys(result).includes(key)) {
      if (Array.isArray(result[key])) {
        result[key].push(value)
      } else {
        result[key] = [result[key], value]
      }
    } else {
      result[key] = value
    }
    return result
  }, {})
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
const typmap = {
  dev: 1,
  alpha: 2,
  beta: 3,
  pro: 5,
  u1: 6,
  u2: 7
}

function a(buildtime, buildtypes) {
  if (!typmap[buildtypes])
    throw new Error(`build version type err:${buildtypes}`)
  if (typeof buildtime != 'Date')
    buildtime = new Date(buildtime)
  return `${buildtime.toString('yyyy.M')}.${typmap[buildtypes]}${buildtime.toString('DDhhmmss')}`;
}
module.exports = {
  getVersionString: a,
  parseMeta,
  p,
  stringIncludesAny
}