import { Vue, Component, Lifecycle } from 'av-ts'

@Component
export default class Drawer extends Vue {
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
