/**
 * Search Module By LancerComet at 22:45, 2015.10.08.
 * # Carry Your World #
 * ---
 * 搜索控制器模块.
 *
 * ChangeLog:
 * ---
 * V0.3.0 - 1:16, 2017.01.13.
 *  + New Update.
 *
 * V0.1.0 - 22:44, 2015.10.08.
 *  - 新版的初版.
 */

const fs = require('fs')
const path = require('path')

const emoji = require('random-jpn-emoji')
const { ResponseJSON } = require('../define')

module.exports = function (req, res, next) {
  const targetModule = req.params.site
  moduleChecking(targetModule)
    .then(() => {
      try {
        require(`./search/${targetModule}.js`)(req, res, next)
      } catch (tryErr) {
        throw new Error(tryErr)
      }
    }).catch(err => {
      if (err && err.errno !== -4058) {
        res.status(500).json(new ResponseJSON(500, `粗错了：${err}`))
      } else {
        res.status(404)
          .json(new ResponseJSON(404, `不兹词这个网站喔~ ${emoji.helpless()}`))
      }
    })
}


/**
 * Check whether target moulde is existing.
 *
 * @param {string} [targetModule='']
 * @returns {Promise}
 */
function moduleChecking (targetModule = '') {
  return new Promise((resolve, reject) => {
    fs.stat(path.resolve(__dirname, './search/' + targetModule + '.js'), function (err, stats) {
      if (process.env.NODE_ENV === 'development') {
        console.info(`[Info] Module ${targetModule} is exists:`, !!stats)
      }
      if (err) { return reject(err) }
      stats ? resolve() : reject()
    })
  })
}
