var questions;
const CHARTOARRAY = {"a": 0, "b": 1, "c": 2, "d": 3};

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
    var questionNumber = Math.floor(Math.random() * questions.length) + 1;
    var currentQuestion = questions[questionNumber - 1];
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

    document.getElementById("answer_a").lastChild.innerHTML = currentQuestion['responses'][CHARTOARRAY['a']];
    document.getElementById("answer_b").lastChild.innerHTML = currentQuestion['responses'][CHARTOARRAY['b']];
    document.getElementById("answer_c").lastChild.innerHTML = currentQuestion['responses'][CHARTOARRAY['c']];
    document.getElementById("answer_d").lastChild.innerHTML = currentQuestion['responses'][CHARTOARRAY['d']];

    document.getElementById("answer_" + currentQuestion['answer']).setAttribute('data-answer', 'data-answer');
}

function fadeOutLoading() {
    var fadeTarget = document.getElementById("loading");
    fadeTarget.style.opacity = 0;
    setTimeout(function(){fadeTarget.style.display = 'none';}, 900);
}

init();