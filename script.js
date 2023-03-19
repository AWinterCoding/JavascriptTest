// Variables and selectors for various elements within the HTML
var count = 60;
var score = 0;

//note this number will always be less than the display for what question you are on.
var questionCounter = 0;

var questions = [
  "Which one of these is NOT the primitive?",
  "How do you send things to the console?",
  "What is the entire HTML page called?",
  "What is the rel of the link element that style.css utilizes",
];

var options = [
  ["object", "string", "number", "null"],
  ["document.log", "console.log", "alert", "query.sendID"],
  ["page", "selector", "document", "var"],
  ["script", "stylesheet", "index.html", "cascading style sheets"],
];
var answers = ["object", "console.log", "document", "stylesheet"];

// query Selector works better for grabbing elements https://stackoverflow.com/questions/70910043/javascript-grabbing-button-inside-div-with-id
// Learned that today ^-^
init();

function init() {
  refresh();
  if (questionCounter < questions.length) {
    const questionPrompt = document.getElementById("#question");
    var potentialAnswers = document.querySelector("#option-list");
    const children = potentialAnswers.querySelectorAll("button");
    const question = document.querySelector("#question");
    console.log(questionCounter);
    populate(children, question);
  } else {
    console.log("Game Ended");
  }
}

function populate(choices, question) {
  questionPopulate(question);
  choicesPopulate(choices);
}

function refresh() {
  document.querySelector("#score").textContent = score;
  document.querySelector("#timer").textContent = count;
}

function questionPopulate(question) {
  question.innerHTML = questions[questionCounter];
}

function choicesPopulate(children) {
  console.log(children);
  for (i = 0; i < children.length; i++) {
    children[i].innerHTML = options[questionCounter][i];
  }
}

//source for more explaination on this https://stackoverflow.com/questions/34896106/attach-event-to-dynamic-elements-in-javascript
document.addEventListener("click", function (event) {
  const target = event.target.closest("button");
  if (target == null) {
  } else {
    console.log("clicked " + target.innerHTML);
    answerCheck(target.innerHTML);
  }
});
function answerCheck(targetHTML) {
  if (targetHTML == answers[questionCounter]) {
    questionCounter++;
    score++;
    init();
  } else {
    console.log("False");
    questionCounter++;
    count = count - 15;
    init();
  }
}
