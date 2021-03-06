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
    ngAppDirectives.directive("actionBar", [function () {
        return {
            restrict: "E",
            scope: {},
            controller: function ($scope, $element, $attrs) {},
            link: function (scope, element, attrs) {}
        }
    }]);

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
    ngAppDirectives.directive("searchBar", ["$http", "$toast", "$search" ,"$splashLayout" , function ($http, $toast, $search, $splashLayout) {
        return {
            restrict: "E",
            scope: true,
            controller: function ($scope, $element, $attrs) {},
            link: function (scope, element, attrs) {

                var initStatus = false;

                // Definition: Search Keyword. | 搜索关键字变量定义.
                scope.keywords = null;

                // Definition: Searching function. | 搜索功能定义.
                scope.searchExec = function ($event) {

                    // 非回车事件滚粗.
                    // This detective is useless now for using "ng-submit" instead of "ng-keyup" and "ng-click".
                    if ($event.type === "keyup" && $event.keyCode !== 13) {
                        return false;
                    }

                    $search.search(scope.keywords);  // Execute searching function. | 执行搜索方法.
                };

                scope.searchBarFocus = searchBarFocus;

                /* Definition go below. | 下方为定义部分. */

                function searchBarFocus () {
                    if (initStatus) return;
                    $splashLayout.toStandByLayout();
                    initStatus = true;
                }

            }
        }
    }]);

    // Definition: Site Switcher Directive. | 搜索结果切换按钮指令.
    ngAppDirectives.directive("siteSwitcher", ["$timeout", "appConfig", "$resultPanelSwitching", function ($timeout, appConfig, $resultPanelSwitching) {
        return {
            restrict: "E",
            scope: true,
            replace: false,
            templateUrl: "/templates/ng-site-switcher.html",
            controller: function ($scope, $element, $attrs) {

                // Definition: Switch on-click event. | 列表点击事件定义.
                $scope.panelSwitch = function (codeName) {
                    codeName ? void(0) : throwError('Please provide param "codeName" while calling this function.');
                };

            },
            link: function (scope, element, attrs) {
                // Definition: Data for switcher list. | 搜索结果切换列表列表项数据.
                scope.siteList = appConfig.site;

                // Attach "Title" property to $scope.searchableSite | 给 $scope.searchableSite 增加 title 属性.
                // This property is prepared For "md-tooltip". | 此属性将用在 "md-tooltip" 指令中.
                Object.keys(scope.siteList).filter(function (prop) {
                    scope.siteList[prop].title = "切换至" + scope.siteList[prop].name + "的搜索结果";
                    scope.siteList[prop].hideProgressbar = true;
                });

                // Action: Watching broadcasting to control intro animation of this dom.
                // Site Switcher 指令进入动画控制广播监听器.
                scope.$on("searchStart", function (event, value) {
                    value.showSwitcher === true ? scope.siteSwitcherShow = true : void(0);
                });

                // Definition: Panel Switch event. | 面板切换事件.
                scope.panelSwitch = function ($event) {
                    $event.target.attributes["data-disabled"].value.toString() === "true" ? void(0) : $resultPanelSwitching($event.target.attributes["data-codename"].value);
                };

                // Definition: Progress Showing Listener. | 搜索进度条显示监听事件.
                scope.$on("searchStart", function (event, value) {
                    scope.siteList[value.codeName].hideProgressbar = false;
                });

                // Definition: Progress Hiding Listener & Response type hint. | 搜索进度条隐藏监听事件 & 搜索结果类型提示.
                scope.$on("searchResult", function (event, value) {
                    // Handle Progressbar Showing / Hiding. | 进度条隐藏与显示控制.
                    var codeName = value.codeName;
                    scope.siteList[codeName].hideProgressbar = true;

                    // Handle Response type hint. | 搜索结果状态 Splashing 指示器.
                    if (value.status === 200) {
                        scope.siteList[codeName].eventType = "success";
                    } else if (value.status === 404) {
                        scope.siteList[codeName].eventType = "caution";
                    } else {
                        scope.siteList[codeName].eventType = "failed";
                    }

                    $timeout(function () {
                        scope.siteList[codeName].eventType = "none";
                    }, 500);
                });


            }
        }
    }]);

    // Definition: Result Panel Directive. | 结果面板指令.
    ngAppDirectives.directive("resultPanel", ["$compile", "$sce", "$search", "$resultCheck", "appConfig", function ($compile, $sce, $search, $resultCheck, appConfig) {
        return {
            restrict: "E",
            scope: true,
            templateUrl: "/templates/ng-result-panel.html",
            controller: function ($scope, $element, $attrs) {

                // Definition: Page switching requesting function. | 换页切换请求方法.
                // 此方法传入 $event & targetSite 作为参数.
                $scope.switchPage = function ($event, targetSite) {
                    $search.changePage(targetSite, $event.target.attributes["data-request-link"].value);
                };


                // Definition: Result Checkbox clicking event. | 结果 Checkbox 点击逻辑.
                $scope.resultCheckbox = function (magnetLink) {
                    $resultCheck.checkIt(magnetLink);
                };

            },
            link: function (scope, element, attrs) {
                // Error Handle: Attribute "codename" must be defined.
                // 错误处理: 必须定义 "codename" 属性.
                attrs.codename ? void(0) : throwError('Attribute "codename" must be defined.');

                // Definition: Dom Information Object. | 节点属性对象.
                // Attach domInfo to $scope in order to import it in template. | 将 domInfo 定义在 $scope 下以方便模板调取.
                var codeName = attrs.codename;
                scope.domInfo = {
                    codeName: codeName,
                    name: appConfig.site[codeName].name,
                    fullName: appConfig.site[codeName].fullName,
                    icon: appConfig.site[codeName].icon,
                    disabled: appConfig.site[codeName].disabled
                };

                // Definition: 搜索结果广播监听事件.
                scope.$on("searchResult", function (event, value) {
                    if (!value[codeName]) return false;
                    scope.results = value[codeName];
                    var $pagination = angular.element(document.querySelector(".result-pagination-" + codeName));
                    $pagination.html(value[codeName].pageLink);
                    $compile($pagination)(scope);
                });

                // Definition: All result checking broadcast listener. | 结果全选广播监听器.
                // Foolish Logic.
                scope.$on("checkAllResult", function (event, value) {
                    if (attrs.show.toString() === "false") {
                        return;
                    }
                    setTimeout(function () {
                        var checkBoxs = document.querySelectorAll(".result-panel[data-show=true] md-checkbox");
                        var selectTimeout = 0;
                        for (var i = 0, length = checkBoxs.length; i < length; i++) {
                            (function (j) {
                                setTimeout(function () {
                                    checkBoxs[j].click();
                                }, selectTimeout);
                                selectTimeout += 20;
                            })(i);
                        }
                    }, 1);
                });


            }
        }
    }]);

    // Definition: Text Panel Directive. | 文字面板指令.
    ngAppDirectives.directive("textPanel", ["$compile", "$timeout", "$window", "$toast", "$clearMDToast", function ($compile, $timeout, $window, $toast, $clearMDToast) {
        return {
            restrict: "E",
            controller: ["$scope", "$element", "$attrs", function ($scope, $element, $attrs) {}],
            link: function (scope, element, attrs) {
                scope.closePanel = null;  // Close Panel Function.
                scope.panelStatus = "out";  // Panel Status.

                // Broadcast Listener: Panel Creating. | 面板创建广播监听.
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

                    if (config.resultPanel) {
                        nodes = '<div class="main-container w-100 h-100 p-absolute p-zero bk-merge md-whiteframe-4dp" style="z-index: 10000">' +
                            '<div class="content-container p-relative">' +
                            '<h2 class="title color-theme bk-color">' + config.title + '</h2>' +
                            '<md-button class="md-icon-button close-btn transition-dot-4" style="margin-top: .5em;" ng-click="closePanel()" aria-label="Close this panel."><md-tooltip>关闭面板</md-tooltip><i class="icon-cancel"></i></md-button>' +
                            '<textarea class="content" style="width: calc(100% - 4em); resize: none;" onclick="this.focus(); this.select();">' + config.content + '</textarea>' +
                            '</div>' +
                            '</div>';
                    }

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
    }]);

    // Definition: History Panel. | 历史记录面板.
    ngAppDirectives.directive("history", ["$localStorage", function ($localStorage) {
        return {
            restrict: "E",
            scope: true,
            controller: function ($scope, $element, $attrs) {},
            link: function (scope, element, attrs) {

            }
        }
    }]);

    // Definition: Dynamic Background Nodes. | 动态背景指令.
    ngAppDirectives.directive("dynamicBackground", [function () {
        return {
            restrict: "E",
            templateUrl: "/templates/ng-dynamic-bk.html",
            controller: function ($scope, $element, $attrs) {},
            link: function (scope, element, attrs) {}
        }
    }]);

})();