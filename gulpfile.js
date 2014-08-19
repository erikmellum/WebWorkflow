var gulp = require ('gulp'),
    gutil = require('gulp-util'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    livereload = require('gulp-livereload'),
    sass = require('gulp-ruby-sass'),
    coffee = require('gulp-coffee'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint');

var jsSources = [
  'components/scripts/*.js'
];

var styleSources = [
  'components/sass/*.scss'
];

var coffeeSources = [
  'components/coffee/*.coffee'
];

var viewSources = [
  'index.html', 
  'partials/**/*.html',
  'partials/*.html',
  'public/*.html',
  'public/views/*.html'
];

gulp.task('dev', function(){
  gulp.run('watch');
});

gulp.task('lint', function(){
  gulp.src('public/javascripts/script.js')
  .pipe(jshint())
  .pipe(jshint.reporter('default'));
});

gulp.task('js', function() {
  gulp.src(jsSources)
  .pipe(uglify())
  .pipe(jshint())
  .pipe(concat('script.js'))
  .pipe(gulp.dest('public/javascripts'))
  .pipe(livereload());
});

gulp.task('coffee', function() {
  gulp.src(coffeeSources)
  .pipe(coffee({bare: true}))
    .on('error', gutil.log)
  .pipe(gulp.dest('components/scripts'));
});

gulp.task('views', function(){
  gulp.src('index.html')
  .pipe(gulp.dest('public/'))
  .pipe(livereload());
  gulp.src('partials/**/*')
  .pipe(gulp.dest('public/views/'))
  .pipe(livereload());
});

gulp.task('styles', function(){
  gulp.src(styleSources)
  .pipe(sass({style: 'expanded', lineNumbers: true}))
    .on('error', gutil.log)
  .pipe(concat('style.css'))
  .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
  .pipe(gulp.dest('public/stylesheets'))
  .pipe(rename({suffix: '.min'}))
  .pipe(minifycss())
  .pipe(gulp.dest('public/stylesheets'))
  .pipe(livereload());
});

gulp.task('watch', function(){
  livereload.listen();
  gulp.watch(jsSources, ['js']);
  gulp.watch(coffeeSources, ['coffee']);
  gulp.watch(styleSources, ['styles']);
  gulp.watch(viewSources, ['views']);
  gulp.watch(['lint']);
  gulp.watch(['public/*.html'], function(e){
    livereload.changed(e.path);
  }).on('change', livereload.changed);
});

gulp.task('default', ['styles', 'js', 'views', 'watch', 'coffee', 'lint']);



