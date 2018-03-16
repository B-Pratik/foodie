const gulp = require('gulp');
const argv = require('yargs').argv;
const opener = require('opener');
const del = require('del');
const runSequence = require('run-sequence');
const webpack = require('webpack');
const compiler = webpack(require('./compiler/webpack-config.js'));

const URL = { host: argv.host || 'localhost', port: argv.port || process.env.PORT || 4000 };

gulp.task('build', function (cb) {
	compiler.run(function (error, stats) {
		if (error) { // fatal error
			console.error(error);
		} else if (stats.hasErrors()) {
			console.error(stats.toString({
				colors: true,
				reasons: true
			}));
		} else {
			return cb();
		}
	});
});

gulp.task('clean', function () {
	return del.sync(['./build/**', '!./build', '!./build/favicon.ico', '!./build/compiled.css']);
});

gulp.task('complete', function (cb) {
	return runSequence(
		'clean',
		'build',
		cb
	);
});

gulp.task('default', ['complete'], function () {
	const app = require('./compiler/server.js');
	app.use(require("webpack-dev-middleware")(compiler, {
		noInfo: true, publicPath: '/'
	}));
	app.use(require("webpack-hot-middleware")(compiler));
	app.listen(URL.port, function () {
		opener('http://' + URL.host + ':' + URL.port);
	});
});
