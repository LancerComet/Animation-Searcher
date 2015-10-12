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
ngApp
    .config(["$routeProvider", function ($routeProvider) {
        $routeProvider.when("/change-log", {
            template: "",
            controller: function ($scope, $http, $toast, $charMsg, $splashLayout) {
                $http.post("/change-log").then(
                    function success (response) {
                        // response: { data, headers, status, config, statusText }
                        $charMsg.show(response.data.title, response.data.content);
                        $splashLayout.toStandByLayout();
                    },
                    function error (response) {
                        $toastErr($toast, "更新日志获取失败, 过一会再试试?", "(/= _ =)/~┴┴", "Request for Change Log failed.");
                    }
                );
            }
        }).when("/welcome", {
                template: "",
                controller: function ($splashLayout) {
                    $splashLayout.toInitLayout();
                }
            }
        ).when("/stand-by", {
                template: "",
                controller: function ($splashLayout) {
                    $splashLayout.toStandByLayout();
                }
            }
        ).when("/side-nav-open", {
                template: "",
                controller: function ($leftNav, $splashLayout) {
                    $leftNav.open();
                    $splashLayout.toStandByLayout();
                }
        }).when("/", {
            template: "",
            controller: function ($leftNav) {
                $leftNav.close();
            }
        });
    }])
    .config(["$locationProvider", function ($locationProvider) {
        $locationProvider.html5Mode({
            enabled: true
        });
    }]);