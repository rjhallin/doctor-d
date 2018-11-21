var gulp = require('gulp'),
  sass = require('gulp-sass'),
  browserSync = require('browser-sync').create(),
  reload = browserSync.reload,
  pug = require('gulp-pug'),
  autoprefixer = require('autoprefixer'),
  postcss = require('gulp-postcss'),
  concat = require('gulp-concat'),
	imageMin = require('gulp-imagemin'),
	minifyCSS = require('gulp-minify-css'),
  sourcemaps = require('gulp-sourcemaps'),
  lost = require('lost'),
  mqPacker = require('css-mqpacker'),
  pxtorem = require('postcss-pxtorem'),
  image = require('gulp-image'),
  styleInject = require("gulp-style-inject"),
  sourcemaps = require('gulp-sourcemaps'),
  uglify = require('gulp-uglify'),
  notify = require('gulp-notify'),
	plumber = require('gulp-plumber');

// Gulpfile Rework

gulp.task('serve', ['pug', 'javaScript', 'image', 'masterStyle', 'componentStyles', 'pagesStyle'], function() {
    browserSync.init({
        server: "./dist"
    });
    gulp.watch("site/scss/**/*.scss", ['masterStyle']);
    gulp.watch("site/**/*.js", ['javaScript']);
    gulp.watch("site/images/**/*", ['image']);
    gulp.watch("site/components/**/*.scss", ['componentStyles']);
    gulp.watch("site/scss/pages/**/*.scss", ['pagesStyle']);
    gulp.watch("site/**/*.pug", ['image','pug']);
});

gulp.task('pug', function() {
  return gulp.src('site/**/*.pug')
    .pipe(pug({
      pretty: true
    }))
    .pipe(styleInject())
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
})

gulp.task('javaScript', function() {
  return gulp.src('site/**/*.js')
    .pipe(plumber({
      errorHandler: notify.onError("Error: <%= error.message %>")
    }))
    .pipe(uglify())
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
})

gulp.task('image', function () {
  gulp.src('site/images/**/*')
    //.pipe(image())
    .pipe(imageMin())
    .pipe(gulp.dest('dist/images/'))
    .pipe(browserSync.stream());
});

// Styles

gulp.task('masterStyle', function() {
  return gulp.src('site/scss/**/*.scss')
  .pipe(plumber({
    errorHandler: notify.onError("Error: <%= error.message %>")
  }))
  .pipe(sourcemaps.init())
  .pipe(sass())
  .pipe(postcss([
    lost(),
    autoprefixer(),
    mqPacker(),
    pxtorem({replace:false, propList:['*']})
  ]))
  .pipe(minifyCSS())
  .pipe(concat('style.css'))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('dist/css/'))
  .pipe(browserSync.stream());
})

gulp.task('componentStyles', function() {
  return gulp.src('site/components/**/*.scss')
  .pipe(plumber({
    errorHandler: notify.onError("Error: <%= error.message %>")
  }))
  .pipe(sourcemaps.init())
  .pipe(sass())
  .pipe(postcss([
    lost(),
    autoprefixer(),
    mqPacker(),
    pxtorem({replace:false, propList:['*']})
  ]))
  .pipe(sourcemaps.write('.'))
  .pipe(gulp.dest('dist/components/'))
  .pipe(minifyCSS())
  .pipe(concat('components.css'))
  .pipe(gulp.dest('dist/css/'))
  .pipe(browserSync.stream());
})

gulp.task('pagesStyle', function() {
  return gulp.src('site/scss/pages/*.scss')
  .pipe(plumber({
    errorHandler: notify.onError("Error: <%= error.message %>")
  }))
  .pipe(sourcemaps.init())
  .pipe(sass())
  .pipe(postcss([
    lost(),
    autoprefixer(),
    mqPacker(),
    pxtorem({replace:false, propList:['*']})
  ]))
  .pipe(sourcemaps.write('.'))
  .pipe(minifyCSS())
  .pipe(gulp.dest('dist/css/pages/'))
  .pipe(browserSync.stream());
})

gulp.task('default', ['serve']);
