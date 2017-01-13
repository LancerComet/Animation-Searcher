/**
 * Application entry.
 * Development enviroument.
 */
process.env.NODE_ENV = 'development'

const APP_CONFIG = {
  port: 3000,
  env: process.env.NODE_ENV
}

require('./app')(APP_CONFIG)

module.exports = APP_CONFIG
