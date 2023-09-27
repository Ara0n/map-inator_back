/* eslint-disable @typescript-eslint/no-var-requires */
/* global require, module, __dirname */
const TerserPlugin = require('terser-webpack-plugin')
const {
	optimize: { LimitChunkCountPlugin },
	IgnorePlugin,
	DefinePlugin,
} = require('webpack')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const fs = require('fs')
const path = require('path')

const sourceRoot = path.normalize(__dirname + '/src')

const babelConfig = {
	presets: [
		[
			'@babel/preset-env',
			{
				targets: {
					esmodules: true,
				},
			},
		],
		'@babel/preset-typescript',
	],
	sourceType: 'module',
}

const main = {
	mode: 'production',
	devtool: 'source-map',
	optimization: {
		minimize: true,
		minimizer: [
			new TerserPlugin({
				include: ['main.cjs', 'migrate.cjs'],
			}),
		],
	},
	resolve: {
		extensions: ['.js', '.ts'],
		extensionAlias: {
			'.js': ['.ts', '.js'],
		},
	},
	target: 'node',
	experiments: {
		topLevelAwait: true,
	},
	module: {
		rules: [
			{
				test: /\.(j|t)s$/,
				include: [sourceRoot],
				exclude: __dirname + '/node_modules',
				use: {
					loader: 'babel-loader',
					options: babelConfig,
				},
			},
		],
	},
	externals: {
		'bufferutil': false,
		'utf-8-validate': false,
		'argon2': 'argon2',
	},
	externalsType: 'node-commonjs',
	externalsPresets: {
		node: true,
	},
}

const commonPlugins = [
	new IgnorePlugin({
		checkResource: res => res === 'utf-8-validate',
	}),
	new LimitChunkCountPlugin({
		maxChunks: 1,
	}),
	new ForkTsCheckerWebpackPlugin({
		typescript: {
			diagnosticOptions: {
				semantic: true,
				syntactic: true,
			},
			mode: 'write-references',
		},
	}),
]

module.exports = [
	{
		...main,
		entry: {
			main: __dirname + '/src/index.ts',
		},
		output: {
			filename: 'main.cjs',
			path: __dirname + '/dist',
		},
		plugins: [
			...commonPlugins,
			new DefinePlugin({
				'process.env.WS_NO_BUFFER_UTIL': true,
			}),
			new CopyPlugin({
				patterns: [
					{ from: __dirname + '/package.json' },
					{ from: __dirname + '/package-lock.json' },
					...(fs.existsSync(__dirname + '/.env.local')
						? [{ from: __dirname + '/.env.local' }]
						: []),
				],
			}),
		],
	},
	{
		...main,
		entry: {
			migrate: __dirname + '/src/migrate.ts',
		},
		output: {
			filename: 'migrate.cjs',
			path: __dirname + '/dist/db',
		},
		externals: {
			...main.externals,
			'node:module': false,
		},
		plugins: [
			...commonPlugins,
			new CopyPlugin({
				patterns: [{ from: __dirname + '/db' }],
			}),
		],
	},
]
