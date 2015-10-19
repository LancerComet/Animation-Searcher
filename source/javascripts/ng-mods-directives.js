/*
 *  Animation Searcher Angular Application By LancerComet at 12:29, 2015/10/9.
 *  # Carry Your World #
 *  ---
 *
 *  Directives Part : Angular Directives Module. All directives go here.
 *  ---
 *  Angular 指令模块部分. 定义程序中出现的所有指令.
 *
 *  Examples:
 *  ---
 *  ngAppCtrls.directives("NAME", func...);
 */

(function () {
    "use strict";

    // Definition: Directives Module. | 指令模块定义.
    var ngAppDirectives = angular.module("ngAppDirectives", []);

    // Definition: ActionBar Directive. | ActionBar 指令.
    ngAppDirectives.directive("actionBar", function () {
        return {
            restrict: "E",
            scope: {},
            controller: function ($scope, $element, $attrs) {
            },
            link: function (scope, element, attrs) {
            }
        }
    });


    // Definition: Left Navigator Drawer Button. | 左侧抽屉菜单按钮.
    ngAppDirectives.directive("leftnavMenu", ["$leftNav", function ($leftNav) {
        return {
            restrict: "E",
            scope: true,
            controller: function ($scope, $element, $attrs) {
            },
            link: function (scope, element, attrs) {
                scope.toggle = $leftNav.toggle;
            }
        }
    }]);


    // Definition: Search Directive. | 搜索模块指令定义.
    ngAppDirectives.directive("searchBar", ["$toast", "appConifg", function ($toast, appConfig) {
        return {
            restrict: "E",
            scope: true,
            controller: function ($scope, $element, $attrs, $http) {
            },
            link: function (scope, element, attrs) {

                // Definition: Search Keyword. | 搜索关键字变量定义.
                scope.keywords = null;

                // Definition: Searching function. | 搜索功能定义.
                // Search and assignment. | 搜索、赋值逻辑主体.
                scope.searchExec = function () {

                    // Fire Async Requesting. | 发起搜索请求.
                    Object.keys(appConfig.site).filter(function (prop) {
                        $http.post("/search/" + moduleSettings.site[prop].codeName, {
                            keywords: scope.keywords
                        }).success(function (data, status, headers, config) {
                            $scope.searchResult[prop] = data.result;  // Attach result data to $scope.searchResult.
                            $toast.showSimpleToast(data.info);  // Show simple toast after finished succesfully.
                        }).error(function (data, status, headers, config) {
                            // Throw a ActionToast when error was caught. | 出错时进行提示.
                            $toast.showActionToast(data.info, data.action);
                        });
                    });

                };

            }
        }
    }]);


    // Definition: Site Switcher Directive. | 搜索结果切换按钮指令.
    ngAppDirectives.directive("siteSwitcher", function () {
        return {
            restrict: "E",
            scope: true,
            replace: true,
            templateUrl: "/templates/ng-site-switcher.html",
            controller: function ($scope, $element, $attrs) {

                // Definition: Switch on-click event. | 列表点击事件定义.
                $scope.panelSwitch = function (codeName) {
                    codeName ? void(0) : throwError('Please provide param "codeName" while calling this function.');
                };

            },
            link: function (scope, element, attrs) {

                // Definition: Data of switcher list. | 搜索结果切换列表列表项数据.
                scope.switcherList = moduleSettings.site;

                // Attach "Title" property to $scope.searchableSite | 给 $scope.searchableSite 增加 title 属性.
                // This property is prepared For "md-tooltip". | 此属性将用在 "md-tooltip" 指令中.
                Object.keys(scope.switcherList).filter(function (prop) {
                    scope.switcherList[prop].title = "切换至" + scope.switcherList[prop].name + "的搜索结果";
                });

            }
        }
    });


    // Definition: Result Panel Directive. | 结果面板指令.
    ngAppDirectives.directive("resultPanel", function () {
        return {
            restrict: "E",
            scope: true,
            templateUrl: "/templates/ng-result-panel.html",
            controller: function ($scope, $element, $attrs, $http, $sce, $compile) {

                // Error Handle: Attribute "codename" must be defined.
                // 错误处理: 必须定义 "codename" 属性.
                $attrs.codename ? void(0) : throwError('Attribute "codename" must be defined.');

                // Definition: Dom Information Object.
                var codeName = $attrs.codename;
                $scope.domInfo = {  // Attach domInfo to $scope in order to import it in template.
                    // 将 domInfo 定义在 $scope 下以方便模板调取.
                    codeName: codeName,
                    name: moduleSettings.site[codeName].name,
                    fullName: moduleSettings.site[codeName].fullName,
                    icon: moduleSettings.site[codeName].icon,
                    disabled: moduleSettings.site[codeName].disabled
                };

                // Definition: Result Information Object.
                $scope.result = $scope.searchResult;

            },
            link: function (scope, element, attrs) {
                attrs.codename ? void(0) : throwError('Attribute "codename" must be defined.');
            }
        }
    });

    // Definition: Text Panel Directive. | 文字面板指令.
    ngAppDirectives.directive("textPanel", ["$compile", "$timeout", "$window", "$toast", "$clearMDToast", function ($compile, $timeout, $window, $toast, $clearMDToast) {
        return {
            restrict: "E",
            controller: ["$scope", "$element", "$attrs", function ($scope, $element, $attrs) {}],
            link: function (scope, element, attrs) {
                scope.closePanel = null;  // Close Panel Function.
                scope.panelStatus = "out";  // Panel Status.

                // Broadcast Listener.
                scope.$on("textPanelCreated", function (event, object) {
                    createPanel(object);
                });

                // Create & Show a new Text Panel. | 创建并显示一个新的文字面板.
                function createPanel (config) {

                    // No content handler.
                    !config.content ? $toast.showSimpleToast("Caution: No content provided.") : void(0);

                    // Create Content Nodes. | 创建内容节点.
                    var nodes = '<div class="main-container w-100 h-100 p-absolute p-zero bk-merge md-whiteframe-4dp" style="z-index: 10000">' +
                        '<div class="content-container p-relative">' +
                        '<h2 class="title color-theme bk-color">' + config.title + '</h2>' +
                        '<md-button class="md-icon-button close-btn transition-dot-4" style="margin-top: .5em;" ng-click="closePanel()" aria-label="Close this panel."><md-tooltip>关闭面板</md-tooltip><i class="icon-cancel"></i></md-button>' +
                        '<div class="content">' + config.content + '</div>' +
                        '</div>' +
                        '</div>';

                    // Append & Set ng-Class.
                    element.append($compile(nodes)(scope));
                    scope.panelStatus = "in";

                    // Close Panel Function. | 关闭面板函数.
                    scope.closePanel = function () {
                        config.backward ? $window.history.back() : void(0);
                        scope.panelStatus = "out";
                        $timeout(function () {
                            angular.element(element).empty();
                            $clearMDToast();
                        }, 600);
                    }

                }
            }
        }
    }])

})();