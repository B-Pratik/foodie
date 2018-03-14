var gulp = require('gulp');
var argv = require('yargs').argv;
var opener = require('opener');
var del = require('del');
var runSequence = require('run-sequence');
var webpack = require('webpack');

var URL = { host: argv.host || 'localhost', port: argv.port || process.env.PORT || 4000 };

gulp.task('build', function (cb) {
    var compiler = webpack(require('./compiler/webpack-config.js'));
    compiler.run(function (err) {
        if (err) {
            console.error(err.message);
        }
        cb();
    });
});

gulp.task('clean', function () {
    return del.sync(['./build/**', '!./build', '!./build/favicon.ico']);
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