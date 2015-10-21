/*
 *  CASO Search Module By LancerComet at 23:14, 2015/10/21.
 *  # Carry Your World #
 *  ---
 *
 *  Info:
 *  ---
 *  注意！华盟的 HTTPS 证书签名不正确，导致 SuperAgent 发送 HTTPS 请求的时候 Node.JS 会返回 “UNABLE_TO_VERIFY_LEAF_SIGNATURE” 错误.
 *   已修改 SuperAgent 的 superagent/lib/node/index.js，在请求参数中加入了 rejectUnauthorized = false 来允许 node 的 https 模块接受不正确证书的网站内容。（搜索LancerComet注释）
 *   http://yoyo.play175.com/p/205.html
 *
 *
 *  ChangeLog:
 *  ---
 *  V0.1.9 - 23:20, 2015.10.21.
 *   + 初版.
 */

var superAgent = require("superagent");
var cheerio = require("cheerio");

function casoModule (req, res, next) {

}

module.exports = casoModule;