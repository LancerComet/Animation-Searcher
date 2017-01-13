/*
    Error Module By LancerComet at 22:53, 2015.10.08.
	# Carry Your World #
	---
	搜索控制器模块.
	
	Log:
	---
	V0.1.0 - 22:53, 2015.10.08.
	 - 新版的初版.
*/

"use strict";
var createReturnJson = require("../libs/create-return-json");


// Set Text for Returning.
var text = {
	400: {
		info: "您的请求有误哦~",
		detail: "请求错误, 服务器无法识别您的请求, 通常是因为请求参数或格式错误或丢失."
	},
	403: {
		info: "这里~不可以!~",
		detail: "您无权访问这里."
	},
	404: {
		info: "啥都木有哦~",
		detail: "服务器未找到您请求的数据."
	},
	500: {
		info: "ʅ（｡☉౪ ⊙｡）ʃ 服务器粗错惹~",
		detail: "服务器内部错误, 请耐心等待恢复."
	}
};


var errorEvent = {
	400: function (req, res, next) {
		res.status(400).json(createReturnJson(400, text[400].info, text[400].detail));
		return false;
	},
	403: function (req, res, next) {
		res.status(403).json(createReturnJson(403, text[403].info, text[403].detail));
		return false;		
	},
	404: function (req, res, next) {
		res.status(404).json(createReturnJson(404, text[404].info, text[404].detail));
		return false;
	},
	500: function (req, res, next) {
		res.status(500).json(createReturnJson(500, text[500].info, text[500].detail));
		return false;
	}
};


module.exports = {
	400: errorEvent[400],
	403: errorEvent[403],
	404: errorEvent[404],
	500: errorEvent[500]
};