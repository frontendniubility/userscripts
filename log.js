const winston = require('winston');
const { format, transports } = winston;
// const { combine, metadata, timestamp, label, prettyPrint, printf, colorize, padLevels } = format;

const myCustomLevels = {
    levels: {
        error: 0,
        warn: 1,
        data: 2,
        info: 3,
        debug: 4,
        verbose: 5,
        silly: 6,
        cr: 7,
        cn: 8,
        crrg: 9,
        cnrg: 10,
        all: 100,
    },
    // Font styles: bold, dim, italic, underline, inverse, hidden, strikethrough.
    // Font foreground colors: black, red, green, yellow, blue, magenta, cyan, white, gray, grey.
    // Background colors: blackBG, redBG, greenBG, yellowBG, blueBG magentaBG, cyanBG, whiteBG
    colors: {
        error: 'dim red blueBG',
        warn: 'dim cyan blackBG',
        data: 'dim grey blackBG',
        info: 'dim green blackBG',
        debug: 'dim yellow blackBG',
        verbose: 'dim blue blackBG',
        silly: 'dim magenta blackBG',
        cr: 'dim red blueBG',
        cn: 'dim cyan blackBG',
        crrg: 'dim yellow blackBG',
        cnrg: 'dim green blackBG',
        all: 'dim magenta blackBG',
    },
};

let logopt = {
    level: 'all',
    levels: myCustomLevels.levels,
    format: format.combine(
        format.timestamp({
            format: 'YYYYMMDD HHmmss.SSS',
        }),
        // format(function dynamicContent(info, opts) {
        //     console.log(info);
        //     info.message = '[dynamic content] ' + info.message;
        //     return info;
        // })(),
        format.colorize({
            level: true,
            all: false,
            message: false,
            colors: myCustomLevels.colors,
        }),
        // format.align(),
        // format.cli(),
        // format.errors(),
        // format.json(),
        // format.label(),
        // format.logstash(),
        // format.metadata({
        //     // key: 'test',
        //     // fillWith: [Symbol.for('splat'), Symbol.for('level')],
        // }),
        // format.ms(),
        // format.padLevels(),
        // format.prettyPrint(),
        format.splat(),

        // format.uncolorize(),
        format.simple(),

        format.printf(info => {
            let { level, message, label, timestamp } = info;
            // console.log(info);
            return `${timestamp} ${label || '-'} ${level}: ${message}`;
        }),
    ),
    transports: [
        new transports.Stream({
            stream: process.stderr,
        }),
        // new transports.Console({

        // })
    ],
};

winston.loggers.add('webpack', logopt);
winston.loggers.add('webpacktest', logopt);

module.exports = winston;
