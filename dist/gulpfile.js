const gulp = require('gulp');

gulp.task('processHTML',async function(){
    gulp.src('*.html')
      .pipe(gulp.dest('dist'));
  });

  gulp.task('processJS', async function(){
    gulp.src('*.js')
      .pipe(gulp.dest('dist'));
  });