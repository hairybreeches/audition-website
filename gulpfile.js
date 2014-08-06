'use strict';

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    jade = require('gulp-jade'),
    less = require('gulp-less'),
    path = require('path'),
		yargs = require('yargs');
		
		
var args   = yargs.argv;

var targetDir = args.target || './';

gulp.task('templates', function() {
  return gulp.src('./templates/pages/*.jade')
      .pipe(jade({ pretty: true }))
      .pipe(gulp.dest(targetDir));
});

gulp.task('less', function () {
  gulp.src('./style/style.less')
    .pipe(less({
      paths: [ path.join(__dirname, 'less', 'includes') ]
    }))
    .pipe(gulp.dest(targetDir));
});

gulp.task('content', function () {
    return gulp.src('content/*')
      .pipe(gulp.dest(targetDir));
});

// Default Task
gulp.task('default', ['templates', 'less', 'content']);
