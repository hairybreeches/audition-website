var express = require('express'),
		fs = require('fs');
		path = require('path');
var app = express();

var servePath = path.resolve('./static');
var port = process.env.PORT || 1337;

//serve index.html on the root
app.get('/', function(req,res) {
	res.sendFile(servePath + '/index.html');		
});

//very dirty way to make sure we serve .html files on their route
app.use(function(req, res, next) {
	if (req.path.indexOf('.') === -1) {
		var file = publicdir + req.path + '.html';
    fs.exists(file, function(exists) {
      if (exists){
        req.url += '.html';     
			}
   }    
   next();
});

app.use(express.static(servePath));
app.listen(port);
