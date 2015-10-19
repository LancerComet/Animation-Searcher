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

var superAgent = require("superagent");
var cheerio = require("cheerio");

var customPart = require("./ctrl-search-custom"); 

function searchService (req, res, next) {

	// Definition: Requiring Search Module.
	var moduleName = req.url.substr(8, req.url.length);
	customPart[moduleName](req, res, next);  // Execute Funciton in Search Module.


}

module.exports = searchService;