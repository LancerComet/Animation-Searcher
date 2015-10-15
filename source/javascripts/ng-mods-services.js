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

    // Definition: Toast Module, from Material-Angular. | Material-Angular Toast 模块定义.
    var ngAppToast = angular.module("ngAppToast", []);
    ngAppToast.factory("$toast", ["$mdToast", "appConfig", function ($mdToast, appConfig) {

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
    var ngCharMsg = angular.module("ngCharMsg", []);
    ngCharMsg.factory("$charMsg", function ($timeout, $internalFunc) {

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
            remove: function (callback) {
                addClass(charMsgNode, "out-animation");
                $removeTimeout = $timeout(function () {
                    charMsgNode.parentNode.removeChild(charMsgNode);
                    charMsgNode = null;
                    callback ? callback() : void(0);
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
    ngLocalStorage.factory("$localStorage", function ($toast, $internalFunc, appConfig) {

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

        return {
            setItem: setItem,
            getItem: getItem,
            removeItem: removeItem,
            empty: empty
        }

    });


    // Definition: Left Side Navigator Bar, from Material-Angular. | Material-Angular 左侧导航模块.
    var ngLeftNav = angular.module("ngLeftNav", []);
    ngLeftNav.factory("$leftNav", function ($mdSidenav, $timeout, $location, $internalFunc) {

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

    });


    // Definition: Color Change Service Module. | 颜色变换服务模块.
    var ngColorChange = angular.module("ngColorChange", []);
    ngColorChange.factory("$colorChange", function () {

        var colorThemeSheet = document.getElementById("color-change");
        var $colorThemeSheet = angular.element(colorThemeSheet);

        function colorChange (color) {
            var sheetString = ".color-theme.bk-color {" +
                "background-color:" + color +
                "}" +
                ".color-theme.text-color {" +
                "color:" + color +
                "}";
            $colorThemeSheet.html(sheetString);
        }

        return {
            change: colorChange
        }
    });

    // Definition: Splash Layout Service Module. | 启动布局服务模块.
    var ngSplashLayout = angular.module("ngSplashLayout", []);
    ngSplashLayout.factory("$splashLayout", function () {

        var className = {
            initLayout: "init-layout",  // "True" stands by "init-layout".
            standBy: "stand-by-layout"  // "False" stands by "stand-by-layout".
        };

        var layout = {
            status: className.initLayout  // 设置为属性以便在控制器中深度监听.
        };

        return {
            toInitLayout: toInitLayout,
            toStandByLayout: toStandByLayout,
            layout: layout
        };

        /* Services go below. */

        // Switch to initial layout. | 变换为初始布局.
        function toInitLayout () {
            layout.status = className.initLayout;
        }

        // Switch to stand-by layout. | 变换为正常布局.
        function toStandByLayout () {
            layout.status = className.standBy;
        }

    });


    // Definition: Change Log Service. | 更新日志服务模块.
    var ngChangeLog = angular.module("ngChangeLog", []);
    ngChangeLog.factory("$changeLog", function ($http, $splashLayout, $leftNav, $toast, $internalFunc) {
        var self = this;  // Self Reference.
        var panelStatus = "hide";

        function showChangeLog () {
            $http.post("/change-log").then(
                function success (response) {
                    // response: { data, headers, status, config, statusText }
                    $splashLayout.toStandByLayout();
                    self.panelStatus = "show";
                },
                function error (response) {
                    $internalFunc.toastErr($toast, "更新日志获取失败, 过一会再试试?", "(/= _ =)/~┴┴", "Request for Change Log failed.");
                }
            );
        }

        function hideChangeLog () {
            self.panelStatus = "hide";
        }

        return {
            show: showChangeLog,
            hide: hideChangeLog,
            status: panelStatus
        };

    });
})(window);