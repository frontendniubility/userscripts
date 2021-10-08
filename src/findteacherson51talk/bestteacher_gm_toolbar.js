import { GM_config } from "./gm_config";

const config = GM_config([
	{
		key: "pageMaxCount",
		label: "最大页数 (自动获取时)",
		default: 20,
		type: "dropdown",
		values: [0, 5, 10, 20, 50, 1000],
	},
	{
		key: "newBatcherKeyMinutes",
		label: "排名缓存（分钟）,0为每次更新",
		default: 24,
		type: "dropdown",
		values: [0, 1, 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 179, 181, 191, 193, 197, 199],
	},
	{
		key: "tInfoExprHours",
		label: "教师数据缓存过期时间（小时）",
		default: 139,
		type: "dropdown",
		values: [0, 1, 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 73, 79, 83, 89, 97, 101, 103, 107, 109, 113, 127, 131, 137, 139, 179, 181, 191, 193, 197, 199],
	},
	{
		key: "markRankRed",
		label: "突出前N名教师的名次",
		default: 100,
		type: "dropdown",
		values: [5, 10, 30, 50, 120, 500, 3000, 5000, 10080],
	},

	{
		// The key for the setting.
		key: "calcIndicator",

		// The label that'll be used for the setting in the UI.
		label: "[高级]排名公式",

		// Optional. The default value for the setting.
		default: "",

		// What type of setting it is.
		type: "text",
		// Optional. Placeholder text for the textbox.
		placeholder: "Math.ceil((t.label * t.thumbupRate) / 100) + t.favoritesCount",

		// Optional. If true, shows a textarea instead of a text input. Defaults to false.
		multiline: true,

		// Optional. Only applicable when multiline is true. If true the textarea will be resizable. Defaults to false.
		resizable: true,
	},
	{
		key: "version",
		type: "hidden",
		default: 1,
	},
]);
let conf = config.load();

GM_registerMenuCommand("设置", config.setup);

function GetCalculatorIndicator() {
	let f;
	if (conf.calcIndicator) {
		try {
			f = new Function("t", `return ${conf.calcIndicator}`);
		} catch (error) {
			f = new Function("t", `return Math.ceil((t.label * t.thumbpRate) / 100) + t.favoritesCount`);
			console.log(error);
			alert(`计算公式错误，排名计算方式使用默认公式。Error:${error}`);
		}
	} else {
		f = new Function("t", `return Math.ceil((t.label * t.thumbupRate) / 100) + t.favoritesCount`);
	}
	return f;
}

export const indicatorCalculator = GetCalculatorIndicator();
export { conf, config };
