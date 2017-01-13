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
const emoji = require('random-jpn-emoji')
const { ResponseJSON } = require('../define')

module.exports = function (req, res, next) {
  const targetModule = req.query.site
  const isModuleExisting = moduleChecking(targetModule)

  isModuleExisting
    ? require(`./search/${targetModule}`)(req, res, next)
    : res.status(404)
        .json(new ResponseJSON(404, `不兹词这个网站喔~ ${emoji.helpless()}`))
}

/**
 * Check whether target moulde is existing.
 *
 * @param {string} [targetModule='']
 * @returns
 */
function moduleChecking (targetModule = '') {
  return fs.existsSync(`./search/${targetModule}`)
}
