// Variables and selectors for various elements within the HTML
var count = 60;
var score = 0;

//note this number will always be less than the display for what question you are on.
var questionCounter = 0;

//potential questions, add more if needed
var questions = [
  "Which one of these is NOT the primitive?",
  "How do you send things to the console?",
  "What is the entire HTML page called?",
  "What is the rel of the link element that style.css utilizes",
];

//all of these options will be displayed in the buttons. Don't include more than 4 selections per array
var options = [
  ["object", "string", "number", "null"],
  ["document.log", "console.log", "alert", "query.sendID"],
  ["page", "selector", "document", "var"],
  ["script", "stylesheet", "index.html", "cascading style sheets"],
];

//all answers to questions
var answers = ["object", "console.log", "document", "stylesheet"];

// query Selector works better for grabbing elements https://stackoverflow.com/questions/70910043/javascript-grabbing-button-inside-div-with-id
// Learned that today ^-^
init();
var timer = setInterval(counter, 1000);

//TODO initialize function, however I will be moving this to a "start game" since we shouldn't be reinitializing
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

//this calls both the question populate and choices populate functions to stop repeating
function populate(choices, question) {
  questionPopulate(question);
  choicesPopulate(choices);
}

//updates both the score and the timer with penalties
function refresh() {
  document.querySelector("#score").textContent = score;
  document.querySelector("#timer").textContent = count;
}

//populates the leading question
function questionPopulate(question) {
  question.innerHTML = questions[questionCounter];
}

//populates all choices
function choicesPopulate(children) {
  console.log(children);
  for (i = 0; i < children.length; i++) {
    children[i].innerHTML = options[questionCounter][i];
  }
}

//source for more explaination on this https://stackoverflow.com/questions/34896106/attach-event-to-dynamic-elements-in-javascript

//universal button clicker function
document.addEventListener("click", function (event) {
  const target = event.target.closest("button");
  if (target == null) {
  } else {
    console.log("clicked " + target.innerHTML);
    answerCheck(target.innerHTML);
  }
});

//answer checker for each answer
function answerCheck(targetHTML) {
  if (targetHTML == answers[questionCounter]) {
    questionCounter++;
    score++;
    init();
  } else {
    questionCounter++;
    if (count > 15) {
      count = count - 15;
    } else {
      count = 0;
    }
    init();
  }
}
function counter() {
  if (count > 0) {
    count--;
    document.querySelector("#timer").textContent = count;
  } else {
    console.log("Game Ended");
    clearInterval(timer);
  }
}
