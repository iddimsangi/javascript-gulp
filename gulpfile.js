const gulp = require('gulp');
const jshint = require('gulp-jshint');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');
const runSequence = require('run-sequence');
const browserSync = require('browser-sync').create();

gulp.task('processHTML',async function(){
    gulp.src('*.html')
      .pipe(gulp.dest('dist'));
  });

  gulp.task('processJS', () => {
    gulp.src('scripts.js')
      .pipe(jshint({
        esversion: 6
      }))
      .pipe(jshint.reporter('default'))
      .pipe(babel({
        presets: ['env']
      }))
      .pipe(uglify())
      .pipe(gulp.dest('dist'));
  });

//   gulp.task('processJS', async function(){
//     gulp.src('*.js')
//     .pipe(jshint({
//         esversion: 6
//     }))
//     .pipe(jshint.reporter('default'))
//     .pipe(babel({
//       presets: ['env']
//     }))
//     .pipe(gulp.dest('dist'));
//   });

  gulp.task('babelPolyfill', async function() {
    gulp.src('node_modules/babel-polyfill/browser.js')
      .pipe(gulp.dest('dist/node_modules/babel-polyfill'));
  });

  gulp.task('default', async function(callback) {
    runSequence(['processHTML', 'processJS', 'babelPolyfill'], callback);
  });

  gulp.task('watch', async function(){
    gulp.watch('*.js', ['processJS']);
    gulp.watch('*.html', ['processHTML']);
  });

  gulp.task('default', async function(callback) {
    runSequence(['processHTML', 'processJS', 'babelPolyfill'], 'watch', callback);
  });

  gulp.task('browserSync', async function() {
    browserSync.init({
      server: './dist',
      port: 8080,
      ui: {
        port: 8081
      }
    });
  });

  gulp.task('watch', ['browserSync'], async function() {
    gulp.watch('*.js', ['processJS']);
    gulp.watch('*.html', ['processHTML']);
  
    gulp.watch('dist/*.js', browserSync.reload);
    gulp.watch('dist/*.html', browserSync.reload);
  });