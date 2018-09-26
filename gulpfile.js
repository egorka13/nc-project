var gulp = require('gulp');
var bs = require('browser-sync');
var concatCSS = require('gulp-concat-css');
var less = require('gulp-less');

gulp.task('default', ['server'], function () {
    gulp.watch('assets/less/*.less', [less]);
});

gulp.task('server', function () {
    bs.init({
        server: {
            baseDir: './'
        },
        notify: false
    });
    gulp.watch('./*.html').on('change', bs.reload);
});

gulp.task('less', function () {
    gulp.src('./assets/less/*.less')
        .pipe(less())
        .pipe(concatCSS('style.css'))
        .pipe(gulp.dest('./assets/css'))
        .pipe(bs.stream());
});