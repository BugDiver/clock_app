var express = require('express');
var app = express();
var Clock =require('./lib/clockLib.js');

var sendCurrentTime = function(req,res){
   res.send(new Clock().currentTime);
}
app.use(express.static('public'));

app.get('/update',sendCurrentTime)
app.listen(process.env.OPENSHIFT_NODEJS_PORT||8080,process.env.OPENSHIFT_NODEJS_IP);
