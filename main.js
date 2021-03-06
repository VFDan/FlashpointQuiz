var questions, currentQuestion, questionAnswered;
var previousQuestion = -1;
var correct = 0;
const ARRAYTOCHAR = ["a", "b", "c", "d"];

async function init() {
    var startTime = Date.now();
    do {
        response = await fetch("./questions.json");
        questions = await response.json();
    } while (questions == undefined);
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('question')) {
        var questionFromUrl = urlParams.get('question');
        if (questionFromUrl > questions.length) {
            console.log("Question is out of range.")
            newQuestion();
        } else newQuestion(questionFromUrl);
    } else newQuestion();
    var longestStreak = localStorage.getItem('longestStreak') || 0;
    document.getElementById('longest_streak').innerHTML = "Longest Streak: " + longestStreak;
    if (Date.now() - startTime < 500) {
        setTimeout(fadeOutLoading(), 500); // Timeout so loading doesn't immediately disappear
    } else fadeOutLoading();
}

function newQuestion(fromURL = null) {
    questionAnswered = false;

    var questionNumber = 0;
    if (!fromURL) {
        do {
            questionNumber = Math.floor(Math.random() * questions.length) + 1;
        } while (questionNumber == previousQuestion); // Don't get the same question twice in a row
    } else {
        questionNumber = fromURL;
    }
    previousQuestion = questionNumber;

    currentQuestion = questions[questionNumber - 1];
    document.getElementById("question_num").innerHTML = "Question " + questionNumber;
    document.getElementById("question_topic").innerHTML = "Topic: " + currentQuestion['topic'];
    document.getElementById("question_author").innerHTML = "Author: " + currentQuestion['author'];
    document.getElementById("question_text").innerHTML = currentQuestion['questionText'];
    document.getElementById("question_img").src = ''; //While image loads, show alt text

    if (currentQuestion['questionImage']) {
        document.getElementById("question_img").src = currentQuestion['questionImage'];
        document.getElementById("question_img").style.display = "block";
    } else {
        document.getElementById("question_img").style.display = "none";
    }

    for(var i = 0; i < ARRAYTOCHAR.length; i++) {
        var elementId = "answer_" + ARRAYTOCHAR[i];
        document.getElementById(elementId).lastElementChild.innerHTML = currentQuestion['responses'][i];
        document.getElementById(elementId).classList = "answer button";
    }
}

function fadeOutLoading() {
    var fadeTarget = document.getElementById("loading");
    fadeTarget.style.opacity = 0;
    setTimeout(function(){fadeTarget.style.display = 'none';}, 900);
}

init();

function submitAnswer(answerSubmitted) {
    var correctAnswer = currentQuestion['answer'];
    if (!questionAnswered) {

        document.getElementById("answer_" + correctAnswer).classList += " correct"
        if (answerSubmitted != correctAnswer) {
            document.getElementById("answer_" + answerSubmitted).classList += " incorrect";
            try {
                var longestStreak = localStorage.getItem('longestStreak') || 0;
                if (correct > longestStreak) {
                    localStorage.setItem('longestStreak', correct);
                    document.getElementById("longest_streak").innerHTML = "Longest Streak: " + correct;
                }
            } catch (e) {
                if (e instanceof DOMException) alert("Longest streak does not work due to lack of LocalStorage permissions.");
            }
            correct = 0;
        } else { correct++; }
        document.getElementById("current_streak").innerHTML = "Current Streak: " + correct;
        questionAnswered = true;
    }
}

function copyQuestionLink() {
    var linkToQuestion = location.protocol + '//' + location.host + location.pathname + "?question=" + currentQuestion['number'];
    navigator.clipboard.writeText(linkToQuestion).then(function() {console.log("Successfully copied")}, function(err) {alert("Copying text to clipboard failed."); console.error('Async: Could not copy text: ', err);});
}

document.body.addEventListener("keydown", function (e) {
    if (e.code === "Enter") {  //checks whether the pressed key is "Enter"
        newQuestion();
    } else if (e.code === "KeyA") {
        document.getElementById("answer_a").classList.add('active_answer');
        document.getElementById("answer_a").click();
        setTimeout(function() {document.getElementById("answer_a").classList.remove('active_answer')}, 100);
    } else if (e.code === "KeyB") {
        document.getElementById("answer_b").classList.add('active_answer');
        document.getElementById("answer_b").click();
        setTimeout(function() {document.getElementById("answer_b").classList.remove('active_answer')}, 100);
    } else if (e.code === "KeyC") {
        document.getElementById("answer_c").classList.add('active_answer');
        document.getElementById("answer_c").click();
        setTimeout(function() {document.getElementById("answer_c").classList.remove('active_answer')}, 100);
    } else if (e.code === "KeyD") {
        document.getElementById("answer_d").classList.add('active_answer');
        document.getElementById("answer_d").click();
        setTimeout(function() {document.getElementById("answer_d").classList.remove('active_answer')}, 100);
    }
});