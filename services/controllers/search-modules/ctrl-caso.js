/*
 *  CASO Search Module By LancerComet at 23:14, 2015/10/21.
 *  # Carry Your World #
 *  ---
 *
 *  Info:
 *  ---
 *  注意！华盟的 HTTPS 证书签名不正确，导致 SuperAgent 发送 HTTPS 请求的时候 Node.JS 会返回 “UNABLE_TO_VERIFY_LEAF_SIGNATURE” 错误.
 *  已修改 SuperAgent 的 superagent/lib/node/index.js，在请求参数中加入了 rejectUnauthorized = false 来允许 node 的 https 模块接受不正确证书的网站内容。（搜索LancerComet注释）
 *  http://yoyo.play175.com/p/205.html
 *
 *
 *  ChangeLog:
 *  ---
 *  V0.1.9 - 23:20, 2015.10.21.
 *   + 初版.
 */

var superAgent = require("superagent");
var cheerio = require("cheerio");

var appConfig = require("../../config/app-config");
var codeName = "caso";

function searchModule (req, res, next) {
    "use strict";

    var requestingLink = null;  // Requesting Link for superAgent.
    if (req.body.mode === "switchPage") {
        requestingLink = req.body.link;
    } else {
        var keywords = req.body.keywords;  // Keywords for look-up. | 查询关键字.
        requestingLink = appConfig.site[codeName].url + "/search.php?keyword=" + encodeURIComponent(keywords);
    }


    superAgent
        .get(requestingLink)
        .set('Accept-Encoding', 'gzip, deflate')
        .set('Accept-Language', 'zh-CN')
        .set("Connection", "Keep-Alive")
        .set("DNT","1")
        .set('User-Agent', 'Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; rv:11.0) like Gecko')
        .end(function (superAgentError, superAgentResponse) {

            // Error Handler.
            if (superAgentError) {
                res.status(500).json({
                    status: 500,
                    type: "error",
                    info: "华萌姐：华……华萌姐才没有傲娇呢 ~~ 哼！,,Ծ‸Ծ,,",
                    action: "华萌姐萌死了！",
                    detail: superAgentError
                });
                console.log(appConfig.consoleText.error + "SuperAgent for " + appConfig.site[codeName].codeName + " failed:");
                console.log(superAgentError);
                return false;
            }


            /*
             *     华盟的页面结构
             *     --------------------------------------
             *     结果全部位于 "#main .list_table" 中。
             *     结果 Dom 是 $("#main .list_table").children("tr:gt(0)").
             *     标题位于 $("#main .list_table").children("tr:gt(0)").children("td.title_name").children("a").eq(0).text() 中。
             *     发布日期位于 $("#main .list_table").children("tr:gt(0)").children("td.publishtime").text() 中。
             *     种子链接位于 $("#main .list_table").children("tr:gt(0)").children("td.title_name").children("a").eq(1).children("a").attr("href") 中。
             *     磁力链位于 $("#main .list_table").children("tr:gt(0)").children("td.title_name").children("a").eq(2).children("a").attr("href") 中。
             *     翻页链接位于 $("#footer_content .pager").html();
             *
             */

            // Initialize Cheerio and refer to "$" just like jQuery.
            // 初始化 Cheerio.
            var $ = cheerio.load(superAgentResponse.text);

            // No Result Handler. | 无搜索结果.
            var $listTable = $(".list_table");
            if ($listTable.find("tr").length === 0) {
                console.log(appConfig.consoleText.info + "华盟: 未搜索到内容.");
                res.status(404).json({
                    status: 404,
                    type: "info",
                    info: "华萌姐：没有找到内容~ ＞︿＜",
                    action:"摸摸华萌姐~"
                });
                return true;
            }

            // We have got result ! | 有搜索结果.
            // Definition: DMHY Result Data Object. | 动漫花园搜索结果数据对象.
            var resultObject = Object.create(null);  // Empty object for clean data restoring.
            resultObject.result = [];  // Restore result data. | 存放搜索结果.
                                           // @ Item in "resultObject.result" : { title: String, link: String, magnet: String, Date: String }
            resultObject.pageLink = $("#footer_content").find(".pager").html();  // Page Switcher HTML Fragment. | 翻页按钮 HTML.

            // If there comes pageLink, take replacing action with regexp.
            // 如果存在翻页按钮数据, 进行正则替换.
            if (resultObject.pageLink) {
                var regExp = /href="/g;
                resultObject.pageLink = resultObject.pageLink.replace(regExp, 'href="javascript:void(0)" ng-click="switchPage($event, \'' + codeName + '\')" data-request-link="' + appConfig.site[codeName].url);
            }

            // Push results to "resultObject.result". | 推送搜索结果到结果对象.
            var $resultTr = $listTable.find("tr");
            var resultLength = $resultTr.length;
            $resultTr.each(function () {
                var $titleName = $(this).find(".title_name");
                var resultKey = {
                    title: $titleName.children("a").first().text(),
                    link: appConfig.site[codeName].url + $titleName.children("a").eq(0).attr("href"),
                    torrent: appConfig.site[codeName].url + $titleName.children("a").eq(1).attr("href"),
                    magnet: $titleName.children("a").eq(2).attr("href"),
                    date: $(this).children(".publishtime").text()
                };
                resultObject.result.push(resultKey);
                resultObject.result.length === resultLength ? returnResult() : void(0);
            });

            // Definition: Result-returning function. | 结果返回函数.
            function returnResult () {
                resultObject.result.splice(0, 1);  // Remove First Empty Result.
                var returnObj = {
                    status: 200,
                    info: "华萌姐搜索完毕~~(●'◡'●)ﾉ♥",
                    action: "华萌姐辛苦了！"
                };
                returnObj[codeName] = resultObject;  // { result: [], pageLink: "" }
                res.status(200).json(returnObj);
            }


        });


}

module.exports = searchModule;