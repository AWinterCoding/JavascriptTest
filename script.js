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
  const questionPrompt = document.getElementById("#question");
  var potentialAnswers = document.querySelector("#option-list");
  const children = potentialAnswers.querySelectorAll("button");
  const question = document.querySelector("#question");

  document.querySelector("#score").textContent = score;
  document.querySelector("#timer").textContent = count;
  choicesPopulate(children);
  questionPopulate(question);
}

function questionPopulate(question) {
  question.innerHTML = questions[questionCounter];
  questionCounter++;
}

function choicesPopulate(children) {
  console.log(children);
  for (i = 0; i < children.length; i++) {
    children[i].innerHTML = options[0][i];
    console.log(children[i].innerHTML);
  }
}
