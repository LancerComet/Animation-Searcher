/*
 * Animation Searcher V2.0 Gulp Configure by LancerComet at 21:55, 2015.10.08.
 * # Carry Your World #
 * ---
 * Gulp Tasks Configure File. | Gulp 自动化配置文件.
 */

var gulp = require("gulp");
var uglify = require("gulp-uglify");
var concat = require("gulp-concat");
var rename = require("gulp-rename");
var stylus = require("gulp-stylus");
var autoprefixer = require("gulp-autoprefixer");

// Definition: Path of source files. | 源文件路径设置.
var sourcePath = {
    stylus: "stylus/animation-searcher.styl",
    allStylus: "stylus/**/*",
    oldBrowsers: "stylus-old-browsers/**/*.styl",
    //javascripts: "javascripts/**/*"
    javascripts: [
        "./javascripts/_closure-start.js",
        "./javascripts/00-error-handler.js", "./javascripts/01-application-settings.js", "./javascripts/02-internal-functions.js",
        "./javascripts/03-ng-app-module.js", "./javascripts/03-ng-app-services.js", "./javascripts/04-ng-app-config.js", "./javascripts/05-ng-app-controllers.js", "./javascripts/06-ng-app-directives.js",
        "./javascripts/_closure-end.js",
        "./javascripts/07-jquery-based-event.js", "./javascripts/08-websocket.js"
    ]
};

// Definition: Path of destination. | 目标路径设置.
var distPath = {
    stylesheets: "../public/stylesheets",
    javascripts: "../public/javascripts"
};


// Stylus Task Definition.
gulp.task("stylus", function () {
    gulp.src(sourcePath.stylus)
        .pipe(stylus({
            compress: true
        }))
        .pipe(autoprefixer({
            browsers: ['> 1%', 'last 3 versions', 'Firefox ESR', 'Opera 12', "ie 8", "ie 9"]
        }))
        .pipe(rename("animation-searcher.v2.min.css"))
        .pipe(gulp.dest(distPath.stylesheets));
});

// Stylus: Old Browsers Page Stylesheet.
gulp.task("stylus-old-browsers", function () {
    gulp.src(sourcePath.oldBrowsers)
        .pipe(stylus({
            compress: true
        }))
        .pipe(autoprefixer({
            browsers: ['> 1%', 'last 3 versions', 'Firefox ESR', 'Opera 12', "ie 8", "ie 9"]
        }))
        .pipe(rename("old-browsers.min.css"))
        .pipe(gulp.dest(distPath.stylesheets));
});


// Stylus Watching Task.
gulp.task("stylus-watch", function () {
    gulp.watch(sourcePath.allStylus, ["stylus", "stylus-old-browsers"]);
});


// JavaScripts.
gulp.task("JS-uglify", function () {
    gulp.src(sourcePath.javascripts)
        .pipe(concat("animation-searcher.v2.concat.js"))
        .pipe(gulp.dest(distPath.javascripts))
        .pipe(uglify({
            compress: true
        }))
        .pipe(rename("animation-searcher.v2.min.js"))
        .pipe(gulp.dest(distPath.javascripts));
});


// JavaScripts Watching.
gulp.task("JS-watch", function () {
    gulp.watch(sourcePath.javascripts, ["JS-uglify"]);
});



gulp.task("default", ["stylus", "stylus-old-browsers", "stylus-watch", "JS-uglify", "JS-watch"]);
