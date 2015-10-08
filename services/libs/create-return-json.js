/*
    Create Return Json By LancerComet at 22:54, 2015.10.08.
	# Carry Your World #
	---
	服务器返回 JSON 创建模块.
	
	Log:
	---
	V0.1.0 - 22:54, 2015.10.08.
	 - 新版的初版.
	 
	Description:
	---
	statusCode: 欲返回的服务器状态码.
	 
	 
*/
var appConfig = require("../config/app-config");

module.exports = function (statusCode, info, detail) {
	
	// Error Handler: No Params. | 无参数报错返回. 
	if (!statusCode || !info || !detail) {
		throw new Error(appConfig.consoleText.error + 'Params should be provided in "info-json-return.js" module.');		
		return;
	}
	
	// Error Handler: statusCode isn't number. | Status 非数字.
	if (isNaN(statusCode)) {
		throw new Error(appConfig.consoleText.error + 'Param "statusCode" in "info-json-return.js" must be "Number".');		
		return;
	}
	
	// Formatting. | 格式化数据.
	statusCode = parseInt(statusCode, 10);
	
	return {
		status: statusCode,
		info: info,
		detail: detail
	}
}