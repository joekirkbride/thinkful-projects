$(document).ready(function () {
	$('#gobtn').on('click', function() {
		// cleat the outpu list
		$('ul').empty();
		// get the range of numbers 
		var counter = Number(document.getElementById('num1').value);
		var num1 = counter;
		var num2 = Number(document.getElementById('num2').value);
		var flag = true;


		if (num1 === num2)
			fizzBuzz(counter);
		else {
			while (flag) {
				fizzBuzz(counter);
				// increment or decrement counter
				if (num1 > num2)
					counter--;
				else if (num1 < num2)
					counter++;
				// if counter at end, set flag to false
				if (counter == num2) {
					fizzBuzz(counter);
					flag = false;
				}
			};
		}
	});
});

// test fizzbuzz condition and add to output list
function fizzBuzz(num) {
	var result = "" + num;
	if (num % 15 === 0)
		result += " : fizzbuzz";
	else if (num % 3 === 0)
		result += " : fizz";
	else if (num % 5 === 0)
		result += " : buzz";
	var item = "<li>" + result + "</li>"
	$('ul').append(item);
};