/*
    Index Controller By LancerComet at 22:46, 2015.10.08.
	# Carry Your World #
	---
	首页控制器.
	
	Log:
	---
	V0.1.0 - 22:44, 2015.10.08.
	 - 新版的初版.
*/

var appConfig = require("../config/app-config");
var randomTitle = require("../libs/random-title");


// Definition: Main Service Function.
function indexService (req, res, next) {
	
	// Definition: Rendering Variables. | 渲染用变量定义.
	var renderVar = {
		appConfig: appConfig,
		title: appConfig.appInfo.appName + " | " + randomTitle(),
		randomTitle: randomTitle()
	};
	
	res.render("index.html", renderVar);
}


// Export module to outside.
module.exports = indexService;