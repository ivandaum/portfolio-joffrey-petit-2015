// ===================
// Dependencies
// ===================

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

// ===================
// Local variables
// ===================

jsDir = './app/assets/js/';
sassDir = './app/assets/sass/';
compiledDir = './app/assets/compiled/';

jsFiles = [
    'bower_components/jquery/dist/jquery.min.js',
    'bower_components/masonery/dist/masonry.pkgd.min.js',
    'bower_components/imagesloaded/imagesloaded.js',
    jsDir + '**/*.js'
];

othersSassFiles = [
    'bower_components/susy/sass/',
    'bower_components/breakpoint-sass/stylesheets/'
];

// ===================
// Tasks
// ===================

// Compile sass and minify it to ./assets/compiled/stylesheets
// command : compile:sass
gulp.task('compile:sass', function () {
    gulp.src(sassDir + 'main.scss')
        .pipe(sass({
            sourceComments: false,
            includePaths: othersSassFiles,
            //outputStyle: 'compressed',
            errLogToConsole: true
        }))
        .pipe(gulp.dest(compiledDir));
});

// Compile js files in jsFiles variable and minify to ./assets/compiled/js
// command : gulp compile:js
gulp.task('compile:js', function () {
    gulp.src(jsFiles)
        .pipe(uglify())// before compilation, preserve order
        .pipe(concat('main.js'))
        .pipe(gulp.dest(compiledDir));
});

// Default action
// command : gulp
gulp.task('default', function () {
    gulp.start('compile:sass');
    gulp.start('compile:js');
});

// ===================
// Watchers
// ===================

// Watcher on sass
// command : gulp watch:sass
gulp.task('watch:sass', function () {
    gulp.start('compile:sass');
    gulp.watch(sassDir + "**/*.scss", ['compile:sass'])
});

// Watcher on javascript
// command : gulp watch:js
gulp.task('watch:js', function () {
    gulp.start('compile:js');
    gulp.watch(jsDir + "**/*.js", ['compile:js'])
});