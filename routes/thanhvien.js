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
router.get('/menu_Users', function (req, res) {
	connection.query('SELECT u.user_id,u.user_code,u.firstname,u.lastname,u.useraddress,u.password,u.phone,u.status as user_status,u.username,u.gender,u.email from users u', function (err, rows, fields) {
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
router.delete('/menu_Users/:id', function (req, res) {

	var id = req.params.id;
	console.log(id);

	var sql1 = "delete from decentralization where user_code in (select user_code from users where user_id = '" + id + "')";
	connection.query(sql1, function (err, rows, fields) {
		if (err) {
			connection.end();
			throw err;
		}
		else {
			res.json(rows);
		}
	});

	var sql = "delete from users where user_id = '" + id + "'";
	connection.query(sql, function (err, rows, fields) {
		if (err) {
			connection.end();
			throw err;
		}
	});

});

////them thanh vien
router.post('/menu_Users', function (req, res) {
	var user_code = req.body.thanhvien.user_code;
	var thanhvien = req.body.thanhvien;
	if (req.body.univer_code == null) {
		var sql = 'insert into users(user_code,firstname,lastname,phone,email,gender,useraddress,username,password,status) VALUES("' + thanhvien.user_code + '","' + thanhvien.firstname + '","' + thanhvien.lastname + '","' + thanhvien.phone + '","' + thanhvien.email + '","' + thanhvien.gender + '","' + thanhvien.useraddress + '","' + thanhvien.username + '","' + thanhvien.password + '",1)';
	}
	if (req.body.univer_code != null) {
		var sql = 'insert into users(user_code,firstname,lastname,phone,email,gender,useraddress,username,password,status,univer_code) VALUES("' + thanhvien.user_code + '","' + thanhvien.firstname + '","' + thanhvien.lastname + '","' + thanhvien.phone + '","' + thanhvien.email + '","' + thanhvien.gender + '","' + thanhvien.useraddress + '","' + thanhvien.username + '","' + thanhvien.password + '",1,"' + thanhvien.univer_code + '")';
	}
	connection.query(sql, function (err, rows, fields) {
		if (err) {
			connection.end();
			throw err;
		}
		else {
			res.json(rows);
		}
	});
	for (var i = 0; i < req.body.roles.length; i++) {
		var access_id = req.body.roles[i];
		var sql_pq = 'insert into decentralization(user_code,access_id,status) values("' + user_code + '","' + access_id + '",1)';
		connection.query(sql_pq, function (err) {
			if (err)
				throw err;
		});
	}

});


///sua thanh vien
router.put('/menu_Users/:id', function (req, res) {
	var id = req.params.id;
	var sql = "update thanhvien set ma_tv='" + req.body.ma_tv + "', ho='" + req.body.ho + "', gioitinh='" + req.body.gioitinh + "', ten_dn='" + req.body.ten_dn + "', matkhau='" + req.body.matkhau + "', sodt='" + req.body.sodt + "',ten='" + req.body.ten + "', diachi='" + req.body.diachi + "', email='" + req.body.email + "', trangthai='" + req.body.trangthai + "' where id_th = '" + id + "'";

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