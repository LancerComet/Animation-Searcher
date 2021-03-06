/*
 *  KTXP Search Module By LancerComet at 23:14, 2015/10/21.
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
var codeName = "ktxp";

function searchModule (req, res, next) {
    "use strict";

    var requestingLink = null;  // Requesting Link for superAgent.
    if (req.body.mode === "switchPage") {
        // 提交的是翻页链接. | Page Switching requesting.
        requestingLink = req.body.link;
    } else {
        var keywords = req.body.keywords;  // Keywords for look-up. | 查询关键字.
        requestingLink = appConfig.site[codeName].url + "/search.php?keyword=" + encodeURIComponent(keywords);
    }

    console.log(appConfig.consoleText.info + "极影：即将搜索 " + keywords + " ...");

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
                    info: "极影被玩坏了！你们这群二货！ (╯╬▔皿▔)╯︵┻━┻",
                    action: "等等再来吧~",
                    detail: superAgentError
                });
                console.log(appConfig.consoleText.error + "SuperAgent for " + appConfig.site[codeName].codeName + " failed:");
                console.log(superAgentError);
                return false;
            }


            /*
             *     极影的页面结构
             *     --------------------------------------
             *     结果全部位于"#listTable #data_list"中。
             *     结果Dom是$("#data_list tr")。
             *     标题位于$("#data_list tr:eq(2)").html()中。
             *     极影不直接提供种子与磁力链链接.
             *
             *     极影的资源地址格式为：
             *     http://www.ktxp.org/show-资源HASH.html
             *     种子地址：
             *     http://www.ktxp.org/down.php?date=资源发布毫秒时间戳&hash=资源HASH
             *     磁力链地址：
             *     magnet:?xt=urn:btih:资源HASH&tr=http://tracker.ktxp.org:7070/announce
             *
             *     翻页链接位于$("#btm > div.main > div.pages").html();
             *
             */

            // Initialize Cheerio and refer to "$" just like jQuery.
            // 初始化 Cheerio.
            var $ = cheerio.load(superAgentResponse.text);

            // No Result Handler. | 无搜索结果.
            var $listTable = $("#data_list");
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
            resultObject.pageLink = $("#btm > div.main > div.pages").html();  // Page Switcher HTML Fragment. | 翻页按钮 HTML.

            // If there comes pageLink, take replacing action with regexp.
            // 如果存在翻页按钮数据, 进行正则替换.
            if (resultObject.pageLink) {
                var regExp = /href="/g;
                resultObject.pageLink = resultObject.pageLink.replace(regExp, 'href="javascript:void(0)" class="pagination-item" ng-click="switchPage($event, \'' + codeName + '\')" data-request-link="' + appConfig.site[codeName].url);
            }

            // Push results to "resultObject.result". | 推送搜索结果到结果对象.
            var $resultTr = $listTable.find("tr");
            var resultLength = $resultTr.length;
            $resultTr.each(function () {

                //极影：分析结果的 HASH
                var result = {};
                result.originalLink = $(this).children("td").eq(2).children("a").attr("href");
                result.hash = result.originalLink.substring(result.originalLink.indexOf("-") + 1, result.originalLink.indexOf("."));

                var resultKey = {
                    hash: result.hash,
                    title: $(this).children("td").eq(2).children("a").text(),
                    link: appConfig.site[codeName].url + "/" + $(this).children("td").eq(2).children("a").attr("href"),
                    date: $(this).children("td").eq(1).text(),
                    magnet: "magnet:?xt=urn:btih:" + result.hash + "&tr=http://tracker.ktxp.org:7070/announce"
                };
                resultObject.result.push(resultKey);
                resultObject.result.length === resultLength ? returnResult() : void(0);
            });

            // Definition: Result-returning function. | 结果返回函数.
            function returnResult () {
                resultObject.result.splice(0, 1);  // Remove First Empty Result.
                var returnObj = {
                    status: 200,
                    info: "极影搜索完毕~~(▰˘◡˘▰)ﾉ♥",
                    action: "辛苦了！",
                    codeName: codeName
                };
                returnObj[codeName] = resultObject;  // { result: [], pageLink: "" }
                res.status(200).json(returnObj);
            }


        });


}

module.exports = searchModule;