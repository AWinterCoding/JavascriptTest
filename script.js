// Variables and selectors for various elements within the HTML
var count = 75;
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

//keys for high scores
var keys = [];

// query Selector works better for grabbing elements https://stackoverflow.com/questions/70910043/javascript-grabbing-button-inside-div-with-id
// Learned that today ^-^
var timer = setInterval(counter, 1000);

document
  .querySelector("#startbutton")
  .addEventListener("click", function (event) {
    event.preventDefault();
    reset();
    document.querySelector("#test").style.display = "inline";
    document.querySelector("#start").style.display = "none";
    document.querySelector("#highscorelist").style.display = "inline";
    quizRun();
  });

//resets the game
function reset() {
  questionCounter = 0;
  count = 75;
  score = 0;
}

//starts the game
function quizRun() {
  refresh();
  var potentialAnswers = document.querySelector("#option-list");
  const children = potentialAnswers.querySelectorAll("button");
  const question = document.querySelector("#question");
  if (questionCounter < questions.length) {
    console.log(questionCounter);
    populate(children, question);
  } else {
    quizEnd();
  }
}

//this calls both the question populate and choices populate functions to stop repeating
function populate(choices, question) {
  questionPopulate(question);
  choicesPopulate(choices);
}

//updates both the score and the timer with penalties
function refresh() {
  document.querySelector("#score").textContent = "Score: " + score;
  document.querySelector("#timer").textContent = "Timer: " + count;
}

//populates the leading question
function questionPopulate(question) {
  question.innerHTML = questions[questionCounter];
}

//populates all choices
function choicesPopulate(children) {
  for (i = 0; i < children.length; i++) {
    children[i].innerHTML = options[questionCounter][i];
  }
}

//source for more explaination on this https://stackoverflow.com/questions/34896106/attach-event-to-dynamic-elements-in-javascript

//universal button clicker function/assignment to avoid the start button
var buttons = document.querySelectorAll("button");
for (i = 0; i < buttons.length; i++) {
  if (buttons[i].className == "button") {
    buttons[i].addEventListener("click", function (event) {
      event.preventDefault();
      const target = event.target.closest("button");
      if (target == null) {
      } else {
        answerCheck(target.innerHTML);
      }
    });
  } else {
  }
}

//answer checker for each answer
function answerCheck(targetHTML) {
  if (targetHTML == answers[questionCounter]) {
    questionCounter++;
    score = score + 15;
    quizRun();
  } else {
    questionCounter++;
    if (count > 15) {
      count = count - 10;
    } else {
      count = 0;
    }
    quizRun();
  }
}

//timer function
function counter() {
  if (count > 0) {
    count--;
    document.querySelector("#timer").textContent = "Timer: " + count;
  } else {
    quizEnd();
  }
}

//end of Quiz
function quizEnd() {
  clearInterval(timer);
  document.querySelector("#test").style.display = "none";
  document.querySelector("#start").style.display = "none";
  document.querySelector("#end").style.display = "inline";
  document.querySelector("#highscore").innerHTML = score;
}

//submit Button
document
  .querySelector("#submit-button")
  .addEventListener("click", function (event) {
    event.preventDefault();
    localStorage.setItem(document.querySelector("#initials").value, score);
    keys.push(document.querySelector("#initials").value);
    document.querySelector("#end").style.display = "none";
    document.querySelector("#scoreboard-section").style.display = "block";
    document.querySelector("#highscorelist").style.display = "none";
    populateScores();
  });

//back Button
document
  .querySelector("#back-button")
  .addEventListener("click", function (event) {
    event.preventDefault();
    document.querySelector("#end").style.display = "none";
    document.querySelector("#start").style.display = "inline";
    document.querySelector("#highscorelist").style.display = "inline";
  });

//populate all the current high scores
function populateScores() {
  for (i = 0; i < keys.length; i++) {
    var scores = document.querySelector("#scoreboard-list");
    var listItem = document.createElement("li");
    console.log(localStorage.getItem(keys[i]));
    listItem.textContent = keys[i] + "   " + localStorage.getItem(keys[i]);
    listItem.style.display = "inline";
    scores.appendChild(listItem);
    console.log(scores);
  }
}

//handler for the clear button and clear functionality
//source goes to https://stackoverflow.com/questions/14039374/clear-dynamically-created-ul
document.querySelector("#clear").addEventListener("click", function (event) {
  keys = [];
  localStorage.clear();
  ul = document.querySelector("#scoreboard-list");

  ul.replaceChildren();
  populateScores();
});

//handler for the scoreboard back button to navigate away from the scoreboards

document
  .querySelector("#main-return")
  .addEventListener("click", function (event) {
    event.preventDefault();
    document.querySelector("#scoreboard-section").style.display = "none";
    document.querySelector("#start").style.display = "block";
    document.querySelector("#highscorelist").style.display = "inline";
    document.querySelector("#scoreboard-list").style.display = "none";
  });

//button to navigate to the scoreboard
document
  .querySelector("#highscorelist")
  .addEventListener("click", function (event) {
    event.preventDefault();
    document.querySelector("#scoreboard-section").style.display = "block";
    document.querySelector("#start").style.display = "none";
    document.querySelector("#test").style.display = "none";
    document.querySelector("#end").style.display = "none";
    document.querySelector("#highscorelist").style.display = "none";
    document.querySelector("#scoreboard-list").style.display = "block";
    reset();
  });
