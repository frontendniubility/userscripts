module.exports = {
	extends: ["stylelint-config-standard", "stylelint-config-css-modules"],
	plugins: ["stylelint-scss"],
	rules: {
		// ###########################################  important rules ###########################################
		"declaration-block-no-duplicate-properties": null,
		"property-no-unknown": null,
		"selector-pseudo-element-no-unknown": null,
		"unit-no-unknown": null,
		"font-family-no-duplicate-names": null,
		"block-no-empty": null,
		"selector-type-no-unknown": null,
		"declaration-block-no-shorthand-property-overrides": [null, { severity: "warning" }],
		"no-duplicate-selectors": null,
		"media-feature-name-no-unknown": null,
		"no-empty-source": null,
		"selector-pseudo-class-no-unknown": [null, { severity: "warning" }],
		"selector-pseudo-element-colon-notation": null,

		// ########################################### AUTO FIXABLE
		"shorthand-property-no-redundant-values": null,
		"color-hex-case": null,
		"color-hex-length": null,
		"number-leading-zero": null,
		"number-no-trailing-zeros": null,
		"length-zero-no-unit": null,

		// ###########################################  AUTO FIXABLE, FORMATTING RULES, covered by prettier (keep null) #################################
		indentation: null,
		"max-line-length": null,
		"function-comma-newline-after": null,
		"function-comma-newline-before": null,
		"function-max-empty-lines": null,
		"value-list-max-empty-lines": null,
		"max-empty-lines": null,
		"function-comma-space-after": null,
		"function-whitespace-after": null,
		"value-list-comma-space-after": null,
		"declaration-bang-space-after": null,
		"declaration-colon-space-after": null,
		"declaration-block-semicolon-space-after": null,
		"block-closing-brace-space-after": null,
		"block-opening-brace-space-after": null,
		"selector-attribute-operator-space-after": null,
		"selector-combinator-space-after": null,
		"selector-list-comma-space-after": null,
		"media-feature-colon-space-after": null,
		"media-feature-range-operator-space-after": null,
		"media-query-list-comma-space-after": null,
		"at-rule-name-space-after": null,
		"function-comma-space-before": null,
		"value-list-comma-space-before": null,
		"declaration-bang-space-before": null,
		"declaration-colon-space-before": null,
		"declaration-block-semicolon-space-before": null,
		"block-closing-brace-space-before": null,
		"block-opening-brace-space-before": null,
		"selector-attribute-operator-space-before": null,
		"selector-combinator-space-before": null,
		"selector-list-comma-space-before": null,
		"media-feature-colon-space-before": null,
		"media-feature-range-operator-space-before": null,
		"media-query-list-comma-space-before": null,
		"at-rule-semicolon-space-before": null,
		"no-eol-whitespace": null,
		"function-parentheses-space-inside": null,
		"selector-attribute-brackets-space-inside": null,
		"selector-pseudo-class-parentheses-space-inside": null,
		"media-feature-parentheses-space-inside": null,
		"comment-whitespace-inside": null,
		"declaration-block-trailing-semicolon": null,
		"selector-descendant-combinator-no-non-space": null,
		"function-calc-no-unspaced-operator": null,

		// ########################################### AUTO FIXABLE, FORMATTING RULES,  NOT covered by prettier
		"custom-property-empty-line-before": null,
		"declaration-empty-line-before": null,
		"rule-empty-line-before": null,
		"at-rule-empty-line-before": null,
		"comment-empty-line-before": null,
		"no-missing-end-of-source-newline": null,
		"at-rule-name-case": null,
		"block-closing-brace-empty-line-before": null,
		"selector-max-empty-lines": null,
		"function-parentheses-newline-inside": null,
		"value-list-comma-newline-after": null,
		"value-list-comma-newline-before": null,
		"declaration-colon-newline-after": null,
		"declaration-block-semicolon-newline-after": null,
		"declaration-block-semicolon-newline-before": null,
		"block-closing-brace-newline-after": null,
		"block-closing-brace-newline-before": null,
		"block-opening-brace-newline-after": null,
		"block-opening-brace-newline-before": null,
		"selector-list-comma-newline-after": null,
		"selector-list-comma-newline-before": null,
		"media-query-list-comma-newline-after": null,
		"media-query-list-comma-newline-before": null,
		"at-rule-name-newline-after": null,
		"at-rule-semicolon-newline-after": null,
		"property-case": null,

		// ########################################### MISC
		"function-name-case": null,

		// ########################################### TOO MANY RESULTS!
		"font-family-no-missing-generic-family-keyword": null,
		"no-descending-specificity": null,
		"at-rule-no-unknown": null,
		"declaration-block-single-line-max-declarations": null,

		// ########################################### NO RESULTS

		// 'media-feature-name-blacklist': null,
		// 'media-feature-name-no-vendor-prefix': null,
		// 'media-feature-name-value-whitelist': null,
		// 'media-feature-name-whitelist': null,
		// 'custom-media-pattern': null,
		// 'at-rule-blacklist': null,
		// 'at-rule-no-vendor-prefix': null,
		// 'at-rule-whitelist': null,
		// 'comment-word-blacklist': null,
		// 'max-nesting-depth': null,
		// 'no-unknown-animations': null,
		// 'font-family-name-quotes': null,
		// 'font-weight-notation': null,
		// 'comment-no-empty': null,
		// 'no-duplicate-at-import-rules': null,
		// 'no-extra-semicolons': null,
		// 'no-invalid-double-slash-comments': null,
		// 'color-named': null,
		// 'color-no-hex': null,
		// 'function-blacklist': null,
		// 'function-url-no-scheme-relative': null,
		// 'function-url-scheme-blacklist': null,
		// 'function-url-scheme-whitelist': null,
		// 'function-whitelist': null,
		// 'keyframes-name-pattern': null,
		// 'number-max-precision': null,
		// 'time-min-milliseconds': null,
		// 'unit-blacklist': null,
		// 'unit-whitelist': null,
		// 'string-no-newline': null,
		// 'keyframe-declaration-no-important': null,
		// 'value-no-vendor-prefix': null,
		// 'custom-property-pattern': null,
		// 'property-blacklist': null,
		// 'property-no-vendor-prefix': null,
		// 'property-whitelist': null,
		// 'declaration-block-no-redundant-longhand-properties': null,
		// 'declaration-no-important': null,
		// 'declaration-property-unit-blacklist': null,
		// 'declaration-property-unit-whitelist': null,
		// 'declaration-property-value-blacklist': null,
		// 'declaration-property-value-whitelist': null,
		// 'selector-attribute-operator-blacklist': null,
		// 'selector-attribute-operator-whitelist': null,
		// 'selector-class-pattern': null,
		// 'selector-combinator-blacklist': null,
		// 'selector-combinator-whitelist': null,
		// 'selector-id-pattern': null,
		// 'selector-max-attribute': null,
		// 'selector-max-class': null,
		// 'selector-max-combinators': null,
		// 'selector-max-compound-selectors': null,
		// 'selector-max-id': null,
		// 'selector-max-pseudo-class': null,
		// 'selector-max-specificity': null,
		// 'selector-max-type': null,
		// 'selector-max-universal': null,
		// 'selector-nested-pattern': null,
		// 'selector-no-qualifying-type': null,
		// 'selector-no-vendor-prefix': null,
		// 'selector-pseudo-class-blacklist': null,
		// 'selector-pseudo-class-whitelist': null,
		// 'selector-pseudo-element-blacklist': null,
		// 'selector-pseudo-element-whitelist': null,
		// 'function-url-quotes': null,
		// 'unit-case': null,
		// 'value-keyword-case': null,
		// 'selector-attribute-quotes': null,
		// 'selector-pseudo-class-case': null,
		// 'selector-pseudo-element-case': null,
		// 'selector-type-case': null,
		// 'media-feature-name-case': null,
		// 'scss/at-rule-no-unknown': null,
		// 'color-no-invalid-hex': null,
		// 'function-linear-gradient-no-nonstandard-direction': null,
		// 'string-quotes': null,
	},
};
