const gulp = require('gulp');
const webserver = require('gulp-webserver');
const sass = require('gulp-sass');
const image = require('gulp-image');


gulp.task('webserver', function() {
  gulp.src('app')
    .pipe(webserver({
      livereload: true,
      open: true,
      directoryListing: {
        enable: false,
        path: 'app'
      }
    }));
});

gulp.task('sass', function () {
  return gulp.src('./resource/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./app/css'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./sass/**/*.scss', ['sass']);
});

gulp.task('image', function () {
  gulp.src('./resource/images/*')
    .pipe(image())
    .pipe(gulp.dest('./app/images'));
});

gulp.task('default', ['webserver', 'sass', 'image']);