/**
 * Search Module By LancerComet at 22:45, 2015.10.08.
 * # Carry Your World #
 * ---
 * 搜索控制器模块.
 * 
 * ChangeLog:
 * ---
 * V0.3.0 - 1:16, 2017.01.13.
 *  + New Update.
 * 
 * V0.1.0 - 22:44, 2015.10.08.
 *  - 新版的初版.
 */

const cheerio = require('cheerio')

const appConfig = require('../config/app-config')
const searchModule = require('./search-modules/ctrl-requirement')

module.exports = function (req, res, next) {
  const targetSite = req.query.site
}

function searchService (req, res, next) {

	// Definition: Requiring Search Module.
	var moduleName = req.url.substr(8, req.url.length);
	searchModule[moduleName] ? searchModule[moduleName](req, res, next) : console.log(appConfig.consoleText.caution + 'Do not support lookling up '' + moduleName + ''. No such module exists.');  // Execute Function in Search Module. (If exists.)


}

module.exports = searchService;