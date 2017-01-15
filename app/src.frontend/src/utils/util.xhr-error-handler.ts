/**
 * XHR Error Handler.
 *
 * @export
 * @param {string} reqName
 * @param {string} detail
 */
export default function (reqName: string, detail: string) {
  window.console && console.error(`[Error] ${reqName}失败: ${detail}`)
}
