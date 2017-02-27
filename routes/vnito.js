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


//lay danh sach vnito
router.get('/menu_VNITO',function(req,res){
    connection.query('select * from company', function (err, rows, fields) {
		if (err) {
			connection.end();
			throw err;
		}
		else {
			
			res.json(rows);
		}
	});
});

////xoa truong hoc
router.delete('/menu_VNITO/:id', function(req,res){
	var id = req.params.id; 
	var sql = "delete from company where com_id = '" + id + "'";
	
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




//them vnito
router.post('/menu_VNITO',function(req,res){
	var sql = 'insert into company(com_code,com_name,com_address,com_contact,com_status) values ("'+req.body.com_code+'","'+req.body.com_name+'","'+req.body.com_address+'","'+req.body.com_contact+'",1)';
	
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


router.put('/menu_VNITO/:id', function(req, res){

	 var id = req.params.id;
	var sql = "update company set com_code='" + req.body.com_code + "', com_name='" + req.body.com_name + "', com_address='" + req.body.com_address + "', com_contact='" + req.body.com_contact + "', com_status='" + req.body.com_status + "' where com_id = '" + id + "'";

	
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