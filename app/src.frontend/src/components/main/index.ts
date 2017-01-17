/**
 * Main Component By LancerCometa t 03:02, 2017.01.17.
 * # Carry Your World #
 * ---
 * Main Component.
 */

import { Vue, Component, Lifecycle } from 'av-ts'
import { changeMetaColor } from '../../utils'

@Component
export default class Main extends Vue {
  /**
   * Change meta color.
   */
  changeMetaColor () {
    changeMetaColor('#54b1e3')
  }

  @Lifecycle mounted () {
    this.changeMetaColor()
  }
}
