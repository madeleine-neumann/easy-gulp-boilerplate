const gulp = require('gulp');
const webserver = require('gulp-webserver');
const watch = require('gulp-watch');
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

// HTML and CSS Processing
gulp.task('html', function () {
  return gulp.src('./resource/**/*.html')
  .pipe(gulp.dest('./app'))
});

gulp.task('sass', function () {
  return gulp.src('./resource/scss/**/*.scss')
    .pipe(sass({
      style : 'compressed'
    }))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./app/css'));
});

// Makes Images smaller and moves them to the App Folder
gulp.task('image', function () {
  gulp.src('./resource/images/*')
    .pipe(image())
    .pipe(gulp.dest('./app/images'));
});


// Filewatcher - If something will be changed in those files, gulp will watch them and start the processes for them
gulp.watch('resource/scss/**/*.scss', function() {
  gulp.run('sass');
});

gulp.watch('resource/**/*.html', function () {
  gulp.run('html');
});

gulp.task('default', function() {
});

gulp.task('default', ['webserver','html', 'sass', 'image']);
