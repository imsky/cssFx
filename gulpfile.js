var gulp = require('gulp');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var header = require('gulp-header');

var moment = require('moment');
var pkg = require('./package.json');

function generateBuild() {
	var date = new Date;
	return Math.floor((date - (new Date(date.getFullYear(), 0, 0))) / 1000).toString(36)
}

var banner =
	'/*!\n\n' +
	'<%= pkg.name %> - <%= pkg.summary %>\nVersion <%= pkg.version %>+<%= build %>\n' +
	'\u00A9 <%= year %> <%= pkg.author.name %> - <%= pkg.author.url %>\n\n' +
	'Site:     <%= pkg.homepage %>\n' +
	'Issues:   <%= pkg.bugs.url %>\n' +
	'License:  <%= pkg.license.url %>\n\n' +
	'*/\n';

var build = generateBuild();

gulp.task('browserify', function() {
	return browserify({
			entries: ['./src/cssfx.js']
		})
		.bundle()
		.pipe(source('cssfx.js'))
		.pipe(gulp.dest('./'));
});

gulp.task('scripts', ['browserify'], function() {
	return gulp.src(['./cssfx.js'])
		.pipe(uglify())
		.pipe(header(banner, {
			pkg: pkg,
			year: moment().format("YYYY"),
			build: build
		}))
		.pipe(gulp.dest('./'));

});

gulp.task('default', ['scripts'], function() {
	build = generateBuild();
});