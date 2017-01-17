/**
 * Search Bar Component By LancerComet at 20:25, 2017.01.15.
 * # Carry Your World #
 */

import { Vue, Component, Data, Watch, Lifecycle } from 'av-ts'
import { imageXAnimation } from '../../utils'

const { getRandomQuote } = require('../../../../config/index.js')

/**
 * SearchBar Component.
 *
 * @export
 * @class SearchBar
 * @extends {Vue}
 */
@Component
export default class SearchBar extends Vue {
  // Status of search bar. Different gives different position.
  searchBarStatus: 'greeting' | 'searching' = 'greeting'

  // If drawer menu button is actived.
  drawerMenuActived: boolean = false

  // Search keyword.
  keyword = ''

  // Random quote.
  quote = getRandomQuote()

  /**
   * Toggle drawer menu button status.
   *
   * @returns void
   */
  toggleDrawerMenuStatus () {
    this.setDrawerMenuState(!this.drawerMenuActived)
  }

  /**
   * Set drawer menu button status.
   *
   * @param {boolean} isToArrow
   */
  setDrawerMenuState (isToArrow: boolean) {
    if (process.env.NODE_ENV === 'development') {
      console.info('[Info] setDrawerState: ', isToArrow)
    }
    this.drawerMenuActived = isToArrow
  }

  /**
   * Switch to Searching Mode and go Index.
   *
   * @return void
   */
  switchToSearchingMode () {
    this.switchMode('searching')
    this.goIndex()
  }

  /**
   * Go to '/'.
   *
   * @return void
   */
  goIndex () {
    this.$router.push('/main')
  }

  /**
   * Switch search bar into searching mode.
   *
   * @returns void
   */
  switchMode (mode: 'searching' | 'greeting') {
    this.searchBarStatus = mode
  }

  /**
   * Search data submit function.
   *
   * @return void
   */
  search () {

  }

  /**
   * Register events.
   *
   * @return void
   */
  registerEvents () {
    this.$events.$on('DrawerMenu:SetState', this.setDrawerMenuState)
  }

  /**
   * Created event.
   */
  @Lifecycle created () {
    this.registerEvents()
  }

  /**
   * Watch "drawerMenuActived" to change button status.
   */
  @Watch('drawerMenuActived')
  watchDrawerMenuActived (toArrow) {
    imageXAnimation(<HTMLElement> this.$refs['drawerMenuBtn'],
      toArrow
        ? { startPosition: 0, width: 27.75, step: 16, interval: 17 }
        : { startPosition: 444, endPosition: 0, width: 27.75, step: 16, interval: 17 }
    )
    this.$events.$emit('Drawer:Toggle', toArrow ? 'open' : 'close')
  }

  /**
   * Watch "this.$route" to emulate "beforeRouteEnter" function.
   * Because I don't know how to use "Component.register" in av-ts to create "@beforeRouteEnter".
   *
   * Watch path and switch between greeting and searching mode.
   */
  @Watch('$route')
  watchRoute ($route) {
    const path = $route.path
    this.switchMode(path === '/' ? 'greeting' : 'searching')
  }

}
