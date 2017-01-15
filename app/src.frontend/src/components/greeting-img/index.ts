/**
 * Greeting image component By LancerComet at 10:52, 2017.01.15.
 * # Carry Your World #
 */

import { Vue, Component, Lifecycle } from 'av-ts'

import { getGreetingImgUrl } from '../../api'
import { xhrErrorHandler } from '../../utils'

const appConfig = require('../../../../config')
const devPort = require('../../../../../port.json').server.dev

/**
 * Greeting Image Component.
 *
 * @export
 * @class GreetingImg
 * @extends {Vue}
 */
@Component
export default class GreetingImg extends Vue {
  APPNAME = appConfig.appInfo.name
  bgUrl = ''

  /**
   * Get backgroumd image url from server.
   *
   * @returns {Promise<Function>}
   */
  getGreetingImgUrl () {
    return new Promise((resolve, reject) => {
      getGreetingImgUrl().then(xhrObject => {
        if (xhrObject.statusText !== 'OK') {
          return xhrError(`${xhrObject.status} - ${xhrObject.statusText}`)
        }
        const url = xhrObject.data.data
        this.setImage(url)
      }).catch(err => {
        xhrError(err)
        this.setImage()  // Set default image.
      })
    })
  }

  /**
   * Default image url.
   *
   * @returns {string}
   */
  get DEFAULT_IMAGE () {
    if (process.env.NODE_ENV === 'development') {
      return `http://localhost:${devPort}/images/splash-screen/White-Album-Yuki.jpg`
    }
    return '/images/splash-screen/White-Album-Yuki.jpg'
  }

  /**
   * Set background image url.
   *
   * @param {string} [url=DEFAULT_IMAGE]
   */
  setImage (url = this.DEFAULT_IMAGE) {
    if (process.env.NODE_ENV === 'development') {
      this.bgUrl = `http://localhost:${devPort}${url}`
    } else {
      this.bgUrl = url
    }
  }

  @Lifecycle created () {
    this.getGreetingImgUrl()
  }
}

function xhrError (detail: string) {
  xhrErrorHandler('欢迎图片获取', detail)
}
