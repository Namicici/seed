module.exports = {
	"rules": {
		//Possible errors
		//Color
		"color-no-invalid-hex": true,
		//Font family
		"font-family-no-duplicate-names": true,
		"font-family-no-missing-generic-family-keyword": true,
		//Function
		"function-calc-no-unspaced-operator": true,
		"function-linear-gradient-no-nonstandard-direction": true,
		//String
		"string-no-newline": true,
		//Unit
		"unit-no-unknown": true,
		//Property
		"property-no-unknown": true,
		//Keyframe declaration
		"keyframe-declaration-no-important": true,
		//Declaration block
		"declaration-block-no-duplicate-properties": true,
		"declaration-block-no-shorthand-property-overrides": true,
		//Block
		"block-no-empty": true,
		//Selector
		"selector-pseudo-class-no-unknown": true,
		"selector-pseudo-element-no-unknown": true,
		"selector-type-no-unknown": true,
		//Media feature
		"media-feature-name-no-unknown": true,
		//At-rule
		"at-rule-no-unknown": true,
		//Comment
		"comment-no-empty": true,
		//General / Sheet
		//"no-descending-specificity": true,不同类下面相同元素样式的定义
		"no-duplicate-at-import-rules": true,
		"no-duplicate-selectors": true,
		"no-empty-source": true,
		"no-extra-semicolons": true,
		"no-invalid-double-slash-comments": true,
		//Limit language features
		//Color
		"color-named": "never",
		//Function
		"function-url-no-scheme-relative": true,
		"function-url-scheme-blacklist": ["ftp", "/^http/"],
		//Keyframes
		"keyframes-name-pattern": "kf-.+",
		//Number
		"number-max-precision": 6,
		//Time
		"time-min-milliseconds": 50,
		//Unit
		//"unit-blacklist": ['']
		//Shorthand property
		"shorthand-property-no-redundant-values": true,
		//Value
		// "value-no-vendor-prefix": 
		//Custom property
		//Property
		// "property-no-vendor-prefix": true,
		//Declaration
		//Declaration block
		//Selector
		"selector-max-attribute": 3,
		"selector-max-class": 5,
		"selector-max-combinators": 4,
		"selector-max-compound-selectors": 5,
		"selector-max-empty-lines": 0,
		"selector-max-id": 1,
		"selector-max-pseudo-class": 2,
		"selector-max-type": 2,
		"selector-max-universal": 1,
		"selector-no-vendor-prefix": true,
		//Media feature
		"media-feature-name-no-vendor-prefix": true,
		//Custom media
		//At-rule
		"at-rule-no-vendor-prefix": true,
		//Comment
		//General / Sheet
		"max-nesting-depth": 5,
		"no-unknown-animations": true,
		//Stylistic issues
		//Color
		"color-hex-case": "lower",
		"color-hex-length": "short",
		//Font family
		"font-family-name-quotes": "always-where-required",
		//Font weight
		//Function
		"function-comma-newline-after": "never-multi-line",
		"function-comma-newline-before": "never-multi-line",
		"function-comma-space-after": "always",
		"function-comma-space-before": "never",
		"function-max-empty-lines": 0,
		"function-name-case": "lower",
		"function-parentheses-newline-inside": "never-multi-line",
		"function-parentheses-space-inside": "never",
		"function-url-quotes": "always",
		"function-whitespace-after": "always",
		//Number
		"number-leading-zero": "always",
		"number-no-trailing-zeros": true,
		//String
		"string-quotes": "double",
		//Length
		// "length-zero-no-unit": true,
		//Unit
		"unit-case": "lower",
		//Value
		"value-keyword-case": "lower",
		//Value list
		"value-list-comma-newline-after": "always-multi-line",
		"value-list-comma-newline-before": "always-multi-line",
		"value-list-comma-space-after": "always",
		"value-list-comma-space-before": "never",
		"value-list-max-empty-lines": 0,
		//Custom property
		"custom-property-empty-line-before": "never",
		//Property
		"property-case": "lower",
		//Declaration
		"declaration-bang-space-after": "never",
		"declaration-bang-space-before": "never",
		"declaration-colon-newline-after": "always-multi-line",
		"declaration-colon-space-after": "always",
		"declaration-colon-space-before": "never",
		"declaration-empty-line-before": "never",
		//Declaration block
		"declaration-block-semicolon-newline-after": "always-multi-line",
		"declaration-block-semicolon-newline-before": "never-multi-line",
		"declaration-block-semicolon-space-after": "always-single-line",
		"declaration-block-semicolon-space-before": "never",
		"declaration-block-trailing-semicolon": "always",
		//Block
		"block-closing-brace-empty-line-before": "never",
		"block-closing-brace-newline-after": "always",
		"block-closing-brace-newline-before": "always-multi-line",
		// "block-closing-brace-space-after": "always-single-line",
		"block-closing-brace-space-before": "always-single-line",
		"block-opening-brace-newline-after": "always-multi-line",
		// "block-opening-brace-newline-before": "always",
		"block-opening-brace-space-after": "always-single-line",
		"block-opening-brace-space-before": "always",
		//Selector
		"selector-attribute-brackets-space-inside": "never",
		"selector-attribute-operator-space-after": "always",
		"selector-attribute-operator-space-before": "always",
		"selector-attribute-quotes": "always",
		"selector-combinator-space-after": "always",
		"selector-combinator-space-before": "always",
		"selector-descendant-combinator-no-non-space": true,
		"selector-pseudo-class-case": "lower",
		"selector-pseudo-class-parentheses-space-inside": "never",
		"selector-pseudo-element-case": "lower",
		"selector-pseudo-element-colon-notation": "single",
		"selector-type-case": "lower",
		//Selector list
		"selector-list-comma-newline-after": "never-multi-line",
		"selector-list-comma-newline-before": "never-multi-line",
		"selector-list-comma-space-after": "always",
		"selector-list-comma-space-before": "never",
		//Rule
		"rule-empty-line-before": "never",
		//Media feature
		"media-feature-colon-space-after": "always",
		"media-feature-colon-space-before": "never",
		//Media query list
		"media-feature-name-case": "lower",
		"media-feature-parentheses-space-inside": "never",
		"media-feature-range-operator-space-after": "always",
		"media-feature-range-operator-space-before": "always",
		"media-query-list-comma-newline-before": "never-multi-line",
		"media-query-list-comma-space-after": "always",
		"media-query-list-comma-space-before": "always",
		//At-rule
		"at-rule-empty-line-before": "never",
		"at-rule-name-case": "lower",
		"at-rule-name-newline-after": "always-multi-line",
		"at-rule-name-space-after": "always",
		"at-rule-semicolon-newline-after": "always",
		"at-rule-semicolon-space-before": "never",
		//Comment
		"comment-empty-line-before": "always",
		//"comment-whitespace-inside": "always", 影响hologram
		//General / Sheet
		"indentation": "tab",
		"max-empty-lines": 2,
		"no-eol-whitespace": true 
	}
}