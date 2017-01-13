const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const merge = require('webpack-merge')

const baseWebpackConfig = require('./webpack.base.conf')
const config = require('../config')
const utils = require('./utils/utils')
const jadeEnvs = config.env

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/utils/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    loaders: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },

  // eval-source-map is faster for development
  devtool: '#eval-source-map',

  plugins: [
    new webpack.DefinePlugin(merge(jadeEnvs,
      {
        'process.env': config.dev.env,
        NODE_ENV: JSON.stringify(process.env.NODE_ENV)  // 给模板环境单独赋一个 NODE_ENV.
      }
    )),

    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),

    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: config.base.template,
      inject: false
    })
  ]
})
