var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var dateFormat = require('dateformat');
var fs = require("fs");
var multer = require('multer');
var upload = multer({ dest: '/tmp' });

var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'iscdb'
});

connection.connect();
router.use(bodyParser.json());


//lay danh sach khoa hoc
router.get('/lecturers', function (req, res) {
    var sql = 'select u.firstname,u.lastname, u.email,u.phone,u.username,u.gender,l.code_lec,l.degree,l.major,l.image,l.description,l.status_lec from users u, lecturers l, decentralization d where u.user_code = l.user_code and u.user_code = d.user_code and d.access_id = 3 and u.status = 1';
    connection.query(sql, function (err, rows, fields) {
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
router.delete('/lecturers/:id', function (req, res) {

    var id = req.params.id;
    var sql = "delete from lecturers where id_lec = '" + id + "'";

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

//sua khoa hoc
router.put('/lecturers/:id', upload.single("file"), function (req, res) {
    var id = req.params.id;
    var file = __dirname + "../public/images/images_lec/" + req.file.originalname;

    fs.readFile(req.file.path, function (err, data) {
        fs.writeFile(file, data, function (err) {
            if (err) {
                console.error(err);
                response = {
                    message: 'Upload fail !',
                    filename: req.file.originalname
                };
            } else {
                response = {
                    message: 'Upload success !',
                    filename: req.file.originalname
                };
            }

            // ten file duoc tra ve
            res.end(JSON.stringify(response), 'utf-8');
        });
    });
    var sql = "update lecturers set code_lec='" + req.body.code_lec + "', degree='" + req.body.degree + "', major='" + req.body.degree + "', image='" + req.file.originalname + "',description='" + req.body.description + "', status_lec='" + req.body.status_lec + "' where id_lec = '" + id + "'";

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