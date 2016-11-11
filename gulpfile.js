var gulp = require('gulp');
var ts = require('gulp-typescript');
var tsProject = ts.createProject('tsconfig.json');
var sourcemaps = require('gulp-sourcemaps');

var config = {
    appTs: 'app/**/*.ts'
};

gulp.task('app-ts', function () {
    var tsResult = tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(tsProject());  
    
    return tsResult.js 
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./'));
});



/*
    watch
*/
gulp.task('watch-all', ['watch-app-ts']);

gulp.task('watch-app-ts',  function () {
    var watcher = gulp.watch(config.appTs, ['app-ts']);
    watcher.on('change', function(event) {
        console.log('File ' + event.path + ' was ' + event.type);
    });
});