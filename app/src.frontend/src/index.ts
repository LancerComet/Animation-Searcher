/**
 * Animation Searcher V3.0 By LancerComet at 15:47, 2017.01.13.
 * # Carry Your World #
 *
 * @author: LancerComet
 * @license: GPLv3
 *
 *  ChangeLog:
 *  ---
 *  V0.3.0 - 15:52, 2017.01.13.
 *   + New update.
 *
 *  V0.1.8 - 22:25, 2015.10.20.
 *   + 历史记录面板.
 *   + 随机生成背景图片.
 *   + 后端搜索模块逻辑.
 *   + 布局服务从深度监听修改为广播机制.
 *
 *  V0.1.7 - 0:01, 2015.10.20.
 *   + 完善前端搜索功能逻辑.
 *   + Splash 页面增加模糊切换开关.
 *   + 后端搜索模块逻辑.
 *
 *  V0.1.6 - 22:33, 2015.10.18.
 *   + 修复菜单按钮在火狐下不变换的问题. (火狐不识别 background-position 的分离属性)
 *
 *  V0.1.5 - 16:53, 2015.10.17.
 *   + 加入文字信息面板模块.
 *   + 使用广播机制替换部分不合理方法.
 *   + 增加启动画面.
 *   + 引入 Lokesh Dhakar 的 ColorThief.
 *
 *  V0.1.4 - 23:01, 2015.10.15.
 *   + 将全部 JavaScript 内容 Angular 模块化并使用 IFFE 封装.
 *   + JavaScript 文件分类存放.
 *   + 使用深度监听服务的内置变量属性来修改界面布局而非将状态数值取自 $rootScope.
 *
 *  V0.1.3 - 13:51, 2015.10.12.
 *   + ngApp.js 拆解成模块文件.
 *
 *  V0.1.2 - 1:17, 2015.10.11.
 *   + WIP..
 *   + 修复左侧抽屉菜单的动画问题.
 *   + 左侧抽屉打开时可按 ESC 关闭.
 *   + 增加变色服务模块.
 *   + 左侧抽屉与更新日志使用前端路由控制.
 *
 *  V0.1.1 - 14:26, 2015.10.10.
 *   + WIP..
 *   + 使用 service 代替 controller 模块.
 *
 *  V0.1.0 - 12:29, 2015.10.09.
 *   + 来自之前编写的初版.
 */

import * as Vue from 'vue'
import * as VueRouter from 'vue-router'
import * as VueMaterial from 'vue-material'

// Components.
import * as components from './components'

// Style.
require('./style/index.styl')
require('vue-material/dist/vue-material.css')

// Others.
import EventBus from './event-bus'

Vue.use(VueRouter)
Vue.use(VueMaterial)

// Router config.
const router = new VueRouter({
  mode: 'history',
  routes: [
    { path: '/' },
    { path: '/drawer' },
    { path: '/greeting', component: components.GreetingImg },
    { path: '/search', component: components.Main }
  ]
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
    init () {
      if (process.env.NODE_ENV === 'development') {
        console.info('[Info] App inited.')
      }
      EventBus.$emit('SplashScreen:Process')
    }
  },

  mounted () {
    this['init']()  // Why does typescript throw an error when calling "this.init()" ?
  }
})
