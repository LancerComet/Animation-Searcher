/*
 *  Dev Router Define By LancerComet at 16:37, 2016/7/15.
 *  # Carry Your World #
 *  ---
 *  开发服务器路由定义.
 *  功能基于 http-proxy-middleware, 文档详见 https://github.com/chimurai/http-proxy-middleware
 *
 *  使用方法：
 *  ---
 *  请整段复制下来，将字段更换为自己需要的路由即可。
 *
 */
'use strict'

const DEV_SERVER_PORT = require('../../../bin/env.dev').port

class RouterConfig {
  constructor (url) {
    this.target = `http://localhost:${DEV_SERVER_PORT}${url}`
    this.changeOrigin = true
    this.pathRewrite = {}
    this.onProxyReq = function (proxyRes, req, res) {}
    this.onProxyRes = function (proxyRes, req, res) {}
  }
}

const config = {};

// 同目标路由转发.
(function () {
  const proxyURLS = []

  proxyURLS.forEach(url => {
    config[url] = new RouterConfig(url)
  })
})();

// 目标不匹配的特例.
(function () {
  const specialRoles = [
    // { origin: '/test', target: '/api/v1/test' }
  ]

  specialRoles.forEach(item => {
    config[item.origin] = new RouterConfig(item.target)
  })
})()

module.exports = config

// Cookie domain rewriter.
function cookieRewriter (proxyRes) {
  if (!proxyRes.headers['set-cookie']) return
  proxyRes.headers['set-cookie'].forEach((value, index) => {
    proxyRes.headers['set-cookie'][index] = value.replace(/domain=.+/, 'domain=localhost')
  })
}
