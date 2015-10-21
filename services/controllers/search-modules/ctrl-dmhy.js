/*
 *  Dongman Huayuan Search Module By LancerComet at 23:14, 2015/10/21.
 *  ? 2015 LancerComet.
 *  # Carry Your World #
 *  ---
 *
 *  Descrption:
 *  ---
 *  ������԰�ı�׼������
 *  http://share.dmhy.org/topics/list/page/ҳ��?keyword=�ؼ���
 *  ע�⣡������԰�������ڶ�ʱ���ڷ����������󣡷����Ҫ����д��֤��.
 *
 *  ChangeLog:
 *  ---
 *  V0.1.9 - 23:19, 2015.10.21.
 *   + ����.
 */

var superAgent = require("superagent");
var cheerio = require("cheerio");

var appConfig = require("../../config/app-config");

// Definition: Cookie Information from DMHY. | ������԰�� Cookie ��Ϣ.
// ÿ�η��ʵ�ʱ��Я������.
// DMHY will check client's cookie in order to confirm you are not the robot.
// We'll visit DMHY every 3 minutes and renew the latest cookie in order to avoid robot-detection.
var dmhyCookie = {
    cookie: null,  // Store the latest cookie information.
    visitStatus: true,  // @ False: Prevent Application from visiting DMHY.
    visitInterval: 3  // Visit Interval: 3 minutes.
};

// Definition: DMHY Cookie Refresher. | ������԰ Cookie ˢ�º���.
(function dmhyCookieFunction () {

    // Action: Set Interval to renew cookie from DMHY. | ���ö�����԰ Cookie ���¼�ʱ��.
    setInterval( function () {
        dmhyCookieRenew();
    }, 1000 * 60 * dmhyCookie.visitInterval);

    // Main Logic.
    function dmhyCookieRenew () {
        if (!dmhyCookie.visitStatus) {
            setTimeout(function () {
                console.log("Search Module DMHY: ������30������³��Է��ʶ�����԰....");
                dmhyCookieRenew();
            }, 30000);
        } else {
            console.log("Search Module DMHY: ������ʼԤ�ȷ��ʶ�����԰ȡ�� Cookie...");
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
                        console.log("Search Module DMHY: ������԰ Cookie ����ʧ��:");
                        console.log(err);
                        return false;
                    }
                    dmhyCookie.cookie = res.header["set-cookie"];
                    console.log("Search Module DMHY: ������԰������ϲ����� Cookie.");
                });
        }
    }
})();

// Definition: Dongman Huayuan Searching Module Main Logic. | ������԰����ģ�����߼�.
function dmhyModule (req, res, next) {
    dmhyCookie.visitStatus = false;  // Block interval to renew cookie while searching process is on. | �ڷ����ڼ���ֹ��ʱ��ˢ�� Cookie.
    var keywords = req.body.keywords;  // Keywords for look-up. | ��ѯ�ؼ���.

    superAgent
        .get(appConfig.site.dmhy + "/topics/list?keyword=" + encodeURIComponent(keywords))
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
                    info: "������԰�����ִ���ը�˰�~ (�s�p����)�s��ߩ���",
                    action: "�ȵ�������~",
                    detail: superAgentError
                });
                console.log(appConfig.consoleText.error + "SuperAgent for " + appConfig.site.dmhy.codeName + " failed:");
                console.log(superAgentError);
                dmhyCookie.visitStatus = true;
                return false;
            }

            // Initialize Cheerio and refer to "$" just like jQuery.
            // ��ʼ�� Cheerio.
            var $ = cheerio.load(superAgentResponse.text);

            // No Result. | ���������.
            var $topicList = $("#topic_list");
            if ($topicList.length === 0) {
                console.log(appConfig.consoleText.info + "������԰: δ����������.");
                res.status(404).json({
                    status: 404,
                    type: "info",
                    info: "������԰��û���ҵ�����~ ���䣼",
                    action:"���Ѿ������ˣ�"
                });
                dmhyCookie.visitStatus = true;
                return true;
            }

            // We have got result ! | ���������.
            // Definition: DMHY Result Data Object. | ������԰����������ݶ���.
            var dmhyResultObject = Object.create(null);  // Empty object for clean data restoring.
            dmhyResultObject.result = [];  // Restore result data. | ����������.
                                           // @ Item in "dmhyResultObject.result" : { title: String, link: String, magnet: String, Date: String }
            dmhyResultObject.pageLink = $topicList.siblings(".nav_title").html();  // Page Switcher HTML Fragment. | ��ҳ��ť HTML.

            // TODO: ��������������ݲ�����ǰ̨.
        })




}

module.exports = dmhyModule;