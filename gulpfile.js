var gulp = require ('gulp'),
    gutil = require('gulp-util'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    livereload = require('gulp-livereload'),
    sass = require('gulp-ruby-sass'),
    coffee = require('gulp-coffee'),
    lr = require('tiny-lr'),
    server = lr();

var jsSources = [
  'components/scripts/*'
];

var sassSources = [
  'components/sass/*'
];

var coffeeSources = [
  'components/coffee/*.coffee'
];

var viewSources = [
  'views/index.ejs'
];

gulp.task('js', function() {
  gulp.src(jsSources)
  .pipe(uglify())
  .pipe(concat('script.js'))
  .pipe(gulp.dest('public/javascripts'));
});

gulp.task('coffee', function() {
  gulp.src(coffeeSources)
  .pipe(coffee({bare: true}))
    .on('error', gutil.log)
  .pipe(gulp.dest('components/scripts'));
});

gulp.task('watch', function(){
  var server = livereload();
  gulp.watch(jsSources, ['js']);
  gulp.watch(coffeeSources, ['coffee']);
  gulp.watch(sassSources, ['sass']);
  gulp.watch(['public/javascripts/script.js','*.html'], function(e){
    server.changed(e.path);
  });
})

gulp.task('default', ['sass', 'js', 'views', 'watch', 'coffee'])

gulp.task('sass', function(){
  gulp.src(sassSources)
  .pipe(sass({style: 'expanded', lineNumbers: true}))
    .on('error', gutil.log)
  .pipe(concat('style.css'))
  .pipe(gulp.dest('public/stylesheets'))
  .pipe(livereload());
});

gulp.task('views', function(){
  gulp.src(viewSources)
  .pipe(livereload());
});