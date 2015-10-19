/*
    Search Module Custom Part By LancerComet at 22:40, 2015.10.08.
	# Carry Your World #
	---
	搜索控制器自定义部分.
	不同站点的页面结构不同, 定义在此处.

    注意！华盟的 HTTPS 证书签名不正确，导致 SuperAgent 发送 HTTPS 请求的时候 Node.JS 会返回 “UNABLE_TO_VERIFY_LEAF_SIGNATURE” 错误.
    已修改 SuperAgent 的 superagent/lib/node/index.js，在请求参数中加入了 rejectUnauthorized = false 来允许 node 的 https 模块接受不正确证书的网站内容。（搜索LancerComet注释）
    http://yoyo.play175.com/p/205.html

	Log:
	---
	V0.1.7 - 0:02, 2015.10.20.
	 + 后端搜索逻辑.

	V0.1.0 - 22:40, 2015.10.08.
	 - 新版的初版. 
*/

var superAgent = require("superagent");
var cheerio = require("cheerio");

// Definition: Cookie Information from DMHY. | 动漫花园的 Cookie 信息.
// 每次访问的时候携带访问.
// DMHY will check client's cookie in order to confirm you are not the robot.
// We'll visit DMHY every 3 minutes and renew the latest cookie in order to avoid robot-detection.
var dmhyCookie = {
	cookie: null,  // Store the latest cookie information.
	visitStatus: true,  // @ False: Application will stop visiting DMHY.
	visitInterval: 3  // Visit Interval: 3 minutes.
};

var exportObj = {

	caso: function (req, res, next) {
	},

	ktxp: function (req, res, next) {
	},

	popgo: function (req, res, next) {

	},

	dmhy: function (req, res, next) {

	},

	dmhyCookieRenew: function dmhyCookieRenew () {
		if (dmhyCookie.visitStatus !== true) {
			setTimeout(function () {
				console.log("Search Module DMHY: 即将在30秒后重新尝试访问动漫花园....");
				dmhyCookieRenew();
			}, 30000);
		} else {
			console.log("Search Module DMHY: 即将开始预先访问动漫花园取得 Cookie...");
			superAgent
				.get("https://share.dmhy.org")
				.set('Accept', 'text/html, application/xhtml+xml, */*')
				.set('Accept-Encoding', 'gzip, deflate')
				.set('Accept-Language', 'zh-CN')
				.set("Connection", "Keep-Alive")
				.set("DNT", "1")
				.set('User-Agent', 'Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; rv:11.0) like Gecko')
				.set('Host', 'share.dmhy.org')
				.end(function (err, res) {
					if (err) {
						console.log("Search Module DMHY: 动漫花园 Cookie 更新失败:");
						console.log(err);
						return false;
					}
					dmhyCookie.cookie = res.header["set-cookie"];
					console.log("Search Module DMHY: 动漫花园访问完毕并更新 Cookie.");
				});
		}
	}

};

// Action: Set Interval to renew cookie from DMHY. | 设置动漫花园 Cookie 更新计时器.
setInterval( function () {
	exportObj.dmhyCookieRenew();
}, 1000 * 60 * dmhyCookie.visitInterval);

module.exports = exportObj;