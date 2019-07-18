'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')
const SpritesmithPlugin = require('webpack-spritesmith')
const svgoConfig = require('../config/svgo.config.json')

function resolve (dir) {
	return path.join(__dirname, '..', dir)
}

// 将NODE_ENV与config/index文件中的环境参数做个映射
let node_env = process.env.NODE_ENV
let env = node_env === 'production' ? 'build' : node_env === 'testing' ? 'test' : 'dev'
let useEslint = true
if (env == 'dev') {
	useEslint = config.dev.useEslint
} else if (env == 'build') {
	useEslint = config.build.useEslint
}

const createLintingRule = () => ({
	test: /\.(js|vue)$/,
	loader: 'eslint-loader',
	enforce: 'pre',
	include: [resolve('src'), resolve('test')],
	options: {
		formatter: require('eslint-friendly-formatter'),
		emitWarning: !config.dev.showEslintErrorsInOverlay
	}
})

function getCommonPath(name){
	return path.resolve(__dirname, '../src/common/'+name);
}

module.exports = {
	context: path.resolve(__dirname, '../'),
	entry: {
		app: './src/main.js'
	},
	output: {
		path: config.build.assetsRoot,
		filename: '[name].js',
		publicPath: process.env.NODE_ENV === 'production'
			? config.build.assetsPublicPath
			: config.dev.assetsPublicPath
	},
	resolve: {
		extensions: ['.js', '.vue', '.json'],
		alias: {
			'vue$': 'vue/dist/vue.esm.js',
			'@': resolve('src'),
			'util': getCommonPath('utils/util.js'),
			'clientApi': getCommonPath('client-api/index.js'),
			'config': getCommonPath('config/index.js'),
			'eventApi': getCommonPath('event-api/index.js'),
			'originApi': getCommonPath('origin-api/index.js'),
			'serviceApi': getCommonPath('service-api/index.js'),
			'collectApi': getCommonPath('collect-api/index.js'),
			'cookie': getCommonPath('utils/cookie.js'),
		}
	},
	module: {
		rules: [
			...(useEslint ? [createLintingRule()] : []),
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: vueLoaderConfig
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')]
			},
			{
				test: /\.svg$/,
				include:[resolve('src/assets/svg')],
				use: [
					{ 
						loader: 'svg-sprite-loader', 
						options: { 
							symbolId: 'svg-[name]'
						} 
					},
					{
						loader: 'svgo-loader',
						options: svgoConfig
					}
				]
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 5000,
					name: utils.assetsPath('images/[name].[ext]')
				},
				exclude:[resolve('src/assets/svg')]
			},
			{
				test: /\.(mp4|webm|ogg|mp3|wav|flac|aac|wma|mid|midi)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: utils.assetsPath('media/[name].[ext]')
				}
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 10000,
					name: utils.assetsPath('fonts/[name].[ext]')
				}
			}
		]
	},
	node: {
		// prevent webpack from injecting useless setImmediate polyfill because Vue
		// source contains it (although only uses it if it's native).
		setImmediate: false,
		// prevent webpack from injecting mocks to Node native modules
		// that does not make sense for the client
		dgram: 'empty',
		fs: 'empty',
		net: 'empty',
		tls: 'empty',
		child_process: 'empty'
	},
	plugins: [
		new SpritesmithPlugin({
			src: {
				cwd: path.resolve(__dirname, '../src/assets/images/icons'),
				glob: 'icon-*.png'
			},
			target: {
				image: path.resolve(__dirname, '../src/assets/images/sprite.png'),
				css: [
					[path.resolve(__dirname, '../src/assets/less/global/icon.less'),{format:'handlebars_based_template'}]
				]
			},
			apiOptions: {
				cssImageRef: "../../images/sprite.png"
			},
			customTemplates:{
				handlebars_based_template:function (data) {
					if(data.sprites.length){
						var shared = '.icon { background-image: url("I"); }'.replace('I', data.sprites[0].image);

						var perSprite = data.sprites.map(function (sprite) {
							return '.N { display: inline-block; width: Wpx; height: Hpx; background-position: Xpx Ypx; vertical-align: top; }'
								.replace('N', sprite.name)
								.replace('W', sprite.width)
								.replace('H', sprite.height)
								.replace('X', sprite.offset_x)
								.replace('Y', sprite.offset_y);
						}).join('\r\n');

						return shared + '\r\n' + perSprite;
					}
				}
			}
		}),
	]
}
