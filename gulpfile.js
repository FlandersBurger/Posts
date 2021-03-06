var gulp = require('gulp')
var fs = require('fs')

fs.readdirSync(__dirname + '/gulp').forEach(function (task) {
  require('./gulp/' + task)
})

gulp.task('dev', [
  'watch:css'
  , 'watch:js'
  , 'watch:jquery'
  , 'dev:server'
])

gulp.task('build', [
  'css'
  , 'js'
  , 'jquery'
])
