
const questions = [
    {
        question: "What is the purpose of the addEventListener method in JavaScript?",
        answers: [
            {
                text: "To remove an event listener",
                correct: false
            },
            {
                text: "To add styling to an HTML element",
                correct: false
            },
            {
                text: "To add an event handler function to an HTML element",
                correct: true
            },
            {
                text: "To create a new HTML element",
                correct: false
            }
        ]
    },
    {
        question: "Which built-in function is used to sort elements in an array in JavaScript?",
        answers: [
            {
                text: "sort()",
                correct: true
            },
            {
                text: "order()",
                correct: false
            },
            {
                text: "arrange()",
                correct: false
            },
            {
                text: "map()",
                correct: false
            }
        ]
    },
    {
        question: "What does the === operator do in JavaScript?",
        answers: [
            {
                text: "Compares values for equality, without type conversion",
                correct: true
            },
            {
                text: "Assigns a value to a variable",
                correct: false
            },
            {
                text: "Compares values for equality, with type conversion",
                correct: false
            },
            {
                text: "Performs a strict greater than comparison",
                correct: false
            }
        ]
    },
    {
        question: "What is the purpose of the typeof operator in JavaScript?",
        answers: [
            {
                text: "To check if a variable is defined",
                correct: false
            },
            {
                text: "To determine the type of a variable",
                correct: true
            },
            {
                text: "To convert a variable to a string",
                correct: false
            },
            {
                text: "To perform mathematical operations",
                correct: false
            }
        ]
    },
    {
        question: "Which of the following is used to add a comment in JavaScript?",
        answers: [
            {
                text: "// comment",
                correct: true
            },
            {
                text: "/* comment */",
                correct: false
            },
            {
                text: "*comment*",
                correct: false
            },
            {
                text: "# comment #",
                correct: false
            }
        ]
    },
    {
        question: "What is the purpose of the setTimeout function in JavaScript?",
        answers: [
            {
                text: "To delay the execution of a function",
                correct: true
            },
            {
                text: "To set a timer for the entire script",
                correct: false
            },
            {
                text: "To repeat a function at regular intervals",
                correct: false
            },
            {
                text: "To measure the time taken by a function",
                correct: false
            }
        ]
    },
    {
        question: "How do you check if a variable is an array in JavaScript?",
        answers: [
            {
                text: "isArray(variable)",
                correct: true
            },
            {
                text: "typeof variable === 'array'",
                correct: false
            },
            {
                text: "variable instanceof Array",
                correct: false
            },
            {
                text: "Array.check(variable)",
                correct: false
            }
        ]
    },
    {
        question: "What is the purpose of the 'this' keyword in JavaScript?",
        answers: [
            {
                text: "Refers to the current HTML document",
                correct: false
            },
            {
                text: "Refers to the global object",
                correct: false
            },
            {
                text: "Refers to the current object within a method or function",
                correct: true
            },
            {
                text: "Represents a variable in a loop",
                correct: false
            }
        ]
    },
    {
        question: "What does the NaN value represent in JavaScript?",
        answers: [
            {
                text: "Not a Number",
                correct: true
            },
            {
                text: "Null and Notable",
                correct: false
            },
            {
                text: "No Action Needed",
                correct: false
            },
            {
                text: "Negative Absolute Number",
                correct: false
            }
        ]
    },
    {
        question: "How do you stop the propagation of an event in JavaScript?",
        answers: [
            {
                text: "event.stopPropagation()",
                correct: true
            },
            {
                text: "event.preventPropagation()",
                correct: false
            },
            {
                text: "event.haltPropagation()",
                correct: false
            },
            {
                text: "event.stopEvent()",
                correct: false
            }
        ]
    },
]

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next"
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    
    // Update question number and total questions
    document.getElementById("current-question").innerText = questionNo;
    document.getElementById("total-questions").innerText = questions.length;

    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add('btn');
        answerButtons.appendChild(button);

        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    })
}

function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild)
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }

    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    // Update the score immediately
    document.getElementById("current-score").innerText = score;

    // Check if it's the last question
    if (currentQuestionIndex === questions.length - 1) {
        setTimeout(displayScore, 500); // Delay before displaying the score
    } else {
        nextButton.style.display = "block";
    }
}

function displayScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}`
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        displayScore();
    }
}

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
})


startQuiz();