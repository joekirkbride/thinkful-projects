
/*******************
*  Joe Kirkbride
*  10-Feb-2015
*  hot-cold game
**********************/
$(document).ready(function(){
	
	var randomNumberToGuess;
	var usrGuess;
	var previousDelta = 0;
	previousDelta = null;
	var guessCount = 0;
	var min = 1;
	var max = 100;
	var isAnsweredCorrect = false;
	var isAttached = false;

	newGame();

	/*--- Display information modal box ---*/
  	$(".what").click(function(){
    	$(".overlay").fadeIn(1000);
  	});

  	/*--- Hide information modal box ---*/
  	$("a.close").click(function(){
  		$(".overlay").fadeOut(1000);
  	});

  	$(".new").click(function(event){
  		event.preventDefault();
  		newGame();
  	});

  	$('#min').bind('input', function() {
  		min = Number(document.getElementById('min').value);
  	});
  	$('#max').bind('input', function() {
  		max = Number(document.getElementById('max').value);
  	});

  	function newGame(){
      previousDelta = null;
  		$("ul#guessList li").remove();
      $('#userGuess').val('');
  		isAnsweredCorrect = false;
  		var countFeedback = setFeedbackText('#count');
  		countFeedback(guessCount=0);
  		randomNumberToGuess = newRandomNumber(min, max);
  		if (!isAttached) {
  			isAttached = true;
	  		$('form').submit(function(event) {
	  			event.preventDefault();
	  			if (!isAnsweredCorrect) {
		  			usrGuess = $('#userGuess').val();
		  			// validate guess
		  			checkGuess();
		  			// save previous guess
		  			countFeedback(++guessCount);
		  			$("ul#guessList").append("<li>" + usrGuess + "</li>");
		  			$('#userGuess').val('');
		  		}
		  		else {
		  			var feedback = setFeedbackText('#feedback');
		  			feedback('Start a new game');
		  		}
  			});
	  	}
  	};

  	function newRandomNumber(min,max){
  		return Math.floor(Math.random()*(max-min+1) + min);
  	};

  	function checkGuess(){
  		var feedback = setFeedbackText('#feedback');
  		if ($.isNumeric(usrGuess)) {
  			if (usrGuess == randomNumberToGuess) {
  				// correct answer, game finished
  				feedback('Awesome, correct answer!');
  				isAnsweredCorrect = true;
  			}
  			else if (isOutOfRange()) {
  				// number is out of range
  				feedback('number is out of range');
  			}
  			else {
  				// check closeness of guess, answer is not correct
  				checkCloseness();
  			}
  		}
  		else {
  			feedback('oops, numbers only please');
  		}
  	};

  	function checkCloseness(){
  		var msg = '';
  		var feedback = setFeedbackText('#feedback');  		
  		var delta = Math.abs(randomNumberToGuess - usrGuess);
  		if (previousDelta != null) {
  			msg = '';
  			var diffGuess = previousDelta - delta;
  			if (diffGuess > 0)
  				msg = '...getting closer';
  			else if (diffGuess < 0)
  				msg = '...going farther';
  		};
  		switch (Math.trunc(delta/10)) {
  			case 0:
  				feedback('burning' + msg);
  				break;
  			case 1:
  			case 2:
  				feedback('spicy' + msg);
  				break;
  			case 3:
  			case 4:
   				feedback('mild' + msg);
  				break; 			
  			case 5:
  			case 6:
   				feedback('cold' + msg);
  				break; 
  			default:
   				feedback('icy' + msg);
  				break;
  		};
  		previousDelta = delta;
  	};

  	function isOutOfRange(){
  		// temporary store min and max value
  		var minValue = max > min ? min : max;
  		var maxValue = max > min ? max : min;

  		if (usrGuess < minValue || usrGuess > maxValue)
  			return true;
  		return false;
  	};

  	function setFeedbackText(id) {
  		return function(msg) {
  			$(id).text(msg);
  		};
  	};
});


