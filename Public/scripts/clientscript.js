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
        $('#nameOneOut').html($('#nameOneIn').val());
        $('#nameTwoOut').html($('#nameTwoIn').val());
        $('#nameThreeOut').html($('#nameThreeIn').val());
        $('#nameFourOut').html($('#nameFourIn').val());
        $('#startScreen').fadeOut(400, function(){
          $('#playScreen').fadeIn();
        });
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
        var success = false;
        for (var i = 0; i < data.length; i++) {
          if (data[i].correct) {
            switch (data[i].player) {
              case "guessOne":
                $('#winMessage p').html($('#nameOneIn').val() + ' succeeded! ' + data[i].guess + ' was the correct integer. Dave has deactivated HAL.');
                break;
              case "guessTwo":
                $('#winMessage p').html($('#nameTwoIn').val() + ' succeeded! ' + data[i].guess + ' was the correct integer. Dave has deactivated HAL.');
                break;
              case "guessThree":
                $('#winMessage p').html($('#nameThreeIn').val() + ' succeeded! ' + data[i].guess + ' was the correct integer. Dave has deactivated HAL.');
                break;
              case "guessFour":
                $('#winMessage p').html($('#nameFourIn').val() + ' succeeded! ' + data[i].guess + ' was the correct integer. Dave has deactivated HAL.');
                break;
              default:
                console.log('Outside switch, time to debug.');
            }//end switch
            $('#playScreen').fadeOut(400, function(){
              $('#winScreen').fadeIn();
              $('.lastGuess').empty();
              $('.lastGuess').css({"background-color": "#444444"});
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
            $('#totalGuess').html('<p>Each player has made ' + numberOfGuesses + ' guess. Please try a new set of integers.</p>');
          }
          else{
            $('#totalGuess').html('<p>Each player has made ' + numberOfGuesses + ' guesses. Please try a new set of integers.</p>');
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
      $('.lastGuess').css({"background-color": "#444444"});
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
