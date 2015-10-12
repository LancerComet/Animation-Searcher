f/*
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
 */

// Definition: Angular Application Module. | ngApp 模块定义.
var ngApp = angular.module("ngApp", [
    "ngAnimate", "ngMaterial", "ngSanitize", "ngRoute",  // Angular Official Modules. | Angular.JS 官方模块.
    "ngAppCtrls", "ngAppDirectives",  // Animation Searcher Main Controller & Directive Modules. | 主控制器与指令模块.
    "ngAppToast", "ngCharMsg", "ngLeftNav", "ngColorChange", "ngLocalStorage", "ngSplashLayout"  // Animation Searcher Custom Service Modules. | 自定义服务模块.
]);


// Definition: Controllers Module & Configuration. | 总控制器模块定义.
var ngAppCtrls = angular.module("ngAppCtrls", []);
ngAppCtrls.config(["$compileProvider", function ($compileProvider) {
    // Set "Https", "Ftp", "Mailto", "File", "Magnet" as trusted string.
    // 将 "Https", "Ftp", "Mailto", "File", "Magnet" 设置为编译服务的可信字符串.
    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|magnet):/);
}]);


// Definition: Directives Module. | 指令模块定义.
var ngAppDirectives = angular.module("ngAppDirectives", []);