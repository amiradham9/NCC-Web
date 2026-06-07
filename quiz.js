const questions = [
    {
        question: "What is the capital city of France?",
        answers: [
            { text: "London", correct: false },
            { text: "Berlin", correct: false },
            { text: "Paris", correct: true },
            { text: "Rome", correct: false }
        ]
    },
    {
        question: "How many continents are there on Earth?",
        answers: [
            { text: "5", correct: false },
            { text: "6", correct: false },
            { text: "7", correct: true },
            { text: "8", correct: false }
        ]
    },
    {
        question: "Which planet is known as the Red Planet?",
        answers: [
            { text: "Venus", correct: false },
            { text: "Mars", correct: true },
            { text: "Jupiter", correct: false },
            { text: "Saturn", correct: false }
        ]
    },
    {
        question: "What is the largest ocean on Earth?",
        answers: [
            { text: "Atlantic Ocean", correct: false },
            { text: "Indian Ocean", correct: false },
            { text: "Arctic Ocean", correct: false },
            { text: "Pacific Ocean", correct: true }
        ]
    },
    {
        question: "Who painted the Mona Lisa?",
        answers: [
            { text: "Vincent van Gogh", correct: false },
            { text: "Pablo Picasso", correct: false },
            { text: "Leonardo da Vinci", correct: true },
            { text: "Michelangelo", correct: false }
        ]
    },
    {
        question: "What is the smallest country in the world?",
        answers: [
            { text: "Monaco", correct: false },
            { text: "San Marino", correct: false },
            { text: "Maldives", correct: false },
            { text: "Vatican City", correct: true }
        ]
    },
    {
        question: "How many sides does a hexagon have?",
        answers: [
            { text: "5", correct: false },
            { text: "6", correct: true },
            { text: "7", correct: false },
            { text: "8", correct: false }
        ]
    },
    {
        question: "What is the chemical symbol for water?",
        answers: [
            { text: "WA", correct: false },
            { text: "HO", correct: false },
            { text: "H2O", correct: true },
            { text: "OW", correct: false }
        ]
    },
    {
        question: "Which country is the largest in the world by area?",
        answers: [
            { text: "China", correct: false },
            { text: "USA", correct: false },
            { text: "Canada", correct: false },
            { text: "Russia", correct: true }
        ]
    },
    {
        question: "How many days are in a leap year?",
        answers: [
            { text: "365", correct: false },
            { text: "366", correct: true },
            { text: "367", correct: false },
            { text: "364", correct: false }
        ]
    }
];
const questionElement = document.getElementById("question");
const answerButton = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const prevButton = document.getElementById("prev-btn");
const questionCounter = document.getElementById("question-counter");
const timerElement = document.getElementById("timer");
const resultMessage = document.getElementById("result-message");

let currentQuestionIndex = 0;
let score = 0;
let userAnswers = new Array(questions.length).fill(null);
let timerInterval;
let timeRemaining = new Array(questions.length).fill(30);

function startQuiz(){
    clearProgress();
    currentQuestionIndex = 0;
    score = 0;
    userAnswers = new Array(questions.length).fill(null);
    timeRemaining = new Array(questions.length).fill(30);
    nextButton.innerHTML ="Next";
    showQuestion();
}

function showQuestion(){
    resetstate();
    if (currentQuestionIndex > 0) {
        prevButton.style.display = "block";
    } else {
        prevButton.style.display = "none";
    }
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionCounter.innerHTML = "Question " + questionNo + " of " + questions.length;
    questionElement.innerHTML = currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButton.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct; 
        }
        button.addEventListener("click", selectAnswer )
    });
    if (userAnswers[currentQuestionIndex] !== null) {
        clearInterval(timerInterval);
        timerElement.innerHTML = "Answered";
        Array.from(answerButton.children).forEach(function(button) {
            if (button.innerHTML === userAnswers[currentQuestionIndex]) {
                if (button.dataset.correct === "true") {
                    button.classList.add("correct");
                } else {
                    button.classList.add("incorrect");
                }
            }
            if (button.dataset.correct === "true") {
                button.classList.add("correct");
            }
            button.disabled = true;
            button.removeEventListener("click", selectAnswer);
        });
        nextButton.style.display = "block";
    } else if (timeRemaining[currentQuestionIndex] === 0) {
        clearInterval(timerInterval);
        timerElement.innerHTML = "Not Answered";
        Array.from(answerButton.children).forEach(function(button) {
            if (button.dataset.correct === "true") {
                button.classList.add("correct");
            }
            button.disabled = true;
            button.removeEventListener("click", selectAnswer);
        });
        nextButton.style.display = "block";
    }  else {
        startTimer();
    }
}

function startTimer() {
    let timeLeft = timeRemaining[currentQuestionIndex];
    timerElement.innerHTML = "Time: " + timeLeft + "s";
    timerElement.classList.remove("warning");

    if (timeLeft <= 10) {
        timerElement.classList.add("warning");
    }

    timerInterval = setInterval(function() {
        timeLeft--;
        timeRemaining[currentQuestionIndex] = timeLeft;
        timerElement.innerHTML = "Time: " + timeLeft + "s";

        if (timeLeft <= 10) {
            timerElement.classList.add("warning");
        }

        if (timeLeft === 0) {
            clearInterval(timerInterval);
            timeUp();
        }
    }, 1000);
}

function timeUp() {
    timerElement.innerHTML = "Time's Up!";
    timerElement.classList.add("warning");

    Array.from(answerButton.children).forEach(function(button) {
        if (button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
        button.removeEventListener("click", selectAnswer);
    });

    setTimeout(function() {
        saveProgress();
        handleNextButton();
    }, 3000);
}

function resetstate(){
    clearInterval(timerInterval);
    nextButton.style.display = "none";
    while(answerButton.firstChild){
        answerButton.removeChild(answerButton.firstChild)
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const iscorrect = selectedBtn.dataset.correct ==="true";
    if (userAnswers[currentQuestionIndex] === null) {
        userAnswers[currentQuestionIndex] = selectedBtn.innerHTML;
        saveProgress();
    }

    if(iscorrect){
        selectedBtn.classList.add("correct");
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButton.children).forEach(button => {
        if(button.dataset.correct === "true" ){
            button.classList.add("correct")
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function calculateResults() {
    let correct = 0;
    let incorrect = 0;
    let unanswered = 0;

    questions.forEach(function(question, index) {
        if (userAnswers[index] === null) {
            unanswered++;
        } else {
            let selectedAnswer = question.answers.find(function(answer) {
                return answer.text === userAnswers[index];
            });

            if (selectedAnswer && selectedAnswer.correct) {
                correct++;
            } else {
                incorrect++;
            }
        }
    });

    return {
        correct: correct,
        incorrect: incorrect,
        unanswered: unanswered
    };
}

function showScore() {
    resetstate();
    clearProgress();
    prevButton.style.display = "none";

    let results = calculateResults();
    let percentage = Math.round((results.correct / questions.length) * 100);

    questionElement.innerHTML =
        "Total Questions: " + questions.length + "<br>" +
        "Correct Answers: " + results.correct + "<br>" +
        "Incorrect Answers: " + results.incorrect + "<br>" +
        "Unanswered: " + results.unanswered + "<br><br>" +
        "Score: " + results.correct + "/" + questions.length + "<br>" +
        "Percentage: " + percentage + "%";

    resultMessage.innerHTML = getResultMessage(percentage);

    nextButton.innerHTML = "Try Again";
    nextButton.style.display = "block";
};

function handleNextButton(){
    currentQuestionIndex++;
    saveProgress();
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
};

nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length) {
        handleNextButton();
    }else{
        startQuiz();
    }
});

prevButton.addEventListener("click", function() {
    currentQuestionIndex--;
    saveProgress();
    showQuestion();
});

function saveProgress() {
    localStorage.setItem("currentQuestionIndex", currentQuestionIndex);
    localStorage.setItem("userAnswers", JSON.stringify(userAnswers));
}

function loadProgress() {
    let savedIndex = localStorage.getItem("currentQuestionIndex");
    let savedAnswers = localStorage.getItem("userAnswers");

    if (savedIndex !== null && savedAnswers !== null) {
        currentQuestionIndex = parseInt(savedIndex);
        userAnswers = JSON.parse(savedAnswers);
        return true;
    }
    return false;
}

function clearProgress() {
    localStorage.removeItem("currentQuestionIndex");
    localStorage.removeItem("userAnswers");
}

function getResultMessage(percentage) {
    if (percentage <= 40) {
        return "Needs Improvement";
    } else if (percentage <= 70) {
        return "Good Effort";
    } else if (percentage <= 90) {
        return "Great Work";
    } else {
        return "Excellent!";
    }
}

if (loadProgress()) {
    showQuestion();
} else {
    startQuiz();
}