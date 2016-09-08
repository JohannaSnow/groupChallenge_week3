console.log('The client script is sourced, Dave');

$(document).ready(function(){
console.log('Document ready, Dave');
var guessOne = 0;
var guessTwo = 0;
var guessThree = 0;
var guessFour = 0;

//gameStart
//guess


$('#submit').on('click', function(){
  console.log('Submitting, Dave');
  $.ajax({
    type:'POST',
    url:"/submit",
    data: submitData,
    success: function(data){
      console.log('Data Sumbit' + data);
    }//end Success
  });//end ajax /submit

});//end submit click function





});//end document ready
