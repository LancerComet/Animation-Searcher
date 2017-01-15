const appConfig = require('./app-config')
const getRandomQuote = require('./quotes')

module.exports = {
  appInfo: appConfig.appInfo,
  sites: appConfig.sites,
  getRandomQuote
}
