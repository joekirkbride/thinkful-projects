
var quizApp = angular.module("quizApp", []);
var correctAnswer = 0;
var userAnswer = -1;
var currentQuestion = 0;
var userScores = new Array();

quizApp.controller("QuizCtrl", function ($scope, $http) {
	$http.get("questionlist.json").success(function (data) {
		$scope.userChoice = -1;
		$scope.quiz = data;
		$scope.quiz.questions = shuffleArray($scope.quiz.questions);
		displayQuestion($scope.quiz.questions[currentQuestion]);
	}).error(function () {
		alert("failed to load quiz");
		console.log("failed to load quiz");
	});
	$scope.getUserAnswer = function() {
		//clog($scope.userChoice);
		var delta = parseInt($scope.userChoice) - parseInt(correctAnswer);
		userScores[currentQuestion-1] = (delta==0)? 1 : 0;
		//clog("curr question : "+currentQuestion+" correct : "+correctAnswer+" user choice : "+$scope.userChoice);
		if (currentQuestion < $scope.quiz.questions.length) {
			displayQuestion($scope.quiz.questions[currentQuestion]);
		}
		else
		{
			// end of game
			$scope.usertotal = 0;
			angular.forEach(userScores, function(score) {
				$scope.usertotal += parseInt(score);
			});
			$scope.maxtotal = currentQuestion;
			changeElementAttribute('#question', 'display', 'none');
			changeElementAttribute('#answers', 'display', 'none');
			changeElementAttribute('#scoreTitle', 'display', 'block');
			changeElementAttribute('#results', 'display', 'block');
		}
		//clog(userScores);
		$scope.userChoice = -1;
	};
	$scope.Reset = NewGame;
});

function NewGame () {

	//alert("reset game");
};
// change attribute value
function changeElementAttribute(elemID, attrName, attrVal) {
	var elem = angular.element(document.querySelector(elemID));
	elem.css(attrName,attrVal);
};
// display question and answers in the markup
function displayQuestion(questionToDisplay) {
	// set the question
	var q = angular.element(document.querySelector('#question'));
	q.empty();
	var newQuestion = '<h3>' + questionToDisplay.question + '</h3>';
	q.append(newQuestion);

	// shuffle questions
	var answers = shuffleArray(questionToDisplay.answers);
	// get and empty the answers element on the DOM
	// var list = angular.element(document.querySelector('#answers'));
	// list.empty();

	var count = 0;
	// add each answer to markup
	angular.forEach(answers, function(answer) {
		var elementID = "#a" + count;
		var divAnswer = angular.element(document.querySelector(elementID));
		divAnswer.empty();
		divAnswer.append(answer.answer);
		// var a = '<div class="radio"><input type="radio" ng-model="userChoice" name="answers" value="'
		// 	+ count + '"/>' + answer.answer	+ '</div>';
		if (answer.correct === true) {
			correctAnswer = count;
		}
		//list.append(a);
		count++;
	});
	currentQuestion++;
};

// shuffle an array
function shuffleArray(array) {
	var count = array.length, t, i;
	// while elements remain to shuffle
	while (count) {
		i = Math.floor(Math.random() * count);
		count--;
		// swap elements
		t = array[count];
		array[count] = array[i];
		array[i] = t;
	}
	return array;
};

// print to console
function clog(msg) {
	console.log(msg);
};