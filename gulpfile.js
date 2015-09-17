var gulp        = require('gulp'),

    // Server and sync
    browserSync = require('browser-sync'),

    // Other plugins
    plumber     = require('gulp-plumber'),
    rimraf      = require('rimraf'),
    es          = require('event-stream'),
    sass        = require('gulp-sass'),
    jade        = require('gulp-jade'),
    sourcemaps  = require('gulp-sourcemaps'),
    minifyCss   = require('gulp-minify-css'),
    rename      = require('gulp-rename'),
    uglify      = require('gulp-uglify'),
    fs          = require('fs.extra');


// Server initiation and livereload, opens server in browser
gulp.task('serve', function() {
  browserSync.init(null, {
    server: {
      baseDir: './dist',
      index: 'index.html'
    },
    open: "external",
    logPrefix: "Gulp Style Guide Generator"
    });
});


// SASS compiling & reloading
gulp.task('sass', function() {
    gulp.src('./src/bin/scss/main.scss')
      .pipe(plumber())
      .pipe(sourcemaps.init())
      .pipe(sass({
        errLogToConsole: true
      }))
      .pipe(gulp.dest('./dist/css/'))
      .pipe(minifyCss({compatibility: 'ie8'}))
      .pipe(sourcemaps.write())
      .pipe(rename({suffix: '.min'}))
      .pipe(gulp.dest('./dist/css/'))
      .pipe(browserSync.reload({
        stream: true
      }));
});

//
// Compile Our HTML
//
gulp.task('jade', function() {
  gulp.src('./src/index.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('./dist/'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

//
// Compile Email Signature
//
gulp.task('create-email-signature', function() {
  gulp.src('./src/bin/jade/email-signature.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('./src/brand-files/email-signature/'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

//
// Move Brand files into dist
//
gulp.task('move-brand-files', function(){
  rimraf('./dist/brand-files', cb);
  fs.copyRecursive('./src/brand-files', './dist/brand-files', function (err) {
    if (err) {
      throw err;
    }
    console.log("Copied './src/brand-files' to './dist/brand-files'");
  });
});

//
// Clear 'dist' directory, then minifying, copying, processing, uglifying, etc for build
//
gulp.task('remove', function (cb) {
    rimraf('./dist', cb);
});

//
// Minify sass
//
gulp.task('minify', ['sass'], function() {
  return gulp.src('./dist/css/*.css')
    .pipe(minifyCSS({
      keepSpecialComments: 0
    }))
    .pipe(gulp.dest('./dist/css'));
});


//
// Uglify js
//
gulp.task('scripts', function() {
    return gulp.src('./src/bin/js/*.js')
        //.pipe(uglify())
        .pipe(gulp.dest('./dist/js'))
        .pipe(browserSync.reload({
          stream: true,
          once: true
        }));
});

//
// Watching files for changes before reloading
//
gulp.task('watch-js', function() {
  gulp.src('./dist/**/*.js')
      .pipe(browserSync.reload({
        stream: true,
        once: true
      }));
});

//
// Default functionality includes server with browser sync and watching
//
gulp.task('default', ['remove','sass', 'scripts', 'jade', 'create-email-signature', 'move-brand-files', 'serve'], function(){
  gulp.watch(['./src/index.jade', './src/guidelines/*.jade', './src/bin/jade/*.jade'], ['jade']);
  gulp.watch('./src/bin/scss/**/*.scss', ['sass']);
  gulp.watch('./src/brand-files/email-signature/email-signature.jade', ['create-email-signature']);
  gulp.watch('./src/bin/js/**/*.js', ['scripts']);
  gulp.watch(['./src/brand-files/**/*','./src/brand-files/*'], ['move-brand-files']);
});

//
// Build functionality with cleaning, moving, compiling, etc.
//
gulp.task('build', ['remove'], function(){
  return gulp.start(
    'minify',
    'scripts'
  );
});