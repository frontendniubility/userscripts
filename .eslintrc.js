module.exports = {
	env: {
		browser: true,
		es2021: true,
		commonjs: true,
		jquery: true,
		greasemonkey: true,
	},
	ignorePatterns: ["node_modules", "build", "coverage", "dist"],
	extends: [
		// add more generic rulesets here, such as:
		// 'standard',
		// "eslint:recommended",
		"plugin:vue/essential",
		"plugin:vue/vue3-recommended",
		"plugin:@typescript-eslint/recommended",

		//放在最后
		"prettier",
	],
	parserOptions: {
		ecmaVersion: 12,
		sourceType: "module",
		shouldFix: true,
		node: true,
	},
	plugins: ["vue", "@typescript-eslint"],
	rules: {
		"no-unused-vars": ["error", { vars: "all", args: "none", ignoreRestSiblings: false }],
		"@typescript-eslint/no-unused-vars": ["error", { vars: "all", args: "none", ignoreRestSiblings: false }],
		"@typescript-eslint/no-explicit-any": ["error", { ignoreRestArgs: false }],
	},

	globals: {
		// "$": "writable",
		// $: "readonly",
		// GM_listValues: "readonly",
		// GM_getValue: "readonly",
		// GM_setValue: "readonly",
		// GM_deleteValue: "readonly",
		// GM_registerMenuCommand: "readonly",
		// GM_addStyle: "readonly",
		Pace: "readonly",
	},
	parser: "@typescript-eslint/parser",
};
// npm i --save-dev eslint typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin
// npm install --save-dev eslint eslint-plugin-vue
