const webpack = require('webpack');
// 清理目录插件
const CleanWebpackPlugin = require('clean-webpack-plugin');
// html 复制模板插件
const HtmlWebpackPlugin = require('html-webpack-plugin');
// vue-loader 插件,15版本后需要单独引入
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// 复制插件
const CopyWebpackPlugin = require('copy-webpack-plugin');
// JS压缩插件
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');

// webpack4.x 用这个分离css
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

//压缩分离的css 
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
	entry: { //入口文件
		index: './src/index.js',
	},
	// 加载器
	module: {
		rules: [{ //匹配VUE,使用vue-loader处理
				test: /\.vue$/,
				use: ['vue-loader'],
				// 热重载默认是开启的,除非是webpack的production
				// loader: 'vue-loader',
				// options: {
				//     hotReload: true // 关闭热重载
				// }
			},
			{ // css==>私有前缀==>css==>模块
				test: /\.css$/,
				use: [MiniCssExtractPlugin.loader, 'css-loader']
			},
			{ //less==>私有前缀==>css==>模块
				test: /\.less$/,
				use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']
			},
			{ //sass==>私有前缀==>css==>模块
				test: /\.scss$/,
				use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
			},
			{ //
				test: /\.js$/, //匹配JS
				exclude: /(node_modules|bower_components|assets)/, //排除两个目录下的js
				use: [{
					loader: 'babel-loader', //使用该加载器进行ES6789=>ES5
				}]
			},
			{
				test: /\.(png|jpg|jpeg|gif|svg)$/,
				use: [{
					loader: 'url-loader',
					options: {
						limit: 10240, //小于10k的图片转成base64
						// 设置处理的文件的输出目录  - file-loader,这里的路径得和原来的相对应,图片放在一起不好管理
						name: '[name].[ext]',
						outputPath: 'assets/images/'
					}
				}]
			},
			{
				test: /\.(woff|woff2|eot|ttf|otf)$/,
				use: [{
					loader: 'file-loader',
					options: {
						name: '[name].[ext]',
						outputPath: 'assets/fonts/'
					}
				}]
			},
		]
	},
	plugins: [
		//清理插件
		new CleanWebpackPlugin(['dist']),
		// html模板插件
		new HtmlWebpackPlugin({
			title: 'mywebpack', //复制后的html的title,需要在模板中加入<%= htmlWebpackPlugin.options.title %>
			template: 'src/index.html', //模板文件路径
			filename: 'index.html', //目标文件名字
			// 压缩 情怀至上,写在VUE内部的css会成为内嵌式,压缩会好一点
			minify: {
				minifyCSS: true, //压缩html内的css
				minifyJS: true, //压缩html内的js
				removeComments: true, //删除html注释
				collapseWhitespace: true, //去除换行和空格
				removeAttributeQuotes: true //去除属性引用
			}
		}),
		//vue-loader 15版本后需要 当做插件使用
		new VueLoaderPlugin(),

		// 压缩抽离的CSS
		new OptimizeCSSAssetsPlugin({ //压缩抽离的CSS
			cssProcessor: require('cssnano'),
			cssProcessorOptions: {
				discardComments: {
					removeAll: true
				}
			},
			canPrint: true
		}),

		//复制 网站图标
		CopyWebpackPlugin([{
			from: './src/favicon.ico'
		}])

	],
	// 分离JS
	optimization: {
		// runtimeChunk: 'single',
		splitChunks: {
			cacheGroups: {
				commons: {
					test: /[\\/]node_modules[\\/]/,
					name: "vendor",
					chunks: "all"
				}
			}
		},
		//分离的包是否需要压缩?
		minimizer: [
			new UglifyJSPlugin({
				cache: true,
				parallel: true, //os.cpu().length -1;提高速度
			})
		]
	},
	performance: { //隐藏文件体积过大时候的警告
		hints: false
	}
};

// 需要 全局安装browser-sync; npm install browser-sync -g;
// browser-sync start --server --files '*.*'