var questions;
async function init() {
    response = await fetch("./questions.json");
    questions = await response.json();
    newQuestion();
}

function newQuestion() {
    var questionNumber = Math.floor(Math.random() * questions.length) + 1;
    document.getElementById('testingOutput').innerHTML += '<br>' + (questions[questionNumber - 1]['responses'][0]);
}

init();