var gulp = require('gulp');
var argv = require('yargs').argv;
var opener = require('opener');
var del = require('del');
var runSequence = require('run-sequence');
var webpack = require('webpack');

var URL = { host: argv.host || 'localhost', port: argv.port || process.env.PORT || 4000 };

gulp.task('build', function (cb) {
    var compiler = webpack(require('./compiler/webpack-config.js'));
    compiler.run(function (error, stats) {
        if (error) { // fatal error
            console.error(error);
        } else if ( stats.hasErrors() ) {
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
    var app = require('./compiler/server.js');
    app.listen(URL.port, function () {
        opener('http://' + URL.host + ':' + URL.port);
    });
});
