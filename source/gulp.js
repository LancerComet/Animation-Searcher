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
    stylus: "stylus/**/*.styl",
    javascripts: "javascripts/**/*"
};

// Definition: Path of destination. | 目标路径设置.
var distPath = {
    stylesheets: "../public/stylesheets",
    javascripts: "../public/javascripts"
}


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


// Stylus Watching Task.
gulp.task("stylus-watch", function () {
    gulp.watch(sourcePath.stylus, ["stylus"]);
});


// JavaScripts.
gulp.task("JS-uglify", function () {
    gulp.src(sourcePath.javascripts)
        .pipe(concat("animation-searcher.concat.js"))
        .pipe(gulp.dest(distPath.javascripts))
        .pipe(uglify({
            compress: true
        }))
        .pipe(rename("animation-searcher.min.js"))
        .pipe(gulp.dest(distPath.javascripts));
});


// JavaScripts Watching.
gulp.task("JS-watch", function () {
    gulp.watch(sourcePath.javascripts, ["JS-uglify"]);
});



gulp.task("default", ["stylus", "stylus-watch", "JS-uglify", "JS-watch"]);