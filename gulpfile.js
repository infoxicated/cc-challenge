var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');



gulp.task('sass', function () {
	return gulp.src('./source/*.scss')
	.pipe(sourcemaps.init())
	.pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
	.pipe(sourcemaps.write('./maps', {sourceRoot: './source'}))
	.pipe(gulp.dest('./css'));
});


gulp.task('watch', function() {
	gulp.watch('source/main.scss', ['sass']);
});

gulp.task('default', ['watch']);