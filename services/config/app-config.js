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
	devStatus: global.devStatus  // If set to true, the application will require uncompressed javascript-files for debugging.
};

// Console Text Prefix. | 控制台文字前缀.
configuration.consoleText = {
	info: "\n" + configuration.appInfo.appName + ": ",
	caution: "\n" + configuration.appInfo.appName + " Caution: ",
	error: "\n" + configuration.appInfo.appName + " Error: "
};

// Meta Info in Pages. | 页面中的 Meta 信息.
configuration.metaInfo = {
	keywords: "动画,漫画,动漫,音乐,二次元,宅,资源,搜索,下载,Animation,ACG,Download,Searcher,Resource,LancerComet",
	description: "集中下载资源, 节约每滴生命.",
	author: configuration.appInfo.author,
	codeName: configuration.appInfo.codeName
};

// Configuration of targeted sites. | 目标站点的配置信息.
configuration.site = {
	caso: { name: "华盟", codeName: "caso", fullName: "China Animation Subtitle Organization",  url: "https://camoe.org", icon: "http://tp4.sinaimg.cn/1843885343/180/1290319229/0", disabled: false },
	ktxp: { name: "极影", codeName: "ktxp", fullName: "Katong XP",  url: "http://bt.ktxp.org", icon: "http://tp4.sinaimg.cn/3808818207/180/5680524263/0", disabled: false },
	popgo: { name: "漫游", codeName: "popgo", fullName: "Popgo",  url: "http://share.popgo.com", icon: "http://tp1.sinaimg.cn/2661910672/180/5727241391/0", disabled: false },
	dmhy: { name: "动漫花园", codeName: "dmhy", fullName: "DongMan HuaYuan",  url: "http://share.dmhy.org", icon: "http://tp2.sinaimg.cn/1926582581/180/22817929400/0", disabled: false }
};

module.exports = configuration;