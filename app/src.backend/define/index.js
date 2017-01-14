/**
 * Response data.
 *
 * @class ResponseJSON
 */
class ResponseJSON {
  constructor (status = 200, message = 'ok', data) {
    this.status = status
    this.message = message
    if (data !== undefined) { this.data = data }
  }
}

module.exports = {
  ResponseJSON
}
