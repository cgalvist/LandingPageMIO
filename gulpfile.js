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

/*
 *  CONFIGURACION DE TAREAS DE GULP
*/

/*
    recargar la página automaticamente
    cada vez que se haga un cambio en los archivos
*/
gulp.task('livereload', function() {
    //gulp.src(['./**/*.*'])
        //.pipe(watch(['./**/*.*']))
        //.pipe(connect.reload());
    gulp.src(['static/css/*.css','static/js/**/*.js','templates/**/*.html','index.html'])
        .pipe(watch(['static/css/*.css','static/js/**/*.js','templates/**/*.html','index.html']))
        .pipe(connect.reload());
});

/*
    minimizar y copiar automaticamente
    cada vez que se haga un cambio en los archivos
*/
gulp.task('watchBuildFiles', function () {
    gulp.watch('static/js/**/*.js', ['minify-js']);
    gulp.watch('static/css/**/*.css', ['minify-css']);
});

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
});

/*
    minimizacion y concatenacion de css
*/

gulp.task('minify-css', function () {
  gulp.src('static/css/**/*.css')
  .pipe(concat('style.min.css'))
  .pipe(minifycss())
  .pipe(gulp.dest('build/css/'))
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
    tarea para iniciar servidor
*/
var cors = function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    next();
};

//desarrollo
gulp.task('webserver', function() {
    connect.server({
        root: '.',
        port: 8080,
        livereload: true,
        middleware: function () {
            return [cors];
        },
    });
});

gulp.task("default",["minify-js","minify-css",'images','copy']);
gulp.task("dev",["livereload","watchBuildFiles",'images','copy',"webserver"]);
