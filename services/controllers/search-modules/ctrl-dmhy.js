/*
 *  Dongman Huayuan Search Module By LancerComet at 23:14, 2015/10/21.
 *  # Carry Your World #
 *  ---
 *
 *
 *  ChangeLog:
 *  ---
 *  V0.1.9 - 23:19, 2015.10.21.
 *   + 初版.
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

// Definition: DMHY Cookie Refresher. | 动漫花园 Cookie 刷新函数.
(function dmhyCookieFunction () {

    // Action: Set Interval to renew cookie from DMHY. | 设置动漫花园 Cookie 更新计时器.
    setInterval( function () {
        dmhyCookieRenew();
    }, 1000 * 60 * dmhyCookie.visitInterval);

    // Main Logic.
    function dmhyCookieRenew () {
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
})();

// Definition: Dongman Huayuan Searching Module Main Logic. | 动漫花园搜索模块主逻辑.
function dmhyModule (req, res, next) {

    



}

module.exports = dmhyModule;