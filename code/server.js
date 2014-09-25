var express = require('express'),
		fs = require('fs'),
		path = require('path'),
		mcapi = require('./node_modules/mailchimp-api/mailchimp'),
		bodyParser = require('body-parser');
		
var app = express();
var mailchimp = new mcapi.Mailchimp('8b4f8984d7258cc1bd38e48050f0c009-us8');

app.use( bodyParser.urlencoded() );

var servePath = path.resolve('./static');
var port = process.env.PORT || 1337;

//serve index.html on the root
app.get('/', function(req,res) {
	res.sendFile(servePath + '/index.html');		
});

//mailing list signup
app.post('/trial-request', function(req, res){
	console.log(req.body);
	
	//only actually do the signup if the bot-catching field hasn't been filled in
	if(!req.body.b_cbc366668e12fea772df67aeb_bf820d2720){
		mailchimp.lists.subscribe({
		id: 'b9144c63ee',
		double_optin: false,
		email: {
			email: req.body.EMAIL
		}
		});
	}
	
	res.redirect('/trial-request-success');
})

//very dirty way to make sure we serve .html files on their route
app.use(function(req, res, next) {
  if (req.path.indexOf('.') === -1) {
    var file = servePath + req.path + '.html';
    fs.exists(file, function(exists) {
      if (exists){
        req.url += '.html';
			}
      next();
    });
  }
  else{
    next();
	}
});

app.use(express.static(servePath));
app.listen(port);
