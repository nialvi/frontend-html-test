var gulp = require('gulp');
var plumber = require('gulp-plumber');
var connect = require('gulp-connect');

// Plugins
var jade = require('gulp-jade');
var stylus = require('gulp-stylus');
var autoprefixer = require('gulp-autoprefixer');

// Livereload
gulp.task('connect', function() {
  connect.server({
    root: './public/',
    livereload: true,
    port: 8000
  })
});

// Jade
gulp.task('jade', function() {
  gulp.src('./partials/*.jade')
    .pipe(plumber())
    .pipe(jade())
    .pipe(gulp.dest('./partials/'))
    .pipe(connect.reload())
  gulp.src('./index.jade')
    .pipe(plumber())
    .pipe(jade({
          pretty: true
        }))
    .pipe(gulp.dest('./public/'))
    .pipe(connect.reload())
});

// Stylus
gulp.task('stylus', function() {
  gulp.src('./*.styl')
    .pipe(stylus())
    .pipe(autoprefixer())
    .pipe(gulp.dest('./public/css/'))
    .pipe(connect.reload())
});

// Watch
gulp.task('watch', function() {
  gulp.watch('./*.styl', ['stylus']);
  gulp.watch('./*.jade', ['jade']);
});

// Default task! Go-go-go!
gulp.task('default', ['connect', 'jade', 'stylus', 'watch'], function() {
  console.log('Starting gulp!')
});