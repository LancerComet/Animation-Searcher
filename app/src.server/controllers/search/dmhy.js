/*
 *  Dongman Huayuan Search Module By LancerComet at 23:14, 2015/10/21.
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
 *  V0.3.0 - 14:52, 2017.01.14.
 *  + New update.
 *
 *  V0.1.9 - 23:19, 2015.10.21.
 *   + 初版.
 */
const superAgent = require('superagent')
const cheerio = require('cheerio')

const appConfig = require('../../../config')
const { ResponseJSON } = require('../../define')

const MODULE_NAME = 'dmhy'


// DMHY will check client's cookie in order to confirm you are not the robot.
// We'll visit DMHY every 3 minutes and renew the latest cookie in order to avoid robot-detection.
const dmhyCookie = {
  cookie: null,  // Store the latest cookie information.
  allowVisit: true,  // Prevent Application from visiting DMHY when it is set to fasle.
  visitInterval: 3  // Visit Interval: 3 minutes.
};

// Do some cookie stuff.
(function someCookieStuff () {
  cookieRenew()
  setInterval(cookieRenew, 1000 * 60 * dmhyCookie.visitInterval)

  function cookieRenew () {
    if (!dmhyCookie.allowVisit) { return }
    if (process.env.NODE_ENV === 'development') {
      console.info('[Info] DMHY module is going to fetch cookie...')
    }
    superAgent
      .get(appConfig.sites[MODULE_NAME].url)
      .set('Accept', 'text/html, application/xhtml+xml, */*')
      .set('Accept-Encoding', 'gzip, deflate')
      .set('Accept-Language', 'zh-CN')
      .set('Connection', 'Keep-Alive')
      .set('DNT', '1')
      .set('User-Agent', 'Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; rv:11.0) like Gecko')
      .set('Host', 'share.dmhy.org')
      .end((err, res) => {
        if (err) {
          return console.log('[Caution] DMHY Cookie updating failed.')
        }
        dmhyCookie.cookie = res.header['set-cookie']
        if (process.env.NODE_ENV === 'development') {
          console.info('[Info] DMHY cookie is updated.')
        }
      })
  }
})()

module.exports = function (req, res, next) {
  dmhyCookie.allowVisit = false  // Cookie locked.

  let requestingLink = null
  let keywords = null
  const requestMode = req.body.mode

  if (requestMode === 'switchPage') {
    requestingLink = req.body.link
  } else {
    keywords = req.body.keywords
    requestingLink = appConfig.sites[MODULE_NAME].url + '/topics/list?keyword=' + encodeURIComponent(keywords)
  }

  superAgent
    .get(requestingLink)
    .set('Accept-Encoding', 'gzip, deflate')
    .set('Accept-Language', 'zh-CN')
    .set('Connection', 'Keep-Alive')
    .set('Cookie', dmhyCookie.cookie)
    .set('DNT', '1')
    .set('User-Agent', 'Mozilla/5.0 (Windows NT 6.3; WOW64; Trident/7.0; rv:11.0) like Gecko')
    .set('Host', 'share.dmhy.org')
    .end((err, sres) => {
      dmhyCookie.allowVisit = true

      if (err) {
        const status = err.status
        return res.status(status).json(new ResponseJSON(status, '动漫花园搜索粗错，又炸了吧~ (╯╬▔皿▔)╯︵┻━┻'))
      }

      const $ = cheerio.load(sres.text)

      const $topicList = $('#topic_list')

      if ($topicList.length === 0) {
        const status = 404
        return res.status(status).json(new ResponseJSON(status, '花园里没东西啦~ ＞︿＜'))
      }

      /**
       * Object that contains result data.
       */
      const resultObj = {
        result: [],  // Item in this array: { title: string, link: string, magnet: string, Date: string }
        page: {
          prev: 1, current: 1, next: 1
        }
      }

      // Page link html string.
      let pageLinkHTML = $topicList.siblings('.nav_title').html()

      if (pageLinkHTML) {
        pageLinkHTML = pageLinkHTML.trim().replace('&#x53EA;&#x6709;&#x4E00;&#x9801;', '第1页')

        const currentPage = pageLinkHTML.match(/第\d/)
          .map(item => item.replace('第', ''))
          .map(item => parseInt(item, 10))[0]

        const prevPage = currentPage < 2
          ? false
          : currentPage

        const nextPage = (pageLinkHTML.match(/\/page\/\d/) || [currentPage])
          .map(item => typeof item === 'string' ? item.replace('/page/', '') : item)
          .map(item => parseInt(item, 10))[0]

        resultObj.page.prev = prevPage
        resultObj.page.current = currentPage
        resultObj.page.next = nextPage

        // Push results to "resultObj.result".
        const $resultTr = $topicList.find('tr')

        $resultTr.each(function () {
          const resultItem = {
            title: $(this).find('td.title a').text(),
            link: appConfig.sites.dmhy.url + $(this).find('td.title a').attr('href'),
            magnet: $(this).children('td').eq(3).children('a').attr('href'),
            date: $(this).children('td').eq(0).children('span').text()
          }
          resultObj.result.push(resultItem)
        })

        // The first item is always empty. Remove it.
        resultObj.result.splice(0, 1)

        const status = 200
        res.status(status).json(new ResponseJSON(status, `动漫花园搜索完毕~~(●'◡'●)ﾉ♥`, resultObj))
      }
    })
}
