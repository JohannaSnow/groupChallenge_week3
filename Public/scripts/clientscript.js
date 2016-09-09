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
        if (numberOfGuesses === 1) {
          $('#totalGuess').html('<p>Each player has made ' + numberOfGuesses + ' guess</p>');
        }
        else{
          $('#totalGuess').html('<p>Each player has made ' + numberOfGuesses + ' guesses</p>');
        }
        for (var i = 0; i < data.length; i++) {
          if (data[i].correct) {
            //---------do stuff to resultScreen
            $('#playScreen').fadeOut(400, function(){
              $('#winScreen').fadeIn();
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
            }//end switch
          }//end else
        }//end for
      }//end Guess
    });//end guess ajax
  });//end guess click

  $('#playQuit').on('click', function(){
    $('#playScreen').fadeOut(400, function(){
      $('#failScreen').fadeIn();
    });
  });//end playQuit onclick

  $('.resultRestart').on('click', function(){
    $('.resultScreen').fadeOut(400, function(){
      $('#startScreen').fadeIn();
    });
  });//end resultRestart onclick
});//end document ready
