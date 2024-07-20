const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	entry: {
		content_script: './src/index.ts',
		background: './src/background/background.ts',
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
	},
	resolve: {
		extensions: ['.ts', '.js'],
	},
	devtool: 'inline-source-map',
	devServer: {
		static: {
			directory: path.resolve(__dirname, 'dist'),
		},
		devMiddleware: {
			writeToDisk: true,
		},
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	plugins: [
		new CleanWebpackPlugin(),
		new webpack.ProgressPlugin(),
		new CopyPlugin({
			patterns: [
				{
					from: path.resolve(__dirname, './manifest'),
					to: path.resolve(__dirname, './dist')
				},
				{
					from: path.resolve(__dirname, './public'),
					to: path.resolve(__dirname, './dist')
				},
			]
		})
	],
};
