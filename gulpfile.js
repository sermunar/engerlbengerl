var gulp = require('gulp');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');
var sourcemaps = require('gulp-sourcemaps');
var concat = require('gulp-concat');

var config = {
    appTs: 'app/**/*.ts',
    headHtml: 'views/head.html',
    templatesHtml: 'views/templates/**/*.html',
    bodyHtml: 'views/body.html',
    viewsHtml: 'views/**/*.html'
};

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


/*
    watch
*/
gulp.task('watch-all', ['watch-app-ts', 'watch-html']);

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