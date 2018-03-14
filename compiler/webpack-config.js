const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

const config = {
	entry: {
		app: path.resolve('source', 'src-code/app.js')
	},
	output: {
		path: path.resolve('build'),
		filename: 'js/[name]-[hash].js',
		chunkFilename: '[id]-[hash].js',
		publicPath: '/'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules|bower_components)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},
			{
				test: /\.(svg|woff|woff2|ttf|eot)$/,
				use: 'base64-font-loader'
			},
			{
				test: /\.(png|jpg|jpeg|gif)$/,
				use: 'url?name=assets/[name]-[hash].[ext]&limit=100000'
			},
			{
				test: /\.html$/,
				use: 'html',
				include: path.resolve('source', 'src-code'),
				exclude: path.resolve('source', 'src-code/index.html')
			}
		]
	},
	plugins: [
		new webpack.DefinePlugin({
			'process.env': {
				NODE_ENV: JSON.stringify('production')
			}
		}),
		new HtmlWebpackPlugin({
			template: path.resolve('source', 'src-code/index.html'),
			inject: 'body'
		})
	],
	bail: true
};

module.exports = config;
