/**
 * Animation Searcher V2.0 Application.js Edited By LancerComet at 22:02, 2015.10.08.
 * # Carry Your World #
 *
 * @author: LancerComet
 * @license: GPLv3
 *
 * 程序引用了 Socket.io, 为了正常使用其内置路由 '/socket.io', 已不再使用 Express 框架的 www 文件, 转在 app.js 中直接设置服务器.
 */
const debug = require('debug')('animation-searcher')
const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const app = express()

const appConfig = require('./app/config')
const service = require('./app/src.server/services')

module.exports = ({ port, env }) => {
  // Setup port.
  app.set('port', port)

  // View Engine.
  app.set('views', path.join(__dirname, 'views'))
  app.set('view engine', 'ejs')

  // Setup http server.
  const http = require('http').Server(app)
  const io = require('socket.io')(http)

  http.listen(port, () => {
    console.log(`${appConfig.appInfo.name} By © 2015 - 2017 LancerComet.`)
    console.log(`Version: ${appConfig.appInfo.version}`)
    console.log('--------------------')
    console.log(`Server is running at port ${app.get('port')} in ${env} enviroument.\n`)
    debug('listening')
  })

  // WebSocket Service Initialization.
  service.webSocket(io)

  // CORS is allowed.
  app.all('*', (req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*.lancercomet.com')
    res.header('Access-Control-Allow-Headers', 'X-Requested-With')
    res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
    next()
  })

  // Middlewares.
  app.use(favicon(path.resolve(__dirname, './public/favicon.ico')))
  app.use(logger('dev'))
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(cookieParser())
  app.use(express.static(path.join(__dirname, 'public')))

  // Router.
  const routes = require('./app/src.server/routes')
  app.use('/', routes)

  // Error Handlers.
  app.use((err, req, res, next) => {
    res.status(err.status || 500)
      .render('error', {
        message: err.message,
        error: env === 'development'
          ? err
          : {}
      })
  })
}
