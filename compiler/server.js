
const express = require('express');
const serveStatic = require('serve-static');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');

const app = express();
app.use(serveStatic(__dirname + '/../build'));
app.use(favicon(__dirname + '/../build/favicon.ico'));
app.use(bodyParser.json());

module.exports = app;
