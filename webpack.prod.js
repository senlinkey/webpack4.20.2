const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
// 压缩JS
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

// webpack4.x 用这个分离css
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
	mode: "production",
	output: {
		filename: '[name].[chunkhash:5].js', //决定了入口chunk的名称
		chunkFilename: '[name].[chunkhash:5].js', //决定了非入口chunk的名称
		path: path.resolve(__dirname, 'dist')
	},
	plugins: [
		new UglifyJSPlugin({
			cache: true,
			parallel: true,
		}),
		// 用于解决修改业务代码时候引起框架的hash变化?
		new webpack.HashedModuleIdsPlugin(),
		// 抽离CSS
		new MiniCssExtractPlugin({
			filename: "[name].[chunkhash:5].css", //分离的业务命名,用chunkhash有效缓解缓存问题
			chunkFilename: "[name].[chunkhash:5].css" //分离的框架命名
		}),

	]

});