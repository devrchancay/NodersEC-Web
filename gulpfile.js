var gulp     = require('gulp'),
	gulpif     = require('gulp-if'),
	minifyCss  = require('gulp-minify-css'),
	useref     = require('gulp-useref'),
	uglify     = require('gulp-uglify'),
	uncss      = require('gulp-uncss'),
	inject     = require('gulp-inject');

gulp.task('inject',function(){
	var target = gulp.src('./app/views/index.html');
	var sources = gulp.src(['./public/css/lib/**/*.min.js','./public/css/lib/**/*.min.css'], {read: false});
	return target.pipe(inject(sources,{ignorePath : 'public/' , addRootSlash : false}))
    .pipe(gulp.dest('./app/views'));
});

gulp.task('watch', function() {
	gulp.watch(['./bower.json'], ['inject']);
});

gulp.task('default', ['wiredep', 'watch']);

gulp.task('compress',function() {
	var assets = useref.assets(),
	opts = { comments:false };
	gulp.src('./app/views/index.html')
		.pipe(assets)
		.pipe(gulpif('*.css',minifyCss({keepSpecialComments : 0})))
		.pipe(gulpif('*.js', uglify({mangle: false })))
		.pipe(assets.restore())
		.pipe(useref())
		.pipe(gulp.dest('./build/'));
});

gulp.task('build',['compress']);
