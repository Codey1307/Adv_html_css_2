const gulp = require('gulp');
const htmlmin = require('gulp-htmlmin');
const concat = require('gulp-concat')
const terser = require('gulp-terser');
const clean = require('gulp-clean');
const cleanCSS = require('gulp-clean-css');
const browserSync = require('browser-sync').create();
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const purgecss = require('gulp-purgecss');
const imagemin = require('gulp-imagemin');

const cleanDist = () => {
    return gulp.src('./dist', {read: false})
    .pipe(clean())
}

const scss = () => {
    return gulp.src('./src/scss/main.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(autoprefixer({
        cascade: false
    }))
    .pipe(concat('styles.min.css'))
    .pipe(gulp.dest('./dist/css'))
    .pipe(purgecss({
        content: ['src/**/*.html']
    }))
    .pipe(gulp.dest('./dist/css'))
    .pipe(cleanCSS())
    .pipe(gulp.dest('./dist/css'))
}


const dev = () => {
    browserSync.init({
        server: {
            baseDir: "./dist"
        },
        browser:"google chrome",
    });

    gulp.watch('./src/**/*', gulp.series(cleanDist, gulp.parallel(html, js, scss, images), (next) => {
        browserSync.reload();
        next();
    }))
}

const html = () => {
    return gulp.src("./src/**/*.html")
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('./dist'))
}

const js = () => {
    return gulp.src('./src/**/*.js')
    .pipe(concat('scripts.min.js'))
    .pipe(terser())
    .pipe(gulp.dest('./dist/js'))
}

const images = () => {
    return gulp.src('./src/**/*.png')
      .pipe(imagemin())
      .pipe(gulp.dest('./dist'))
  };

gulp.task('html', html)
gulp.task('scss', scss)
gulp.task('js', js)
gulp.task('clean', cleanDist)
gulp.task('images', images)


gulp.task('build', gulp.series(cleanDist, gulp.parallel(html, js, scss, images)))
gulp.task('dev', dev)
