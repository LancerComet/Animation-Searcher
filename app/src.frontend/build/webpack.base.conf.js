/**
 * Webpack Basic Config.
 */
const autoprefixer = require('autoprefixer')
const path = require('path')

const config = require('../config')
const env = process.env.NODE_ENV
const utils = require('./utils/utils')

// SourceMap.
// Read configuration from "../config/".
const cssSourceMapDev = (env === 'development' && config.dev.cssSourceMap)
const cssSourceMapProd = (env === 'production' && config.build.productionSourceMap)
const useCssSourceMap = cssSourceMapDev || cssSourceMapProd

// Frontend source files.
const projectIncludePaths = [
  path.resolve(__dirname, '../src')
]
const srcPath = projectIncludePaths[0]

// Root path.
const feRoot = path.resolve(__dirname, '../')
const projectRoot = path.resovle(__dirname, '../../../')
const nodeModulesPath = path.resolve(projectRoot, 'node_modules/')

// Auto prefixer configuration.
const autoprefixers = ['> 1%', 'last 3 versions', 'Firefox ESR', 'ie 9']

module.exports = {
  entry: {
    app: config.base.app
  },

  output: {
    path: config.build.assetsRoot,
    publicPath: process.env.NODE_ENV === 'production'
      ? config.build.assetsPublicPath
      : config.dev.assetsPublicPath,
    filename: '[name].js'
  },

  resolve: {
    extensions: ['', '.js', '.vue', '.ts', '.tsx', '.json'],
    fallback: [nodeModulesPath],
    alias: {
      'vue$': 'vue/dist/vue.common.js',
      'src': srcPath
    }
  },

  resolveLoader: {
    fallback: [nodeModulesPath]
  },

  module: {
    preLoaders: [
      {
        test: /\.vue$/,
        loader: 'eslint',
        include: srcPath
      },
      {
        test: /\.js$/,
        loader: 'eslint',
        include: srcPath
      }
    ],

    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.jsx$/,
        loader: 'babel',
        include: projectIncludePaths
      },
      {
        test: /\.tsx?$/,
        loader: 'ts',
        include: projectIncludePaths
      },
      {
        test: /\.json$/,
        loader: 'json'
      },
      {
        test: /\.jade$/,
        loader: 'jade'
      },
      {
        test: /\.styl$/,
        loader: 'postcss!stylus'
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 5000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url',
        query: {
          limit: 5000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  },

  eslint: {
    formatter: require('eslint-friendly-formatter')
  },

  postcss: [autoprefixer({ browsers: autoprefixers })],

  vue: {
    loaders: utils.cssLoaders({ sourceMap: useCssSourceMap }),
    postcss: [
      require('autoprefixer')({
        browsers: autoprefixers
      })
    ]
  }
}
