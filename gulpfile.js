var gulp = require ('gulp'),
    gutil = require('gulp-util'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    livereload = require('gulp-livereload'),
    sass = require('gulp-ruby-sass'),
    coffee = require('gulp-coffee'),
    lr = require('tiny-lr'),
    autoprefixer = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    minifycss = require('gulp-minify-css'),
    jshint = require('gulp-jshint'),
    express = require('express'),
    embedlr = require('gulp-embedlr'),
    connectlr = require('connect-livereload'),
    serverport = 5000,
    connectlrport = 35729;

var server = express();

server.use(connectlr({port: connectlrport}));

server.use(express.static('./dist'));

server.all('/*', function(req, res){
  res.sendfile('index.html', { root: 'public'});
});

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
  'views/**/*.html'
];

gulp.task('dev', function(){
  server.listen(serverport);
  lr.listen(connectlrport);
  gulp.run('watch');
});

gulp.task('lint', function(){
  gulp.src('public/javascripts/script.js')
  .pipe(jshint())
  .pipe(jshint.reporter('default'));
});

gulp.task('browserify', function() {
  gulp.src(['public/javascripts/scripts.js'])
  .pipe(browserify({
    insertGlobals: true,
    debug: true
  }))
  .pipe(concat('bundle.js'))
  .pipe(gulp.dest('public/javascripts'));
});

gulp.task('js', function() {
  gulp.src(jsSources)
  .pipe(uglify())
  .pipe(jshint())
  .pipe(concat('script.js'))
  .pipe(gulp.dest('public/javascripts'));
});

gulp.task('coffee', function() {
  gulp.src(coffeeSources)
  .pipe(coffee({bare: true}))
    .on('error', gutil.log)
  .pipe(gulp.dest('components/scripts'));
});

gulp.task('views', function(){
  gulp.src('index.html')
  .pipe(gulp.dest('public/'));
  gulp.src('views/**/*')
  // Will be put in the dist/views folder
  .pipe(gulp.dest('public/views/'));
});

gulp.task('watch', function(){
  gulp.watch(jsSources, ['js']);
  gulp.watch(coffeeSources, ['coffee']);
  gulp.watch(styleSources, ['styles']);
  gulp.watch(['lint','browserify']);
  gulp.watch(['public/javascripts/*.js', 'public/stylesheets/*.css', 'views/**/*.html'], ['views'], function(e){
    server.changed(e.path);
  });
});

gulp.task('default', ['styles', 'js', 'watch', 'coffee', 'lint', 'browserify']);

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



