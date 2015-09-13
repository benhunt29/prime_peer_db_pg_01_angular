// dependencies
var gulp = require('gulp');
var gutil = require('gulp-util');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var merge = require('merge-stream');

// create a default task and just log a message
gulp.task('default', ['copy', 'build-js', 'build-css'], function () {
    gutil.log('Gulp ran.');
});

// copy images
gulp.task('copy', function () {
    var bootstrap = gulp.src('node_modules/bootstrap/dist/css/bootstrap.min.css',{base: 'node_modules'}).pipe(gulp.dest('./server/public/vendors/'));
    var angular = gulp.src('node_modules/angular/angular.min.js',{base: 'node_modules'}).pipe(gulp.dest('./server/public/vendors/'));
    var angularMap = gulp.src('node_modules/angular/angular.min.js.map',{base: 'node_modules'}).pipe(gulp.dest('./server/public/vendors/'));
    return merge(bootstrap,angular,angularMap);
});


gulp.task('build-js', function () {
    return gulp.src('client/scripts/**/*.js')
        // create .map files
        .pipe(sourcemaps.init())
        // compile into bundle.min.js
        .pipe(concat('app.min.js'))
        .pipe(uglify())
        // write the maps files
        .pipe(sourcemaps.write())
        // write the concat file
        .pipe(gulp.dest('./server/public/assets/scripts'))
});

gulp.task('build-css', function () {
    return gulp.src('client/styles/**/*.css')
        .pipe(sourcemaps.init())
        .pipe(minifyCss())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./server/public/assets/styles/'))
});