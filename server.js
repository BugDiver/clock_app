var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var Clock =require('./lib/clockLib.js');


var sendCurrentTime = function(req,res){
	var offset = req.query.offset;
   res.send(new Clock(+offset).currentTime);
};
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'));

app.get('/update',sendCurrentTime)
app.listen(process.env.OPENSHIFT_NODEJS_PORT||8080,process.env.OPENSHIFT_NODEJS_IP);
