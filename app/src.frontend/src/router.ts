/**
 * Router Configuration.
 */
import * as VueRouter from 'vue-router'

// Router config.
const routerConfig = [
  { path: '/', componentPath: './components/main/index', component: null },
  { path: '/drawer', componentPath: '', component: null },
  { path: '/greeting', componentPath: './components/greeting-img/index', component: null }
]

const router = new VueRouter({
  mode: 'history',
  routes: routerConfig.map(item => {
    if (item.componentPath) {
      item.component = resolve => require([item.componentPath + '.vue'], resolve)
    }
    return item
  })
})

export default router
