var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});

app.listen('3001', 'localhost', function(){
  console.log('listening in 3001');
});

app.get('/', function(req, res){
  console.log('base url hit');
});

app.post('/gameStart', urlencodedParser, function(req, res){
  console.log('gameStart hit', req.body);
});
