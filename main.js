var questions;
const CHARTOARRAY = {"a": 0, "b": 1, "c": 2, "d": 3, "e": 4};
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
    var currentQuestion = questions[questionNumber - 1]
    document.getElementById('testingOutput').innerHTML += `<br> ${currentQuestion['number']}. ${currentQuestion['responses'][CHARTOARRAY[currentQuestion['answer']]]}`;
}

function fadeOutLoading() {
    var fadeTarget = document.getElementById("loading");
    fadeTarget.style.opacity = 0;
    setTimeout(function(){fadeTarget.style.display = 'none';}, 900);
}

init();