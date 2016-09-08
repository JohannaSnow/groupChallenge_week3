var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});

var randomNum = 0;

app.listen('3001', 'localhost', function(){
  console.log('listening in 3001');
});

app.get('/', function(req, res){
  console.log('base url hit');
});

app.post('/gameStart', urlencodedParser, function(req, res){
  console.log('gameStart hit:', req.body);
  //create and store random number
  randomNum = Math.floor(Math.random() * (req.body.PROPERTYNAME - 1) + 1);
});

//data is an array of numbers

app.post('/guess', urlencodedParser, function(req, res){
  console.log('guess hit:', req.body);
  //check each guess against randomNum, return boolean
  var results = req.body.PROPNAME.map(function(index){
    return index === randomNum;
  });//end map
  res.send(results);
  //return something about how close each guess is
});
//res.send booleans
