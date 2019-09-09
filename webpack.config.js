
const { resolve } = require('path');

module.exports = {
	mode: 'development',
	devtool: 'source-map',
	resolve: {
		extensions: ['.js', '.ts', '.html', '.css']
	},
	entry: resolve(__dirname, './src/index.ts'),
	output: {
		filename: 'deadcells.js',
		libraryTarget: 'var',
		library: 'deadcells'
	},
	module: {
		rules: [
			{
				test: /\.ts$/,
				exclude: /node_modules/,
				use: [
					{ loader: 'ts-loader' }
				]
			},
			{
				enforce: 'pre',
				test: /\.(js|ts)$/,
				loader: 'source-map-loader'
			}
		]
	},
	devServer: {
		host: '0.0.0.0',
		contentBase: [ __dirname, resolve(__dirname, './static') ],
		historyApiFallback: {
			rewrites: [
				{ from: /^\/$/, to: '/index.html' }
			]
		},
		watchOptions: {
			watch: true
		}
	}
};