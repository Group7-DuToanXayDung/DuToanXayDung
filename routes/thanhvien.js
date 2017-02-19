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

///lay danh sach thanh vien
router.get('/menu_Users',function(req,res){
    connection.query('select * from thanhvien', function (err, rows, fields) {
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

///xoa thanh vien
router.delete('/menu_Users/:id', function(req,res){
	
	var id = req.params.id;
	var sql = "delete from thanhvien where id_tv = '" + id + "'";
	
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

////them thanh vien
router.post('/menu_Users',function(req,res){
	var sql = 'INSERT INTO thanhvien(ma_tv,ho,ten,diachi,sodt,email,gioitinh,ten_dn,matkhau,trangthai,ma_th) values ("'+req.body.ma_tv+'","'+req.body.ho+'","'+req.body.ten+'","'+req.body.diachi+'","'+req.body.sodt+'","'+req.body.email+'","'+req.body.gioitinh+'","'+req.body.ten_dn+'","'+req.body.matkhau+'","'+req.body.trangthai+'","'+req.body.ma_th+'")';
	
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


///sua thanh vien
router.put('/menu_Users/:id', function(req, res){
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