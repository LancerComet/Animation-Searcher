/**
 * Search Bar Component By LancerComet at 20:25, 2017.01.15.
 * # Carry Your World #
 */

import { Vue, Component, Watch, Lifecycle } from 'av-ts'
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

  /**
   * Search input random quote.
   *
   * @returns {string}
   */
  get quote () : string {
    return getRandomQuote()
  }

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
   * Watch "drawerMenuActived" to change button status.
   */
  @Watch('drawerMenuActived')
  handler (toArrow) {
    imageXAnimation(<HTMLElement> this.$refs['drawerMenuBtn'],
      toArrow
        ? { startPosition: 0, width: 27.75, step: 16, interval: 17 }
        : { startPosition: 444, endPosition: 0, width: 27.75, step: 16, interval: 17 }
    )
    this.$events.$emit('Drawer:Toggle', toArrow ? 'open' : 'close')
  }

  /**
   * Switch search bar into searching mode.
   *
   * @returns void
   */
  switchToSearchingMode () {
    this.searchBarStatus = 'searching'
    this.$events.$emit('GreetingImg:Exit')
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

  @Lifecycle created () {
    this.registerEvents()
  }

}
