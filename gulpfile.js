// Gulp.js configuration
var
	// modules
	gulp = require('gulp'),
	$ = require('gulp-load-plugins') (),
	browserSync = require('browser-sync').create(),
	reload = browserSync.reload,
	del = require('del'),
	pngquant = require('imagemin-pngquant'),
	runSequence = require('run-sequence'),

	// development mode?
	devBuild = (process.env.NODE_ENV !== 'production')
;

var paths = {
	src: {
		sass: 'src/sass/**/*.+(scss|sass)',
		less: 'src/less/**/*.less',
		css: 'src/css',
		cssFiles: 'src/css/**/*.css',
		js: 'src/js/**/*.js',
		vendors: 'src/vendors/**/*',
		img: 'src/img',
		html: 'src/*.html'
	},

	dist: {
		css: 'dist/css',
		less: 'dist/less',
		sass: 'dist/sass',
		js: 'dist/js',
		vendors: 'dist/vendors',
		img: 'dist/img',
		html: 'dist'
	}
};

// ==================================================
// ### Development Task ###
// ==================================================

// Static server
gulp.task('browser-sync', function() {
	browserSync.init({
		server: {
			baseDir: './src'
		},

		notify: false
	});
});

// Compile SCSS to CSS
gulp.task('sass', function() {
	return gulp.src(paths.src.sass)
		.pipe($.plumber({ errorHandler: $.notify.onError("Ошибка: <%= error.message %>") }))
		.pipe($.sourcemaps.init())
		.pipe($.sass())
		.pipe($.autoprefixer({
			browsers: ['last 5 versions', 'opera > 39', 'firefox > 46', 'chrome > 48', 'ie > 9'],
			cascade: true
		}))
		// .pipe($.cssnano())
		// .pipe($.rename({
		// 	suffix: '.min',
		// 	prefix : ''
		// }))
		.pipe($.sourcemaps.write('.'))
		.pipe(gulp.dest(paths.src.css))
		.pipe(reload({ stream: true }));
});

// Compile LESS to CSS
gulp.task('less', function () {
	return gulp.src(paths.src.less)
		.pipe($.plumber({ errorHandler: $.notify.onError("Ошибка: <%= error.message %>") }))
		.pipe($.sourcemaps.init())
		.pipe($.less())
		.pipe($.autoprefixer({
			browsers: ['last 5 versions', 'opera > 39', 'firefox > 46', 'chrome > 48', 'ie > 9'],
			cascade: true
		}))
		// .pipe($.cssnano())
		// .pipe($.rename({
		// 	suffix: '.min',
		// 	prefix : ''
		// }))
		.pipe($.sourcemaps.write('.'))
		.pipe(gulp.dest(paths.src.css))
		.pipe(reload({ stream: true }));
});

// Watching for changes
gulp.task('watch', ['browser-sync', 'less'], function() {
	gulp.watch(paths.src.less, ['less']);
	gulp.watch(paths.src.html, reload);
});

// Default task
gulp.task('default', ['watch']);


// ==================================================
// ### Production Task ###
// ==================================================

// Build HTML
gulp.task('html:build', function() {
	return gulp.src(paths.src.html)
		.pipe(gulp.dest(paths.dist.html));
});

// Build CSS
gulp.task('css:build', function() {
	return gulp.src(paths.src.cssFiles)
		.pipe(gulp.dest(paths.dist.css));
});

// Build SASS
gulp.task('sass:build', function() {
	return gulp.src(paths.src.sass)
		.pipe(gulp.dest(paths.dist.sass));
});

// Build LESS
gulp.task('less:build', function() {
	return gulp.src(paths.src.less)
		.pipe(gulp.dest(paths.dist.less));
});

// Build JS
gulp.task('js:build', function() {
	return gulp.src(paths.src.js)
		.pipe(gulp.dest(paths.dist.js));
});

// Build VENDORS
gulp.task('vendors:build', function() {
	return gulp.src(paths.src.vendors)
		.pipe(gulp.dest(paths.dist.vendors));
});

// Optimizing images
gulp.task('imagemin', function() {
	return gulp.src(paths.src.img + '/**/*.+(png|jpg|gif|svg)')
		.pipe($.cache($.imagemin({
			interlaced: true,
			progressive: true,
			optimizationLevel: 5,
			svgoPlugins: [{removeViewBox: true}]
		}))) // Cache Images
		.pipe(gulp.dest(paths.dist.img));
});

// Clean cache
gulp.task('clean', function() {
	return $.cache.clearAll();
});

// Clear production folder
gulp.task('clear', function() {
	return del.sync(['dist', '!dist/img', '!dist/img/**/*']);
});

// Building application
gulp.task('build', function(cb) {

	runSequence('clean', 'clear',
		['html:build', 'css:build', 'js:build'],
		['sass:build', 'less:build'],
		'vendors:build', 'imagemin', cb);

});
