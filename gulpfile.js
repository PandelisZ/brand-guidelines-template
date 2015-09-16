var gulp = require('gulp'),

    // Server and sync
    browserSync = require('browser-sync'),

    // Other plugins
    rimraf = require('rimraf'),
    es = require('event-stream'),
    sass = require('gulp-sass'),
    jade = require('gulp-jade'),
    sourcemaps = require('gulp-sourcemaps'),
    minify = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    fs = require('fs.extra');
    



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
      .pipe(sourcemaps.init())
        .pipe(sass({
          errLogToConsole: true
        }))
        .pipe(sourcemaps.write())
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
// Move Brand files into dist
//
gulp.task('move-brand-files', function(){
  fs.rmrf('./dist/brand-files', function (err) {
    if (err) {
      console.error(err);
    }
  });
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
    .pipe(minify({
      keepSpecialComments: 0
    }))
    .pipe(gulp.dest('./dist/css'));
});


//
// Uglify js
//
gulp.task('scripts', function() {
    return gulp.src('./src/bin/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
});


//
// Vendor JS
//
gulp.task('vendor-scripts', function() {
  fs.rmrf('./dist/js/vendor', function (err) {
    if (err) {
      console.error(err);
    }
  });
  fs.copyRecursive('./src/bin/js/vendor', './dist/js/vendor', function (err) {
    if (err) {
      throw err;
    }
    console.log("Replaced vendor JS");
  });
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

gulp.task('watch-html', function() {
  gulp.src('./dist/*.html')
      .pipe(browserSync.reload({
        stream: true,
        once: true
      }));
});

// Default functionality includes server with browser sync and watching
gulp.task('default', ['move-brand-files', 'sass', 'scripts', 'vendor-scripts', 'jade', 'serve', ], function(){
  gulp.watch(['./src/index.jade', './src/content/*.jade', './src/bin/jade/*.jade'], ['jade']);
  gulp.watch('./src/bin/scss/**/*.scss', ['sass']);
  gulp.watch('./src/bin/js/**/*.js', ['watch-js']);
  gulp.watch('./src/bin/js/vendor/*.js', ['vendor-scripts']);
  gulp.watch(['./src/brand-files/**/*','./src/brand-files/*'], ['move-brand-files']);
  gulp.watch('./dist/*.html', ['watch-html']);
});

// Build functionality with cleaning, moving, compiling, etc.
gulp.task('build', ['remove'], function(){
  return gulp.start(
    'minify',
    'scripts'
  );
});