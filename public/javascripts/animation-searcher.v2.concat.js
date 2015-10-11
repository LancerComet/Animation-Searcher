/*
 *  Animation Searcher Angular Application By LancerComet at 12:29, 2015/10/9.
 *  # Carry Your World #
 *  ---
 *
 *  Description:
 *  ---
 *  Angular Application 程序逻辑.
 *
 *
 *
 *  Some internal functions:
 *  ---
 *  @ throwError (text): 错误处理函数, 同时会阻断程序执行.
 *  @ $toastFunc ($rootScope, type, content, action, callback):
 *  @ $toastErr ():
 *
 *
 *
 *
 *  Log:
 *  ---
 *  V0.1.2 - 1:17, 2015.10.11.
 *   + In Process.
 *   + 修复左侧抽屉菜单的动画问题.
 *   + 左侧抽屉打开时可按 ESC 关闭.
 *   + 增加变色服务模块.
 *   + 左侧抽屉与更新日志使用前端路由控制.
 *
 *  V0.1.1 - 14:26, 2015.10.10.
 *   + In Process.
 *   + 使用 service 代替 controller 模块.
 *
 *  V0.1.0 - 12:29, 2015.10.09.
 *   + 来自之前编写的初版.
 *
 */


(function (global, angular) {
    "use strict";

    /*
     *  Error Handler when Initialization.
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
    function $toastFunc ($toast, type, content, action, callback) {
        if (!$toast || !type) {
            throwError('Argument "$toast" or "type" is not provided in $toastErr.')
        }
        if (!content) {
            console.log(moduleSettings.text.prefix + "Caution: No toast content provided.");
        }
        content = content || "（木有提供提示消息~）";
        callback = callback || void(0);
        switch (type) {
            case "simple":
                $toast.showSimpleToast(content);
                break;
            case "action":
                action ? void(0) : throwError('Please provide parama "action" when calling ' + callback);
                $toast.showActionToast(content, action, callback);
                break;
        }
    }

    // Definition: Packaged Function of Angular-Material Error Toast. | 错误 Toast 提示函数.
    function $toastErr ($toast, content, action, consoleErr) {
        $toastFunc($toast, "action", content, action, function () {
            throwError(consoleErr);
        });
    }

    // Definition: Background-animating in X axis function. | 背景图片 X 轴动画播放函数.
    function imageAnimationX (targetDom, configure) {

        /*
         @ Configure: {
             startPosition: Number,
             width: Number,
             step: Numner,
             interval: Numbuer
           }
         */
        imageAnimationX.isRunning = true;
        targetDom.style.backgroundPositionX = configure.startPosition + "px";  // Reset Background Image Position.

        var runStep = 1;
        var animationInterval = setInterval(function () {
            if (runStep > configure.step) {
                configure.endPosition != undefined ? targetDom.style.backgroundPositionX = configure.endPosition + "px" : void(0);
                clearInterval(animationInterval);
                imageAnimationX.isRunning = false;
                return;
            }
            targetDom.style.backgroundPositionX = configure.startPosition + (configure.width * runStep) + "px";
            runStep++;
        }, configure.interval);
    }
    imageAnimationX.isRunning = false;

    // Definition: Native JavaScript Function extension. | 原生方法扩展函数.
    function hasClass (element, className) {
        return !!element.className.match(new RegExp( "(\\s|^)" + className + "(\\s|$)"));
    }

    function addClass (element, className) {
        if (!hasClass(element, className) ) {
            element.className += " " + className;
        }
    }

    function removeClass (element, className) {
        if (hasClass(element, className)) {
            element.className = element.className.replace(new RegExp("(\\s|^)" + className + "(\\s|$)"), " ");
        }
    }

    function setClass (element, className) {
        element.className = className;
    }

    function prependChild (parent,newChild) {
        if (parent.firstChild) {
            parent.insertBefore(newChild, parent.firstChild);
        } else {
            parent.appendChild(newChild);
        }
        return parent;
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
    var ngApp = angular.module("ngApp", [
        "ngAnimate", "ngMaterial", "ngSanitize", "ngRoute",  // Angular Official Modules. | Angular.JS 官方模块.
        "ngAppCtrls", "ngAppDirectives",  // Animation Searcher Main Controller & Directive Modules. | 主控制器与指令模块.
        "ngAppToast", "ngCharMsg", "ngLeftNav", "ngColorChange", "ngLocalStorage"  // Animation Searcher Custom Service Modules. | 自定义服务模块.
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


    // Definition: Toast Module, from Material-Angular. | Material-Angular Toast 模块定义.
    var ngAppToast = angular.module("ngAppToast", []);
    ngAppToast.factory("$toast", function ($mdToast) {

        var toastModule = {};

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
        toastModule.showSimpleToast = function (toastContent) {
            $mdToast.show(
                $mdToast.simple().content(toastContent).position(toastModule.getToastPosition()).hideDelay(5000)
            );
        };

        // Definition: Action Toast Function. | 可操作弹窗方法定义.
        // A Action-available toast would be created when called.
        toastModule.showActionToast = function (toastContent, toastAction, callback) {
            callback = callback || function () {};
            var toast = $mdToast.simple().content(toastContent).action(toastAction).highlightAction(false).position(toastModule.getToastPosition());
            $mdToast.show(toast).then(callback);
        };

        // Definition: Close Toast Method. | 关闭弹窗方法.
        toastModule.closeToast = function () {
            $mdToast.hide();
        };

        return toastModule;

    });


    // Definition: charMsg Module. | 角色信息提示模块.
    var ngCharMsg = angular.module("ngCharMsg", []);
    ngCharMsg.factory("$charMsg", function ($timeout) {

        // jqLite Object: body.
        var $body = angular.element(document.querySelector("body"));
        var isRunning = false;

        // Definition: charMsgNode Object. | charMsgNode 节点对象.
        // 页面中只允许同时出现一个 charMsg 提示, 因此将此对象暴漏至外部直接进行操作, 避免使用即时遍历的方式以提高性能.
        var charMsgNode = null;
        var $removeTimeout = null;  // 提示清理延时计时器对象.

        // Definition: charMsg 逻辑定义.
        var charMsg = {
            create: function (title, content, position) {
                if (!content) {
                    throwError('param "content" must be provided when calling "$charMsg.show()".');
                }

                if (charMsgNode) {
                    throwError("\n\n Character Message Panel has been created, can't create anymore, so stop calling me before remove it! （╯－＿－）╯╧╧ \n");
                }

                if (isRunning) {
                    return;
                }

                //$removeTimeout ? $removeTimeout.cancel() : void(0);  // Clear Removing Timeout. | 清理计时器以防止节点被意外清除.
                // Start creating process.
                isRunning = true;

                // Main Node.
                charMsgNode = document.createElement("char-msg");
                charMsgNode.className = "char-msg";

                // Content Container.
                var container = document.createElement("div");
                container.className = "char-msg-container";

                position = position || "left";

                switch (position) {
                    case "left":
                        addClass(charMsgNode, "left");
                        break;
                    case "right":
                        addClass(charMsgNode, "right");
                        break;
                }

                // Create title if there is. | 如果有标题, 创建标题节点.
                if (title) {
                    var titleNode = document.createElement("h2");
                    titleNode.className = "char-msg-title";
                    titleNode.innerHTML = title;
                    container.appendChild(titleNode);
                }

                // Content Node.
                var contentNode = document.createElement("p");
                contentNode.className = "char-msg-content";
                contentNode.innerHTML = content;
                container.appendChild(contentNode);

                // Close Button.
                var closeButton = document.createElement("button");
                closeButton.className = "char-msg-close-btn";
                closeButton.onclick = charMsg.remove;
                var btnIcon = document.createElement("i");
                btnIcon.className = "icon-cancel";
                closeButton.appendChild(btnIcon);

                container.appendChild(closeButton);
                charMsgNode.appendChild(container);

                $body.append(charMsgNode);

                // Set running status to false when animation finished.
                $timeout(function () {
                    isRunning = false;
                }, 500);

            },
            remove: function () {
                addClass(charMsgNode, "out-animation");
                $removeTimeout = $timeout(function () {
                    charMsgNode.parentNode.removeChild(charMsgNode);
                    charMsgNode = null;
                }, 500);
            }
        };

        return {
            show: charMsg.create,
            hide: charMsg.remove
        }

    });


    // Definition: LocalStorage Control Module. | LocalStorage 控制模块.
    var ngLocalStorage = angular.module("ngLocalStorage", []);
    ngLocalStorage.factory("$localStorage", function ($toast) {

        function setItem (key, value) {
            // Error Handler.
            if (!key || !value) {
                throwError('Params must be provided when calling "$localStorage.setItem()"!  (╯‵□′)╯︵┻━┻');
            }
            if (Object.prototype.toString.call(key) !== "[object String]") {
               throwError('$localStorage.setItem(): Param "key" must be String.');
            }
            global.localStorage.setItem(key, value);
        }

        function getItem (key) {
            // Error Handler.
            if (!key || Object.prototype.toString.call(key) !== "[object String]") {
                throwError('$localStorage.getItem(): Params "key" is invalid, take a look.');
            }
            return global.localStorage.getItem(key);
        }

        function removeItem (key) {
            // Error Handler.
            if (!key || Object.prototype.toString.call(key) !== "[object String]") {
                throwError('$localStorage.removeItem(): Params "key" is invalid, take a look.');
            }
            global.localStorage.removeItem(key)
        }

        function empty () {
            Object.keys(global.localStorage).filter(function (key) {
                removeItem(key);
            });
            $toast.showSimpleToast("搜索历史已成功清空!  (●'◡'●)ﾉ♥");
            console.log(moduleSettings.text.prefix + "Info:\nAll items in Local Storage has been removed at " + new Date(Date.now()) + ".")
        }

        return {
            setItem: setItem,
            getItem: getItem,
            removeItem: removeItem,
            empty: empty
        }

    });


    // Definition: Left Side Navigator Bar, from Material-Angular. | Material-Angular 左侧导航模块.
    var ngLeftNav = angular.module("ngLeftNav", []);
    ngLeftNav.factory("$leftNav", function ($mdSidenav, $timeout, $location) {

        // Definition: $window Object.
        var $window = angular.element(global);

        // Definition: 键盘关闭左侧导航监听器.
        function keyboardCloseLeftNav (event) {
            if (event.keyCode === 27) {
                toggleButton();
                closeBar();
            }
        }

        // Definition: Way to unbind "Press-ESC-To-Close-Left-Nav" Event.
        function unbindKeyboardCloseLeftNav () {
            $window.unbind("keyup", keyboardCloseLeftNav);
        }

        // Definition: Left Side Nav Toggle Function. | 左侧导航条 Toggle 函数.
        function toggleBar () {
            $mdSidenav("leftside").toggle().then(function () {
                // Execute when toggle is done. | 左侧导航切换成功后回调函数.
                // eg. $log.debug("Toggle is done.");
            });

            // Unbind "md-backdrop" original event. | 移除 "md-backdrop" 固有方法.
            // Bind a new method to close left nav. | 然后增加一个关闭 LeftNav 的自定义方法.
            // Ensure animation of LeftNavMenu is undercontrol. | 这是为了保证 LeftNavMenu 动画受到控制.
            // 使用计时器来确保 md-backdrop 能够获取.
            $timeout(function () {
                var $mdBackdrop = angular.element(document.querySelector("md-backdrop"));
                $mdBackdrop.unbind();
                $timeout(function () {
                    $mdBackdrop.bind("click", toggleFunc);
                }, 400);

                // Action: 设置 KeyUp 事件使得可以使用 ESC 关闭左侧导航.
                // Set Keyup Event to make it possible to close left nav by typing "ESC".
                if ($mdSidenav("leftside").isOpen()) {
                    $window.bind("keyup", keyboardCloseLeftNav);
                }

            }, 1);
        }

        // Definition: Left Side Nav Close Function. | 左侧导航条关闭函数.
        function closeBar () {
            $mdSidenav("leftside").close();
            toggleButton("close");
        }

        // Definition: Left Side Nav Open Function. | 左侧导航条开启函数.
        function openBar () {
            $mdSidenav("leftside").open();
            toggleButton("open");
        }

        // Definition: 按钮点击事件.
        function toggleButton (mode) {

            // 以下函数为按钮背景变换所需的函数.
            var targetDom = document.getElementById("left-nav-menu");

            // Definition: Left Navigator Drawer Button Animation Controller.
            // 抽屉菜单按钮动画控制方法.
            var setLeftNavMenu = {
                toArrow: function () {
                    var configuration = {
                        startPosition: 0,
                        width: 27.75,
                        step: 16,
                        interval: 17
                    };
                    imageAnimationX(targetDom, configuration);
                    targetDom.setAttribute("data-status", "arrow");
                    $location.path("/side-nav-open");
                },
                toMenu: function () {
                    var configuration = {
                        startPosition: 444,
                        endPosition: 0,
                        width: 27.75,
                        step: 16,
                        interval: 17
                    };
                    imageAnimationX(targetDom, configuration);
                    targetDom.setAttribute("data-status", "menu");
                    unbindKeyboardCloseLeftNav();
                    $location.path("/");
                }
            };

            var attr = targetDom.getAttribute("data-status");

            // 传入 mode 参数来直接控制按钮的状态.
            if (mode) {
                switch (mode) {
                    case "open":
                        setLeftNavMenu.toArrow();
                        break;
                    case "close":
                        setLeftNavMenu.toMenu();
                        break;

                }
            } else {
                switch (attr) {
                    case "menu":
                        setLeftNavMenu.toArrow();
                        break;
                    case "arrow":
                        setLeftNavMenu.toMenu();
                        break;
                }
            }
        }

        // Definition: Main Toggle Function. | 总 Toggle 控制函数.
        function toggleFunc () {
            if (imageAnimationX.isRunning) { return false; }
            toggleBar();
            toggleButton();
        }

        return {
            toggle: toggleFunc,
            open: openBar,
            close: closeBar
        }

    });


    // Definition: Color Change Service Module. | 颜色变换服务模块.
    var ngColorChange = angular.module("ngColorChange", []);
    ngColorChange.factory("$colorChange", function () {

        function colorChange (color) {

        }

        return {
            change: colorChange
        }
    });
    /* =========================================================================================== */




    /*
     *  Frount Router Definition.
     *  ---
     *  Angular 前端路由定义.
     */
    ngApp.config(["$routeProvider", function ($routeProvider) {
        $routeProvider.when("/change-log", {
            template: "",
            controller: function ($scope, $http, $toast, $charMsg, $leftNav) {
                $http.get("/change-log").then(
                    function success (response) {
                        $charMsg.show("更新日志", "aaaaa");
                    },
                    function error (response) {
                        $toastErr($toast, "更新日志获取失败, 过一会再试试?", "(/= _ =)/~┴┴", "Request for Change Log failed.");
                    }
                );
            }
        }).when("/side-nav-open", {
            template: "",
            controller: function ($leftNav) {
                $leftNav.open();
            }
        }).when("/", {
            template: "",
            controller: function ($leftNav) {
                $leftNav.close();
            }
        });
    }]).config(["$locationProvider", function ($locationProvider) {
        $locationProvider.html5Mode({
            enabled: true
        });
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
    ngAppDirectives.directive("leftnavMenu", function ($leftNav) {
        return {
            restrict: "E",
            scope: true,
            controller: function ($scope, $element, $attrs) {
            },
            link: function (scope, element, attrs) {
                scope.toggle = $leftNav.toggle;
            }
        }
    });


    // Definition: Search Directive. | 搜索模块指令定义.
    ngAppDirectives.directive("searchBar", function ($rootScope) {
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
                    Object.keys(moduleSettings.site).filter(function (prop) {
                        $http.post("/search/" + moduleSettings.site[prop].codeName, {
                            keywords: scope.keywords
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
/*
 *  Animation Searcher WebSocket Service By LancerComet at 15:27, 2015/10/9.
 *  # Carry Your World #
 *  ---
 *
 *  Description:
 *  ---
 *  Animation Searcher 的 WebSocket 服务逻辑.
 *
 *  Log:
 *  ---
 *  V0.1.0 - 15:27, 2015.10.09.
 *   - 初版.
 *
 */

(function (global, angular, undefined) {

    var consoleTextPrefix = "Animation Searcher ";

    // Definition: WebSocket event handler for window. | WebSocket 服务逻辑.
    function socketService () {

        // Error Handler: No Socket.io. | Socket.io 未载入.
        if(!global.io){
            throw new Error(consoleTextPrefix + "Error: Socket.io isn't loaded yet, scripts has been stoped.");
        }

        // Definition: WebSocket Object.
        var socket = global.io();

        // Connected.
        socket.on("greeting", function (data) {
            console.log(consoleTextPrefix + "Info: WebSocket from now on. :)");
            socket.emit("thank-you-sir", {info: "啊♂啊♂Thank♂You♂Sir"});
        });

    }

    angular.element(window).on("load", socketService);

})(window, window.angular);