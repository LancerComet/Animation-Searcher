/*
 *  Animation Searcher Angular Application By LancerComet at 12:29, 2015/10/9.
 *  # Carry Your World #
 *  ---
 *  Module Overall Configure and Definition.
 *  模块设置与必要内容定义.
 *
 */

;(function () {
    "use strict";

    var appConfig = angular.module("appConfig", []);
    appConfig.value("appConfig", {

        // Text Content Definition.
        text: {
            prefix: "Animation Searcher "  // Please note that a WHITESPACE was placed at end.
        },

        // Searchable Site Definition. This object would be imported in many places.
        // 可搜索的站点定义. 数据将在多处地方使用.
        // 在 Node 的 app-config.js 中同样存在一份配置供后端使用.
        site: {
            caso: { name: "华盟", codeName: "caso", fullName: "China Animation Subtitle Organization",  url: "https://camoe.org", icon: "http://tp4.sinaimg.cn/1843885343/180/1290319229/0", disabled: false },
            ktxp: { name: "极影", codeName: "ktxp", fullName: "Katong XP",  url: "http://bt.ktxp.org", icon: "http://tp4.sinaimg.cn/3808818207/180/5680524263/0", disabled: false },
            popgo: { name: "漫游", codeName: "popgo", fullName: "Popgo",  url: "http://share.popgo.com", icon: "http://tp1.sinaimg.cn/2661910672/180/5727241391/0", disabled: false },
            dmhy: { name: "动漫花园", codeName: "dmhy", fullName: "DongMan HuaYuan",  url: "http://share.dmhy.org", icon: "http://tp2.sinaimg.cn/1926582581/180/22817929400/0", disabled: false }
        },

        // Toast Configuration. | 提示模块设置参数.
        toast: {
            position: { top: true, bottom: false, left: false, right: true }
        },

        settings: {
            xhrTimeout: 1000 * 30  // Timeout: 30s.
        }

    });

})();
