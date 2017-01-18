// var http = require("http");
// var fs = require("fs");

// fs.readFile('./Login.html',function(err,html){
	// console.log(html.toString());
	// if(err){
		// throw err;
	// }
	// http.createServer(function(req, res){
	// res.writeHead(200, {"Content-Type": "text/html" });
	// res.write(html);
	// res.end();
	// }).listen(8080);
// });

// require our dependencies
var express        = require('express');
var expressLayouts = require('express-ejs-layouts');
var bodyParser     = require('body-parser');
var app            = express();
var port           = process.env.PORT || 8080;

// use ejs and express layouts
app.set('view engine', 'ejs');
app.use(expressLayouts);

// use body parser
app.use(bodyParser.urlencoded({ extended: true }));

// route our app
var router = require('./app/routes');
app.use('/', router);


// set static files (css and images, etc) location
app.use(express.static(__dirname + '/public'));

// start the server
app.listen(port, function() {
  console.log('app started');
});
