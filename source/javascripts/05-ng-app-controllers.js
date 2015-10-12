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


// Definition: Main Controller. | 页面主控制器.
// Transferring data between direvtives.
ngAppCtrls.controller("mainController", ["$scope", "$rootScope", "$splashLayout", function ($scope, $rootScope, $splashLayout) {

    console.log($rootScope.layout);

    // Definition: Status of Progressbar (on the left). | 左侧切换列表的搜索条状态.
    // ---------------------------------------------
    // @ True: Show this Progress bar.
    // @ False: Hide this Progress bar.
    $scope.progressStatus = {};

    // Set $scope.progressStatus's properties refer to "moduleSettings.site". | 依据 "moduleSettings.site" 设置 $scope.progressStatus 的属性.
    // Individual module looks.
    (function setProgressStatusData () {
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


// Definition: Left Side Navigator Buttons Controller. | 左侧导航按钮控制器.
ngAppCtrls.controller("leftNavButtonCtrl", function ($scope, $http, $toast, $leftNav, $charMsg, $localStorage) {

    // Clear All History Items in Local Storage.
    $scope.clearHistory = function () {
        $localStorage.empty();
    };

});