/*
 * DEPENDENCIAS
 * para instalar por primera vez escriba:
 * npm install -save-dev NOMBRE_DEPENDENCIA
 */
var gulp = require('gulp'),
    concat = require('gulp-concat'),
    uglify = require('gulp-uglify'),
    minifycss =require('gulp-minify-css'),
    imagemin = require('gulp-imagemin'),
    pngcrush = require('imagemin-pngcrush'),
    watch = require('gulp-watch'),
    connect = require('gulp-connect');
var browserSync = require('browser-sync').create();

/*
 *  CONFIGURACION DE TAREAS DE GULP
*/

/*
    minimizacion y concatenacion de javascript
*/
gulp.task('minify-js', function() {
    gulp.src('static/js/**/*.js')
        .pipe(concat('app.min.js'))
        .pipe(uglify({mangle: false}).on('error', function(e){
            console.log(e);
         }))
        .pipe(gulp.dest('build/js/'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

/*
    minimizacion y concatenacion de css
*/

gulp.task('minify-css', function () {
    gulp.src('static/css/**/*.css')
        .pipe(concat('style.min.css'))
        .pipe(minifycss())
        .pipe(gulp.dest('build/css/'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

/*
    copiar bibliotecas externas en la carpeta "build/vendor"
*/
gulp.task('copy', function() {
    gulp.src([
      'node_modules/angular/angular.min.js',
      'node_modules/angular-ui-router/release/angular-ui-router.min.js',
      'node_modules/angular-aria/angular-aria.min.js',
      'node_modules/angular-animate/angular-animate.min.js',
      'node_modules/angular-material/angular-material.min.js',
      'node_modules/angular-material/angular-material.min.css'
    ])
        .pipe(gulp.dest('build/vendor/angular'))
})

/*
    optimizar imagenes
*/
gulp.task('images', function() {
  gulp.src('static/img/**/*.{png,jpg,jpeg,gif,svg}')
    .pipe(imagemin({
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngcrush()]
    }))
    .pipe(gulp.dest('build/img/'));
});

/*
    configurar browserSync
*/
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: ''
        },
    })
})

gulp.task("default",["minify-js","minify-css",'images','copy']);
gulp.task("dev",["browserSync",'images','copy'], function() {
    gulp.watch('static/css/*.css', ['minify-css']);
    gulp.watch('static/js/*.js', ['minify-js']);

    // recargar la página cuando los archivos HTML o JS cambien
    gulp.watch('*.html', browserSync.reload);
    gulp.watch('static/js/**/*.js', browserSync.reload);
});
