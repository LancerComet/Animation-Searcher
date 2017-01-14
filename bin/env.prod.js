/**
 * Application entry.
 * Production enviroument.
 */
const port = require('../package.json').port.prod
process.env.NODE_ENV = 'production'

const APP_CONFIG = {
  port,
  env: process.env.NODE_ENV
}

require('../app')(APP_CONFIG)

module.exports = APP_CONFIG
