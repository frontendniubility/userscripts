const path = require("path");

const fs = require("fs");
const extend = require("extend");
const WebpackUserscript = require("./libs/webpackuserscript");
const webpacktestplugin = require("./libs/webpackhookstest");

const logger = require("./log").loggers.get("webpack");
const { entries } = require("./webpack.common");

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
			logger.error(data);
			logger.error(`--${data.chunkName}  --              
    END-------------------------
    `);
			return {};
		} else {
			let header = parseMeta(fs.readFileSync(origionpath, "utf8"));
			var versionpath = path.resolve(path.parse(origionpath).dir, data.chunkName + ".version.json");
			var hash = data.chunkHash;

			// 编译状态下（开发模式或者生产模式）
			let newverstring = getVersionString(data.buildTime);

			var newheader = {
				version: newverstring,
			};

			try {
				let savedVersions = JSON.parse(fs.readFileSync(versionpath, "utf8"));
				let savedVer = savedVersions[hash];
				if (savedVer) {
					// 存在此hashs
					return extend(true, {}, header, {
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
					fs.writeFileSync(versionpath, JSON.stringify(newsavedvers), "utf8");
					return extend(true, {}, header, newheader);
				}
			} catch (e) {
				if (!fs.existsSync(versionpath)) {
					logger.debug("文件不存在" + versionpath);
				}
				logger.error(`JSON parse error, file path :${versionpath},Errors:${e} `);
				let curVersionJson = {
					[hash]: newverstring,
				};
				logger.debug("文件不存在" + versionpath);
				fs.writeFileSync(versionpath, JSON.stringify(curVersionJson));
				return extend(true, {}, header, newheader);
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
