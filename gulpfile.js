// Initialize modules
const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const babel = require('gulp-babel');
const terser = require('gulp-terser');

// Sass Task 1
function scssTask() {
  return src('src/scss/style.scss', { sourcemaps: true })
    .pipe(sass())
    .pipe(postcss([autoprefixer(), cssnano()]))
    .pipe(dest('.', { sourcemaps: '.' }));
}

// JavaScript Task
function jsTask() {
  return src('src/js/script.js', { sourcemaps: true })
    .pipe(babel({ presets: ['@babel/preset-env'] }))
    .pipe(terser())
    .pipe(dest('.', { sourcemaps: '.' }));
}

// Watch Task
function watchTask() {
  watch(
    ['src/scss/**/*.scss', 'src/**/*.js'],
    // series(scssTask, jsTask, browserSyncReload)
    series(scssTask, jsTask)
    

  );
}

// Build Gulp Task
exports.default = series(scssTask, jsTask, watchTask);