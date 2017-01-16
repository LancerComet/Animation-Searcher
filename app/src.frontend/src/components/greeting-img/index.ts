/**
 * Greeting image component By LancerComet at 10:52, 2017.01.15.
 * # Carry Your World #
 */

import { Vue, Component, Lifecycle } from 'av-ts'

import { getGreetingImgUrl } from '../../api'
import { xhrErrorHandler } from '../../utils'

const appConfig = require('../../../../config')

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
    return '/images/splash-screen/White-Album-Yuki.jpg'
  }

  /**
   * Set background image url.
   *
   * @param {string} [url=DEFAULT_IMAGE]
   */
  setImage (url = this.DEFAULT_IMAGE) {
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
   * Register events when component created.
   */
  registerEvents () {
    this.$events.$on('GreetingImg:Exit', this.exit)
  }

  @Lifecycle created () {
    this.registerEvents()
    this.getGreetingImgUrl()
  }
}

function xhrError (detail: string) {
  xhrErrorHandler('欢迎图片获取', detail)
}
