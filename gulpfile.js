const {src, dest, watch, parallel, series} = require('gulp');
const scss          = require('gulp-sass')(require('sass'));
const concat        = require('gulp-concat');
const browserSync   = require('browser-sync').create();
const uglify        = require('gulp-uglify-es').default;
const autoprefixer  = require('gulp-autoprefixer');
const imagemin      = require('gulp-imagemin');
const del           = require('del');
const htmlmin       = require('gulp-htmlmin');


function browsersync(){
    browserSync.init({
        server: {
            baseDir: "src"
        }
    });
}
function watching(){
    watch(['src/scss/**/*.scss'], styles);
    watch(['src/js/main.js'], scripts);
    watch("src/*.html").on('change', browserSync.reload);
}
function styles(){
    return src('src/scss/style.scss')
        .pipe(scss({outputStyle: 'compressed'}))
        .pipe(concat('style.min.css'))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 10 version'],
            grid: true
        }))
        .pipe(dest('src/css'))
        .pipe(browserSync.stream());
}
function scripts(){
    return src('src/js/main.js')
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(dest('src/js'))
        .pipe(browserSync.stream());
}
function images(){
    return src('src/images/**/*')
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.mozjpeg({quality: 75, progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({
                plugins: [
                    {removeViewBox: true},
                    {cleanupIDs: false}
                ]
            })
        ]))
        .pipe(dest('dist/images'))
}
function clearDist(){
    return del('dist')
}
function build(){
    return src([
        'src/css/style.min.css',
        'src/fonts/**/*',
        'src/js/main.min.js',
        'src/*.html'
    ], {base: 'src'})
        .pipe(dest('dist'));
}
function html(){
    return src('dist/*.html')
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(dest('dist/'));
}

exports.styles      = styles;
exports.watching    = watching;
exports.browsersync = browsersync;
exports.scripts     = scripts;
exports.images      = images;
exports.html        = html;

exports.default     = parallel(styles, scripts, browsersync, watching);
exports.build       = series(clearDist, images, scripts, build);