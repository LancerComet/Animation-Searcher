/**
 * There is a strange problem.
 *
 * When I use http-proxy-middleware to proxy request for frontend developing,
 * it will send duplicated url to server.
 *
 * So I need some way to solve this problem.
 * This is it.
 */

module.exports = function (req, res, next) {
  const url = req.url
  if (url.length > 1) {
    const halfIndex = url.length / 2

    const halfUrl = url.substring(0, halfIndex)
    const matching = url.match(new RegExp(halfUrl, 'g'))
    if (matching && matching.length > 1) {
      console.log('[Warn] Duplicated url ' + halfUrl)
      req.url = halfUrl
    }
  }
  next()
}
