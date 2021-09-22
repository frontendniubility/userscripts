const path = require("path");

const fs = require("fs");
const extend = require("extend");
const WebpackUserscript = require("./libs/webpackuserscript");
// const webpacktestplugin = require("./libs/webpackhookstest");

const { JsonDB } = require("node-json-db");
const { Config } = require("node-json-db/dist/lib/JsonDBConfig");

const db = new JsonDB(new Config("versioncache.json", true, true, "/"));

const logger = require("./log").loggers.get("webpack");
const { entries } = require("./webpack.common.entries");

let parseMeta = script =>
	script
		.slice(script.indexOf("==UserScript=="), script.indexOf("==/UserScript=="))
		.split("\n")
		.map(line => line.match(/^\s*[/]{2,}\s*@(\S+)\s+(.+)/i))
		.filter(match => !!match)
		.reduce((result, [, key, value]) => {
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

/**
 * return a version string by date
 * @param  {  number | Date} buildtime
 * @returns
 */
function getVersionString(buildtime) {
	if (typeof buildtime != Date) buildtime = new Date(buildtime);
	return `${buildtime.toString("yyyy.M")}.5${buildtime.toString("DDHHmmss")}`;
}

let wpus = new WebpackUserscript({
	headers: function (data) {
		let origionpath = entries[data.chunkName];
		if (!fs.existsSync(origionpath)) {
			return {};
		} else {
			let headers = parseMeta(fs.readFileSync(origionpath, "utf8"));
			var versionKeyPath = "/" + path.relative(__dirname, origionpath).replaceAll("\\", "/");

			var hash = data.chunkHash;

			// 编译状态下（开发模式或者生产模式）
			let newverstring = getVersionString(data.buildTime);

			var newheader = {
				version: newverstring,
			};

			try {
				let savedVersions = db.getData(versionKeyPath) || {};
				let savedVer = savedVersions[hash];
				if (savedVer) {
					// 存在此hashs
					return extend(true, {}, headers, {
						version: savedVer,
					});
				} else {
					//hash不存在
					//keep  需要读取上次hash的版本，以及判断如果没有设置版本号，则需要生成
					var newsavedvers = Object.entries(savedVersions).reduce(
						(pre, [key, val], i) => {
							if (i < 5) pre[key] = val;
							return pre;
						},
						{
							[hash]: newverstring,
						},
					);
					logger.debug("hash不存在 newsavedvers：" + JSON.stringify(newsavedvers));
					// fs.writeFileSync(versionpath, JSON.stringify(newsavedvers), "utf8");
					db.push(versionKeyPath, newsavedvers, false);
					return extend(true, {}, headers, newheader);
				}
			} catch (e) {
				logger.info("此消息在第一次编译时出现，如果一直出现请，检查文件versioncache.json");

				let curVersionJson = {
					[hash]: newverstring,
				};
				db.push(versionKeyPath, curVersionJson, false);
				return extend(true, {}, headers, newheader);
			}
		}
	},
	pretty: true,
	metajs: true,
	updateBaseUrl: "https://raw.githubusercontent.com/niubilityfrontend/userscripts/master/dist/",
	// proxyScript: {
	//   baseUrl: 'https://raw.githubusercontent.com/niubilityfrontend/userscripts/master/dist/',
	//   filename: '[chunkName].js',
	//   enable: false
	// },
});

module.exports = {
	plugins: [wpus /* , new webpacktestplugin() */],
	// t: new webpacktestplugin(),
};
