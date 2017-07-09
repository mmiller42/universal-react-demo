const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const nodeExternals = require('webpack-node-externals')

// Webpack 2 lets you define a function that accepts a config object. Then,
// pointing the Webpack CLI to this file and passing it config params results in
// it calling the function with said params in the object. Hell of a lot nicer
// than a bunch of very similar config files, weird merging behavior, and a
// dozen environment variables. Here, base is either client or server.
module.exports = ({ base }) => {
	const env = process.env.NODE_ENV

	const config = {
		context: __dirname,
		target: { client: 'web', server: 'node' }[base],
		node: {
			// Pass __dirname along as is (we need it in server.js)
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
			// Put the client bundle in dist/public and the server bundle just in dist
			filename: { client: 'public/[name].[hash].js', server: 'server.js' }[
				base
			],
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
		// The frontend build will generate the index.html file.
		config.plugins.push(
			new HtmlWebpackPlugin({
				filename: 'index.html',
				template: 'src/index.html',
				hash: true,
			})
		)
	}

	if (env === 'development' && base === 'client') {
		// This is all configuration for the hot reloading server.
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
		// This just makes sure that, in the Node build, we don't bundle anything
		// that exists in node_modules.
		config.externals = [nodeExternals()]
	}

	return config
}
