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

import * as components from './components'
import router from './router'
import EventBus from './event-bus'

require('./style/index.styl')
require('vue-material/dist/vue-material.css')

Vue.use(VueRouter)
Vue.use(VueMaterial)

Vue['material'].registerTheme('default', {
  primary: 'indigo',
  accent: 'red',
  warn: 'red',
  background: 'teal'
})

// Root instance.
const Root = new Vue({
  el: '#app-main',

  router,

  components: {
    SplashScreen: components.SplashScreen,
    SearchBar: components.SearchBar
  },

  methods: {
    /**
     * Initialization.
     *
     * @return void
     */
    init () {
      EventBus.$emit('SplashScreen:Process', () => {
        this['goToGreeting']()  // Navigate to '/greeting'
      })
    },

    /**
     * Go to '/greeting' page.
     *
     * @return void
     */
    goToGreeting () {
      this.$router.push('/greeting')
    }
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
