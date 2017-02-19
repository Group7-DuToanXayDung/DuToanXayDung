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

///lay danh sach truong hoc
router.get('/menu_School',function(req,res){
    connection.query('select * from truonghoc', function (err, rows, fields) {
		if (err) {
			connection.end();
			throw err;
		}
		else {
			res.json(rows)
		}
	});
});

router.use(bodyParser.json());

///xoa truong hoc
router.delete('/menu_School/:id', function(req,res){
	
	var id = req.params.id;
	var sql = "delete from truonghoc where id_th = '" + id + "'";
	
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

////them truong hoc
router.post('/menu_School',function(req,res){
    console.log("ma:" + req.body.ma_th);
    console.log("ten:" + req.body.ten_th);
    console.log("dia chi:" + req.body.diachi);
    console.log("thong tin:" + req.body.thongtin_lienlac);
    console.log("trang thai:" + req.body.trangthai);
	
	var sql = 'insert into truonghoc(ma_th,ten_th,diachi,thongtin_lienlac,trangthai) values ("'+req.body.ma_th+'","'+req.body.ten_th+'","'+req.body.diachi+'","'+req.body.thongtin_lienlac+'","'+req.body.trangthai+'")';
	
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


///sua truong hoc
router.put('/menu_School/:id', function(req, res){
	var id = req.params.id;
	var sql = "update truonghoc set ma_th='" + req.body.ma_th + "', ten_th='" + req.body.ten_th + "', diachi='" + req.body.diachi + "', thongtin_lienlac='" + req.body.thongtin_lienlac + "', trangthai='" + req.body.trangthai + "' where id_th = '" + id + "'";
	
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