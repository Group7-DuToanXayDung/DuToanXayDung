var http = require("http");
var fs = require("fs");

fs.readFile('./Login.html',function(err,html){
	console.log(html.toString());
	if(err){
		throw err;
	}
	http.createServer(function(req, res){
	res.writeHead(200, {"Content-Type": "text/html" });
	res.write(html);
	res.end();
	}).listen(8080);
});


