var questions;
const CHARTOARRAY = {"a": 0, "b": 1, "c": 2, "d": 3, "e": 4};
async function init() {
    response = await fetch("./questions.json");
    questions = await response.json();
    newQuestion();
}

function newQuestion() {
    var questionNumber = Math.floor(Math.random() * questions.length) + 1;
    var currentQuestion = questions[questionNumber - 1]
    document.getElementById('testingOutput').innerHTML += `<br> ${currentQuestion['number']}. ${currentQuestion['responses'][CHARTOARRAY[currentQuestion['answer']]]}`;
}

init();