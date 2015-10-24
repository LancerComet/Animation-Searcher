/*
 *  Dongman Huayuan Search Module By LancerComet at 23:14, 2015/10/21.
 *  ? 2015 LancerComet.
 *  # Carry Your World #
 *  ---
 *
 *  Descrption:
 *  ---
 *  动漫花园的标准搜索：
 *  http://share.dmhy.org/topics/list/page/页码?keyword=关键字
 *  注意！动漫花园不可以在短时间内发出大量请求！否则会要求填写验证码.
 *
 *  ChangeLog:
 *  ---
 *  V0.1.9 - 23:19, 2015.10.21.
 *   + 初版.
 */

var superAgent = require("superagent");
var cheerio = require("cheerio");

var appConfig = require("../../config/app-config");

// Definition: Cookie Information from DMHY. | 动漫花园的 Cookie 信息.
// 每次访问的时候携带访问.
// DMHY will check client's cookie in order to confirm you are not the robot.
// We'll visit DMHY every 3 minutes and renew the latest cookie in order to avoid robot-detection.
var dmhyCookie = {
    cookie: null,  // Store the latest cookie information.
    visitStatus: true,  // @ False: Prevent Application from visiting DMHY.
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
        if (!dmhyCookie.visitStatus) {
            setTimeout(function () {
                console.log("Search Module DMHY: 即将在30秒后重新尝试访问动漫花园....");
                dmhyCookieRenew();
            }, 30000);
        } else {
            console.log("Search Module DMHY: 即将开始预先访问动漫花园取得 Cookie...");
            superAgent
                .get(appConfig.site.dmhy.url)
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
    dmhyCookie.visitStatus = false;  // Block interval to renew cookie while searching process is on. | 在访问期间阻止计时器刷新 Cookie.

    var requestingLink = null;  // Requesting Link for superAgent.
    if (req.body.mode === "switchPage") {
        requestingLink = req.body.link;
    } else {
        var keywords = req.body.keywords;  // Keywords for look-up. | 查询关键字.
        requestingLink = appConfig.site.dmhy.url + "/topics/list?keyword=" + encodeURIComponent(keywords);
    }

    superAgent
        .get(requestingLink)
        .set('Accept-Encoding', 'gzip, deflate')
        .set('Accept-Language', 'zh-CN')
        .set("Connection", "Keep-Alive")
        .set("Cookie", dmhyCookie.cookie)
        .set("DNT","1")
        .set('User-Agent', 'Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; rv:11.0) like Gecko')
        .set('Host', 'share.dmhy.org')
        .end(function (superAgentError, superAgentResponse) {

            // Error Handler.
            if (superAgentError) {
                res.status(500).json({
                    status: 500,
                    type: "error",
                    info: "动漫花园搜索粗错，又炸了吧~ (╯╬▔皿▔)╯︵┻━┻",
                    action: "等等再来吧~",
                    detail: superAgentError
                });
                console.log(appConfig.consoleText.error + "SuperAgent for " + appConfig.site.dmhy.codeName + " failed:");
                console.log(superAgentError);
                dmhyCookie.visitStatus = true;
                return false;
            }

            // Initialize Cheerio and refer to "$" just like jQuery.
            // 初始化 Cheerio.
            var $ = cheerio.load(superAgentResponse.text);

            // No Result Handler. | 无搜索结果.
            var $topicList = $("#topic_list");
            if ($topicList.length === 0) {
                console.log(appConfig.consoleText.info + "动漫花园: 未搜索到内容.");
                res.status(404).json({
                    status: 404,
                    type: "info",
                    info: "动漫花园：没有找到内容~ ＞︿＜",
                    action:"你已经尽力了！"
                });
                dmhyCookie.visitStatus = true;
                return true;
            }

            // We have got result ! | 有搜索结果.
            // Definition: DMHY Result Data Object. | 动漫花园搜索结果数据对象.
            var dmhyResultObject = Object.create(null);  // Empty object for clean data restoring.
            dmhyResultObject.result = [];  // Restore result data. | 存放搜索结果.
                                           // @ Item in "dmhyResultObject.result" : { title: String, link: String, magnet: String, Date: String }
            dmhyResultObject.pageLink = $topicList.siblings(".nav_title").html();  // Page Switcher HTML Fragment. | 翻页按钮 HTML.

            // If there comes pageLink, take replacing action with regexp.
            // 如果存在翻页按钮数据, 进行正则替换.
            if (dmhyResultObject.pageLink) {
                var regExp = /href="/g;
                var replacedPageLink = dmhyResultObject.pageLink.replace(regExp, 'href="javascript:void(0)" ng-click="switchPage($event, \'dmhy\')" data-request-link="' + appConfig.site.dmhy.url);
                dmhyResultObject.pageLink = replacedPageLink.substring(replacedPageLink.indexOf("<a href="), replacedPageLink.length);
            }

            // Push results to "dmhyResultObject.result". | 推送搜索结果到结果对象.
            var $resultTr = $topicList.find("tr");
            var resultLength = $resultTr.length;
            $resultTr.each(function () {
                var resultKey = {
                    title: $(this).find("td.title a").text(),
                    link: appConfig.site.dmhy.url + $(this).find("td.title a").attr("href"),
                    magnet: $(this).children("td").eq(3).children("a").attr("href"),
                    date: $(this).children("td").eq(0).children("span").text()
                };
                dmhyResultObject.result.push(resultKey);
                dmhyResultObject.result.length === resultLength ? returnResult() : void(0);
            });

            // Definition: Result-returning function. | 结果返回函数.
            function returnResult () {
                res.status(200).json({
                    status: 200,
                    info: "动漫花园搜索完毕~~(●'◡'●)ﾉ♥",
                    action: "OK！",
                    dmhy: dmhyResultObject  // { result: [], pageLink: "" }
                });
            }


        });




}

module.exports = dmhyModule;