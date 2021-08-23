const extend = require('extend');

const path = require('path');
const glob = require('glob');
///---------
const logger = require('./log').loggers.get('webpack');

let getPaddedComp = (comp, len = 2) => {
		if (len < 1) len = 1;
		comp = '' + comp;
		let paddedLen = len - ('' + comp).length;
		if (paddedLen > 0) {
			return [...Array(paddedLen).fill('0'), ...comp].join('');
		} else return comp;
	},
	o = {
		'[y|Y]{4}': /**@param{Date}date*/ date => date.getFullYear(), // year
		'[y|Y]{2}': /**@param{Date}date*/ date => date.getFullYear().toString().slice(2), // year
		MM: /**@param{Date}date*/ date => getPaddedComp(date.getMonth() + 1), //month
		M: /**@param{Date}date*/ date => date.getMonth() + 1, //month
		'[d|D]{2}': /**@param{Date}date*/ date => getPaddedComp(date.getDate()), //day
		'[d|D]{1}': /**@param{Date}date*/ date => date.getDate(), //day
		'h{2}': /**@param{Date}date*/ date => getPaddedComp(date.getHours() > 12 ? date.getHours() % 12 : date.getHours()), //hour
		'h{1}': /**@param{Date}date*/ date => (date.getHours() > 12 ? date.getHours() % 12 : date.getHours()), //hour
		'H{2}': /**@param{Date}date*/ date => getPaddedComp(date.getHours()), //hour
		'H{1}': /**@param{Date}date*/ date => date.getHours(), //hour
		'm{2}': /**@param{Date}date*/ date => getPaddedComp(date.getMinutes()), //minute
		'm{1}': /**@param{Date}date*/ date => date.getMinutes(), //minute
		's+': /**@param{Date}date*/ date => getPaddedComp(date.getSeconds()), //second
		'f+': /**@param{Date}date*/ date => getPaddedComp(date.getMilliseconds(), 3), //millisecond,
		'f{1}': /**@param{Date}date*/ date => getPaddedComp(date.getMilliseconds(), 0), //millisecond,
		'b+': /**@param{Date}date*/ date => (date.getHours() >= 12 ? 'PM' : 'AM'),
	};
Date.prototype._oldtostr = Date.prototype.toString;
extend(Date.prototype, {
	toString: function (format) {
		if (!format) return this._oldtostr();
		let formattedDate = format;
		for (let k in o) {
			if (new RegExp('(' + k + ')').test(format)) {
				formattedDate = formattedDate.replace(RegExp.$1, o[k](this));
			}
		}
		return formattedDate;
	},
});

const p = (...args) =>
	args.forEach((item, index, all) => {
		if (typeof item == 'object') {
			logger.debug(JSON.stringify(item));
		} else {
			logger.debug(item);
		}
	});

let stringIncludesAny = function (s, ...arr) {
	return new RegExp(arr.join('|')).test(s);
};

let entries = glob
	.sync('./src/*/*.@(user.js|user.es6|user.mjs|user.cjs|user.ts)')
	// .filter((current, index, all) => stringIncludesAny(current, 'test.user.es6'))
	.reduce((pre, fullpath) => {
		pre[path.parse(fullpath).name] = fullpath;
		return pre;
	}, {});

module.exports = {
    entries,
    p,
    stringIncludesAny,
};
