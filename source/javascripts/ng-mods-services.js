/*
 *  Animation Searcher Angular Application By LancerComet at 12:29, 2015/10/9.
 *  # Carry Your World #
 *
 *  ---
 *  Angular Serivce Modules Definition.
 *  Angular 服务模块定义.
 *
 *  ---
 *  @ ngApp: Main Angular Application. (Internal Directive.)
 *  @ ngAppCtrls: Controllers Module of this Angular Application.
 *  @ ngAppDirectives: Directives Module of this Angular Application.
 */
(function (global, undefined) {
    "use strict";

    // Definition: Service modules requirement module. | 服务模块引用模块.(真特么绕嘴)
    angular.module("ngAppService", [
        // Animation Searcher Custom Service Modules. | 自定义服务模块.
        "appToast", "charMsg", "leftNav", "colorChange", "localStorage", "splashLayout", "splashScreen", "changeLog", "textPanel", "clearMdToast", "historyPanel", "searchService"
    ]);

    // Definition: Toast Module, from Material-Angular. | Material-Angular Toast 模块定义.
    var appToast = angular.module("appToast", []);
    appToast.factory("$toast", ["$mdToast", "appConfig", function ($mdToast, appConfig) {

        var toastModule = {};

        // Definition: Set position of toast panel. | 设置 Toast 模块方位.
        toastModule.toastPosition = appConfig.toast.position;

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

    }]);


    // Definition: charMsg Module. | 角色信息提示模块.
    var charMsg = angular.module("charMsg", []);
    charMsg.factory("$charMsg", ["$timeout", "$window", "$internalFunc", function ($timeout, $window, $internalFunc) {

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
                    $internalFunc.throwError('param "content" must be provided when calling "$charMsg.show()".');
                }

                if (charMsgNode) {
                    $internalFunc.throwError("\n\n Character Message Panel has been created, can't create anymore, so stop calling me before remove it! （╯－＿－）╯╧╧ \n");
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
                        $internalFunc.addClass(charMsgNode, "left");
                        break;
                    case "right":
                        $internalFunc.addClass(charMsgNode, "right");
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
                var contentNode = document.createElement("div");
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
                $internalFunc.addClass(charMsgNode, "out-animation");
                $window.history.back();
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

    }]);


    // Definition: LocalStorage Control Module. | LocalStorage 控制模块.
    var localStorage = angular.module("localStorage", []);
    localStorage.factory("$localStorage", ["$toast" ,"$internalFunc", "appConfig", function ($toast, $internalFunc, appConfig) {

        return {
            setItem: setItem,
            getItem: getItem,
            removeItem: removeItem,
            empty: empty
        };

        function setItem (key, value) {
            // Error Handler.
            if (!key || !value) {
                $internalFunc.throwError('Params must be provided when calling "$localStorage.setItem()"!  (╯‵□′)╯︵┻━┻');
            }
            if (Object.prototype.toString.call(key) !== "[object String]") {
                $internalFunc.throwError('$localStorage.setItem(): Param "key" must be String.');
            }
            global.localStorage.setItem(key, value);
        }

        function getItem (key) {
            // Error Handler.
            if (!key || Object.prototype.toString.call(key) !== "[object String]") {
                $internalFunc.throwError('$localStorage.getItem(): Params "key" is invalid, take a look.');
            }
            return global.localStorage.getItem(key);
        }

        function removeItem (key) {
            // Error Handler.
            if (!key || Object.prototype.toString.call(key) !== "[object String]") {
                $internalFunc.throwError('$localStorage.removeItem(): Params "key" is invalid, take a look.');
            }
            global.localStorage.removeItem(key)
        }

        function empty () {
            Object.keys(global.localStorage).filter(function (key) {
                removeItem(key);
            });
            $toast.showSimpleToast("搜索历史已成功清空!  (●'◡'●)ﾉ♥");
            console.log(appConfig.text.prefix + "Info:\nAll items in Local Storage has been removed at " + new Date(Date.now()) + ".")
        }

    }]);


    // Definition: Left Side Navigator Bar, from Material-Angular. | Material-Angular 左侧导航模块.
    var leftNav = angular.module("leftNav", []);
    leftNav.factory("$leftNav", ["$timeout", "$mdSidenav", "$location", "$internalFunc", function ($timeout, $mdSidenav, $location, $internalFunc) {

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
            if (!$mdSidenav("leftside").isOpen()) {
                toggleBar();
                toggleButton("open");

                // Hotfix for "md-backdrop": remove ".ng-enter".
                $timeout(function () {
                    var $mdBackdrop = angular.element(document.querySelector("md-backdrop"));
                    $mdBackdrop.removeClass("ng-enter");
                }, 1);
            }
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
                    $internalFunc.imageAnimationX(targetDom, configuration);
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
                    $internalFunc.imageAnimationX(targetDom, configuration);
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
                        if (attr === "arrow") { return; }
                        setLeftNavMenu.toArrow();
                        break;
                    case "close":
                        if (attr === "menu") { return; }
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
            if ($internalFunc.imageAnimationX.isRunning) { return false; }
            toggleBar();
            toggleButton();
        }

        return {
            toggle: toggleFunc,
            open: openBar,
            close: closeBar
        }

    }]);


    // Definition: Color Change Service Module. | 颜色变换服务模块.
    var colorChange = angular.module("colorChange", []);
    colorChange.factory("$colorChange", function () {

        var colorThemeSheet = document.getElementById("color-change");
        var $colorThemeSheet = angular.element(colorThemeSheet);

        function colorChange (color) {
            var sheetString = ".color-theme.bk-color {" +
                "background-color:" + color + ";" +
                "color: #fff !important;" +
                "}" +
                ".color-theme.text-color {" +
                "color:" + color + " !important" +
                "}" +
                ".color-theme.text-hover:hover {" +
                "color:" + color + " !important" +
                "}";
            $colorThemeSheet.html(sheetString);
        }

        return {
            change: colorChange
        }
    });


    // Definition: Splash Layout Service Module. | 启动布局服务模块.
    var splashLayout = angular.module("splashLayout", []);
    splashLayout.factory("$splashLayout", ["$rootScope", function ($rootScope) {

        return {
            toInitLayout: toInitLayout,
            toStandByLayout: toStandByLayout
        };

        /* Services go below. */

        // Switch to initial layout. | 变换为初始布局.
        function toInitLayout () {
            $rootScope.$broadcast("splashLayout", "init-layout");
        }

        // Switch to stand-by layout. | 变换为正常布局.
        function toStandByLayout () {
            $rootScope.$broadcast("splashLayout", "stand-by-layout");
        }

    }]);


    // Definition: Change Log Service. | 更新日志服务模块.
    var changeLog = angular.module("changeLog", []);
    changeLog.factory("$changeLog", ["$http", "$splashLayout", "$leftNav", "$toast", "$internalFunc", "$textPanel", function ($http, $splashLayout, $leftNav, $toast, $internalFunc, $textPanel) {

        function showChangeLog () {
            $http.post("/change-log").then(
                function success (response) {
                    // response: { data, headers, status, config, statusText }
                   $textPanel.show({
                       title: "更新日志 <small>Change Log.</small>",
                       content: response.data.content,
                       backward: true
                   });
                },
                function error (response) {
                    $internalFunc.toastErr($toast, "更新日志获取失败, 过一会再试试?", "(/= _ =)/~┴┴", "Request for Change Log failed.");
                }
            );
        }

        return {
            show: showChangeLog
        };

    }]);


    // Definition: Text Panel Service. | 文字面板服务模块.
    var textPanel = angular.module("textPanel", []);
    textPanel.factory("$textPanel", ["$rootScope", function ($rootScope) {

        return {
            show: show,
            help: showHelp
        };

        // Helps for someone forgetful.
        // 老了，撸不动了.
        function showHelp () {
            console.log("$textPanel Service: \n--- This is a invincible divider. ---");
            console.log(' - $textPanel.show(config): Create a text panel and fill it with "config.content".');
            console.log(' - $textPanel.help(): Here comes the help you loser! \n');
        }

        // Create & Show a new Text Panel. | 创建并显示一个新的文字面板.
        function show (config) {
            /*
             *  config: {
             *    title: String,
             *    content: String,
             *    backward: Boolean  // @ True: Go backward when close button is clicked.
             *  }
             *
             */
            config = config || "";
            $rootScope.$broadcast("textPanelCreated", config);
        }

    }]);


    // Definition: Clear Material Toast. | 清除可能残余的 Material Toast.
    var clearMdToast = angular.module("clearMdToast", []);
    clearMdToast.factory("$clearMDToast", function () {
        return function () {
            angular.element(document.querySelector(".md-content")).remove();
        }
    });


    // Definition: Splash Screen Service. | 载入界面服务.
    var splashScreen = angular.module("splashScreen", []);
    splashScreen.factory("$splashScreen", ["$rootScope", function ($rootScope) {
        return {
            show: exec.bind(0, "show"),
            hide: exec.bind(0, "hide")
        };

        function exec () {
            $rootScope.$broadcast("splashScreen", arguments[0]);
        }
    }]);


    // Definition: History Panel Broadcaster. | 历史记录面板广播器.
    var historyPanel = angular.module("historyPanel", []);
    historyPanel.factory("$historyPanel", ["$rootScope", function ($rootScope) {
        return {
            show: exec.bind(0, "show"),
            hide: exec.bind(0, "hide")
        };

        function exec () {
            $rootScope.$broadcast("historyPanel", arguments[0]);
        }
    }]);


    // Definition: Search Service. | 搜索功能服务.
    var searchService = angular.module("searchService", []);
    searchService.factory("$search", ["$rootScope", "$http", "$toast", "appConfig", function ($rootScope, $http, $toast, appConfig) {
        return {
            search: search,
            changePage: changePage
        };

        // Definition: Search-requesting Function. | 搜索请求发起函数.
        function search (keywords) {

            // Fire Async Requesting. | 循环发起搜索请求.
            Object.keys(appConfig.site).filter(function (prop) {
                $http.post("/search/" + appConfig.site[prop].codeName, {
                    keywords: keywords
                }, {
                    timeout: appConfig.settings.xhrTimeout  // Timeout for 30s.
                }).success(function (data, status, headers, config, statusText) {
                    $rootScope.$broadcast("searchResult", data);  // Broadcast result.
                    $toast.showSimpleToast(data.info);  // Show simple toast after finished succesfully.
                }).error(function (data, status, headers, config, statusText) {
                    if (status === -1) {
                        // Timeout Handler.
                        $toast.showActionToast("您的搜索请求超时，不兹道四哪里粗了问题 ... ＞︿＜", "我知道了~");
                    } else {
                        // Throw a ActionToast when error was caught. | 出错时进行提示.
                        $toast.showActionToast(data.info, data.action);
                    }

                });
            });

        }

        // Definition: 换页请求搜索.
        function changePage (codename, link) {

            /*
             *  @ codename: 目标站点.
             *  @ link: 搜索目标链接.
             */

            $http.post("/search/" + codename, {
                mode: "switchPage",
                link: link
            }, {
                timeout: appConfig.settings.xhrTimeout  // Timeout for 30s.
            }).success(function (data, status, headers, config, statusText) {
                $rootScope.$broadcast("searchResult", data);  // Broadcast result.
                $toast.showSimpleToast(data.info);  // Show simple toast after finished succesfully.
            }).error(function (data, status, headers, config, statusText) {
                if (status === -1) {
                    // Timeout Handler.
                    $toast.showActionToast("您的搜索请求超时，不兹道四哪里粗了问题 ... ＞︿＜", "我知道了~");
                } else {
                    // Throw a ActionToast when error was caught. | 出错时进行提示.
                    $toast.showActionToast(data.info, data.action);
                }

            });
        }

    }]);

})(window);