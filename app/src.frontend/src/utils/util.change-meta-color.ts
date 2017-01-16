/**
 * Set theme color in meta.
 *
 * @export
 * @param {string} color
 */
export default function (color: string) {
  const themeColorMeta = document.getElementById('theme-color-meta')
  themeColorMeta.setAttribute('content', color)
}
