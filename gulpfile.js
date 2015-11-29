var gulp = require('gulp');

var SRC_PATH = 'src/';
var DIST_PATH = 'dist/';

var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

gulp.task('lint', function() {
  return gulp.src(SRC_PATH.concat('js/**/*.js'))
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('sass', function() {
  return gulp.src(SRC_PATH.concat('scss/*.scss'))
    .pipe(sass())
    .pipe(gulp.dest(DIST_PATH.concat('css')));
});

gulp.task('uglify', function() {
  return gulp.src(SRC_PATH.concat('js/**/*.js'))
    .pipe(concat('bundle.js'))
    .pipe(gulp.dest(DIST_PATH.concat('js')))
    .pipe(rename('bundle.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(DIST_PATH.concat('js')));
});

gulp.task('watch', function() {
  gulp.watch(SRC_PATH.concat('js/**/*.js'), ['lint', 'uglify']);
  gulp.watch(SRC_PATH.concat('scss/**/*.scss'), ['sass']);
});

gulp.task('default', ['lint', 'sass', 'uglify', 'watch']);
