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

var appSources = [
  'components/scripts/app/*.js'
];

var jslibSources = [
  'components/scripts/lib/*.js',
  'components/scripts/lib/**/*.js'
];

var csslibSources = [
  'components/css/lib/*.css'
];

var jsonSources = [
  'components/scripts/json/*.json'
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

gulp.task('lib', function(){
// Javascript libs livereload
  gulp.src(jslibSources)
  .pipe(concat('vendor.js'))
  .pipe(uglify())
  .pipe(gulp.dest('public/javascripts/lib'))
  .pipe(livereload());
// CSS libs livereload
  gulp.src(csslibSources)
  .pipe(concat('vendor.css'))
  .pipe(minifycss())
  .pipe(gulp.dest('public/stylesheets/lib'))
  .pipe(livereload());
});

gulp.task('json', function(){
// JSON livereload
  gulp.src(jsonSources)
  .pipe(gulp.dest('public/javascripts/json'))
  .pipe(livereload());
});

gulp.task('app', function(){
// App livereload
  gulp.src(appSources)
  .pipe(uglify())
  .pipe(gulp.dest('public/javascripts/app'))
  .pipe(livereload());
});

gulp.task('js', function() {
// Javascript hint, uglify, concat, and livereload
  gulp.src(jsSources)
  .pipe(jshint())
  .pipe(uglify())
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
  // Partials livereload
  gulp.src('partials/**/*')
  .pipe(gulp.dest('public/views/'))
  .pipe(livereload());

  // Index livereload
  gulp.src('index.html')
  .pipe(gulp.dest('public/'))
  .pipe(livereload());
});

gulp.task('styles', function(){
  // CSS autoprefixer, minify, and livereload
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
  gulp.watch(jsonSources, ['json']);
  gulp.watch(appSources, ['app']);
  gulp.watch(coffeeSources, ['coffee']);
  gulp.watch(styleSources, ['styles']);
  gulp.watch(viewSources, ['views']);
  gulp.watch(jslibSources, csslibSources, ['lib']);
  gulp.watch(['public/*.html'], function(e){
    livereload.changed(e.path);
  }).on('change', livereload.changed);
});

gulp.task('default', ['styles', 'js', 'views', 'watch', 'coffee', 'lib', 'json', 'app']);



