// https://eslint.org/docs/user-guide/configuring
module.exports = {
	"root": true,
	"parser": "babel-eslint",
	"parserOptions": {
		"ecmaVersion": 7,
		"ecmaFeatures": {
			"impliedStrict": true
		},
		"sourceType": "module"
	},
	"env": {
		//"es6": true,
		"browser": true
		//"node":true
	},
	"plugins": [
		"html"
	],
	"globals": {
		//false不允许重写
		"document": false,
		"navigator": false,
		"window": false,
		"require": false,
		"Promise": false,
		"module": false,
		"process": false
	},
	//off 0 关闭规则
	//warn 1 开启规则，使用警告
	//error 2 开启规则，使用错误
	"rules": {
		//这些规则与 JavaScript 代码中可能的错误或逻辑错误有关
		"no-cond-assign": [2, "always"], //"always" 禁止条件语句中出现赋值语句
		"no-constant-condition": [2, {
			"checkLoops": false
		}], //禁止在条件中使用常量表达式
		"no-control-regex": 2,
		"no-debugger": 2,
		"no-dupe-args": 2, //禁止 function 定义中出现重名参数
		"no-dupe-keys": 2,
		"no-duplicate-case": 2,
		"no-empty-character-class": 2,
		"no-empty": [2, {
			"allowEmptyCatch": true
		}],
		"no-ex-assign": 2, //禁止对 catch 子句的参数重新赋值
		"no-extra-boolean-cast": 2, //禁止不必要的布尔转换
		"no-extra-semi": 2, //禁止不必要的分号
		"no-func-assign": 2, //禁止对 function 声明重新赋值
		"no-inner-declarations": 2, //禁止在嵌套的块中出现变量声明或 function 声明
		"no-invalid-regexp": 2, //禁止 RegExp 构造函数中存在无效的正则表达式字符串
		"no-irregular-whitespace": 2, //禁止在字符串和注释之外不规则的空白
		"no-obj-calls": 2, //禁止把全局对象作为函数调用
		"no-unexpected-multiline": 1, //禁止出现令人困惑的多行表达式
		"no-unreachable": 2, //禁止在return、throw、continue 和 break 语句之后出现不可达代码
		"no-unsafe-finally": 2, //禁止在 finally 语句块中出现控制流语句
		"use-isnan": 2, //要求使用 isNaN() 检查 NaN
		"valid-typeof": 2, //强制 typeof 表达式与有效的字符串进行比较

		//这些规则是关于最佳实践的，帮助你避免一些问题:
		"accessor-pairs": 2, //强制 getter 和 setter 在对象中成对出现
		"array-callback-return": 2, //强制数组方法的回调函数中有 return 语句
		"block-scoped-var": 2, //强制把变量的使用限制在其定义的作用域范围内
		"class-methods-use-this": 2,
		//"complexity": [1, 2],//指定程序中允许的最大环路复杂度
		//"consistent-return": [1,{ "treatUndefinedAsUnspecified": true }], //要求 return 语句要么总是指定返回的值，要么不指定
		"default-case": [1, {
			"commentPattern": "^skip\\sdefault"
		}], //要求 switch 语句中有 default 分支
		//"eqeqeq": [1, "smart"], //
		"no-alert": 2,
		"no-caller": 2,
		"no-case-declarations": 2, //不允许在 case 子句中使用词法声明
		//"no-div-regex": 2, //禁止除法操作符显式的出现在正则表达式开始的位置
		"no-empty-function": 2, //
		"no-empty-pattern": 2, // 禁止使用空解构模式
		//"no-eq-null": 2, //禁止在没有类型检查操作符的情况下与 null 进行比较
		"no-eval": 2,
		"no-extend-native": 2,
		"no-extra-label": 2, //禁用不必要的标签
		"no-fallthrough": 1, //禁止 case 语句落空
		"no-global-assign": 2, //
		//"no-implied-eval": 2, //禁止使用类似 eval() 的方法
		//"no-invalid-this": 2, //禁止 this 关键字出现在类和类对象之外
		"no-iterator": 1, //禁用 __iterator__ 属性
		"no-labels": 2, //禁用标签语句
		"no-lone-blocks": 2,
		"no-loop-func": 2, //禁止在循环中出现 function 声明和表达式
		"no-multi-str": 1, //禁止使用多行字符串
		"no-new-func": 2, //
		"no-new-wrappers": 2, //
		"no-new": 2, //
		"no-octal-escape": 2, //
		"no-octal": 2, //
		//"no-param-reassign": 2, //
		"no-proto": 2, //
		"no-redeclare": 2, //
		"no-return-assign": 2, //禁止在 return 语句中使用赋值语句
		"no-script-url": 2, //禁止使用 javascript: url
		"no-self-assign": 2,
		"no-self-compare": 2,
		"no-sequences": 2, //禁用逗号操作符
		"no-throw-literal": 2, //
		"no-unmodified-loop-condition": 2,
		"no-unused-expressions": [2, {
			"allowShortCircuit": true,
			"allowTernary": true
		}], //允许处理逻辑短路
		"no-unused-labels": 2,
		"no-useless-call": 2,
		"no-useless-concat": 2, //禁止不必要的字符串字面量或模板字面量的连接
		"no-useless-escape": 2, //禁用不必要的转义字符
		"no-void": 2,
		"no-warning-comments": 2,
		"no-with": 2,
		"radix": 2, //强制在parseInt()使用基数参数

		//这些规则与变量声明有关
		"no-catch-shadow": 2,
		"no-delete-var": 2,
		"no-label-var": 2,
		"no-restricted-globals": 2, //禁用特定的全局变量
		"no-shadow-restricted-names": 2, //禁止覆盖受限制的标识符
		"no-shadow": [2, {
			"builtinGlobals": false,
			"hoist": "functions",
			"allow": ["state"]
		}], //禁止变量声明与外层作用域的变量同名
		"no-undef": 2, //禁用未声明的变量，除非它们在 /*global */ 注释中被提到
		// "no-undefined": 2,
		"no-unused-vars": 2,
		"no-use-before-define": 2,
		"curly": [2, 'all'],

		//风格指南
		"brace-style": [2, "1tbs", {
			"allowSingleLine": true
		}], // 强制 one true brace style
		//"camelcase": [1, {
		//  "properties": "always"
		//}],
		"comma-dangle": [2, "never"],
		"comma-style": [2, "last"],
		"computed-property-spacing": [2, "never"],
		// "eol-last": [2, "never"], //要求或禁止文件末尾存在空行
		"func-names": [2, "never"], //要求或禁止使用命名的 function 表达式
		"indent": [2, "tab", {
			"SwitchCase": 1
		}],
		"key-spacing": 2,
		"no-mixed-spaces-and-tabs": 2,
		"no-whitespace-before-property": 2, //禁止属性前有空白

		"array-bracket-spacing": [2, "never"], //中括号这两边不带空白
		"block-spacing": [2, "always"], //左花括号和同一行上的下一个 token 之间有一致的空格
		"comma-spacing": [2, {
			"before": false,
			"after": true
		}], //逗号前不留空格，逗号后留一空格
		"computed-property-spacing": [2, "never"], //禁止括号和其内部值之间的空格
		"func-call-spacing": [2, "never"], //禁止在函数名和开括号之间有空格
		"keyword-spacing": [2, {
			"before": true
		}], // 要求在关键字之前至少有一个空格
		"object-curly-spacing": [2, "never"], //不允许花括号中有空格
		"semi-spacing": [2, {
			"before": false,
			"after": true
		}], //强制分号后有空格
		"space-before-blocks": [2, "always"], //要求语句块之前的空格
		"space-before-function-paren": [2, "never"], //禁止在参数的 ( 前面有空格。
		"space-in-parens": [2, "never"], // 强制圆括号内没有空格
		"space-infix-ops": [2, {
			"int32Hint": true
		}], //要求中缀操作符周围有空格
		"space-unary-ops": [2, {
			"words": true,
			"nonwords": false,
			"overrides": {
				"new": false
			}
		}],
		// "switch-colon-spacing": [2, {"after": true, "before": false}],
		"template-tag-spacing": [2, "always"],
		"semi": [2, "never"], //语句强制不要分号结尾

		//ECMAScript 6
		"arrow-body-style": [0, "as-needed"],
		"arrow-spacing": [2, {
			"before": true,
			"after": true
		}],
		"rest-spread-spacing": [2, "never"],
		"template-curly-spacing": [2, "never"],
		"yield-star-spacing": [2, "after"],
		"constructor-super": 2,
		"no-class-assign": 2, //不允许修改类声明的变量
		"no-const-assign": 2, //禁止修改 const 声明的变量
		"no-dupe-class-members": 2, //禁止类成员中出现重复的名称
		// allow debugger during development
		"no-debugger": process.env.NODE_ENV === 'production' ? 'error' : 'off',
		"no-console": process.env.NODE_ENV === 'production' ? 1 : 0
	}
}