var express = require('express');
var app = express();
//var mysql = require('mysql');
var bodyParser = require('body-parser');

app.use(express.static(__dirname + "/public"));

app.use(require('./routes/truonghoc'));

app.listen(5000);
console.log('server started');