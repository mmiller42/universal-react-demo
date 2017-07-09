const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const nodeExternals = require('webpack-node-externals')

module.exports = ({ base }) => {
	const env = process.env.NODE_env

	const config = {
		context: __dirname,
		target: ({ client: 'web', server: 'node' })[base],
		node: {
			__dirname: false,
		},
		resolve: {
			modules: ['node_modules'],
			extensions: ['.js', '.jsx'],
		},
		entry: {
			[base]: ['babel-polyfill', `./src/${base}`],
		},
		output: {
			path: path.resolve(__dirname, 'dist'),
			publicPath: '/',
			filename: ({ client: 'public/[name].[hash].js', server: 'server.js' })[base],
		},
		module: {
			rules: [
				{
					test: /\.(js|jsx)$/,
					exclude: /node_modules/,
					use: 'babel-loader',
				},
			],
		},
		plugins: [
			new webpack.NoEmitOnErrorsPlugin(),
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify(env),
			}),
		],
	}

	if (base === 'client') {
		config.plugins.push(
			new HtmlWebpackPlugin({
				filename: 'index.html',
				template: 'src/index.html',
				title: 'Universal React Redux',
				hash: true,
			})
		)
	}

	if (env === 'development' && base === 'client') {
		config.cache = true
		config.devtool = 'cheap-eval-source-map'
		config.entry.client.unshift(
			'react-hot-loader/patch',
			'webpack-dev-server/client?http://localhost:8080',
			'webpack/hot/only-dev-server'
		)
		config.plugins.unshift(
			new webpack.HotModuleReplacementPlugin(),
			new webpack.NamedModulesPlugin()
		)
		config.devServer = {
			hot: true,
			contentBase: path.resolve(__dirname, 'dist'),
			publicPath: config.output.publicPath,
			historyApiFallback: true,
		}
	} else if (env === 'production') {
		config.devtool = 'source-map'

		config.plugins.push(
			new webpack.optimize.UglifyJsPlugin({
				sourceMap: true,
			})
		)
	}

	if (base === 'server') {
		config.externals = [nodeExternals()]
	}

	return config
}
