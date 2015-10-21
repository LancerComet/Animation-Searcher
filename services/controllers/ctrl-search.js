/*
    Search Module By LancerComet at 22:45, 2015.10.08.
	# Carry Your World #
	---
	搜索控制器模块.
	
	Log:
	---
	V0.1.0 - 22:44, 2015.10.08.
	 - 新版的初版.
*/ 

var cheerio = require("cheerio");

var appConfig = require("../config/app-config");
var searchModule = require("./search-modules/ctrl-requirement");

function searchService (req, res, next) {

	// Definition: Requiring Search Module.
	var moduleName = req.url.substr(8, req.url.length);
	searchModule[moduleName] ? searchModule[moduleName](req, res, next) : console.log(appConfig.consoleText.caution + 'Do not support lookling up "' + moduleName + '". No such module exists.');  // Execute Function in Search Module. (If exists.)


}

module.exports = searchService;