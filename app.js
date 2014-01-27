var lactate = require('lactate');
var express = require('express');

var app = express();
var files = lactate.dir('.');
var serverPort = process.env.PORT || 4000;

app.use(files.toMiddleware());

app.get('/', function (req, res) {
    res.redirect('./views/tattoos.html');
});

console.log('Lactate server running on port: ' + serverPort);

app.listen(serverPort);