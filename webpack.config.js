'use strict';

const path = require('path');

module.exports = {
	entry: ['babel-polyfill', './src/app.js'],
	output: {
		path: path.resolve(__dirname, 'dist'),
		publicPath: '/dist/',
		filename: 'build.js',
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							presets: ['env'],
						},
					},
				],
			},
			{ test: /\.handlebars$/, loader: 'handlebars-loader' },
		],
	},
	devServer: {
		contentBase: path.join(__dirname, '/'),
		historyApiFallback: true,
		noInfo: true,
	},
};
