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
      }//end for
      for (var i = 0; i < data.length; i++) {
        console.log(data[i].hiLow);
      }
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
