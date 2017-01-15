/**
 * Search Bar Component By LancerComet at 20:25, 2017.01.15.
 * # Carry Your World #
 */

import { Vue, Component } from 'av-ts'


/**
 * SearchBar Component.
 *
 * @export
 * @class SearchBar
 * @extends {Vue}
 */
@Component
export default class SearchBar extends Vue {
  /**
   * Status of search bar.
   * Different gives different position.
   */
  currentStatus: 'greeting' | 'searching' = 'greeting'

  /**
   * Search input random quote.
   */
  quote = 'Hello'

  /**
   * If drawer menu button is actived.
   * @memberOf SearchBar
   */
  drawerMenuActived = false

  /**
   * Toggle drawer menu button status.
   *
   * @returns voids
   */
  toggleDrawerMenuStatus () {
    this.drawerMenuActived != this.drawerMenuActived
  }
}
