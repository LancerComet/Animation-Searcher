import { Vue, Component, Lifecycle } from 'av-ts'

const appConfig = require('../../../../config/app-config')

@Component
export default class Drawer extends Vue {
  // Application info.
  appInfo: Object = appConfig.appInfo

  get thisYear () {
    return new Date().getFullYear()
  }

  // Control buttons.
  ctrlBtns = [
    { label: '关闭侧栏', icon: 'keyboard_arrow_left', onClick: this.toggleDrawer.bind(this, 'close') },
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

  @Lifecycle created () {
    this.registerEvents()
  }
}
