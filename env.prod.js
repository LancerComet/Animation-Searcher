/**
 * Application entry.
 * Production enviroument.
 */
process.env.NODE_ENV = 'production'

const APP_CONFIG = {
  port: 50001,
  env: process.env.NODE_ENV
}

require('./app')(APP_CONFIG)

module.exports = APP_CONFIG
