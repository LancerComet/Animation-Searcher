/*
 *  Change Log Loader By LancerComet at 13:52, 2015/10/11.
 *  # Carry Your World #
 *  ---
 *  更新日志读取控制器.
 */

const changeLog = require('../change-log')
const { ResponseJSON } = require('../define')

module.exports = function (req, res, next) {
  res.json(new ResponseJSON(200, 'ok', changeLog))
}
