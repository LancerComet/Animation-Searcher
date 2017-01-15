/**
 * SplashScreen component By LancerComet at 22:39, 2017.01.14.
 * # Carry Your World #
 */
import { Vue, Component, Lifecycle } from 'av-ts'
import EventBus from '../../event-bus'

const SPLASH_SCREEN_SHOWING_TIME = 2500

/**
 * SplashScreen Component.
 *
 * @export
 * @class SplashScreen
 * @extends {Vue}
 */
@Component
export default class SplashScreen extends Vue {
  isShown = true  // Whether SplashScreen is shown.
  showAvatar = false
  showText = false
  showProgress = false

  /**
   * Show SplashScreen.
   */
  show () {
    this.isShown = true
  }

  /**
   * Hide SplashScreen.
   */
  hide () {
    this.isShown = false
  }

  /**
   * Show and hide SplashScreen.
   *
   * @param {Function} callback
   */
  process (callback: Function) {
    this.show()
    setTimeout(() => {
      this.hide()
      callback && callback()
    }, SPLASH_SCREEN_SHOWING_TIME)
  }

  /**
   * Register events on EventBus.
   */
  registerEvent () {
    EventBus.$on('SplashScreen:Show', this.show)
    EventBus.$on('SplashScreen:Hide', this.hide)
    EventBus.$on('SplashScreen:Process', this.process)
  }

  /**
   * Start animation of avatar, text and progress nodes..
   *
   * @return void
   */
  startNodesAnimation () {
    this.showAvatar = true
    setTimeout(() => { this.showText = true }, 400)
    setTimeout(() => { this.showProgress = true }, 800)
  }

  /**
   * Add onload event to avatar element.
   */
  addAvatarOnLoadEvent () {
    const avatar = <HTMLElement> this.$refs['avatarImg']
    avatar.addEventListener('load', this.startNodesAnimation)
  }

  @Lifecycle created () {
    this.registerEvent()
  }

  @Lifecycle mounted () {
    this.addAvatarOnLoadEvent()
  }
}

