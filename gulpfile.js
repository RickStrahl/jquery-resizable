var gulp = require('gulp');
var rimraf = require('gulp-rimraf');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var sourcemaps = require('gulp-sourcemaps');
var livereload = require('gulp-livereload');

gulp.task('scripts:minify', function () {

    gulp.src(['./src/*.js'])
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.init())
        .pipe(uglify())
        .pipe(sourcemaps.write('.', {
            includeContent: false,
            sourceRoot: './src'
        }))
        .pipe(gulp.dest('./dist'));
});

gulp.task('scripts:copy', function () {
    gulp.src(['src/*.js'])
        .pipe(gulp.dest('./dist'));
});

gulp.task('scripts', ['scripts:minify','scripts:copy']);

gulp.task('clean', function () {
    gulp.src(['./dist/**.*'])
        .pipe(rimraf({read: false}));
});

gulp.task('watch', function () {
    // Create LiveReload server
    livereload.listen();

    gulp.watch(['./src/*.js'], ['scripts']);
});

gulp.task('default', function() {
    // place code for your default task here
    gulp.start('scripts');
});