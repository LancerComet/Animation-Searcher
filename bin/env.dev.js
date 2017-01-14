/**
 * Application entry.
 * Development enviroument.
 */
const port = require('../package.json').port.dev
process.env.NODE_ENV = 'development'

const APP_CONFIG = {
  port,
  env: process.env.NODE_ENV
}

require('../app')(APP_CONFIG)

module.exports = APP_CONFIG