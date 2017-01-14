/*
 *  CASO Search Module By LancerComet at 23:14, 2015/10/21.
 *  # Carry Your World #
 *  ---
 *  ** This module is ABANDONED because there is no more caso site. :( **
 *  Code in module is old and useless.
 *  RIP.
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
 *  V0.3.0 - 14:24, 2017.01.14.
 *  + New update.
 *
 *  V0.1.9 - 23:20, 2015.10.21.
 *   + 初版.
 */

const superAgent = require('superagent')
const cheerio = require('cheerio')

const appConfig = require('../../../config')
const { ResponseJSON } = require('../../define')

const MODULE_NAME = 'caso'

module.exports = function (req, res, next) {
  'use strict'

  let requestingLink = null
  let keywords = null
  const requestMode = req.body.mode

  if (requestMode === 'switchPage') {
    requestingLink = req.body.link
  } else {
    keywords = req.body.keywords
    requestingLink = appConfig.site[MODULE_NAME].url + '/search.php?keyword=' + encodeURIComponent(keywords)
  }

  if (process.env.NODE_ENV === 'development') {
    console.log(`[Info] 华盟: 即将搜索 ${keywords} ...`)
  }

  superAgent
    .get(requestingLink)
    .set('Accept-Encoding', 'gzip, deflate')
    .set('Accept-Language', 'zh-CN')
    .set('Connection', 'Keep-Alive')
    .set('DNT', '1')
    .set('User-Agent', 'Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; rv:11.0) like Gecko')
    .end((err, sres) => {
      // Request failed.
      if (err) {
        const status = 500
        return res.status(status).json(new ResponseJSON(status, '华萌姐：华……华萌姐才没有傲娇呢 ~~ 哼！,,Ծ‸Ծ,,'))
      }

      /*
       *  华盟的页面结构
       *  --------------------------------------
       *  结果全部位于 "#main .list_table" 中。
       *  结果 Dom 是 $("#main .list_table").children("tr:gt(0)").
       *  标题位于 $("#main .list_table").children("tr:gt(0)").children("td.title_name").children("a").eq(0).text() 中。
       *  发布日期位于 $("#main .list_table").children("tr:gt(0)").children("td.publishtime").text() 中。
       *  种子链接位于 $("#main .list_table").children("tr:gt(0)").children("td.title_name").children("a").eq(1).children("a").attr("href") 中。
       *  磁力链位于 $("#main .list_table").children("tr:gt(0)").children("td.title_name").children("a").eq(2).children("a").attr("href") 中。
       *  翻页链接位于 $("#footer_content .pager").html();
       */

      const $ = cheerio.load(sres.text)

      const $listTable = $('.list_table')
      const $resultList = $listTable.find('tr')

      if ($resultList.length === 0) {
        const status = 404
        return res.status(status).json(new ResponseJSON(status, '华... 华萌姐没找到内容啦~ ＞︿＜'))
      }

      /**
       * Object that contains result data.
       */
      const resultObj = {
        result: [],  // Item in this array: { title: string, link: string, magnet: string, Date: string }
        pageLink: $('#footer_content').find('.papger').html()
      }

      if (resultObj.pageLink) {
        const regExp = /href="/g
        resultObj.pageLink = resultObj.pageLink
          .replace(regExp, 'href="javascript:void(0)" class="pagination-item" ng-click="switchPage($event, \'' + MODULE_NAME + '\')" data-request-link="' + appConfig.site[MODULE_NAME].url + '/')

        const $resultTr = $listTable.find('tr')

        // jQuery each function.
        // And has context binding.
        $resultTr.each(function () {
          const $titleName = $(this).find('.title_name')
          const resultKey = {
            title: $titleName.children('a').first().text(),
            link: appConfig.site[MODULE_NAME].url + $titleName.children('a').eq(0).attr('href'),
            torrent: appConfig.site[MODULE_NAME].url + $titleName.children('a').eq(1).attr('href'),
            magnet: $titleName.children('a').eq(2).attr('href'),
            date: $(this).children('.publishtime').text()
          }
          resultObj.result.push(resultKey)
        })

        // The first item is always empty, just remove it.
        resultObj.result.splice(0, 1)

        const status = 200
        res.status(status).json(new ResponseJSON(status, `华萌姐搜索完毕~~ (●'◡'●)ﾉ♥`, resultObj))
      }
    })
}

