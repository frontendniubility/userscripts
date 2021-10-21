const path = require("path");
const glob = require("glob");
///---------
// const logger = require("./log").loggers.get("webpack");

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
