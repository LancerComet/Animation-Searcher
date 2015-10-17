/*
 *  Animation Searcher Angular Application By LancerComet at 12:29, 2015/10/9.
 *  # Carry Your World #
 *  ---
 *
 *  Controllers Part : Angular Controllers Module.
 *  All Controllers go here.
 *  ---
 *  Angular 控制器模块部分. 定义程序控制器.
 *
 *
 *  Examples:
 *  ---
 *  ngAppCtrls.controller("NAME", func...);
 */
(function () {
    "use strict";

    // Definition: Main Controller. | 页面主控制器.
    // Transferring data between direvtives.

    // Definition: Controllers Module & Configuration. | 总控制器模块定义.
    var ngAppCtrls = angular.module("ngAppCtrls", []);
    ngAppCtrls.config(["$compileProvider", function ($compileProvider) {
        // Set "Https", "Ftp", "Mailto", "File", "Magnet" as trusted string. | 将 "Https", "Ftp", "Mailto", "File", "Magnet" 设置为编译服务的可信字符串.
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|magnet):/);
    }]).controller("mainController", ["$scope", "$rootScope", "$location", "appConfig", "$splashLayout", function ($scope, $rootScope, $location, appConfig, $splashLayout) {

        // Definition: Layout Controller. | 页面布局控制器.
        // ---------------------------------------------
        $scope.splashLayout = $splashLayout;  // $splashLayout service reference for $watch service. | 单独引用服务出来进行深度监视.
        $scope.layout = $splashLayout.layout.status;  // Set default value. | 设置默认值.
        $scope.$watch("splashLayout", function (newVal, oldVal) {
            $scope.layout = newVal.layout.status;
        }, true);  // 启动深度监视.


        // Definition: Status of Progressbar (on the left). | 左侧切换列表的搜索条状态.
        // ---------------------------------------------
        // @ True: Show this Progress bar.
        // @ False: Hide this Progress bar.
        $scope.progressStatus = {};

        // Set $scope.progressStatus's properties refer to "appConfig.site". | 依据 "appConfig.site" 设置 $scope.progressStatus 的属性.
        // Individual module looks.
        (function setProgressStatusData () {
            Object.keys(appConfig.site).filter(function (prop) {
                $scope.progressStatus[prop] = false;
            });
        }());
        // For now, $scope.progressStatus would be:
        // $scope.progressStatus = {
        //   caso: false, ktxp: false, ...
        // }

        // Definition: Result Data. | 搜索结果数据定义.
        // ---------------------------------------------
        // Value will change after search requesting is finished successfully.
        // 数据将在搜索完毕之后更变.
        // Auto two-way data bind. | 自动双向数据绑定,
        $scope.searchResult = {};

        console.log($scope);

    }]);


    // Definition: Search Part Controller. | 搜索节点控制器.
    ngAppCtrls.controller("searchController", ["$scope", function ($scope) {

        $scope.searchBarFocus = searchBarFocus;
        $scope.searchBarBlur = searchBarBlur;
        $scope.searchBarKeyDown = searchBarKeyDown;

        /* Definition go below. | 下方为定义部分. */

        function searchBarFocus () {

        }

        function searchBarBlur () {

        }

        function searchBarKeyDown () {

        }

    }]);



    // Definition: Left Side Navigator Buttons Controller. | 左侧导航按钮控制器.
    ngAppCtrls.controller("leftNavButtonCtrl", ["$scope", "$http", "$toast", "$leftNav", "$charMsg", "$localStorage", function ($scope, $http, $toast, $leftNav, $charMsg, $localStorage) {

        // Clear All History Items in Local Storage.
        $scope.clearHistory = function () {
            $localStorage.empty();
        };

    }]);



})();
