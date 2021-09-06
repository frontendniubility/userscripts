module.exports = {
	root: true,
	env: {
		browser: true,
		es2021: true,
		commonjs: true,
		jquery: true,
		greasemonkey: true,
		node: true,
	},

	ignorePatterns: ["/node_modules", "dist"],
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
		ecmaVersion: 2015,
		sourceType: "module",
		parser: "babel-eslint",
	},
	plugins: ["vue"],
	rules: {
		"no-unused-vars": ["error", { vars: "all", args: "none", ignoreRestSiblings: false }],
	},

	globals: {
		Pace: "readonly",
		GM_config: "readonly",
		waitForElems: "readonly",
		waitForUrl: "readonly",
		prettierPlugins: "readonly",
		prettier: "readonly",
	},

	overrides: [
		{
			files: ["src/**/*.ts", "src/**/*.tsx"],

			extends: [
				"eslint:recommended", //
				"plugin:@typescript-eslint/recommended",
			],

			parserOptions: {
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
