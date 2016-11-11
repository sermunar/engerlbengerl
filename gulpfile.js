var gulp = require('gulp');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');
var less = require('gulp-less');

var config = {
    appTs: 'app/**/*.ts',
    headHtml: 'views/head.html',
    templatesHtml: 'views/templates/**/*.html',
    bodyHtml: 'views/body.html',
    viewsHtml: 'views/**/*.html',
    bowerComponentsJs: [
        './bower_components/jquery/dist/jquery.min.js',
        './bower_components/knockout/dist/knockout.js',
        './bower_components/knockout-validation/dist/knockout.validation.js',
        './bower_components/bootstrap/js/bootstrap.min.js'
    ],
    styleLess: './less/style.less',
    allLess: './less/**/*.less'
};

gulp.task('build', ['app-ts', 'index-html', 'bowerComponents-js', 'less']);

gulp.task('less', function() {
    return gulp.src(config.styleLess)
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./public/css'));
});

gulp.task('app-ts', function () {
    var tsResult = tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(tsProject());
    
    return tsResult.js 
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./'));
});

gulp.task('index-html', function() {
    return gulp.src([config.headHtml, config.templatesHtml, config.bodyHtml])
        .pipe(concat('index.html'))
        .pipe(gulp.dest('./'));
});

gulp.task('bowerComponents-js', function() {
    return gulp.src(config.bowerComponentsJs)
        .pipe(concat('bower_components.js'))
        .pipe(gulp.dest('./'));
});

/*
    watch
*/
gulp.task('watch-all', ['watch-app-ts', 'watch-html', 'watch-less']);

gulp.task('watch-app-ts',  function () {
    var watcher = gulp.watch(config.appTs, ['app-ts']);
    watcher.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type);
    });
});

gulp.task('watch-html',  function () {
    var watcher = gulp.watch(config.viewsHtml, ['index-html']);
    watcher.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type);
    });
});

gulp.task('watch-less', function() {
    var watcher = gulp.watch(config.allLess, ['less']);
    watcher.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type);
    });
});