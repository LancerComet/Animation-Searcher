/**
 * Application entry.
 * Development enviroument.
 */
process.env.NODE_ENV = 'development'
const APP_CONFIG = {
    port: 3000
}
requir('./app')(APP_CONFIG)
