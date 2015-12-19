/*
This file in the main entry point for defining Gulp tasks and using Gulp plugins.
Click here to learn more. http://go.microsoft.com/fwlink/?LinkId=518007
*/
var gulp = require('gulp');
var rimraf = require('gulp-rimraf');
uglify = require('gulp-uglify');
rename = require('gulp-rename');


gulp.task('scripts', function () {

    // uncompressed
    gulp.src(['src/jquery-resizable.js'])
        .pipe(gulp.dest("./"));

    // compressed
    gulp.src(['src/jquery-resizable.js'])
        //.pipe(sourcemaps.init())
        .pipe(uglify())        
        .pipe(rename({ suffix: '.min' }))        
        .pipe(gulp.dest('./'));
});

gulp.task('clean', function () {
    gulp.src(['./*.min.*'])
        .pipe(rimraf());
});

gulp.task('default', function() {
    // place code for your default task here
    gulp.start( 'scripts');
});

