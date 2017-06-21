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
    jshint = require("gulp-jshint"),
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
 * jshint task for all javascript files
 */
gulp.task('jshint', function () {
    return gulp.src(paths.jsSrc)
        .pipe(jshint({
            browser: true,
            strict: false,
            "-W117": true
        }))
        .pipe(jshint.reporter('default'));
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
    gulp.watch(paths.jsSrc, ['jshint']);
    gulp.watch(paths.jsSrc, ['test']);
});

/**
 * Minify css files
 */
gulp.task('cssmin', function() {
    return gulp.src(paths.toMin)
      .pipe(cssmin())
      .pipe(rename({ suffix: '.min' }))
      .pipe(gulp.dest(paths.css));
});

/**
 * QUnit tests
 */
gulp.task('test', function() {
    return gulp.src(paths.tests + 'index.html')
        .pipe(qunit());
});


gulp.task('default', ['concat']);