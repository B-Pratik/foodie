const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');

const config = {
	entry: path.resolve('source', 'src-code/app.js'),
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
				test: /\.css$/,
				loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader')
			},
			{
				test: /\.scss$/,
				loader: ExtractTextPlugin.extract('style-loader', 'css-loader!postcss-loader!sass-loader')
			},
			{
				test: /\.(svg|woff|woff2|ttf|eot)$/,
				loader: 'base64-font-loader'
			},
			{
				test: /\.(png|jpg|jpeg|gif)$/,
				loader: 'url?name=assets/[name]-[hash].[ext]&limit=100000'
			},
			{
				test: /\.html$/,
				loaders: ['html'],
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
	]
};

module.exports = config;
