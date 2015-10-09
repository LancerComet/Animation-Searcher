/*
    Animation Searcher V2.0 Configuration By LancerComet at 22:15, 2015.10.08.
	# Carry Your World #
	---
	程序设置文件.
*/

// Definition: Configuration Object. | 设置对象本体.
// Total a blank object.
var configuration = Object.create(null);

// Application Information. | 应用基本信息.
configuration.appInfo = {
	appName: "Animation Seacher V2.0",
	author: "LancerComet",
	version: "0.1.0",
	codeName: "Renascence.",
	sign: "# Carry Your Word #",
	devStatus: true  // If set to true, the application will require uncompressed javascript-files for debugging.
};

// Console Text Prefix. | 控制台文字前缀.
configuration.consoleText = {
	caution: "Animation Searcher Caution: ",
	error: "Animation Searcher Error: "
};

// Meta Info in Pages. | 页面中的 Meta 信息.
configuration.metaInfo = {
	keywords: "动画,漫画,动漫,音乐,二次元,宅,资源,搜索,下载,Animation,ACG,Download,Searcher,Resource,LancerComet",
	description: "集中下载资源, 节约每滴生命.",
	author: configuration.appInfo.author,
	codeName: configuration.appInfo.codeName
};

module.exports = configuration;