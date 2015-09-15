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
  uglify = require('gulp-uglify');
  



// Server initiation and livereload, opens server in browser
gulp.task('serve', function() {
  browserSync.init(null, {
    server: {
      baseDir: './src',
      index: 'index.html'
    },
    open: "external",
    logPrefix: "Gulp Style Guide Generator"
    });
});


// SASS compiling & reloading
gulp.task('sass', function() {
    gulp.src('./src/scss/*.scss')
      .pipe(sourcemaps.init())
        .pipe(sass({
          errLogToConsole: true
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./src/css'))
        .pipe(browserSync.reload({
          stream: true
        }));
});

// Compile Our HTML
gulp.task('jade', function() {
  gulp.src('src/jade/*.jade')
    .pipe(jade({
      pretty: true
    }))
    .pipe(gulp.dest('./src/'))
    .pipe(browserSync.reload({
      stream: true
    }));
});


// Clear 'dist' directory, then minifying, copying, processing, uglifying, etc for build
gulp.task('remove', function (cb) {
    rimraf('./dist', cb);
});

// Minify sass
gulp.task('minify', ['sass'], function() {
  return gulp.src('./src/css/*.css')
    .pipe(minify({
      keepSpecialComments: 0
    }))
    .pipe(gulp.dest('./dist/css'));
});


gulp.task('html', function() {
  return es.merge(
    gulp.src("./src/**/*.html")
        .pipe(gulp.dest('./dist')),
      gulp.src("./src/**/*.txt")
        .pipe(gulp.dest('./dist'))
  );
});

// Uglify js
gulp.task('scripts', function() {
    return gulp.src('./src/js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
});


// Watching files for changes before reloading
gulp.task('watch-js', function() {
  gulp.src('./src/**/*.js')
      .pipe(browserSync.reload({
        stream: true,
        once: true
      }));
});

gulp.task('watch-html', function() {
  gulp.src('./src/**/*.html')
      .pipe(browserSync.reload({
        stream: true,
        once: true
      }));
});

// Default functionality includes server with browser sync and watching
gulp.task('default', ['serve', 'sass'], function(){
  gulp.watch('./src/jade/*.jade', ['jade']);
  gulp.watch('./src/scss/**/*.scss', ['sass']);
  gulp.watch('./src/js/**/*.js', ['watch-js']);
  gulp.watch('./src/**/*.html', ['watch-html']);
});

// Build functionality with cleaning, moving, compiling, etc.
gulp.task('build', ['remove'], function(){
  return gulp.start(
    'minify',
    'html',
    'scripts'
  );
});