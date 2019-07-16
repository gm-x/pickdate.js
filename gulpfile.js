const { src, dest, parallel } = require('gulp');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const minifyCSS = require('gulp-csso');
const uglify = require('gulp-uglify');
const concat = require('gulp-concat');

function js() {
    return src(['src/js/picker.js', 'src/js/translations.js', 'src/js/picker.date.js'], { sourcemaps: true })
        .pipe(uglify())
        .pipe(concat('pickadate.min.js'))
        .pipe(dest('dist/js', { sourcemaps: false }))
}

function css() {
    return src(['src/css/base.less', 'src/css/base.date.less', 'src/css/default.less'])
        .pipe(less())
        .pipe(autoprefixer({
            browsers: [ '> 5%', 'last 2 versions'],
            cascade: false
        }))
        .pipe(minifyCSS())
        .pipe(concat('pickadate.css'))
        .pipe(dest('dist/css'));
}

exports.js = js;
exports.css = css;
exports.default = parallel(js, css);
