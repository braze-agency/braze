'use strict';
var gulp    = require('gulp'),
    concat  = require('gulp-concat'),
    sass    = require('gulp-sass'),
    htmlmin = require('gulp-htmlmin'),
    maps    = require('gulp-sourcemaps');

// Concatenate Header & Footer to HTML Files
// See if 'gulp-file-include' would be better...
gulp.task('concatHTML', function() {
  return gulp.src([
    'src/header.html',
    'src/index-partial.html',
    'src/footer.html'
    ])
    .pipe(concat('index.html'))
    .pipe(gulp.dest('src'));
});

// Compile Sass & Write Source Map
gulp.task('sass', function () {
  return gulp.src('src/sass/*.scss')
    .pipe(maps.init())
    .pipe(sass())
    .pipe(maps.write('./'))
    .pipe(gulp.dest('dist'))
    .pipe(gulp.dest('src'));
});

// Minify HTML
gulp.task('minify', function() {
  return gulp.src('src/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));
});

// Move untouched files from src to dist
gulp.task('move-etc', function() {
  return gulp.src('src/img/*')
  .pipe(gulp.dest('dist/img'));
});

gulp.task('watch', function() {
  gulp.watch('src/sass/*.scss', ['sass']);
  gulp.watch('src/*.html', ['concatHTML']);
});