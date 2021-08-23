/* eslint-disable no-undef */
const winston = require("winston");
const { format, transports } = winston;
// const { combine, metadata, timestamp, label, prettyPrint, printf, colorize, padLevels } = format;
require("winston-daily-rotate-file");

const { configs } = require("triple-beam");

const customConfigs = {
	levels: {
		crrun: 96,
		cnrun: 97,
		crtap: 98,
		cntap: 99,
		all: 100,
	},
	// Font styles: bold, dim, italic, underline, inverse, hidden, strikethrough.
	// Font foreground colors: black, red, green, yellow, blue, magenta, cyan, white, gray, grey.
	// Background colors: blackBG, redBG, greenBG, yellowBG, blueBG magentaBG, cyanBG, whiteBG
	colors: {
		crrun: "dim red blueBG",
		cnrun: "dim cyan blackBG",
		crtap: "dim yellow blackBG",
		cntap: "dim green blackBG",
		all: "dim magenta blackBG",
	},
};

const combinedConfigs = {
	levels: Object.entries(configs.npm.levels).reduce((acc, [key, value], idx) => {
		acc[key] = value;
		return acc;
	}, customConfigs.levels),

	colors: Object.entries(configs.npm.colors).reduce((acc, [key, value], idx) => {
		acc[key] = value;
		return acc;
	}, customConfigs.colors),
};

let logopt = {
	level: "all",
	levels: combinedConfigs.levels,
	format: format.combine(
		format.timestamp({
			format: "YYYYMMDD HHmmss.SSS",
		}),
		format.padLevels({
			levels: Object.keys(combinedConfigs.levels).reduce((acc, level) => {
				if (level == "cnrun") acc[level] = 0;
				else acc[level] = 1;
				return acc;
			}, {}),
			filler: " ",
		}),
		// format(function dynamicContent(info, opts) {
		//     console.log(info);
		//     info.message = '[dynamic content] ' + info.message;
		//     return info;
		// })(),

		// format.align(),
		// format.cli(),
		format.errors(),
		// format.json(),
		// format.label(),
		// format.logstash(),
		format.metadata({ fillExcept: ["message", "level", "timestamp", "label"] }),
		// format.ms(),

		// format.prettyPrint(),
		format.splat(),

		// format.uncolorize(),

		format.colorize({
			level: true,
			all: false,
			message: false,
			colors: combinedConfigs.colors,
		}),
		// format.simple(),
		format.printf((info) => {
			let { level, message, label, timestamp } = info;
			// console.log(info);
			return `${timestamp} ${label || "-"} ${level}: ${message}`;
		}),
	),
	transports: [
		new transports.Stream({
			stream: process.stderr,
			level: "all",
		}),
		// new transports.Console({

		// })
	],
};

let optTest = Object.assign({}, logopt, {
	transports: [
		new transports.Stream({
			stream: process.stderr,
			level: "all",
		}),

		new transports.DailyRotateFile({
			filename: "logs/%DATE%/webpacktest-%DATE%.log",
			datePattern: "YYYY-MMM-DD",
			// datePattern: 'YYYY-MM-DD-HH',
			zippedArchive: true,
			maxSize: "20m",
			maxFiles: "14d",
			level: "all",
			format: format.combine(format.uncolorize()),
		}),
		// new transports.DailyRotateFile({
		//     filename: 'logs/server/%DATE%/errors.log',
		//     datePattern: 'DD-MMM-YYYY',
		//     level: 'error',
		//     format: format.combine(format.uncolorize()),
		// }),
	],
});

winston.loggers.add("webpack", logopt);
winston.loggers.add("webpacktest", optTest);

module.exports = winston;
