/**
 * Application entry.
 * Production enviroument.
 */
process.env.NODE_ENV = 'production'
const APP_CONFIG = {
    port: 50001
}
requir('./app')(APP_CONFIG)
