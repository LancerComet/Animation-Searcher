/*
 *  Animation Searcher Angular Application By LancerComet at 12:29, 2015/10/9.
 *  # Carry Your World #
 *  ---
 *  Error Handler when Initialization.
 *  错误处理机: No Angular, Old Browser, ect.
 *
 */

;(function errorHandler (global, undefined) {

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

})(window);
/*
 *  Animation Searcher Angular Application By LancerComet at 12:29, 2015/10/9.
 *  # Carry Your World #
 *  ---
 *  Module Overall Configure and Definition.
 *  模块设置与必要内容定义.
 *
 */

;(function () {
    "use strict";

    var appConfig = angular.module("appConfig", []);
    appConfig.value("appConfig", {

        // Text Content Definition.
        text: {
            prefix: "Animation Searcher "  // Please note that a WHITESPACE was placed at end.
        },

        // Searchable Site Definition. This object would be imported in many places.
        // 可搜索的站点定义. 数据将在多处地方使用.
        // 在 Node 的 app-config.js 中同样存在一份配置供后端使用.
        site: {
            caso: { name: "华盟", codeName: "caso", fullName: "China Animation Subtitle Organization",  url: "https://camoe.org", icon: "http://tp4.sinaimg.cn/1843885343/180/1290319229/0", disabled: false },
            ktxp: { name: "极影", codeName: "ktxp", fullName: "Katong XP",  url: "http://bt.ktxp.org", icon: "http://tp4.sinaimg.cn/3808818207/180/5680524263/0", disabled: true },
            popgo: { name: "漫游", codeName: "popgo", fullName: "Popgo",  url: "http://share.popgo.org", icon: "http://tp1.sinaimg.cn/2661910672/180/5727241391/0", disabled: true },
            dmhy: { name: "动漫花园", codeName: "dmhy", fullName: "DongMan HuaYuan",  url: "https://share.dmhy.org", icon: "http://tp2.sinaimg.cn/1926582581/180/22817929400/0", disabled: false }
        },

        // Toast Configuration. | 提示模块设置参数.
        toast: {
            position: { top: true, bottom: false, left: false, right: true }
        },

        settings: {
            xhrTimeout: 1000 * 30  // Timeout: 30s.
        }

    });

})();

/*
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
 *
 *
 *  Log:
 *  ---
 *  V0.1.8 - 22:25, 2015.10.20.
 *   + 历史记录面板.
 *   + 随机生成背景图片.
 *   + 后端搜索模块逻辑.
 *   + 布局服务从深度监听修改为广播机制.
 *
 *  V0.1.7 - 0:01, 2015.10.20.
 *   + 完善前端搜索功能逻辑.
 *   + Splash 页面增加模糊切换开关.
 *   + 后端搜索模块逻辑.
 *
 *  V0.1.6 - 22:33, 2015.10.18.
 *   + 修复菜单按钮在火狐下不变换的问题. (火狐不识别 background-position 的分离属性)
 *
 *  V0.1.5 - 16:53, 2015.10.17.
 *   + 加入文字信息面板模块.
 *   + 使用广播机制替换部分不合理方法.
 *   + 增加启动画面.
 *   + 引入 Lokesh Dhakar 的 ColorThief.
 *
 *  V0.1.4 - 23:01, 2015.10.15.
 *   + 将全部 JavaScript 内容 Angular 模块化并使用 IFFE 封装.
 *   + JavaScript 文件分类存放.
 *   + 使用深度监听服务的内置变量属性来修改界面布局而非将状态数值取自 $rootScope.
 *
 *  V0.1.3 - 13:51, 2015.10.12.
 *   + ngApp.js 拆解成模块文件.
 *
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

;(function () {
    "use strict";

    // Definition: Angular Application Module. | ngApp 模块定义.
    var ngApp = angular.module("ngApp", [
        "ngAnimate", "ngMaterial", "ngSanitize", "ngRoute",  // Angular Official Modules. | Angular.JS 官方模块.
        "appConfig",  // Angular Application Configuration. | Angular 实例模块设置.
        "internalFunc",  // Internal Functions Add-on Module. | 内部方法模块.
        "ngAppCtrls", "ngAppDirectives", "ngAppService", "ngFrontendRouter",  // Animation Searcher Main Controller & Directive Modules. | 主控制器与指令模块.
        "colorThief"  // colorThief Original By Lokesh Dhakar.
    ]);

    // Action: ngApp configuration.
    ngApp.config(["$compileProvider", function ($compileProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|magnet):/);  // Set "Https", "Ftp", "Mailto", "File", "Magnet" as trusted string. | 将 "Https", "Ftp", "Mailto", "File", "Magnet" 设置为编译服务的可信字符串.
    }]);

    // Action: ngApp Initialization-run.
    ngApp.run(["$timeout", "$splashScreen", "$colorChange", "$colorThief", function ($timeout, $splashScreen, $colorChange, $colorThief) {

        // "window.onload" event.
        angular.element(window).on("load", function () {
            var image = document.querySelector("#greeting-background");
            var themeColor = $colorThief.getThemeColor(image);
            $timeout(function () { $splashScreen.hide(); }, 1000 + Math.ceil(Math.random() * 2000));
            $timeout(function () { $colorChange.change(themeColor); }, 1000)
        });

    }]);


})();

/*
 *  Color Theft Angular Module Packaged by LancerComet at 1:09, 2015/10/18.
 *  Check text below for more information.
 *  ---
 *  Special thanks to original author: Lokesh Dhakar.
 */


/*!
 * Color Thief v2.0
 * by Lokesh Dhakar - http://www.lokeshdhakar.com
 *
 * Thanks
 * ------
 * Nick Rabinowitz - For creating quantize.js.
 * John Schulz - For clean up and optimization. @JFSIII
 * Nathan Spady - For adding drag and drop support to the demo page.
 *
 * License
 * -------
 * Copyright 2011, 2015 Lokesh Dhakar
 * Released under the MIT license
 * https://raw.githubusercontent.com/lokesh/color-thief/master/LICENSE
 *
 */


(function () {

    var colorThief = angular.module("colorThief", []);
    colorThief.factory("$colorThief", function () {
        /*
           CanvasImage Class
           Class that wraps the html image element and canvas.
           It also simplifies some of the canvas context manipulation
           with a set of helper functions.
         */

        var CanvasImage = function (image) {
            this.canvas  = document.createElement('canvas');
            this.context = this.canvas.getContext('2d');

            document.body.appendChild(this.canvas);

            this.width  = this.canvas.width  = image.width;
            this.height = this.canvas.height = image.height;

            this.context.drawImage(image, 0, 0, this.width, this.height);
        };

        CanvasImage.prototype.clear = function () {
            this.context.clearRect(0, 0, this.width, this.height);
        };

        CanvasImage.prototype.update = function (imageData) {
            this.context.putImageData(imageData, 0, 0);
        };

        CanvasImage.prototype.getPixelCount = function () {
            return this.width * this.height;
        };

        CanvasImage.prototype.getImageData = function () {
            return this.context.getImageData(0, 0, this.width, this.height);
        };

        CanvasImage.prototype.removeCanvas = function () {
            this.canvas.parentNode.removeChild(this.canvas);
        };


        var ColorThief = function () {};

        /*
         * getColor(sourceImage[, quality])
         * returns {r: num, g: num, b: num}
         *
         * Use the median cut algorithm provided by quantize.js to cluster similar
         * colors and return the base color from the largest cluster.
         *
         * Quality is an optional argument. It needs to be an integer. 1 is the highest quality settings.
         * 10 is the default. There is a trade-off between quality and speed. The bigger the number, the
         * faster a color will be returned but the greater the likelihood that it will not be the visually
         * most dominant color.
         *
         * */
        ColorThief.prototype.getColor = function (sourceImage, quality) {
            var palette = this.getPalette(sourceImage, 5, quality);
            return "rgb(" + palette[0][0] + ", " + palette[0][1] + ", " + palette[0][2] + ")";  // This is dominant color or adjusted color.
        };

        // Get Theme Color Function By LancerComet at 0:06, 2015.10.21.
        ColorThief.prototype.getThemeColor = function (sourceImage, quality) {
            var palette = this.getPalette(sourceImage, 5, quality);
            var rgbResult = {
                r: palette[0][0],
                g: palette[0][1],
                b: palette[0][2]
            };
            var hsvResult = rgbToHsv(rgbResult.r, rgbResult.g, rgbResult.b);  // [h, s, v]

            var finalColor = [];
            // If dominant color is too bright, adjust the birghtness to 0.75.
            if (hsvResult[2] > 0.75 && hsvResult[2] <= 0.85) {
                hsvResult[2] = 0.75;
                hsvResult[1] += 0.15;
                console.log("Animation Searcher Info: The dominant color is too bright, and it has been adjusted.");
                finalColor = hsvToRgb(hsvResult[0], hsvResult[1], hsvResult[2]);  // [r, g, b]
            } else if (hsvResult[2] > 0.85) {
                // Return the darkest color when is toooooooo bright.
                finalColor = ColorThief.prototype.getDarkestColor(sourceImage, quality);
                console.log("Animation Searcher Info: The dominant color is too bright, so the darkest color has been set.");
            } else {
                finalColor = hsvToRgb(hsvResult[0], hsvResult[1], hsvResult[2]);  // [r, g, b]
            }

            return "rgb(" + finalColor[0] + ", " + finalColor[1] + ", " + finalColor[2] + ")";  // This is dominant color or adjusted color.
        };

        // Darkest Color Function By LancerComet at 1:36, 2015.10.18.
        ColorThief.prototype.getDarkestColor = function (sourceImage, quality) {
            var palette = this.getPalette(sourceImage, 5, quality);
            var colorSum = 255 * 3;
            var darkestColor = null;
            Object.keys(palette).filter(function (eachColor) {
                var sum = palette[eachColor][0] + palette[eachColor][1] + palette[eachColor][2];
                if (sum < colorSum) {
                    colorSum = sum;
                    //darkestColor = "rgb(" + palette[eachColor][0] + ", " + palette[eachColor][1] + ", " + palette[eachColor][2] + ")";
                    darkestColor = [palette[eachColor][0], palette[eachColor][1], palette[eachColor][2]];
                }
            });
            return darkestColor;
        };


        /*
         * getPalette(sourceImage[, colorCount, quality])
         * returns array[ {r: num, g: num, b: num}, {r: num, g: num, b: num}, ...]
         *
         * Use the median cut algorithm provided by quantize.js to cluster similar colors.
         *
         * colorCount determines the size of the palette; the number of colors returned. If not set, it
         * defaults to 10.
         *
         * BUGGY: Function does not always return the requested amount of colors. It can be +/- 2.
         *
         * quality is an optional argument. It needs to be an integer. 1 is the highest quality settings.
         * 10 is the default. There is a trade-off between quality and speed. The bigger the number, the
         * faster the palette generation but the greater the likelihood that colors will be missed.
         *
         *
         */
        ColorThief.prototype.getPalette = function(sourceImage, colorCount, quality) {

            if (typeof colorCount === 'undefined') {
                colorCount = 10;
            }
            if (typeof quality === 'undefined' || quality < 1) {
                quality = 10;
            }

            // Create custom CanvasImage object
            var image      = new CanvasImage(sourceImage);
            var imageData  = image.getImageData();
            var pixels     = imageData.data;
            var pixelCount = image.getPixelCount();

            // Store the RGB values in an array format suitable for quantize function
            var pixelArray = [];
            for (var i = 0, offset, r, g, b, a; i < pixelCount; i = i + quality) {
                offset = i * 4;
                r = pixels[offset + 0];
                g = pixels[offset + 1];
                b = pixels[offset + 2];
                a = pixels[offset + 3];
                // If pixel is mostly opaque and not white
                if (a >= 125) {
                    if (!(r > 250 && g > 250 && b > 250)) {
                        pixelArray.push([r, g, b]);
                    }
                }
            }

            // Send array to quantize function which clusters values
            // using median cut algorithm
            var cmap    = MMCQ.quantize(pixelArray, colorCount);
            var palette = cmap? cmap.palette() : null;

            // Clean up
            image.removeCanvas();

            return palette;
        };




        /*!
         * quantize.js Copyright 2008 Nick Rabinowitz.
         * Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
         */

        // fill out a couple protovis dependencies
        /*!
         * Block below copied from Protovis: http://mbostock.github.com/protovis/
         * Copyright 2010 Stanford Visualization Group
         * Licensed under the BSD License: http://www.opensource.org/licenses/bsd-license.php
         */
        if (!pv) {
            var pv = {
                map: function(array, f) {
                    var o = {};
                    return f ? array.map(function(d, i) { o.index = i; return f.call(o, d); }) : array.slice();
                },
                naturalOrder: function(a, b) {
                    return (a < b) ? -1 : ((a > b) ? 1 : 0);
                },
                sum: function(array, f) {
                    var o = {};
                    return array.reduce(f ? function(p, d, i) { o.index = i; return p + f.call(o, d); } : function(p, d) { return p + d; }, 0);
                },
                max: function(array, f) {
                    return Math.max.apply(null, f ? pv.map(array, f) : array);
                }
            };
        }



        /**
         * Basic Javascript port of the MMCQ (modified median cut quantization)
         * algorithm from the Leptonica library (http://www.leptonica.com/).
         * Returns a color map you can use to map original pixels to the reduced
         * palette. Still a work in progress.
         *
         * @author Nick Rabinowitz
         * @example

         // array of pixels as [R,G,B] arrays
         var myPixels = [[190,197,190], [202,204,200], [207,214,210], [211,214,211], [205,207,207]
         // etc
         ];
         var maxColors = 4;

         var cmap = MMCQ.quantize(myPixels, maxColors);
         var newPalette = cmap.palette();
         var newPixels = myPixels.map(function(p) {
             return cmap.map(p);
         });

         */
        var MMCQ = (function() {
            // private constants
            var sigbits = 5,
                rshift = 8 - sigbits,
                maxIterations = 1000,
                fractByPopulations = 0.75;

            // get reduced-space color index for a pixel
            function getColorIndex(r, g, b) {
                return (r << (2 * sigbits)) + (g << sigbits) + b;
            }

            // Simple priority queue
            function PQueue(comparator) {
                var contents = [],
                    sorted = false;

                function sort() {
                    contents.sort(comparator);
                    sorted = true;
                }

                return {
                    push: function(o) {
                        contents.push(o);
                        sorted = false;
                    },
                    peek: function(index) {
                        if (!sorted) sort();
                        if (index===undefined) index = contents.length - 1;
                        return contents[index];
                    },
                    pop: function() {
                        if (!sorted) sort();
                        return contents.pop();
                    },
                    size: function() {
                        return contents.length;
                    },
                    map: function(f) {
                        return contents.map(f);
                    },
                    debug: function() {
                        if (!sorted) sort();
                        return contents;
                    }
                };
            }

            // 3d color space box
            function VBox(r1, r2, g1, g2, b1, b2, histo) {
                var vbox = this;
                vbox.r1 = r1;
                vbox.r2 = r2;
                vbox.g1 = g1;
                vbox.g2 = g2;
                vbox.b1 = b1;
                vbox.b2 = b2;
                vbox.histo = histo;
            }
            VBox.prototype = {
                volume: function(force) {
                    var vbox = this;
                    if (!vbox._volume || force) {
                        vbox._volume = ((vbox.r2 - vbox.r1 + 1) * (vbox.g2 - vbox.g1 + 1) * (vbox.b2 - vbox.b1 + 1));
                    }
                    return vbox._volume;
                },
                count: function(force) {
                    var vbox = this,
                        histo = vbox.histo;
                    if (!vbox._count_set || force) {
                        var npix = 0,
                            i, j, k;
                        for (i = vbox.r1; i <= vbox.r2; i++) {
                            for (j = vbox.g1; j <= vbox.g2; j++) {
                                for (k = vbox.b1; k <= vbox.b2; k++) {
                                    index = getColorIndex(i,j,k);
                                    npix += (histo[index] || 0);
                                }
                            }
                        }
                        vbox._count = npix;
                        vbox._count_set = true;
                    }
                    return vbox._count;
                },
                copy: function() {
                    var vbox = this;
                    return new VBox(vbox.r1, vbox.r2, vbox.g1, vbox.g2, vbox.b1, vbox.b2, vbox.histo);
                },
                avg: function(force) {
                    var vbox = this,
                        histo = vbox.histo;
                    if (!vbox._avg || force) {
                        var ntot = 0,
                            mult = 1 << (8 - sigbits),
                            rsum = 0,
                            gsum = 0,
                            bsum = 0,
                            hval,
                            i, j, k, histoindex;
                        for (i = vbox.r1; i <= vbox.r2; i++) {
                            for (j = vbox.g1; j <= vbox.g2; j++) {
                                for (k = vbox.b1; k <= vbox.b2; k++) {
                                    histoindex = getColorIndex(i,j,k);
                                    hval = histo[histoindex] || 0;
                                    ntot += hval;
                                    rsum += (hval * (i + 0.5) * mult);
                                    gsum += (hval * (j + 0.5) * mult);
                                    bsum += (hval * (k + 0.5) * mult);
                                }
                            }
                        }
                        if (ntot) {
                            vbox._avg = [~~(rsum/ntot), ~~(gsum/ntot), ~~(bsum/ntot)];
                        } else {
//                    console.log('empty box');
                            vbox._avg = [
                                ~~(mult * (vbox.r1 + vbox.r2 + 1) / 2),
                                ~~(mult * (vbox.g1 + vbox.g2 + 1) / 2),
                                ~~(mult * (vbox.b1 + vbox.b2 + 1) / 2)
                            ];
                        }
                    }
                    return vbox._avg;
                },
                contains: function(pixel) {
                    var vbox = this,
                        rval = pixel[0] >> rshift;
                    gval = pixel[1] >> rshift;
                    bval = pixel[2] >> rshift;
                    return (rval >= vbox.r1 && rval <= vbox.r2 &&
                    gval >= vbox.g1 && gval <= vbox.g2 &&
                    bval >= vbox.b1 && bval <= vbox.b2);
                }
            };

            // Color map
            function CMap() {
                this.vboxes = new PQueue(function(a,b) {
                    return pv.naturalOrder(
                        a.vbox.count()*a.vbox.volume(),
                        b.vbox.count()*b.vbox.volume()
                    );
                });
            }
            CMap.prototype = {
                push: function(vbox) {
                    this.vboxes.push({
                        vbox: vbox,
                        color: vbox.avg()
                    });
                },
                palette: function() {
                    return this.vboxes.map(function(vb) { return vb.color; });
                },
                size: function() {
                    return this.vboxes.size();
                },
                map: function(color) {
                    var vboxes = this.vboxes;
                    for (var i=0; i<vboxes.size(); i++) {
                        if (vboxes.peek(i).vbox.contains(color)) {
                            return vboxes.peek(i).color;
                        }
                    }
                    return this.nearest(color);
                },
                nearest: function(color) {
                    var vboxes = this.vboxes,
                        d1, d2, pColor;
                    for (var i=0; i<vboxes.size(); i++) {
                        d2 = Math.sqrt(
                            Math.pow(color[0] - vboxes.peek(i).color[0], 2) +
                            Math.pow(color[1] - vboxes.peek(i).color[1], 2) +
                            Math.pow(color[2] - vboxes.peek(i).color[2], 2)
                        );
                        if (d2 < d1 || d1 === undefined) {
                            d1 = d2;
                            pColor = vboxes.peek(i).color;
                        }
                    }
                    return pColor;
                },
                forcebw: function() {
                    // XXX: won't  work yet
                    var vboxes = this.vboxes;
                    vboxes.sort(function(a,b) { return pv.naturalOrder(pv.sum(a.color), pv.sum(b.color));});

                    // force darkest color to black if everything < 5
                    var lowest = vboxes[0].color;
                    if (lowest[0] < 5 && lowest[1] < 5 && lowest[2] < 5)
                        vboxes[0].color = [0,0,0];

                    // force lightest color to white if everything > 251
                    var idx = vboxes.length-1,
                        highest = vboxes[idx].color;
                    if (highest[0] > 251 && highest[1] > 251 && highest[2] > 251)
                        vboxes[idx].color = [255,255,255];
                }
            };

            // histo (1-d array, giving the number of pixels in
            // each quantized region of color space), or null on error
            function getHisto(pixels) {
                var histosize = 1 << (3 * sigbits),
                    histo = new Array(histosize),
                    index, rval, gval, bval;
                pixels.forEach(function(pixel) {
                    rval = pixel[0] >> rshift;
                    gval = pixel[1] >> rshift;
                    bval = pixel[2] >> rshift;
                    index = getColorIndex(rval, gval, bval);
                    histo[index] = (histo[index] || 0) + 1;
                });
                return histo;
            }

            function vboxFromPixels(pixels, histo) {
                var rmin=1000000, rmax=0,
                    gmin=1000000, gmax=0,
                    bmin=1000000, bmax=0,
                    rval, gval, bval;
                // find min/max
                pixels.forEach(function(pixel) {
                    rval = pixel[0] >> rshift;
                    gval = pixel[1] >> rshift;
                    bval = pixel[2] >> rshift;
                    if (rval < rmin) rmin = rval;
                    else if (rval > rmax) rmax = rval;
                    if (gval < gmin) gmin = gval;
                    else if (gval > gmax) gmax = gval;
                    if (bval < bmin) bmin = bval;
                    else if (bval > bmax)  bmax = bval;
                });
                return new VBox(rmin, rmax, gmin, gmax, bmin, bmax, histo);
            }

            function medianCutApply(histo, vbox) {
                if (!vbox.count()) return;

                var rw = vbox.r2 - vbox.r1 + 1,
                    gw = vbox.g2 - vbox.g1 + 1,
                    bw = vbox.b2 - vbox.b1 + 1,
                    maxw = pv.max([rw, gw, bw]);
                // only one pixel, no split
                if (vbox.count() == 1) {
                    return [vbox.copy()];
                }
                /* Find the partial sum arrays along the selected axis. */
                var total = 0,
                    partialsum = [],
                    lookaheadsum = [],
                    i, j, k, sum, index;
                if (maxw == rw) {
                    for (i = vbox.r1; i <= vbox.r2; i++) {
                        sum = 0;
                        for (j = vbox.g1; j <= vbox.g2; j++) {
                            for (k = vbox.b1; k <= vbox.b2; k++) {
                                index = getColorIndex(i,j,k);
                                sum += (histo[index] || 0);
                            }
                        }
                        total += sum;
                        partialsum[i] = total;
                    }
                }
                else if (maxw == gw) {
                    for (i = vbox.g1; i <= vbox.g2; i++) {
                        sum = 0;
                        for (j = vbox.r1; j <= vbox.r2; j++) {
                            for (k = vbox.b1; k <= vbox.b2; k++) {
                                index = getColorIndex(j,i,k);
                                sum += (histo[index] || 0);
                            }
                        }
                        total += sum;
                        partialsum[i] = total;
                    }
                }
                else {  /* maxw == bw */
                    for (i = vbox.b1; i <= vbox.b2; i++) {
                        sum = 0;
                        for (j = vbox.r1; j <= vbox.r2; j++) {
                            for (k = vbox.g1; k <= vbox.g2; k++) {
                                index = getColorIndex(j,k,i);
                                sum += (histo[index] || 0);
                            }
                        }
                        total += sum;
                        partialsum[i] = total;
                    }
                }
                partialsum.forEach(function(d,i) {
                    lookaheadsum[i] = total-d;
                });
                function doCut(color) {
                    var dim1 = color + '1',
                        dim2 = color + '2',
                        left, right, vbox1, vbox2, d2, count2=0;
                    for (i = vbox[dim1]; i <= vbox[dim2]; i++) {
                        if (partialsum[i] > total / 2) {
                            vbox1 = vbox.copy();
                            vbox2 = vbox.copy();
                            left = i - vbox[dim1];
                            right = vbox[dim2] - i;
                            if (left <= right)
                                d2 = Math.min(vbox[dim2] - 1, ~~(i + right / 2));
                            else d2 = Math.max(vbox[dim1], ~~(i - 1 - left / 2));
                            // avoid 0-count boxes
                            while (!partialsum[d2]) d2++;
                            count2 = lookaheadsum[d2];
                            while (!count2 && partialsum[d2-1]) count2 = lookaheadsum[--d2];
                            // set dimensions
                            vbox1[dim2] = d2;
                            vbox2[dim1] = vbox1[dim2] + 1;
//                    console.log('vbox counts:', vbox.count(), vbox1.count(), vbox2.count());
                            return [vbox1, vbox2];
                        }
                    }

                }
                // determine the cut planes
                return maxw == rw ? doCut('r') :
                    maxw == gw ? doCut('g') :
                        doCut('b');
            }

            function quantize(pixels, maxcolors) {
                // short-circuit
                if (!pixels.length || maxcolors < 2 || maxcolors > 256) {
//            console.log('wrong number of maxcolors');
                    return false;
                }

                // XXX: check color content and convert to grayscale if insufficient

                var histo = getHisto(pixels),
                    histosize = 1 << (3 * sigbits);

                // check that we aren't below maxcolors already
                var nColors = 0;
                histo.forEach(function() { nColors++; });
                if (nColors <= maxcolors) {
                    // XXX: generate the new colors from the histo and return
                }

                // get the beginning vbox from the colors
                var vbox = vboxFromPixels(pixels, histo),
                    pq = new PQueue(function(a,b) { return pv.naturalOrder(a.count(), b.count()); });
                pq.push(vbox);

                // inner function to do the iteration
                function iter(lh, target) {
                    var ncolors = 1,
                        niters = 0,
                        vbox;
                    while (niters < maxIterations) {
                        vbox = lh.pop();
                        if (!vbox.count())  { /* just put it back */
                            lh.push(vbox);
                            niters++;
                            continue;
                        }
                        // do the cut
                        var vboxes = medianCutApply(histo, vbox),
                            vbox1 = vboxes[0],
                            vbox2 = vboxes[1];

                        if (!vbox1) {
//                    console.log("vbox1 not defined; shouldn't happen!");
                            return;
                        }
                        lh.push(vbox1);
                        if (vbox2) {  /* vbox2 can be null */
                            lh.push(vbox2);
                            ncolors++;
                        }
                        if (ncolors >= target) return;
                        if (niters++ > maxIterations) {
//                    console.log("infinite loop; perhaps too few pixels!");
                            return;
                        }
                    }
                }

                // first set of colors, sorted by population
                iter(pq, fractByPopulations * maxcolors);

                // Re-sort by the product of pixel occupancy times the size in color space.
                var pq2 = new PQueue(function(a,b) {
                    return pv.naturalOrder(a.count()*a.volume(), b.count()*b.volume());
                });
                while (pq.size()) {
                    pq2.push(pq.pop());
                }

                // next set - generate the median cuts using the (npix * vol) sorting.
                iter(pq2, maxcolors - pq2.size());

                // calculate the actual colors
                var cmap = new CMap();
                while (pq2.size()) {
                    cmap.push(pq2.pop());
                }

                return cmap;
            }

            return {
                quantize: quantize
            };
        })();

        return new ColorThief;
    });

    // Definition: RGB to HSV. | RGB 转化为 HSV 函数.
    function rgbToHsv (r, g, b) {
        if (arguments.length === 1) {
            g = r.g, b = r.b, r = r.r;
        }
        var max = Math.max(r, g, b), min = Math.min(r, g, b),
            d = max - min,
            h,
            s = (max === 0 ? 0 : d / max),
            v = max / 255;

        switch (max) {
            case min: h = 0; break;
            case r: h = (g - b) + d * (g < b ? 6: 0); h /= 6 * d; break;
            case g: h = (b - r) + d * 2; h /= 6 * d; break;
            case b: h = (r - g) + d * 4; h /= 6 * d; break;
        }

        return [h, s, v];
    }

    function hsvToRgb (h, s, v) {
        var r, g, b, i, f, p, q, t;
        if (arguments.length === 1) {
            s = h.s, v = h.v, h = h.h;
        }
        i = Math.floor(h * 6);
        f = h * 6 - i;
        p = v * (1 - s);
        q = v * (1 - f * s);
        t = v * (1 - (1 - f) * s);
        switch (i % 6) {
            case 0: r = v, g = t, b = p; break;
            case 1: r = q, g = v, b = p; break;
            case 2: r = p, g = v, b = t; break;
            case 3: r = p, g = q, b = v; break;
            case 4: r = t, g = p, b = v; break;
            case 5: r = v, g = p, b = q; break;
        }
        return [
            Math.round(r * 255),
            Math.round(g * 255),
            Math.round(b * 255)
        ];
    }

})();

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


    // Definition: Controllers Module & Configuration. | 总控制器模块定义.
    var ngAppCtrls = angular.module("ngAppCtrls", []);

    // Definition: Main Controller. | 页面主控制器.
    ngAppCtrls.controller("mainController", ["$scope", "$rootScope", "$location", "$timeout", "$resultCheck", function ($scope, $rootScope, $location, $timeout, $resultCheck) {
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
        // 启动画面模糊.
        // ---------------------------------------------
        //$scope.$on("splashScreen", function (event, value) {
        //    $timeout(function () {
        //        $scope.backgroundBlur = "blur";
        //        $scope.blurButtonTimeout = $timeout(function () { $scope.blurButton = "show"; }, 5000);  // Show Blur Toggle Button after blur finished.
        //    }, 4000);
        //});


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


        // Panel Toolbar Showing / Hiding. | 结果面板工具条显示 / 隐藏控制器.
        // ---------------------------------------------
        $scope.resultToolbar = {
            show: false,
            open: false,
            mode: "md-scale",  // md-fling || md-scale
            copyLinkButton: false,
            checkAllResult: checkAllResult,
            linkCopy: linkCopy,
            forceOpen: function () {
                $scope.resultToolbar.open = true;
            }
        };

        $scope.$on("resultToolbar", function (event, value) {
            $timeout(function () {
                $scope.resultToolbar.show = value;
            }, 1000);
        });

        $scope.$on("showCopyLinkButton", function (event, value) {
            $scope.resultToolbar.copyLinkButton = value;
        });

        // Definition: Select-all-magnet-link Function.
        function checkAllResult () {
            $resultCheck.checkAll();
        }

        function linkCopy () {
            $resultCheck.linkCopy();
        }


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
    ngAppCtrls.controller("leftNavButtonCtrl", ["$scope", "$localStorage", function ($scope, $localStorage) {

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
/*
 *  Animation Searcher Angular Application By LancerComet at 12:29, 2015/10/9.
 *  # Carry Your World #
 *  ---
 *
 *  Frount Router Definition.
 *  Angular 前端路由定义.
 *
 *  $locationProvider 启用了 HTML5 模式. (History API)
 *
 */
;(function () {
    "use strict";
    var ngFrontendRouter = angular.module("ngFrontendRouter", []);
    ngFrontendRouter.config(["$routeProvider", function ($routeProvider) {
            $routeProvider.when("/change-log", {
                template: "",
                controller: ["$changeLog", function ($changeLog) {
                    $changeLog.show();
                }]
            }).when("/welcome", {
                    template: "",
                    controller: ["$splashLayout", function ($splashLayout) {
                        $splashLayout.toInitLayout();
                    }]
                }
            ).when("/stand-by", {
                    template: "",
                    controller: ["$splashLayout", function ($splashLayout) {
                        $splashLayout.toStandByLayout();
                    }]
                }
            ).when("/side-nav-open", {
                    template: "",
                    controller: ["$leftNav", "$splashLayout", function ($leftNav, $splashLayout) {
                        $leftNav.open();
                        //$splashLayout.toStandByLayout();
                    }]
                }
            ).when("/powered-by", {
                    template: "",
                    controller: ["$location", "$toast", function ($location, $toast) {
                        $toast.showSimpleToast("Powered by Angular.JS, Angular-Material and Node.JS.");
                        //$charMsg.show("Powered By ...", "This site is powered by Angular.JS, Node.JS, Nginx @ Aliyun.");
                        $location.path("/");
                    }]
                }
            ).when("/", {
                    template: "",
                    controller: ["$leftNav", function ($leftNav) {
                        $leftNav.close();
                    }]
                }
            ).otherwise({
                    redirectTo: "/"
                }
            );
        }])
        .config(["$locationProvider", function ($locationProvider) {
            $locationProvider.html5Mode({
                enabled: true
            });
        }]);

})();
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
        "appToast", "charMsg", "leftNav", "colorChange", "localStorage", "splashLayout", "splashScreen", "changeLog", "textPanel", "clearMdToast", "historyPanel", "searchService", "resultPanelSwitching", "resultChecking"
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
    colorChange.factory("$colorChange", [function () {

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
    }]);


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
    clearMdToast.factory("$clearMDToast", [function () {
        return function () {
            angular.element(document.querySelector(".md-content")).remove();
        }
    }]);


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
    searchService.factory("$search", ["$rootScope", "$http", "$toast", "$splashLayout", "$resultCheck", "appConfig", function ($rootScope, $http, $toast, $splashLayout, $resultCheck, appConfig) {

        return {
            search: search,
            changePage: changePage
        };

        function searchBroadCasting (codeName) {
            $rootScope.$broadcast("searchStart", {
                codeName: codeName,
                showSwitcher: true
            });
        }

        // Definition: Search-requesting Function. | 搜索请求发起函数.
        function search (keywords) {

            // Empty Magnet result array before new search. | 新的搜索前清空之前已勾选磁力链数组.
            $resultCheck.clear();

            // Fire Async Requesting. | 循环发起搜索请求.
            Object.keys(appConfig.site).filter(function (prop) {
                if (appConfig.site[prop].disabled === true) return;
                var codeName = appConfig.site[prop].codeName;
                searchBroadCasting(codeName);
                $http.post("/search/" + codeName, {
                    keywords: keywords
                }, {
                    timeout: appConfig.settings.xhrTimeout  // Timeout for 30s.
                }).success(function (data, status, headers, config, statusText) {
                    $rootScope.$broadcast("searchResult", data);  // Broadcast result.
                    $toast.showSimpleToast(data.info);  // Show simple toast after finished succesfully.
                    resultToolbarCtrl(true);  // Show Result Toolbar.
                }).error(function (data, status, headers, config, statusText) {
                    if (status === -1) {
                        // Timeout Handler.
                        $toast.showActionToast("您的搜索请求超时，不兹道四哪里粗了问题 ... ＞︿＜", "我知道了~");
                    } else {
                        // Throw a ActionToast when error was caught. | 出错时进行提示.
                        $toast.showActionToast(data.info, data.action);
                    }
                    $rootScope.$broadcast("searchResult", {
                        codeName: prop,
                        status: 408
                    });  // Broadcast result.
                });
            });

        }

        // Definition: 换页请求搜索.
        function changePage (codename, link) {
            searchBroadCasting(codename);

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
                $rootScope.$broadcast("searchResult", {
                    codeName: codename,
                    status: data.status
                });  // Broadcast result.
            });
        }

        // Definition: Result Toolbar Controller. | 搜索结果工具条控制器.
        function resultToolbarCtrl (value) {
            $rootScope.$broadcast("resultToolbar", value);
        }

    }]);


    // Definition: Panel Switch Service. | 结果面板切换服务.
    var resultPanelSwitching = angular.module("resultPanelSwitching", []);
    resultPanelSwitching.factory("$resultPanelSwitching", ["$rootScope", function ($rootScope) {
        return resultPanelSwitching;

        function resultPanelSwitching (codeName) {
            $rootScope.$broadcast("resultPanelSwitching", codeName);
        }
    }]);


    // Definition: Result Checking Service. | 搜索结果 Checkbox 选中服务.
    var resultChecking = angular.module("resultChecking", []);
    resultChecking.factory("$resultCheck", ["$rootScope", "$internalFunc", "$textPanel", function ($rootScope, $internalFunc, $textPanel) {
        var selectedMagnet = [];

        return {
            checkIt: checkIt,
            checkAll: checkAll,
            linkCopy: linkCopy,
            clear: clear
        };

        function checkIt (magnetLink) {
            !magnetLink ? $internalFunc.throwError("magnetLink must be provided when calling $resultCheck.checkIt().") : void(0);
            selectedMagnet.indexOf(magnetLink) < 0 ? selectedMagnet.push(magnetLink) : selectedMagnet.splice(selectedMagnet.indexOf(magnetLink), 1);
            copyLinkButtonCtrl();
        }

        function checkAll () {
            $rootScope.$broadcast("checkAllResult");
        }

        function copyLinkButtonCtrl () {
            selectedMagnet.length > 0 ? $rootScope.$broadcast("showCopyLinkButton", true) : $rootScope.$broadcast("showCopyLinkButton", false);
        }

        function linkCopy () {
            $textPanel.show({
                title: "复制链接",
                content: selectedMagnet.join("\n"),
                resultPanel: true
            })
        }

        function clear () {
            selectedMagnet = [];
        }

    }]);


})(window);
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
/*
     Animation Searcher Angular Application By LancerComet at 12:29, 2015/10/9.
     # Carry Your World #
     ---

     Definition:
     jQuery-based Code.

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