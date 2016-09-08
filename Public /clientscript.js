console.log('The client script is sourced, Dave');

$(document).ready(function(){
console.log('Document ready, Dave');
// var guessOne = 0;
// var guessTwo = 0;
// var guessThree = 0;
// var guessFour = 0;

var guessData = [ guessOne, guessTwo, guessThree, guessFour ];


//gameStart
//guess


$('#gameStart').on('click', function(){
  console.log('Game Starting, Dave');
  $.ajax({
    type:'POST',
    url:"/gameStart",
    data: gameStartData,
    success: function(data){
      console.log('gameStart - ' + data);
    }//end Success
  });//end ajax /submit

  $('#guess').on('click', function(){
    console.log('Sending Guess to server, Dave');
    $.ajax({
      type: 'POST',
      url: '/guess',
      data: guessData,
      success: function(data){
        console.log('guesses - ' + data );
      }//end Guess
    });//end guess ajax
  });//end guess click

});//end submit click function
});//end document ready
