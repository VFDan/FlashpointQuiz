var questions, currentQuestion, questionAnswered;
const ARRAYTOCHAR = ["a", "b", "c", "d"];

async function init() {
    var startTime = Date.now();
    response = await fetch("./questions.json");
    questions = await response.json();
    newQuestion();
    if (Date.now() - startTime < 500) {
        setTimeout(fadeOutLoading(), 500); // Timeout so loading doesn't immediately disappear
    } else fadeOutLoading();
}

function newQuestion() {
    questionAnswered = false;
    var questionNumber = Math.floor(Math.random() * questions.length) + 1;
    currentQuestion = questions[questionNumber - 1];
    document.getElementById("question_num").innerHTML = "Question " + questionNumber;
    document.getElementById("question_topic").innerHTML = "Topic: " + currentQuestion['topic'];
    document.getElementById("question_author").innerHTML = "Author: " + currentQuestion['author'];
    document.getElementById("question_text").innerHTML = currentQuestion['questionText'];

    if (currentQuestion['questionImage']) {
        document.getElementById("question_img").src = currentQuestion['questionImage'];
        document.getElementById("question_img").style.display = "block";
    } else {
        document.getElementById("question_img").style.display = "none";
    }

    for(var i = 0; i < ARRAYTOCHAR.length; i++) {
        var elementId = "answer_" + ARRAYTOCHAR[i];
        document.getElementById(elementId).lastElementChild.innerHTML = currentQuestion['responses'][i];
        document.getElementById(elementId).classList = "answer";
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
            document.getElementById("answer_" + answerSubmitted).classList += " incorrect"
        }
        questionAnswered = true;
    }
}