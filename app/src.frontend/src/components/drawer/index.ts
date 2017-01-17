/**
 * Drawer By LancerComet at 01:18, 2017.01.17.
 * # Carry Your World #
 * ---
 * Drawer Component.
 */

import { Vue, Component, Lifecycle } from 'av-ts'
import * as PS from 'perfect-scrollbar'

const appConfig = require('../../../../config/app-config')

@Component
export default class Drawer extends Vue {
  // Application info.
  appInfo: Object = appConfig.appInfo

  // This year.
  thisYear = new Date().getFullYear()

  // Control buttons.
  ctrlBtns = [
    { label: '关闭侧栏', icon: 'keyboard_arrow_left', onClick: this.closeDrawer },
    { label: '欢迎界面', icon: 'tag_faces', link: '/' },
    { label: 'Github', icon: 'code', onClick: () => window.open('https://github.com/LancerComet/Animation-Searcher') }
  ]

  /**
   * Would be triggered when drawer is open.
   *
   * @returns void
   */
  isOpen () {
    if (process.env.NODE_ENV === 'development') {
      console.log('Drawer is open.')
    }
    this.$events.$emit('DrawerMenu:SetState', true)  // "DrawerMenu:SetState" receives true or false.
  }

  /**
   * Would be triggered when drawer is closed.
   *
   * @returns void
   */
  isClosed () {
    if (process.env.NODE_ENV === 'development') {
      console.log('Drawer is closed.')
    }
    this.$events.$emit('DrawerMenu:SetState', false)  // "DrawerMenu:SetState" receives true or false.
  }

  /**
   * Close Drawer.
   *
   * @returns void
   */
  closeDrawer () {
    this.toggleDrawer('close')
  }

  /**
   * Open or close drawer.
   *
   * @param {('open' | 'closed')} status
   * @memberOf Drawer
   */
  toggleDrawer (status: 'open' | 'close') {
    const $mdSidenav = this.$refs['mdSidenav']
    status === 'open'
      ? $mdSidenav['open']()
      : $mdSidenav['close']()
  }

  /**
   * Register events.
   *
   * @return void
   */
  registerEvents () {
    this.$events.$on('Drawer:Toggle', this.toggleDrawer)
  }

  /**
   * Setup perfect scrollbar.
   *
   * @return void
   */
  initScrollbar () {
    const ctrlBtnCtnr = <HTMLElement> this.$refs['ctrlBtnCtnr']
    PS.initialize(ctrlBtnCtnr, {
      wheelSpeed: 2,
      wheelPropagation: true,
      minScrollbarLength: 20
    })
  }


  @Lifecycle created () {
    this.registerEvents()
  }

  @Lifecycle mounted () {
    this.initScrollbar()
  }
}
