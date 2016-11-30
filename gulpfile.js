var gulp             = require('gulp');
var haml             = require('gulp-ruby-haml');
var postcss          = require('gulp-postcss');
var postcss_cssnext  = require('postcss-cssnext');
var precss           = require('precss');
var postcss_magician = require('postcss-font-magician');
var clean_css        = require('gulp-clean-css');
var concat_css       = require('gulp-concat-css');
var sourcemaps       = require('gulp-sourcemaps');
var uglify           = require('gulp-uglify');
var babel            = require('gulp-babel');
var pump             = require('pump');
var vfs              = require('vinyl-fs');
var runSequence      = require('run-sequence');
var del              = require('del');
var livereload       = require('gulp-livereload');
var jsonmin          = require('gulp-jsonmin');
var automath         = require('postcss-automath');

var paths = {
    haml:           './src/haml/index.haml',
    haml_partials:  './src/haml/partials/*.haml',
    css: {
        base:       './src/postcss/**/*.postcss',
        normalize:  './node_modules/normalize.css/normalize.css'
    },
    json:           './src/js/json/*.json'
};

var hamlOpts = {
    trace: true,
    doubleQuote: true,
    unixNewlines: true
};

const css = Object.keys(paths.css).map(key => paths.css[key]);

var processors = [
    postcss_cssnext,
    precss,
    postcss_magician,
    automath
];

gulp.task('haml', function(callback) {
    pump([
        vfs.src(paths.haml),
        haml(hamlOpts),
        vfs.dest('./'),
        livereload()
    ], callback);
});

gulp.task('haml-partials', function(callback) {
    pump([
        vfs.src(paths.haml_partials),
        haml(hamlOpts),
        vfs.dest('./bin/partials/'),
        livereload()
    ], callback);
});

gulp.task('css', function(callback) {
    pump([
        vfs.src([css[1],css[0]]),
        postcss(processors),
        concat_css('main.css'),
        vfs.dest('./bin/css/'),
        livereload()
    ], callback);
});

gulp.task('minify', ['css'], function(callback){
    pump([
        vfs.src([css[1],css[0]]),
        postcss(processors),
        concat_css('main.min.css'),
        clean_css(),
        vfs.dest('./bin/css/'),
        livereload()
    ], callback);
});

gulp.task('js-build', function(callback){
    runSequence('js-clean',
                'json',
                'js',
                callback);
});

gulp.task('js', function(){
    return pump([
        vfs.src('./src/js/main.js'),
        sourcemaps.init(),
        babel({presets: ['es2015']}),
        uglify(),
        sourcemaps.write(),
        vfs.dest('./bin/js/'),
        livereload()
    ]);
});

gulp.task('js-clean', function() {
    return del(['./bin/js/*']);
});

gulp.task('json', function () {
    return pump([
        vfs.src(paths.json),
        jsonmin(),
        vfs.dest('./bin/js/json/')
    ]);
});

gulp.task('watch', function() {
    livereload.listen();
    gulp.watch(paths.haml, ['haml']);
    gulp.watch(paths.haml_partials, ['haml-partials']);
    gulp.watch(paths.css.base, ['minify']);
    gulp.watch('./src/js/main.js', ['js']);
    gulp.watch('./src/js/json/*', ['json']);
});

gulp.task('default', ['haml', 'haml-partials', 'minify', 'js-build']);