'use strict';

var gulp = require('gulp'),
    gutil = require('gulp-util'),
    jade = require('gulp-jade'),
    less = require('gulp-less'),
    path = require('path'),
		yargs = require('yargs'),
		express = require('express'),		
		app = express();	
		
		
var args   = yargs.argv;

var targetDir = args.target || '../build';

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

gulp.task('watch', function () {
  gulp.watch('./style/**/*.less', ['less']);  
  gulp.watch('./templates/**/*.jade', ['templates']);
  gulp.watch('content/*', ['content']);
});

gulp.task('serve', function() {
	var servePath = path.resolve(targetDir);
	//serve index.html on the root
	app.get('/', function(req,res) {
		res.sendFile(servePath + '/index.html');		
	});
	
	//very dirty way to make sure we serve .html files on their route
	app.use(function(req, res, next) {
		if (req.path.indexOf('.') === -1) {			
      req.url += '.html';	
    }    
    next();
	});
	
  app.use(express.static(servePath));
	gutil.log('serving directory: ' + servePath);	
  app.listen(1337);
});

// Default Task
gulp.task('default', ['templates', 'less', 'content', 'serve', 'watch']);
