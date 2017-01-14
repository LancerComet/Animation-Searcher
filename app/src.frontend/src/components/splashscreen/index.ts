/**
 * SplashScreen component By LancerComet at 22:39, 2017.01.14.
 * # Carry Your World #
 */
import EventBus from '../../event-bus'

const SPLASH_SCREEN_SHOWING_TIME = 2500

/**
 * SplashScreen Component.
 *
 * @export
 */
export default {
  data () {
    return {
      isShown: true,  // Whether SplashScreen is shown.

      showAvatar: false,
      showText: false,
      showProgress: false
    }
  },

  methods: {
    /**
     * Show SplashScreen.
     */
    show () {
      this.isShown = true
    },

    /**
     * Hide SplashScreen.
     */
    hide () {
      this.isShown = false
    },

    /**
     * Show and hide SplashScreen.
     */
    process () {
      this.show()
      setTimeout(this.hide, SPLASH_SCREEN_SHOWING_TIME)
    },

    /**
     * Register events on EventBus.
     */
    registerEvent () {
      EventBus.$on('SplashScreen:Show', this.show)
      EventBus.$on('SplashScreen:Hide', this.hide)
      EventBus.$on('SplashScreen:Process', this.process)
    },

    startAnimation () {
      this.showAvatar = true
      setTimeout(() => { this.showText = true }, 400)
      setTimeout(() => { this.showProgress = true }, 800)
    },

    addAvatarOnLoadEvent () {
      const avatar = this.$refs.avatarImg
      avatar.addEventListener('load', event => {
        this.startAnimation()
      })
    }
  },

  created () {
    this.registerEvent()
  },

  mounted () {
    this.addAvatarOnLoadEvent()
  }
}
