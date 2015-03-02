
var quizApp = angular.module("quizApp", []);
var correctAnswer = 0;
var userAnswer = -1;

quizApp.controller("QuizCtrl", function ($scope, $http) {
	$http.get("questionlist.json").success(function (data) {
		$scope.quiz = data;
		//clog("json loaded successfully");
		DisplayQuestion($scope.quiz.questions[0]);
	}).error(function () {
		alert("failed to load quiz");
		console.log("failed to load quiz");
	});
});
function DisplayQuestion(questionToDisplay) {
	// set the question
	var q = angular.element(document.querySelector('#question'));
	q.empty();
	var newQuestion = '<h3>' + questionToDisplay.question + '</h3>';
	q.append(newQuestion);

	// shuffle questions
	var answers = shuffleAnswers(questionToDisplay.answers);
	// set the answer
	var list = angular.element(document.querySelector('#answers'));
	list.empty();

	var count = 0;
	angular.forEach(answers, function(answer) {
		// var a = '<li><div class="radio"><input type="radio" name="answers" value="'
		// 		+ count + '"/>' + answer.answer	+ '</div></li>';
		var a = '<div class="radio"><input type="radio" name="answers" value="'
			+ count + '"/>' + answer.answer	+ '</div>';
		if (answer.correct === true) {
			correctAnswer = count;
		}
		list.append(a);
		count++;
	});
};

// shuffle answer array
function shuffleAnswers(answers) {
	var count = answers.length, t, i;

	// while elements remain to shuffle
	while (count) {
		i = Math.floor(Math.random() * count);
		count--;

		// swap elements
		t = answers[count];
		answers[count] = answers[i];
		answers[i] = t;
	}

	return answers;
};

// print to console
function clog(msg) {
	console.log(msg);
};