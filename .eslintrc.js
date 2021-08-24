module.exports = {
	root: true,
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
		"eslint:recommended",
		"plugin:vue/essential",
		"plugin:vue/vue3-recommended",

		//放在最后
		"prettier",
	],
	parserOptions: {
		ecmaVersion: 12,
		sourceType: "module",
		shouldFix: true,
		node: true,
	},
	plugins: ["vue"],
	rules: {
		"no-unused-vars": ["error", { vars: "all", args: "none", ignoreRestSiblings: false }],
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
		GM_config: "readonly",
		waitForElems: "readonly",
		waitForUrl: "readonly",
		prettierPlugins: "readonly",
		prettier: "readonly",
	},

	overrides: [
		{
			files: ["**/*.ts", "**/*.tsx"],
			env: {
				browser: true,
				es2021: true,
				commonjs: true,
				jquery: true,
				greasemonkey: true,
			},
			extends: [
				"eslint:recommended", //
				"plugin:@typescript-eslint/recommended",
			],
			globals: { Pace: "readonly" },

			parserOptions: {
				ecmaVersion: 12,
				sourceType: "module",
				shouldFix: true,
				node: true,
				project: "./tsconfig.json",
			},
			plugins: ["@typescript-eslint"],
			rules: {
				indent: ["error", 2, { SwitchCase: 1 }],
				// "linebreak-style": ["error", "windows"],
				// quotes: ["error", "single"],
				"comma-dangle": ["error", "always-multiline"],
				"@typescript-eslint/no-explicit-any": 0,
				"@typescript-eslint/no-unused-vars": ["error", { vars: "all", args: "none", ignoreRestSiblings: false }],
			},
			parser: "@typescript-eslint/parser",
		},
	],
};
// npm i --save-dev eslint typescript @typescript-eslint/parser @typescript-eslint/eslint-plugin
// npm install --save-dev eslint eslint-plugin-vue
