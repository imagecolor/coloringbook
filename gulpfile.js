var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var react = require('gulp-react');
var htmlreplace = require('gulp-html-replace');
var watchify = require('watchify');
var reactify = require('reactify');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var sass = require('gulp-sass');

var path = {
  html: 'client/index.html',
  js: ['client/**/*.js'],
  entry: ['./client/js/app.js'],
  assets: ['client/assets/*'],
  minified: 'build.min.js',
  build: 'build.js',
  destJs: 'dist/src',
  destAssets: 'dist/assets',
  dest: 'dist'
};

var cssPath = {
  src: 'client/styles/**/*.scss',
  dest: 'dist/styles',
  min: 'style.css',
  assetsSrc: 'client/assets/*',
  assetsDist: 'dist/assets'
};

gulp.task('transform', function() {
  gulp.src(path.js)
    .pipe(react())
    .pipe(gulp.dest(path.destJs));
});

gulp.task('copy', function() {
  gulp.src(path.html)
    .pipe(gulp.dest(path.dest));
  gulp.src(path.assets)
    .pipe(gulp.dest(path.destAssets));
});

gulp.task('build', function() {
  browserify({
    entries: [path.entry],
    transform: [reactify]
    // debug: true
  })
  .bundle()
  .pipe(source(path.build))
  .pipe(gulp.dest(path.destJs));
});

gulp.task('sass', function() {
  var sassOptions = {
    errLogToConsole: true,
    outputStyle: 'expanded'
  };

  return gulp
    .src(cssPath.src)
    .pipe(sass(sassOptions))
    .on('error', sass.logError)
    .pipe(gulp.dest(cssPath.dest));
});

gulp.task('watch', function() {
  gulp.watch(path.html, ['copy']);

  gulp.watch(cssPath.src, ['sass']);

  var watcher = watchify(browserify({
    entries: [path.entry],
    transform: [reactify],
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: true
  }));

  return watcher.on('update', function() {
    watcher.bundle()
      .pipe(source(path.build))
      .pipe(gulp.dest(path.destJs));
      console.log('updated');
  })
  .on('log', function(msg) {
    console.log(msg);
  })
  .bundle()
  .pipe(source(path.destJs))
  .pipe(gulp.dest(path.destJs));

});
