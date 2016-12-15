var gulp = require('gulp'),
browserSync = require('browser-sync'),
sass = require('gulp-ruby-sass');


gulp.task('sass', function() {
	return sass('app/app-content/sass/*.scss')

	.on('error', sass.logError)
	.pipe(gulp.dest('app/app-content/css/'));
});



gulp.task('watch', function(){
	gulp.watch('app/app-content/sass/*.scss' ,  ['sass']);
	gulp.watch('*.html').on('change' , browserSync.reload);
  // Other watchers
})

gulp.task('browser-sync', function() {
 browserSync.init({
  server: {
   baseDir: "./"
  }
 });
});


gulp.task('default', ['browser-sync','watch','sass']);