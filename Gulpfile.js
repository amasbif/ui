"use strict";

var paths = {};

paths.css = "dist/css/";
paths.toMin = ['dist/css/*.css', '!dist/css/*.min.css'];
paths.sass =  "scss/**/*.scss";
paths.js =  "dist/js/";
paths.jsSrc = "js/src/**/*.js";
paths.tests = "js/tests/";

var gulp = require("gulp"),
    concat = require("gulp-concat"),
    sass = require("gulp-sass"),
    cssmin = require("gulp-cssmin"),
    rename = require("gulp-rename"),
    eslint = require("gulp-eslint"),
    qunit = require("gulp-qunit"),
    uglify = require("gulp-uglify");

/**
 * Concatenate javascript files
 */
gulp.task("concat", function() {
    return gulp.src(paths.jsSrc)
        .pipe(concat('stc-ui.js'))
        .pipe(gulp.dest(paths.js))
        .pipe(rename('stc-ui.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(paths.js));
});

/**
 * eslint task for all javascript files
 */
gulp.task('eslint', function () {
    return gulp.src(paths.jsSrc)
        .pipe(eslint({
            configFile: "js/eslint.config.json"
        }))
        .pipe(eslint.format())
        // To have the process exit with an error code (1) on 
        // lint error, return the stream and pipe to failAfterError last. 
        .pipe(eslint.failAfterError());
});

/**
 * Compile SASS to CSS 
 */
gulp.task('sass', function () {
    return gulp.src('scss/stc-ui.scss')
      .pipe(sass().on('error', sass.logError))
      .pipe(gulp.dest(paths.css));
});

/**
 * Watch SASS files 
 */
gulp.task('sass:watch', function () {
    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.toMin, ['cssmin']);
}); 

/**
 * Watch JS files 
 */
gulp.task('scripts:watch', function () {
    gulp.watch(paths.jsSrc, ['concat']);
    gulp.watch(paths.jsSrc, ['eslint']);
    gulp.watch(paths.jsSrc, ['test']);
});

/**
 * Minify css files
 */
gulp.task('cssmin', ['sass'], function() {
    return gulp.src(paths.toMin)
      .pipe(cssmin())
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulp.dest(paths.css));
});

/**
 * QUnit tests
 */
gulp.task('test', ['cssmin', 'concat'], function() {
    return gulp.src(paths.tests + 'index.html')
        .pipe(qunit());
});


/**
 * Build scripts
 */
gulp.task("build", ['cssmin', 'test']);

gulp.task('default', ['concat']);