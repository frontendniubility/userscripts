const logger = require("./../../log").loggers.get("webpacktest");

const meta = {
	subject: "Hello, World!",
	message: "This message is a unique property separate from implicit merging.",
};

let i = 1;
while (i-- > 0) {
	logger.warn("first param is  %s ,%s, %d", "ivvv", "oooo", 3333, 444);
	// logger.info('This is overridden by meta', meta);
	logger.info("email.message is shown %j", meta);
}

logger.log("info", "any message", {
	label: "label!",
	extra: true,
});

logger.log("info", "let's %s some %s", "interpolate", "splat parameters", {
	label: "label!",
	extra: true,
});

logger.log(
	"info",
	"first is a string %s [[%j]]",
	"behold a string",
	{ beAware: "this will interpolate" },
	{
		label: "label!",
		extra: true,
	},
);

logger.log(
	"info",
	"first is an object [[%j]]",
	{ beAware: "this will interpolate" },
	{
		label: "label!",
		extra: true,
	},
);

//
// Non-enumerable properties (such as "message" and "stack" in Error
// instances) will not be merged into any `info`.
//
const terr = new Error("lol please stop doing this");
terr.label = "error";
terr.extra = true;
logger.log("info", "any message", terr);

logger.log("info", "let's %s some %s", "interpolate", "splat parameters", terr);

b => b;
