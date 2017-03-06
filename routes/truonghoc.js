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
router.get('/menu_School',function(req,res){
    connection.query('select * from university', function (err, rows, fields) {
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
router.delete('/menu_School/:id', function(req,res){
	
	var id = req.params.id; 
	var sql = "delete from university where univer_id = '" + id + "'";
	
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
router.post('/menu_School',function(req,res){
	var sql = 'insert into university(univer_code,univer_name,univer_address,contact,status) values ("'+req.body.univer_code+'","'+req.body.univer_name+'","'+req.body.univer_address+'","'+req.body.contact+'",1)';
	
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
router.put('/menu_School/:id', function(req, res){
	var id = req.params.id;
	var sql = "update university set univer_code='" + req.body.univer_code + "', univer_name='" + req.body.univer_name + "', univer_address='" + req.body.univer_address + "', contact='" + req.body.contact + "', status='" + req.body.status + "' where univer_id = '" + id + "'";
	
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