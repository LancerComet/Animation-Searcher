/*
 *  Popgo Search Module By LancerComet at 23:14, 2015/10/21.
 *  # Carry Your World #
 *  ---
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
var codeName = "popgo";

function searchModule (req, res, next) {
    "use strict";

    var requestingLink = null;  // Requesting Link for superAgent.
    if (req.body.mode === "switchPage") {
        requestingLink = req.body.link;
    } else {
        var keywords = req.body.keywords;  // Keywords for look-up. | 查询关键字.
        requestingLink = appConfig.site[codeName].url + "/search.php?title=" + encodeURIComponent(keywords);
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
                    info: "漫游身体不佳，还请各位善待~ (＞﹏＜)",
                    action: "等等再来吧~",
                    detail: superAgentError
                });
                console.log(appConfig.consoleText.error + "SuperAgent for " + appConfig.site[codeName].codeName + " failed:");
                console.log(superAgentError);
                return false;
            }


            /*
             *     漫游的页面结构
             *     --------------------------------------
             *     结果全部位于"#index_maintable"的Table中。
             *     标题位于$("#index_maintable .inde_tab_seedname a").attr("title")中。
             *     磁力链位于$("#index_maintable tr td:last a").attr("href")中。
             *     换页链接为$("#page").children().html() + $("#page a").last()。
             *
             */

            // Initialize Cheerio and refer to "$" just like jQuery.
            // 初始化 Cheerio.
            var $ = cheerio.load(superAgentResponse.text);

            // No Result Handler. | 无搜索结果.
            var $listTable = $("#index_maintable");
            if ($listTable.find("tr").length === 0) {
                console.log(appConfig.consoleText.info + "华盟: 未搜索到内容.");
                res.status(404).json({
                    status: 404,
                    type: "info",
                    info: "漫游：没有找到内容~(,,•́ . •̀,,)",
                    action:"你已经很努力了！"
                });
                return true;
            }

            // We have got result ! | 有搜索结果.
            // Definition: DMHY Result Data Object. | 动漫花园搜索结果数据对象.
            var resultObject = Object.create(null);  // Empty object for clean data restoring.
            resultObject.result = [];  // Restore result data. | 存放搜索结果.
            // @ Item in "resultObject.result" : { title: String, link: String, magnet: String, Date: String }
            resultObject.pageLink = $("#page").html();  // Page Switcher HTML Fragment. | 翻页按钮 HTML.

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
                var $seedName = $(this).children(".inde_tab_seedname");
                var resultKey = {
                    title: $seedName.children("a").attr("title"),
                    link: appConfig.site[codeName].url + $seedName.children("a").attr("title"),
                    date: $(this).children("td").eq(1).text(),
                    magnet: $(this).children("td").last().children("a").attr("href")
                };
                resultObject.result.push(resultKey);
                resultObject.result.length === resultLength ? returnResult() : void(0);
            });

            // Definition: Result-returning function. | 结果返回函数.
            function returnResult () {
                resultObject.result.splice(0, 1);  // Remove First Empty Result.
                resultObject.result.splice(resultObject.result.length - 1, 1);  // Remove Last Empty Result.
                var returnObj = {
                    status: 200,
                    info: "漫游搜索完毕~~｡◕‿◕｡",
                    action: "哦液~"
                };
                returnObj[codeName] = resultObject;  // { result: [], pageLink: "" }
                res.status(200).json(returnObj);
            }


        });


}

module.exports = searchModule;