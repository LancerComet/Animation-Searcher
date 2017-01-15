/**
 * Greeting image component By LancerComet at 10:52, 2017.01.15.
 * # Carry Your World #
 */

import { getGreetingImgUrl } from '../../api'

export default {
  methods: {
    /**
     * Get backgroumd image url from server.
     *
     * @returns {Promise<Function>}
     */
    getGreetingImgUrl () {
      return new Promise((resolve, reject) => {
        getGreetingImgUrl().then(res => {
          if (process.env.NODE_ENV === 'development') {
            console.info('[Info] Get greeting image url: ', res)
          }
        }).catch(xhrObject => {
        })
      })
    }
  },

  created () {
    this.getGreetingImgUrl()
  }
}
