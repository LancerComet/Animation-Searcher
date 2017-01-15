/**
 * 项目构建配置.
 * 基于 Vue Webpack 模板构建.
 *
 * 查看 http://vuejs-templates.github.io/webpack 获取更多信息.
 */

const path = require('path')

const appConfig = require('../../config')
const port = require('../../../port.json')

const feRoot = path.resolve(__dirname, '../')
const projectRoot = path.resolve(__dirname, '../../../')

module.exports = {
  // 基础设置.
  base: {
    app: feRoot + '/src/index.ts',  // 项目入口 JS 文件.
    template: feRoot + '/src/index.jade'  // 项目入口模板路径.
  },

  // 变量设置.
  // 变量将同时适用于 process.env 与 Jade 全局变量.
  env: {
    // App 名称.
    APPNAME: JSON.stringify(appConfig.appInfo.name),

    // 开发服务器端口.
    DEV_SERVER_PORT: JSON.stringify(port.server.dev),

    // App 版本号.
    VERSION: JSON.stringify(appConfig.appInfo.version)
  },

  // 开发环境配置.
  dev: {
    env: require(path.resolve(__dirname, './envs/env.dev.js')),
    port: 3001,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: require(path.resolve(__dirname, './dev.router.js')),

    // CSS Sourcemaps 默认关闭.
    // 可能存在潜在问题, 详见 https://github.com/webpack/css-loader#sourcemaps
    cssSourceMap: false
  },

  // 构建环境配置.
  build: {
    env: require(path.resolve(__dirname, './envs/env.prod.js')),
    index: projectRoot + '/views/index.ejs',
    assetsRoot: projectRoot + '/public',
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,

    // Gzip 默认关闭.
    // 在使用之前需要安装 npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  }
}

/**
 * 随机字符串生成函数.
 * @return {string}
 */
function randomStr () {
  return Math.floor(Math.random() * 100000 * Date.now()).toString(16)
}
