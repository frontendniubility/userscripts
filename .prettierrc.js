module.exports = {
	bracketSpacing: true,

	proseWrap: "preserve",
	requireConfig: true,
	semi: false, //结尾分号
	singleQuote: false,

	/*  prettier的配置 */
	arrowParens: "avoid",
	enableDebugLogs: true,
	endOfLine: "auto", // 结尾是 \n \r \n\r auto
	eslintIntegration: true,
	htmlWhitespaceSensitivity: "ignore",
	ignorePath: ".prettierignore", // 不使用prettier格式化的文件填写在项目的.prettierignore文件中
	jsxBracketSameLine: false, // 在jsx中把'>' 是否单独放一行
	jsxSingleQuote: false, // 在jsx中使用单引号代替双引号
	printWidth: 800, // 使用单引号代替双引号
	stylelintIntegration: true,
	tabWidth: 4, // 缩进字节数
	trailingComma: "all", // 在对象或数组最后一个元素后面是否加逗号（在ES5中加尾逗号）
	tslintIntegration: true,
	useTabs: true, // 缩进不使用tab，使用空格
	vueIndentScriptAndStyle: true,
	withNodeModules: true,
};
