const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
	// 起点となるエントリーポイントのファイル
	entry: {
		content_script: './src/index.ts',
		background: './src/background/background.ts',
	},
	// dist配下に「content_script.js」と「background.js」という名前で吐き出しなさい
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name].js',
	},
	// moduleのimport時に拡張子を省ける設定（今回使わないです）
	resolve: {
		extensions: ['.ts', '.js'],
	},
	// ソースマップを有効にする設定
	devtool: 'inline-source-map',
	// webpack-dev-serverの設定
	devServer: {
		// staticファイルをどこのパスから提供するかの設定
		static: {
			directory: path.resolve(__dirname, 'dist'),
		},
		// ファイルに変更があったら、メモリ上だけでなく、dist配下のファイルも書き換える設定
		devMiddleware: {
			writeToDisk: true,
		},
	},
	// 「.ts」ファイルを「.js」ファイルに変換するときに「ts-loader」を使いなさい
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				use: 'ts-loader',
				exclude: /node_modules/,
			},
		],
	},
	// WebpackのPlugin関係
	plugins: [
		// ファイルに変更があったら、既存のdistファイルの中身を消す設定
		new CleanWebpackPlugin(),
		// ビルドの進捗度を表示してくれるPlugin
		new webpack.ProgressPlugin(),
		// 「manifest.json」や「public」配下のファイルはビルド不要なので、そのままdist配下の吐き出しなさいというやつ
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
