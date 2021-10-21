const extend = require("extend");

const path = require("path");
const glob = require("glob");
///---------
// const logger = require("./log").loggers.get("webpack");

const { formatters } = require("./libs/dateFormat.cjs");

Date.prototype._oldtostr = Date.prototype.toString;
extend(Date.prototype, {
	toString: function (format) {
		if (!format) return this._oldtostr();
		let formattedDate = format;
		for (let k in formatters) {
			if (new RegExp("(" + k + ")").test(format)) {
				formattedDate = formattedDate.replace(RegExp.$1, formatters[k](this));
			}
		}
		return formattedDate;
	},
});

let stringIncludesAny = function (s, ...arr) {
	return new RegExp(arr.join("|")).test(s);
};

let entries = glob
	.sync("./src/*/*.@(user.js|user.es6|user.mjs|user.cjs|user.ts)")
	// .filter((current, index, all) => stringIncludesAny(current, 'test.user.es6'))
	.reduce((pre, fullpath) => {
		pre[path.parse(fullpath).name] = fullpath;
		return pre;
	}, {});

module.exports = {
	entries,

	stringIncludesAny,
};
