/*
 *  Animation Searcher Angular Application By LancerComet at 12:29, 2015/10/9.
 *  # Carry Your World #
 *  ---
 *
 *  Frount Router Definition.
 *  Angular 前端路由定义.
 *
 *  $locationProvider 启用了 HTML5 模式. (History API)
 *
 */
;(function () {
    "use strict";
    var ngApp = angular.module("ngApp");
    ngApp.config(["$routeProvider", function ($routeProvider) {
            $routeProvider.when("/change-log", {
                template: "",
                controller: ["$changeLog", function ($changeLog) {
                    $changeLog.show();
                }]
            }).when("/welcome", {
                    template: "",
                    controller: ["$splashLayout", function ($splashLayout) {
                        $splashLayout.toInitLayout();
                    }]
                }
            ).when("/stand-by", {
                    template: "",
                    controller: ["$splashLayout", function ($splashLayout) {
                        $splashLayout.toStandByLayout();
                    }]
                }
            ).when("/side-nav-open", {
                    template: "",
                    controller: ["$leftNav", "$splashLayout", function ($leftNav, $splashLayout) {
                        $leftNav.open();
                        $splashLayout.toStandByLayout();
                    }]
                }
            ).when("/powered-by", {
                    template: "",
                    controller: ["$charMsg", function ($charMsg) {
                        $charMsg.show("Powered By ...", "This site is powered by Angular.JS, Node.JS, Nginx @ Aliyun.");
                    }]
                }
            ).when("/", {
                    template: "",
                    controller: ["$leftNav", function ($leftNav) {
                        $leftNav.close();
                    }]
                }
            ).otherwise({
                    redirectTo: "/"
                }
            );
        }])
        .config(["$locationProvider", function ($locationProvider) {
            $locationProvider.html5Mode({
                enabled: true
            });
        }]);

})();