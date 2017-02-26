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
router.use(bodyParser.json());


//lay danh sach truong hoc
router.get('/menu_Monhoc',function(req,res){
    connection.query('select * from discipline', function (err, rows, fields) {
		if (err) {
			connection.end();
			throw err;
		}
		else {
			res.json(rows)
		}
	});
});




//xoa truong hoc
router.delete('/menu_Monhoc/:id', function(req,res){
	
	var id = req.params.id; 
	var sql = "delete from discipline where dis_id = '" + id + "'";
	
	connection.query(sql, function (err, rows, fields) {
		if (err) {
			connection.end();
			throw err;
		}
		else {
			res.json(rows);
		}
	});
	
});




//them truong hoc
router.post('/menu_Monhoc',function(req,res){
	var sql = 'insert into discipline(dis_code,dis_name,dis_description,dis_hours,credits,status) values ("'+req.body.dis_code+'","'+req.body.dis_name+'","'+req.body.dis_description+'","'+req.body.dis_hours+'","'+req.body.credits+'",1)';
	
	connection.query(sql, function (err, rows, fields) {
		if (err) {
			connection.end();
			throw err;
		}
		else {
			res.json(rows);
		}
	});
    
});



//sua truong hoc
router.put('/menu_Monhoc/:id', function(req, res){
	var id = req.params.id;
	var sql = "update discipline set dis_code='" + req.body.dis_code + "', dis_name='" + req.body.dis_name + "', dis_description='" + req.body.dis_description + "', dis_hours='" + req.body.dis_hours + "',credits='" + req.body.credits + "', status='" + req.body.status + "' where dis_id = '" + id + "'";
	
	connection.query(sql, function (err, rows, fields) {
		if (err) {
			connection.end();
			throw err;
		}
		else {
			res.json(rows);
		}
	});
	
});

module.exports = router;