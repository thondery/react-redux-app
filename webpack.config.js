'use strict'

import config from './config'
import webpack from 'webpack'
import path from 'path'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin'

const paths = config.utils_paths
const {__DEV__, __PROD__, __TEST__} = config.globals

const webpackConfig = {
  name: 'app:config',
  target: 'web',
  resolve: {
    root: paths.client(),
    extensions: ['', '.js', '.jsx', '.json']
  },
  module: {},
  //devtool: 'source-map'
}

// ------------------------------------
// Entry Points
// ------------------------------------
webpackConfig.entry = {
  vendor: config.compiler_vendor,
  app: paths.client('main.js')
}

// ------------------------------------
// Bundle Output
// ------------------------------------
webpackConfig.output = {
  path: paths.dist(),
  filename: '[name].bundle.js',
  publicPath: './'
}

// ------------------------------------
// Plugins
// ------------------------------------
webpackConfig.plugins = [
  new webpack.DefinePlugin(config.globals),
  new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
  new ExtractTextPlugin('[name].bundle.css'),
  new HtmlWebpackPlugin({
    template: './src/index.html',
    hash: false,
    filename: 'index.html',
    inject: 'body',
    minify: {
      collapseWhitespace: true
    }
  })
]

if (__DEV__) {
  webpackConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  )
} else if (__PROD__) {
  webpackConfig.plugins.push(
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false
      }
    })
  )
}

// ------------------------------------
// Loaders
// ------------------------------------
// JavaScript / JSON
webpackConfig.module.loaders = [
  {
    test: /\.(js|jsx|es6)?$/,
    exclude: /node_modules/,
    loader: 'babel',
    query: {
      cacheDirectory: true,
      presets: ['es2015', 'stage-0', 'react'],
      plugins: ['transform-runtime']
    }
  },
  {
    test: /\.json$/,
    loader: 'json-loader'
  }
]

// ------------------------------------
// Style Loaders
// ------------------------------------
webpackConfig.module.loaders.push(
  {
    test: /\.css$/,
    loader: ExtractTextPlugin.extract(
      'css?sourceMap!' + 'autoprefixer-loader'
    )
  },
  {
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract(
      'css?sourceMap&-restructuring!' + 'autoprefixer-loader!' + 'sass?sourceMap'
    )
  }
)

// ------------------------------------
// File Loaders
// ------------------------------------
webpackConfig.module.loaders.push(
  {
    test: /\.(png|jpg|gif)$/,
    loader: 'url-loader?mimetype=image/png&limit=8192&name=img/[sha512:hash:base64:7].[ext]'
  },
  {
    test: /\.(woff|woff2|eot|ttf|svg)(\?.*$|$)/,
    loader: 'url-loader?importLoaders=1&limit=10000&name=fonts/[name].[ext]'
  }
)

export default webpackConfig