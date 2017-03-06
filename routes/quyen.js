var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'iscdb'
});

connection.connect();

//lay danh sach thanh vien
router.get('/roles',function(req,res){
    connection.query('SELECT * from access ', function (err, rows, fields) {
		if (err) {
			connection.end();
			throw err;
		}
		else {
			res.json(rows)
		}
	});
});

module.exports = router;