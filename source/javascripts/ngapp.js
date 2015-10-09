/*
 *  Animation Searcher Angular Application By LancerComet at 12:29, 2015/10/9.
 *  # Carry Your World #
 *  ---
 *
 *  Description:
 *  ---
 *  Angular Application 程序逻辑.
 *
 *  Log:
 *  ---
 *  V0.1.0 - 12:29, 2015.10.09.
 *   - 来自之前编写的初版.
 *
 */


(function (global, angular) {
    "use strict";

    /*
     *  Error Handler.
     *  错误处理机: No Angular, Old Browser, ect.
     */
    (function errorHandler () {

        // Angular incorrect.
        if (!angular) {
            throw new Error("Animation Searcher Error: Please make sure Angular.JS is loaded Correctly.");
            // Using "throw new Error" to block application.
        }

        // Old Browser Detection.
        function oldBrowserHint () {
            global.location.href = "/old-browser";
            throw new Error("Animation Searcher Error: Your Browser is too old, time to change! :)");
            // Using "throw new Error" to block application.
        }

        var userAgent = global.navigator.userAgent;
        var oldExpReg = /MSIE [1-8].*]/i;
        userAgent.match(oldExpReg) ? oldBrowserHint () : void(0);

    })();
    /* =========================================================================================== */



    /*
     *  Module Overall Configure and Definition.
     *  模块设置与必要内容定义.
     */
    var moduleSettings = {

        // Text Content Definition.
        text: {
            prefix: "Animation Searcher "  // Please note that a WHITESPACE was placed at end.
        },

        // Searchable Site Definition. This object would be imported in many places.
        // 可搜索的站点定义. 数据将在多处地方使用.
        site: {
            caso: { name: "华盟", codeName: "caso", fullName: "China Animation Subtitle Organization",  url: "https://camoe.org", icon: "http://tp4.sinaimg.cn/1843885343/180/1290319229/0", disabled: false },
            ktxp: { name: "极影", codeName: "ktxp", fullName: "Katong XP",  url: "http://bt.ktxp.org", icon: "http://tp4.sinaimg.cn/3808818207/180/5680524263/0", disabled: false },
            popgo: { name: "漫游", codeName: "popgo", fullName: "Popgo",  url: "http://share.popgo.com", icon: "http://tp1.sinaimg.cn/2661910672/180/5727241391/0", disabled: false },
            dmhy: { name: "动漫花园", codeName: "dmhy", fullName: "DongMan HuaYuan",  url: "http://share.dmhy.org", icon: "http://tp2.sinaimg.cn/1926582581/180/22817929400/0", disabled: false }
        },

        // Toast Configuration. | 提示模块设置参数.
        toast: {
            position: { top: true, bottom: false, left: false, right: true }
        }

    };
    /* =========================================================================================== */




    /*
     *  Internal Function Definition: Only used in Service Logic.
     *  内部方法定义: 仅在业务逻辑中使用, 不对外暴漏.
     */

    // Definition: Error Handler in console & for developers only. | 控制台内错误提示.
    // Please note that this function will block Explorer and all functions next won't be executed.
    // 请注意此函数将使用 throw New Error 阻塞浏览器执行接下来的代码.
    function throwError (text) {
        throw new Error(moduleSettings.text.prefix + "Error: " + text);
    }

    // Definition: Packaging function of Angular-Material Toast. | Angular-Material 的 Toast 组件封装函数.
    function $toastFunc ($rootScope, type, content, action, funcName) {
        if(!$rootScope || !type){
            throwError('Argument "$rootScope" or "type" is not provided in $toastErr.')
        }
        content = content || "";
        switch(type){
            case "simple":
                $rootScope.toast.showSimpleToast(content);
                break;
            case "action":
                action ? void(0) : throwError('Please provide parama "action" when calling ' + funcName);
                $rootScope.toast.showActionToast(content, action);
                break;
        }
    }

    // Definition: Packaged Function of Angular-Material Error Toast. | 错误 Toast 提示函数.
    function $toastErr ($rootScope, type, content, action) {
        $toastFunc($rootScope, type, content, action, "$toastErr");
    }



    /* =========================================================================================== */




    /*
     *  Angular Modules Definition.
     *  Angular 模块定义部分.
     *  ---
     *  @ ngApp: Main Angular Application. (Internal Directive.)
     *  @ ngAppCtrls: Controllers Module of this Angular Application.
     *  @ ngAppDirectives: Directives Module of this Angular Application.
     */

    // Definition: Angular Application Module. | ngApp 模块定义.
    var ngApp = angular.module("ngApp", ["ngAnimate", "ngMaterial", "ngSanitize", "ngRoute", "ngAppCtrls", "ngAppDirectives", "ngAppToastCtrl"]);


    // Definition: Controllers Module & Configuration. | 总控制器模块定义.
    var ngAppCtrls = angular.module("ngAppCtrls", []);

    ngAppCtrls.config(["$compileProvider", function ($compileProvider) {
        // Set "Https", "Ftp", "Mailto", "File", "Magnet" as trusted string.
        // 将 "Https", "Ftp", "Mailto", "File", "Magnet" 设置为编译服务的可信字符串.
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|magnet):/);
    }]);


    // Definition: Directives Module. | 指令模块定义.
    var ngAppDirectives = angular.module("ngAppDirectives", []);


    // Definition: Toast Module, from Material-Angular. | Material-Angular Toast 模块定义.
    var ngAppToastCtrl = angular.module("ngAppToastCtrl", ["ngMaterial"]);
    ngAppToastCtrl.controller("ToastCtrl", ["$scope", "$rootScope", "$mdToast", "$animate", function ($scope, $rootScope, $mdToast, $animate) {

        // Definition: Set Toast Module to rootScope to make it easy to execute.
        // 将 toast 模块设置在 rootScope 下以方便调用.
        $rootScope.toast = {};
        var toastModule = $rootScope.toast;

        // Definition: Set position of toast panel. | 设置 Toast 模块方位.
        toastModule.toastPosition = moduleSettings.toast.position;

        // Definition: Define methods to get toast's position. | 获取 Toast 窗口方位方法.
        toastModule.getToastPosition = function () {
            // Object.keys is a new method provided in ECMAScript 5: get all enumerable properties.
            // Object.keys 是 ES5 中的新方法, 可获取对象的所有可枚举的属性.
            return Object.keys(toastModule.toastPosition).filter(function (pos) {
                return toastModule.toastPosition[pos]
            }).join(" ");
        };

        // Definition: Simple Toast Function. | 自消失弹窗方法定义.
        // A simple toast would be created when called.
        toastModule.showSimpleToast = function () {
            $mdToast.show(
                $mdToast.simple().content(toastContent).position($rootScope.toast.getToastPosition()).hideDelay(5000)
            );
        };

        // Definition: Action Toast Function. | 可操作弹窗方法定义.
        // A Action-available toast would be created when called.
        toastModule.showActionToast = function (callback) {
            callback = callback || function () {};
            var toast = $mdToast.simple().content(toastContent).action(toastAction).highlightAction(false).position($rootScope.toast.getToastPosition());
            $mdToast.show(toast).then(callback);
        };

        // Definition: Close Toast Method. | 关闭弹窗方法.
        toastModule.closeToast = function () {
            $mdToast.hide();
        };

    }]);
    /* =========================================================================================== */




    /*
     *  Controllers Part : Angular Controllers Module.
     *  All Controllers go here.
     *  ---
     *  Angular 控制器模块部分. 定义程序控制器.
     *
     *  Examples:
     *  ---
     *  ngAppCtrls.controller("NAME", func...);
     */


    // Definition: Main Controller. | 页面主控制器.
    // Transferring data between direvtives.
    ngAppCtrls.controller("mainController", ["$scope", "$rootScope", function ($scope, $rootScope) {

        // Definition: Status of Progressbar (on the left). | 左侧切换列表的搜索条状态.
        // ---------------------------------------------
        // @ True: Show this Progress bar.
        // @ False: Hide this Progress bar.
        $scope.progressStatus = {};

        // Set $scope.progressStatus's properties refer to "moduleSettings.site". | 依据 "moduleSettings.site" 设置 $scope.progressStatus 的属性.
        // Individual module looks.
        (function setProgressStatusData() {
            Object.keys(moduleSettings.site).filter(function (prop) {
                $scope.progressStatus[prop] = false;
            });
        }());
        // For now, $scope.progressStatus would be:
        // $scope.progressStatus = {
        //   caso: false, ktxp: false, ...
        // }

        // Definition: Result Data. | 搜索结果数据定义.
        // Value will change after search requesting is finished successfully.
        // 数据将在搜索完毕之后更变.
        // Auto two-way data bind. | 自动双向数据绑定,
        $scope.searchResult = {};

    }]);


    /* =========================================================================================== */




    /*
     *  Directives Part : Angular Directives Module.
     *  All Directives go here.
     *  ---
     *  Angular 指令模块部分. 定义程序中出现的所有指令.
     *
     *  Examples:
     *  ---
     *  ngAppCtrls.directives("NAME", func...);
     */

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
    ngAppDirectives.directive("leftnavMenu", function () {
        return {
            restrict: "E",
            scope: true,
            controller: function ($scope, $element, $attrs) {
            },
            link: function (scope, element, attrs) {

                // 以下函数为按钮背景变换所需的函数.
                // Definition: 背景图片 X 轴动画播放函数.
                var isRunning = false;
                function imageAnimationX (targetDom, configure) {

                    /*
                     @ Configure: {
                         startPosition: Number,
                         width: Number,
                         step: Numner,
                         interval: Numbuer
                       }
                     */
                    isRunning = true;
                    targetDom.style.backgroundPositionX = configure.startPosition + "px";  // Reset Background Image Position.

                    var runStep = 1;
                    var animationInterval = setInterval(function () {
                        if(runStep > configure.step){
                            configure.endPosition != undefined ? targetDom.style.backgroundPositionX = configure.endPosition + "px" : void(0);
                            clearInterval(animationInterval);
                            isRunning = false;
                            return;
                        }
                        targetDom.style.backgroundPositionX = configure.startPosition + (configure.width * runStep) + "px";
                        runStep++;
                    }, configure.interval);
                }

                // Definition: 按钮点击事件.
                scope.buttonMotion = function ($event) {
                    if (isRunning) {
                        return false;
                    }
                    var targetDom = $event.target;
                    var attr = targetDom.getAttribute("data-status");
                    var configure = {
                        start: {
                            startPosition: 0,
                            width: 33.3,
                            step: 16,
                            interval: 20
                        },
                        end: {
                            startPosition: 532.8,
                            endPosition: -1,
                            width: 33.3,
                            step: 16,
                            interval: 20
                        }
                    };

                    var animationProgress = {
                        toArrow: function () {
                            imageAnimationX(targetDom, configure.start);
                            targetDom.setAttribute("data-status", "arrow");
                        },
                        toMenu: function () {
                            imageAnimationX(targetDom, configure.end);
                            targetDom.setAttribute("data-status", "menu");
                        }
                    };

                    switch (attr) {
                        case "menu":
                            animationProgress.toArrow();
                            break;
                        case "arrow":
                            animationProgress.toMenu();
                            break;
                    }
                };

            }
        }
    });


    // Definition: Search Directive. | 搜索模块指令定义.
    ngAppDirectives.directive("searchModule", function () {
        return {
            restrict: "E",
            scope: true,
            controller: function ($scope, $element, $attrs, $http) {
                // Explose $rootScope out to use it in link.
                $scope.rootScope = $rootScope;
            },
            link: function (scope, element, attrs) {
                var $rootScope = scope.rootScope;

                // Definition: Search Keyword. | 搜索关键字变量定义.
                scope.keyword = null;

                // Definition: Searching function. | 搜索功能定义.
                // Search and assignment. | 搜索、赋值逻辑主体.
                scope.searchExec = function () {

                    // Fire Async Requesting. | 发起搜索请求.
                    Object.keys(moduleSettings.site).filter(function (prop) {
                        $http.post("/search/" + moduleSettings.site[prop].codeName, {
                            keyword: scope.keyword
                        }).success(function (data, status, headers, config) {
                            $scope.searchResult[prop] = data.result;  // Attach result data to $scope.searchResult.
                            $rootScope.toast.showSimpleToast(data.info);  // Show simple toast after finished succesfully.
                        }).error(function (data, status, headers, config) {
                            // Throw a ActionToast when error was caught. | 出错时进行提示.
                            $rootScope.toast.showActionToast(data.info, data.action);
                        });
                    });

                };

            }
        }
    });


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


    /* =========================================================================================== */




})(window, window.angular);


/*
   jQuery-based Code.
   By LancerComet. # Carry Your World #
   ---
   Required Libs:
    - mCustomScrollbar.
 */
//(function (global, $) {
//
//    // Configure mCustomScrollbar.
//    function mCustomScrollbar () {
//        var $targetDom = $("#searchable-sites-list");
//        $targetDom.mCustomScrollbar({
//            theme: "dark",
//            axis: "y",
//            autoHideScrollbar: true,
//            scrollButtons: { enable: false },
//            mouseWheel: { scrollAmount: 300 },
//            advanced: { updateOnContentResize: true }
//        });
//    }
//
//    // Remove Loading Splash.
//    function bodyProgressOut () {
//        $(".body-merge").addClass("loaded");
//    }
//
//    //Window Loaded Event.
//    $(window).on("load", function () {
//        mCustomScrollbar();
//        bodyProgressOut();
//    });
//
//
//})(window, window.jQuery);