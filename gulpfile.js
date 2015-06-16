var folderName = 'standmixer';
var gulp = require("gulp"),
	babel = require("gulp-babel"),
	stripDebug = require('gulp-strip-debug'),
	uglify = require('gulp-uglify'),
	less = require('gulp-less'),
    minifyHtml = require('gulp-minify-html'),
	minifyCss = require('gulp-minify-css'),
    reload = require('gulp-livereload'),
    plugins = require('gulp-load-plugins')(),
    sourcemaps = require('gulp-sourcemaps'),
    babeloptions = {
        compact: false
    };

gulp.task("default", function() {
    plugins.livereload.listen();
    gulp.watch('src/js/**/*.js', ['js']);
    gulp.watch('src/less/**/*.less', ['css']);
    gulp.watch('src/**/*.html', ['html']);
});

gulp.task("html", function() {
    return gulp.src("src/**/*.html")
        .pipe(gulp.dest(""))
        .pipe(plugins.livereload());
});

gulp.task("js", function () {
    var b = babel(babeloptions);
    b.on('error',function(e){console.log('error parsing js: '+e);b.end()});
  return gulp.src("src/js/**/*.js")
    .pipe(b)
    .pipe(gulp.dest("js/"+folderName))
    .pipe(plugins.livereload())
    .pipe(gulp.dest("/Users/stepoole/Desktop/_upload/js/"+folderName))
    .pipe(gulp.dest("../javascript/"+folderName));
});

gulp.task("css", function() {
	return gulp.src("src/less/**/*.less")
		.pipe(less())
		.pipe(gulp.dest("css/"+folderName))
        .pipe(plugins.livereload())
        .pipe(gulp.dest("/Users/stepoole/Desktop/_upload/css/"+folderName))
        .pipe(gulp.dest("../css/"+folderName));
});