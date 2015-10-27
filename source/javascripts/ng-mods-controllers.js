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

    ngAppCtrls.controller("mainController", ["$scope", "$rootScope", "$location", "$timeout", "appConfig", "$splashLayout", function ($scope, $rootScope, $location, $timeout, appConfig, $splashLayout) {
        // Definition: Basic Variables. | 基本变量定义.
        $scope.blurButton = "hide";
        $scope.historyPanel = false;
        $scope.resultPanelIf = {};

        // Definition: Layout Controller. | 页面布局控制器.
        // ---------------------------------------------
        $scope.layout = "init-layout";  // Set default value. | 设置默认值.
        $scope.$on("splashLayout", function (event, value) {
            $scope.layout = value;
            if (value !== "init-layout") {
                $timeout.cancel($scope.blurButtonTimeout);
                $scope.blurButton = "hide"
            }
        });

        // SplashScreen Listener. | 启动画面广播监听.
        // ---------------------------------------------
        $scope.$on("splashScreen", function (event, value) {
            $timeout(function () {
                $scope.backgroundBlur = "blur";
                $scope.blurButtonTimeout = $timeout(function () { $scope.blurButton = "show"; }, 5000);  // Show Blur Toggle Button after blur finished.
            }, 4000);
        });


        // Blur Toggle. | 模糊切换方法.
        // ---------------------------------------------
        $scope.toggleBlur = function () {
            $scope.backgroundBlur === "blur" ? $scope.backgroundBlur = "" :  $scope.backgroundBlur = "blur";
        };


        // History Panel Listener. | 历史记录面板监听事件.
        // ---------------------------------------------
        $scope.$on("historyPanel", function (event, value) {
            value === "show" ? $scope.historyPanel = true : $scope.historyPanel = false;
        });


    }]);


    // Definition: Result Panel Controller. | 结果面板控制器.
    // 用来控制结果面板的显示与隐藏.
    ngAppCtrls.controller("resultPanelController", ["$scope", "appConfig", function ($scope, appConfig) {

        // Panel Show Object.
        $scope.panelShow = {};
        Object.keys(appConfig.site).filter(function (item) {
            var codeName = appConfig.site[item].codeName;
            $scope.panelShow[codeName] = false;
        });
        // Now it should be { caso: false, ktxp: false, ... }.

        // Definition: First Search Panel Showing Handler. | 首次搜索结果面板显示控制器.
        var panelIn = false;
        $scope.$on("searchResult", function (event, value) {
            if (panelIn) return;
            var codeName = value.codeName;
            $scope.panelShow[codeName] = true;
            panelIn = true;
        });

        // Definition: Result Panel Switching. | 面板切换广播监听.
        $scope.$on("resultPanelSwitching", function resultPanelSwitching (event, value) {
            Object.keys($scope.panelShow).filter(function (item) {
                $scope.panelShow[item] = false;
                value === item ? $scope.panelShow[item] = true : void(0);
            });
        });



    }]);



    // Definition: Left Side Navigator Buttons Controller. | 左侧导航按钮控制器.
    ngAppCtrls.controller("leftNavButtonCtrl", ["$scope", "$http", "$toast", "$leftNav", "$charMsg", "$localStorage", function ($scope, $http, $toast, $leftNav, $charMsg, $localStorage) {

        // Clear All History Items in Local Storage.
        $scope.clearHistory = function () {
            $localStorage.empty();
        };

    }]);


    // Definition: Splash Screen Controller. | 载入界面节点控制器.
    ngAppCtrls.controller("splashScreenController", ["$scope", function ($scope) {
        $scope.status = null;  // ngClass adjustment for splash node.
        $scope.$on("splashScreen", function (event, value) {
            $scope.status = value;
        });
    }]);


    // Definition: Service Modules Controller. | 服务模块节点控制器.
    ngAppCtrls.controller("serviceModules", ["$scope", function ($scope) {


    }]);


})();
