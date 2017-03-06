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
router.get('/rolesUser/:id', function (req, res) {
	var user_code = req.params.id;
	connection.query('SELECT access_id from decentralization where user_code="' + user_code + '" ', function (err, rows, fields) {
		if (err) {
			connection.end();
			throw err;
		}
		else {
			res.json(rows)
		}
	});
});


router.put('/rolesUser/:id', function (req, res) {
	var id = req.params.id;
	var sql = "delete from decentralization where user_code = '" + id + "'";

	connection.query(sql, function (err, rows, fields) {
		if (err) {
			connection.end();
			throw err;
		}
	});
	for (var i = 0; i < req.body.length; i++) {
		var sql1 = "insert into decentralization(user_code,access_id,status) values('" + id + "','" + req.body[i] + "',1)";
		connection.query(sql1, function (err, rows, fields) {
			if (err) {
				connection.end();
				throw err;
			}
		});
	}
});

module.exports = router;