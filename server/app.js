var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({extended: false});
var path = require('path');

var randomNum = 0;

app.listen('3001', 'localhost', function(){
  console.log('listening in 3001');
});//end listen

app.get('/', function(req, res){
  console.log('base url hit');
  res.sendFile(path.resolve('Public/index.html'));
});//end get

app.post('/gameStart', urlencodedParser, function(req, res){
  console.log('gameStart hit:', req.body);
  //create and store random number
  randomNum = Math.floor(Math.random() * (req.body.max - 1) + 1);
  res.send();
  console.log(randomNum);
});//end gameStart post

app.post('/guess', urlencodedParser, function(req, res){
  console.log('guess hit:', req.body);
  //check each guess against randomNum, return boolean
  var results = [];
  console.log(req.body);
  for (var guess in req.body) {
    var newIndex = {
      guess: Number(req.body[guess]),
      player: guess
    };
    newIndex.correct = newIndex.guess === randomNum;
    if (!newIndex.correct) {
      if (newIndex.guess > randomNum) {
        newIndex.hiLow = 'high';
      }
      else {
        newIndex.hiLow = 'low';
      }//end inner if/else
    }//end outer if
    results.push(newIndex);
  }//end for
  res.send(results);
  //return something about how close each guess is
});//end guess post

app.use(express.static('Public'));
