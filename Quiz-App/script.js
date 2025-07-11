let questions = [];
fetch("./questionList.json")
  .then((response) => response.json())
  .then((data) => {
    questions = data;
  })
  .catch((error) => console.log("error : ", error));

//start button
const startBtn = document.getElementById("start-btn");
const questionContainer = document.getElementById("question-container");
const nextBtn = document.getElementById("next-btn");
const questionElement = document.getElementById("questions");
const answerElements = document.getElementById("answer-buttons");

let shuffleQuestions = undefined,
  currentQuestionIndex = 0;

startBtn.addEventListener("click", startGame);
nextBtn.addEventListener("click", () => {
  currentQuestionIndex++;
  nextQuestion();
});

function startGame() {
  //when clicked on start
  console.log("started");
  startBtn.classList.add("hide");
  //returns a random -0.5 ad 0.5 and then depending on negative or
  // positive it will sort two elements.
  shuffleQuestions = questions.sort(() => Math.random() - 0.5);
  currentQuestionIndex = 0;
  questionContainer.classList.remove("hide");
  nextQuestion();
  // nextBtn.classList.remove("hide");
}

function nextQuestion() {
  //when clicked on next;
  resetState();
  showQuestion(shuffleQuestions[currentQuestionIndex]);
}

function showQuestion(question) {
  console.log(question);
  questionElement.innerText = question["question"];
  //   console.log(question);
  question.answer.forEach((ans) => {
    const button = document.createElement("button");
    // console.log(ans);
    button.innerText = ans.text;
    button.classList.add("btn");
    if (ans["correct"]) {
      button.dataset.correct = ans.correct;
    }
    button.addEventListener("click", selectAnswer);
    answerElements.append(button);
  });
}

function resetState() {
  clearStatusClass(document.body); //just removing classes list like correct or wrong.
  nextBtn.classList.add("hide");
  while (answerElements.firstChild) {
    answerElements.removeChild(answerElements.firstChild);
  }
}

function selectAnswer(e) {
  console.log(e);
  const selectButton = e.target;
  const correct = selectButton.dataset.correct; //only comes true/null
  setStatusClass(document.body, correct);
  Array.from(answerElements.children).forEach((button) => {
    setStatusClass(button, button.dataset.correct); //for each btn check whethere its dataset had true or not
  });
  if (shuffleQuestions.length > currentQuestionIndex + 1) {
    nextBtn.classList.remove("hide");
  } else {
    startBtn.innerText = "Restart";
    startBtn.classList.remove("hide");
  }
  //when answer gets selected.
}

function setStatusClass(element, correct) {
  clearStatusClass(element);
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

function clearStatusClass(element) {
  element.classList.remove("correct");
  element.classList.remove("wrong");
}
