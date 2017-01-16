/**
 * Animation Searcher V3.0 By LancerComet at 15:47, 2017.01.13.
 * # Carry Your World #
 *
 * @author: LancerComet
 * @license: GPLv3
 */

import * as Vue from 'vue'
import * as VueRouter from 'vue-router'
import * as VueMaterial from 'vue-material'
import VueEvents from 'vue-events'

import * as components from './components'
import router from './router'

import * as isMobile from 'ismobilejs'

require('./style/index.styl')
require('vue-material/dist/vue-material.css')
require('perfect-scrollbar/dist/css/perfect-scrollbar.css')

Vue.use(VueRouter)
Vue.use(VueMaterial)
Vue.use(VueEvents)

// Setup Vue-Material Theme.
Vue['material'].registerTheme('default', {
  primary: 'indigo',
  accent: 'red',
  warn: 'red',
  background: 'teal'
})

// Mobile device detection.
// And activate fastclick.
if (isMobile.phone || isMobile.tablet) {
  require.ensure(['fastclick'], function () {
    if (process.env.NODE_ENV === 'development') {
      console.info('[Info] Mobile device, fastclick is going to be activated.')
    }
    const FastClick = require('fastclick')
    FastClick.attach(document.body)
  })
}

// Root instance.
const Root = new Vue({
  el: '#app-main',

  router,

  components: {
    Drawer: components.Drawer,
    SplashScreen: components.SplashScreen,
    SearchBar: components.SearchBar
  },

  methods: {
    /**
     * Process SplashScreen.
     *
     * @return void
     */
    processSplashScreen () {
      this.$events.$emit('SplashScreen:Process', this['goToGreeting'])
    },

    /**
     * Go to '/greeting' page.
     * Only when path is root path.
     *
     * @return void
     */
    goToGreeting () {
      const path = this.$route.path
      path === '/' && this.$router.push('/greeting')
    },

    /**
     * Initialization.
     *
     * @return void
     */
    init () {
      this['processSplashScreen']()
    },
  },

  mounted () {
    this['init']()  // Why does typescript throw an error when calling "this.init()" ?
  }
})

/* Definition goes below. */

/**
 * Router Configuration.
 *
 * @class RouterConfig
 */
class RouterConfig {
  path: string
  componentPath = ''
  component: null | Function

  constructor (path, componentPath) {
    this.path = path
    this.componentPath = componentPath
  }
}
