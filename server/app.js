var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
var path = require('path');

var randomNum = 0;

app.listen('3001', 'localhost', function(){
  console.log('listening in 3001');
});

app.get('/', function(req, res){
  console.log('base url hit');
  res.sendFile(path.resolve('Public/index.html'));
});

app.post('/gameStart', urlencodedParser, function(req, res){
  console.log('gameStart hit:', req.body);
  //create and store random number
  randomNum = Math.floor(Math.random() * (req.body.max - 1) + 1);
  res.send();
  console.log(randomNum);
});

//data is an array of numbers

app.post('/guess', urlencodedParser, function(req, res){
  console.log('guess hit:', req.body);
  //check each guess against randomNum, return boolean
  var results = [];
  for (var guess in req.body) {
    results.push(Number(req.body[guess]));
  }
  results = results.map(function(index){
    console.log('in map');
    var newIndex = {
      correct: index === randomNum,
    };
    if (!newIndex.correct) {
      if (index > randomNum) {
        newIndex.hiLow = 'High';
      }
      else {
        newIndex.hiLow = 'Low';
      }
    }
    console.log(newIndex);
    return newIndex
  });//end map
  res.send(results);
  //return something about how close each guess is
});
//res.send booleans

app.use(express.static('Public'));
