/**
 * Controller file.
 *
 * Changelog:
 * ---
 * V0.3.0 @ 1:12, 2017.01.13.
 *  - New update.
 */

const index = require('./ctrl.index')
const bgUrl = require('./ctrl.bg-url')
const changeLog = require('./ctrl.change-log')
const search = require('./ctrl.search')

module.exports = {
  index,
  bgUrl,
  changeLog,
  search
}
