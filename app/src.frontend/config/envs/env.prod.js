/**
 * 发布环境 process.env 定义.
 * 继承于 config/index.js 中的 env 设置.
 */

const merge = require('webpack-merge')
const baseEnv = require('../index').env

module.exports = merge(baseEnv, {
  NODE_ENV: '"production"'
})
