console.log('The client script is sourced, Dave');

$(document).ready(function(){
  console.log('Document ready, Dave');

  var numberOfGuesses = 0;

  $('#startButton').on('click', function(){
    console.log('Game Starting, Dave');
    var gameStartData = {max: $('#maxNumSelect option:selected').val()};//maxNumber
    $('#maxNumText').html(gameStartData.max)
    $.ajax({
      type:'POST',
      url:"/gameStart",
      data: gameStartData,
      success: function(data){
        console.log('gameStart call successful');
        $('#startScreen').fadeOut(400, function(){
          $('#playScreen').fadeIn();
        });
      }//end Success
    });//end ajax /submit
  });//end gameStart click function

  $('#playField').on('keyup', function(){
    $('#halPlayText').html('Dave, stop. Stop, will you? Stop, Dave. <br> Will you stop Dave? Stop, Dave.');
});
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
        var success = false;
        for (var i = 0; i < data.length; i++) {
          if (data[i].correct) {
            switch (data[i].player) {
              case "guessOne":
                $('#winMessage p').html('Player 1 succeeded! ' + data[i].guess + ' was the correct integer. Dave has deactivated HAL.');
                break;
              case "guessTwo":
                $('#winMessage p').html('Player 2 succeeded! ' + data[i].guess + ' was the correct integer. Dave has deactivated HAL.');
                break;
              case "guessThree":
                $('#winMessage p').html('Player 3 succeeded! ' + data[i].guess + ' was the correct integer. Dave has deactivated HAL.');
                break;
              case "guessFour":
                $('#winMessage p').html('Player 4 succeeded! ' + data[i].guess + ' was the correct integer. Dave has deactivated HAL.');
                break;
              default:
                console.log('Outside switch, time to debug.');
            }//end switch
            $('#playScreen').fadeOut(400, function(){
              $('#winScreen').fadeIn();
              $('.lastGuess').empty();
              $('#totalGuess').empty();
              $('.guessIn').val('');
            });//end fadeOut
            success = true;
            break;
          }//end if
        }//end for
        //if no one guessed correctly
        if (!success){
          //update numberOfGuesses display
          if (numberOfGuesses === 1) {
            $('#totalGuess').html('<p>Each player has made ' + numberOfGuesses + ' guess</p>');
          }
          else{
            $('#totalGuess').html('<p>Each player has made ' + numberOfGuesses + ' guesses</p>');
          }
          //update lastGuess displays
          for (var i = 0; i < data.length; i++) {
            switch (data[i].player) {
              case "guessOne":
                $('#pOneGuess').html('<p>Player 1 guessed: ' + data[i].guess + '<br>Their number is too ' + data[i].hiLow + '</p>');
                if(data[i].hiLow == 'low'){
                  $('#pOneGuess').css({"background-color": "#428bca"});
                }
                else {
                  $('#pOneGuess').css({"background-color": "#d9534f"});
                }
                break;
              case "guessTwo":
                $('#pTwoGuess').html('<p>Player 2 guessed: ' + data[i].guess + '<br>Their number is too ' + data[i].hiLow + '</p>');
                if(data[i].hiLow == 'low'){
                  $('#pTwoGuess').css({"background-color": "#428bca"});
                }
                else {
                  $('#pTwoGuess').css({"background-color": "#d9534f"});
                }
                break;
              case "guessThree":
                $('#pThreeGuess').html('<p>Player 3 guessed: ' + data[i].guess + '<br>Their number is too ' + data[i].hiLow + '</p>');
                if(data[i].hiLow == 'low'){
                  $('#pThreeGuess').css({"background-color": "#428bca"});
                }
                else {
                  $('#pThreeGuess').css({"background-color": "#d9534f"});
                }
                break;
              case "guessFour":
                $('#pFourGuess').html('<p>Player 4 guessed: ' + data[i].guess + '<br>Their number is too ' + data[i].hiLow + '</p>');
                if(data[i].hiLow == 'low'){
                  $('#pFourGuess').css({"background-color": "#428bca"});
                }
                else {
                  $('#pFourGuess').css({"background-color": "#d9534f"});
                }
                break;
              default:
                console.log('Outside switch, time to debug.');
            }//end switch
          }//end for
        };//end if no success
      }//end Guess
    });//end guess ajax
  });//end guess click

  $('#playQuit').on('click', function(){
    $('#playScreen').fadeOut(400, function(){
      $('.lastGuess').empty();
      $('#totalGuess').empty();
      $('.guessIn').val('');
      $('#failScreen').fadeIn();
    });
  });//end playQuit onclick

  $('.resultRestart').on('click', function(){
    $('.resultScreen').fadeOut(400, function(){
      $('#startScreen').fadeIn();
    });
  });//end resultRestart onclick
});//end document ready
