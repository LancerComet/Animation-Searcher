/**
 * Greeting image component By LancerComet at 10:52, 2017.01.15.
 * # Carry Your World #
 */

import { Vue, Component, Lifecycle } from 'av-ts'

import { getGreetingImgUrl } from '../../api'
import { changeMetaColor, xhrErrorHandler } from '../../utils'

// App config.
const appConfig = require('../../../../config')

// Default Image Path.
const DEFAULT_IMAGE = '/images/splash-screen/White-Album-Yuki.jpg'

/**
 * Greeting Image Component.
 *
 * @export
 * @class GreetingImg
 * @extends {Vue}
 */
@Component
export default class GreetingImg extends Vue {
  // Name of application.
  APPNAME = appConfig.appInfo.name

  // Background image url.
  bgUrl = ''

  // Whether create this component.
  isExisted = true

  /**
   * Get backgroumd image url from server.
   *
   * @returns {Promise<Function>}
   */
  getGreetingImgUrl () {
    return new Promise((resolve, reject) => {
      getGreetingImgUrl().then(xhrObject => {
        if (xhrObject.statusText !== 'OK') { return xhrError(`${xhrObject.status} - ${xhrObject.statusText}`) }
        const url = xhrObject.data.data
        this.setImage(url)
      }).catch(err => {
        xhrError(err)
        this.setImage()  // Set default image.
      })
    })
  }

  /**
   * Set background image url.
   *
   * @param {string} [url=DEFAULT_IMAGE]
   */
  setImage (url = DEFAULT_IMAGE) {
    this.bgUrl = url
  }

  /**
   * Time to get out.
   *
   * @returns void
   */
  exit () {
    if (process.env.NODE_ENV === 'development') {
      console.info('[Info] Greeting image is exited.')
    }
    this.isExisted = false
  }

  /**
   * Change theme color in meta.
   *
   * @returns void
   */
  changeMetaColor () {
    const color = '#372346'
    changeMetaColor(color)
  }


  @Lifecycle created () {
    this.getGreetingImgUrl()
    this.changeMetaColor()
  }
}

function xhrError (detail: string) {
  xhrErrorHandler('欢迎图片获取', detail)
}
