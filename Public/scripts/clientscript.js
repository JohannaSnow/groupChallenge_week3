console.log('The client script is sourced, Dave');

$(document).ready(function(){
console.log('Document ready, Dave');

var numberOfGuesses = 0;



//gameStart
//guess

$('#startButton').on('click', function(){
  console.log('Game Starting, Dave');
  var gameStartData = {max: $('#maxNumSelect option:selected').val()};//maxNumber
  $.ajax({
    type:'POST',
    url:"/gameStart",
    data: gameStartData,
    success: function(data){
      console.log('gameStart call successful');
      $('#startScreen').fadeOut(400, function(){
        $('#playScreen').fadeIn();
      });
      //----do stuff to the DOM, change to game page
    }//end Success
  });//end ajax /submit
});//end gameStart click function



$('#playSubmit').on('click', function(){
  console.log('Sending Guess to server, Dave');
  var guessData = {
    guessOne: $('#pOneIn').val(),
    guessTwo: $('#pTwoIn').val(),
    guessThree: $('#pThreeIn').val(),
    guessFour: $('#pFourIn').val()
  };
  $.ajax({
    type: 'POST',
    url: '/guess',
    data: guessData,
    success: function(data){
      console.log('guesses - ', data );
      numberOfGuesses++;
      for (var i = 0; i < data.length; i++) {
        if (data[i].correct) {
          //---------do stuff to resultScreen
          $('#playScreen').fadeOut(400, function(){
            $('#resultScreen').fadeIn();
          });//end fadeOut
          break;
        }//end if
        else {
          switch (data[i].player) {
            case "guessOne":
              $('#pOneGuess').html('<p>Player 1 guessed: ' + data[i].guess + '</p><p>Their number is too ' + data[i].hiLow + '</p>');
              break;
            case "guessTwo":
              $('#pTwoGuess').html('<p>Player 2 guessed: ' + data[i].guess + '</p><p>Their number is too ' + data[i].hiLow + '</p>');
              break;
            case "guessThree":
              $('#pThreeGuess').html('<p>Player 3 guessed: ' + data[i].guess + '</p><p>Their number is too ' + data[i].hiLow + '</p>');
              break;
            case "guessFour":
              $('#pFourGuess').html('<p>Player 4 guessed: ' + data[i].guess + '</p><p>Their number is too ' + data[i].hiLow + '</p>');
              break;
            default:
              console.log('Outside switch, time to debug.');
          }
        }
      }//end for
      //----do stuff to the DOM with data
    }//end Guess
  });//end guess ajax
});//end guess click

$('#playQuit').on('click', function(){
  //do stuff to DOM, change to result page
  $('.container').fadeOut(400, function(){//-------CHANGE
    $('#resultScreen').fadeIn();
  });
});

$('#resultRestart').on('click', function(){
  //do stuff to DOM, change to start page
  $('.container').fadeOut(400, function(){//---------CHANGE
    $('#startScreen').fadeIn();
  });
});

});//end document ready
