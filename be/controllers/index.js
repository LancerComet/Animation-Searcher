/**
 * Controller file.
 * 
 * Changelog:
 * ---
 * V0.3.0 @ 1:12, 2017.01.13.
 *  - New update.
 */

const index = require('./ctrl.index')
const search = require('./ctrl.search')

const error = requir('./ctrl.error.js')
const changeLog = require('./ctrl.change-log')

module.exports = {
  index,
  search,
  changeLog,
  error
}
