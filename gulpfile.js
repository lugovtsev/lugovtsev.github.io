'use strict';
const gulp = require('gulp');
const del = require('del');
const less = require('gulp-less');
const concat = require('gulp-concat');
const debug = require('gulp-debug');
const sourcemaps = require('gulp-sourcemaps');
const gulpif = require('gulp-if');
const newer = require('gulp-newer');
const notify = require('gulp-notify');
const multipipe = require('multipipe');
const browserSync = require('browser-sync').create();

const isDevelopment = !process.env.NODE_ENV || process.env.NODE_ENV == 'development';


gulp.task('clean', function() {
  return del(['public/**','!public']);
});

gulp.task('styles', function() {
  return multipipe(
      gulp.src('frontend/styles/main.less'),
      gulpif(isDevelopment, sourcemaps.init()),
      less(),
      gulpif(isDevelopment, sourcemaps.write()),
      gulp.dest('public')
  ).on('error', notify.onError());
});

gulp.task('assets', function() {
  return gulp.src('frontend/assets/**', {since: gulp.lastRun('assets')})
      .pipe(newer('public'))
      .pipe(debug({title: 'assets'}))
      .pipe(gulp.dest('public'));
});

gulp.task('build', gulp.series(
    'clean',
    gulp.parallel('assets','styles'))
);

gulp.task('watch', function() {
  gulp.watch('frontend/styles/*.less', gulp.series('styles'));
  gulp.watch('frontend/assets/**/*.*', gulp.series('assets'));
});

gulp.task('serve', function() {
  browserSync.init({
    server: 'public'
  });
  browserSync.watch('public/**/*.*').on('change', browserSync.reload);
});

gulp.task('dev',
    gulp.series('build', gulp.parallel('watch', 'serve'))
);
