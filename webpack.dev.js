const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
// webpack4.x 用这个分离css
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = merge(common, {
    mode: "development",
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist',
        // color: true,//启用/禁用控制台的彩色输出 --color
        // compress: true,//压缩 --compress
        // bonjour: true,//广播--bonjour
        // quiet: true,//关闭打印信息,包括webpack的错误
        clientLogLevel: 'none', //--client-log-level none
        port: 3000,
        open: true,
        hot: true
    },
    plugins: [
        // 热替换
        new webpack.NamedModulesPlugin(),
        // 热替换
        new webpack.HotModuleReplacementPlugin(),
        // 抽离CSS
        new MiniCssExtractPlugin({
			filename: "[name].[hash].css",
			chunkFilename: "[name].[hash].css"
        }),
    ],
	output: {
		filename: '[name].[hash].js',//决定了入口chunk的名称
		chunkFilename: '[name].[hash].js',//决定了非入口chunk的名称
		path: path.resolve(__dirname, 'dist')
	}
});