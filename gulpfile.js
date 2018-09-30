var gulp       = require('gulp'),
    less         = require('gulp-less'),
    browserSync  = require('browser-sync'),
    concatCSS    = require('gulp-concat-css'),
    del          = require('del'),
    autoprefixer = require('gulp-autoprefixer');

gulp.task('less', function(){
    return gulp.src('src/assets/themes/base/styles/*.less')
        .pipe(less())
        .pipe(autoprefixer(['last 2 versions', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'],
            { cascade: true })) // Создаем префиксы
        .pipe(concatCSS('style.css'))
        .pipe(gulp.dest('src/assets/themes/base/css'))
        .pipe(browserSync.reload({stream: true}))
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: 'src' // Директория для сервера
        },
        notify: false
    });
});

gulp.task('watch', ['browser-sync'], function() {
    gulp.watch('src/assets/themes/base/styles/*.less', ['less']); // Наблюдение за less файлами
    gulp.watch('src/*.html', browserSync.reload); // Наблюдение за HTML файлами в корне проекта
    gulp.watch('src/assets/scripts/*.js', browserSync.reload);   // Наблюдение за JS файлами
});

gulp.task('clean', function() {
    return del.sync('dist'); // Удаляем папку dist перед сборкой
});

gulp.task('img', function() {
    return gulp.src('src/assets/themes/base/img/**/*')
        .pipe(gulp.dest('dist/img'));
});

gulp.task('build', ['clean', 'img', 'less'], function() {

    var buildCss = gulp.src(['src/assets/themes/base/css/style.css'])
        .pipe(gulp.dest('dist/css'));

    var buildFonts = gulp.src('src/assets/themes/base/fonts/*')
        .pipe(gulp.dest('dist/fonts'));

    var buildJs = gulp.src('src/assets/scripts/*')
        .pipe(gulp.dest('dist/js'));

    var buildHtml = gulp.src('src/*.html')
        .pipe(gulp.dest('dist'));

});

gulp.task('default', ['watch']);