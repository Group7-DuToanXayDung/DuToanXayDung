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
router.get('/menu_CThoc',function(req,res){
    connection.query('select * from study_program', function (err, rows, fields) {
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
router.delete('/menu_CThoc/:id', function(req,res){
	
	var id = req.params.id; 
	var sql = "delete from study_program where pro_id = '" + id + "'";
	
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
router.post('/menu_CThoc',function(req,res){
	var sql = 'insert into study_program(pro_code,pro_name,pro_description,pro_status) values ("'+req.body.pro_code+'","'+req.body.pro_name+'","'+req.body.pro_description+'",1)';
	
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
router.put('/menu_CThoc/:id', function(req, res){
	var id = req.params.id;
	var sql = "update study_program set pro_code='" + req.body.pro_code	 + "', pro_name='" + req.body.pro_name + "', pro_description='" + req.body.pro_description + "', pro_status='" + req.body.pro_status + "' where pro_id = '" + id + "'";
	
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