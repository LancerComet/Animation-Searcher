/*
    Animation Searcher V2.0 Configuration By LancerComet at 22:15, 2015.10.08.
	# Carry Your World #
	---
	程序设置文件.
*/

// Definition: Configuration Object. | 设置对象本体.
// 对象为一个完全空白的对象, 不存在任何 prototype 方法.
var configuration = Object.create(null);

// Application Information. | 应用基本信息.
configuration.appInfo = {
	appName: "Animation Seacher V2.0",
	author: "LancerComet",
	version: "0.1.0",
	codeName: "Renascence."
};

// Console Text Prefix. | 控制台文字前缀.
configuration.consoleText = {
	caution: "Animation Searcher Caution: ",
	error: "Animation Searcher Error: "
};

// Meta Info in Pages. | 页面中的 Meta 信息.
configuration.metaInfo = {
	keywords: "",
	description: "",
	author: configuration.appInfo.author
};

module.exports = configuration;