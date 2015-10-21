/*
 *  Animation Searcher Angular Application By LancerComet at 12:29, 2015/10/9.
 *  # Carry Your World #
 *
 *  ---
 *  Angular Modules Definition.
 *  Angular 模块定义部分.
 *
 *  ---
 *  @ ngApp: Main Angular Application. (Internal Directive.)
 *  @ ngAppCtrls: Controllers Module of this Angular Application.
 *  @ ngAppDirectives: Directives Module of this Angular Application.
 *
 *
 *  Log:
 *  ---
 *  V0.1.8 - 22:25, 2015.10.20.
 *   + 历史记录面板.
 *   + 随机生成背景图片.
 *   + 后端搜索模块逻辑.
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
 *   + In Process.
 *   + 修复左侧抽屉菜单的动画问题.
 *   + 左侧抽屉打开时可按 ESC 关闭.
 *   + 增加变色服务模块.
 *   + 左侧抽屉与更新日志使用前端路由控制.
 *
 *  V0.1.1 - 14:26, 2015.10.10.
 *   + In Process.
 *   + 使用 service 代替 controller 模块.
 *
 *  V0.1.0 - 12:29, 2015.10.09.
 *   + 来自之前编写的初版.
 *
 */

;(function () {
    "use strict";

    // Definition: Angular Application Module. | ngApp 模块定义.
    var ngApp = angular.module("ngApp", [
        "ngAnimate", "ngMaterial", "ngSanitize", "ngRoute",  // Angular Official Modules. | Angular.JS 官方模块.
        "appConfig",  // Angular Application Configuration. | Angular 实例模块设置.
        "internalFunc",  // Internal Functions Add-on Module. | 内部方法模块.
        "ngAppCtrls", "ngAppDirectives",  // Animation Searcher Main Controller & Directive Modules. | 主控制器与指令模块.
        "colorThief",  // colorThief Original By Lokesh Dhakar.
        "appToast", "charMsg", "leftNav", "colorChange", "localStorage", "splashLayout", "splashScreen", "changeLog", "textPanel", "clearMdToast", "historyPanel"  // Animation Searcher Custom Service Modules. | 自定义服务模块.
    ]);

    ngApp.run(["$timeout", "$splashScreen", "$colorChange", "$colorThief", function ($timeout, $splashScreen, $colorChange, $colorThief) {

        angular.element(window).on("load", function () {

            var image = document.querySelector("#greeting-background");
            var themeColor = $colorThief.getThemeColor(image);

            $timeout(function () {
                $splashScreen.hide();
            }, 3000);
            $timeout(function () {
                $colorChange.change(themeColor);
            }, 1000)
        });

    }]);


})();
