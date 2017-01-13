/**
 * 测试环境 process.env 定义.
 * 继承于 config/index.js 中的 env 设置.
 */

const merge = require('webpack-merge')
const devEnv = require('./env.dev.js')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"'
})
