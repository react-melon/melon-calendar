/**
 * @file gulpfile
 * @author leon <ludafa@outlook.com>
 */

const gulp = require('gulp');
const babel = require('gulp-babel');
const clean = require('gulp-clean');
const babelOptions = require('./package.json').babelBuild || {};

const sourcemaps = require('gulp-sourcemaps');

gulp.task('babel', function () {
    return gulp.src('src/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel(babelOptions))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('lib'));
});

gulp.task('stylus', function () {
    return gulp.src('src/**/*.styl').pipe(gulp.dest('lib'));
});

gulp.task('build', ['babel', 'stylus']);

gulp.task('clean', function () {
    return gulp
        .src('dist', {read: false})
        .pipe(clean());
});

gulp.task('rebuild', ['clean', 'build']);

gulp.task('default', ['build']);
