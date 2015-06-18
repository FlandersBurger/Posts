var gulp = require('gulp')
var concat = require('gulp-concat')
var sourcemaps = require('gulp-sourcemaps')
var ngAnnotate = require('gulp-ng-annotate')
var uglify = require('gulp-uglify')

gulp.task('jquery', function () {
  gulp.src(['jquery/**/*.js'])
    .pipe(sourcemaps.init())
    .pipe(concat('jquery.js'))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('assets'))
})

gulp.task('watch:jquery', ['jquery'], function () {
  gulp.watch('jquery/**/*.js', ['jquery'])
})
