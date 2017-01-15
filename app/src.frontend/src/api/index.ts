import axios from 'axios'

/**
 * Get greeting image url.
 *
 * @export
 * @returns {Promise<Function>}
 */
export function getGreetingImgUrl () {
  return axios.get('/api/v2/greeting-bg')
}
