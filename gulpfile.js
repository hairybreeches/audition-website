'use strict';

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    jade = require('gulp-jade'),
    less = require('gulp-less'),
    path = require('path'),
		yargs = require('yargs');
		
		
var args   = yargs.argv;

var targetDir = args.target || '../build';

gulp.task('code', function () {
    return gulp.src('code/*')
      .pipe(gulp.dest(targetDir));
});

var staticDir = targetDir + '/static'

gulp.task('templates', function() {
  return gulp.src('./templates/pages/*.jade')
      .pipe(jade({ pretty: true }))
      .pipe(gulp.dest(staticDir));
});

gulp.task('less', function () {
  gulp.src('./style/style.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest(staticDir));
});

gulp.task('content', function () {
    return gulp.src('content/*')
      .pipe(gulp.dest(staticDir));
});

gulp.task('watch', function () {
  gulp.watch('./style/**/*.less', ['less']);  
  gulp.watch('./templates/**/*.jade', ['templates']);
  gulp.watch('content/*', ['content']);
  gulp.watch('code/*', ['code']);
});

// Default Task
gulp.task('default', ['code', 'templates', 'less', 'content', 'watch']);
