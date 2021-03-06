/*
 *  Animation Searcher Angular Application By LancerComet at 12:29, 2015/10/9.
 *  # Carry Your World #
 *  ---
 *  Internal Function Definition: Only used in Service Logic.
 *  内部方法定义: 仅在业务逻辑中使用, 不对外暴漏.
 *
 */

(function () {
    "use strict";

    // $internalFunc Service Definition. | $internalFunc 服务定义.
    var internalFunc = angular.module("internalFunc", []);
    internalFunc.factory("$internalFunc", ["$interval", "$window", "appConfig", function ($interval, $window, appConfig) {
        return {
            throwError: throwError,
            toastFunc: $toastFunc,
            toastErr: $toastErr,
            imageAnimationX: imageAnimationX,
            hasClass: hasClass,
            addClass: addClass,
            removeClass: removeClass,
            setClass: setClass,
            prependChild: prependChild
        };

        /* Functions go below. */

        // Definition: Error Handler in console & for developers only. | 控制台内错误提示.
        // Please note that this function will block Explorer and all functions next won't be executed.
        // 请注意此函数将使用 throw New Error 阻塞浏览器执行接下来的代码.
        function throwError (text) {
            throw new Error(appConfig.text.prefix + "Error: " + text);
        }

        // Definition: Packaging function of Angular-Material Toast. | Angular-Material 的 Toast 组件封装函数.
        function $toastFunc ($toast, type, content, action, callback) {
            if (!$toast || !type) {
                throwError('Argument "$toast" or "type" is not provided in $toastErr.')
            }
            if (!content) {
                console.log(appConfig.text.prefix + "Caution: No toast content provided.");
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

            imageAnimationX.isRunning = false;

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
            var intervalFunc = function () {
                if (runStep > configure.step) {
                    configure.endPosition != undefined ? targetDom.style.backgroundPositionX = configure.endPosition + "px" : void(0);

                    // Firefox Can not recognise background-position-x & background-position-y.
                    if ($window.navigator.userAgent.indexOf("Firefox") > -1) {
                        configure.endPosition != undefined ? targetDom.style.backgroundPosition = configure.endPosition + "px 0" : void(0);
                    }

                    $interval.cancel(theInterval);
                    imageAnimationX.isRunning = false;
                    return;
                }
                targetDom.style.backgroundPositionX = configure.startPosition + (configure.width * runStep) + "px";

                // Firefox Can not recognise background-position-x & background-position-y.
                if ($window.navigator.userAgent.indexOf("Firefox") > -1) {
                    targetDom.style.backgroundPosition = configure.startPosition + (configure.width * runStep) + "px 0";
                }

                runStep++;
            };

            var theInterval = $interval(intervalFunc, configure.interval);
        }

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


    }]);

})();