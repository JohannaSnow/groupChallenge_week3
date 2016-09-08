console.log('The client script is sourced, Dave');

$(document).ready(function(){
console.log('Document ready, Dave');
// var guessOne = 0;
// var guessTwo = 0;
// var guessThree = 0;
// var guessFour = 0;

var guessData = [ guessOne, guessTwo, guessThree, guessFour ];

var gameStartData = //maxNumber

//gameStart
//guess


$('#startButton').on('click', function(){
  console.log('Game Starting, Dave');
  $.ajax({
    type:'POST',
    url:"/gameStart",
    data: gameStartData,
    success: function(data){
      console.log('gameStart call successful');
      $('.container').fadeOut(400, function(){
        $('#playScreen').fadeIn();
      });
      //----do stuff to the DOM, change to game page
    }//end Success
  });//end ajax /submit
});//end gameStart click function

$('#playSubmit').on('click', function(){
  console.log('Sending Guess to server, Dave');
  $.ajax({
    type: 'POST',
    url: '/guess',
    data: guessData,
    success: function(data){
      console.log('guesses - ' + data );
      if (/*someone wins*/) {
        $('.container').fadeOut(400, function(){
          $('#resultScreen').fadeIn();
        });
      }
      //----do stuff to the DOM with data
    }//end Guess
  });//end guess ajax
});//end guess click

$('#playQuit').on('click', function(){
  //do stuff to DOM, change to result page
  $('.container').fadeOut(400, function(){
    $('#resultScreen').fadeIn();
  });
})

$('#resultRestart').on('click', function(){
  //do stuff to DOM, change to start page
  $('.container').fadeOut(400, function(){
    $('#startScreen').fadeIn();
  });
})

});//end document ready
