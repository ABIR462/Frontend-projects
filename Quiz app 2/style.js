const questions = [
    {
        prompt: "What is the derivative of sin(x)?",
        options: ["cos(x)", "-cos(x)", "sin(x)", "-sin(x)"],
        correctAnswer: 0,
        subject: "Mathematics"
    },
    {
        prompt: "Which of the following is NOT a programming language?",
        options: ["Python", "HTML", "Java", "C++"],
        correctAnswer: 1,
        subject: "Programming"
    },
    {
        prompt: "What is the chemical formula for water?",
        options: ["H2O", "CO2", "NaCl", "O2"],
        correctAnswer: 0,
        subject: "Science"
    },
    {
        prompt: "Who developed the theory of relativity?",
        options: ["Isaac Newton", "Albert Einstein", "Stephen Hawking", "Niels Bohr"],
        correctAnswer: 1,
        subject: "Science"
    }
];

let selectedQuestions = [];

function startQuiz() {
    const subject = document.getElementById("subject").value;
    if (subject === "all") {
        selectedQuestions = questions;
    } else {
        selectedQuestions = questions.filter(q => q.subject === subject);
    }
    renderQuiz();
}

function renderQuiz() {
    const homepage = document.getElementById("homepage");
    const quizPage = document.getElementById("quiz-page");
    const questionsDiv = document.getElementById("questions");

    homepage.classList.add("hidden");
    quizPage.classList.remove("hidden");

    questionsDiv.innerHTML = selectedQuestions.map((q, index) => `
        <div class="question">
            <p>${q.prompt}</p>
            ${q.options.map((option, i) => `
                <label>
                    <input type="radio" name="question${index}" value="${i}">
                    ${option}
                </label>
            `).join("")}
        </div>
    `).join("");
}

function submitQuiz() {
    const quizPage = document.getElementById("quiz-page");
    const resultPage = document.getElementById("result-page");
    const scoreSpan = document.getElementById("score");
    const totalSpan = document.getElementById("total");

    let score = 0;
    selectedQuestions.forEach((q, index) => {
        const selectedAnswer = document.querySelector(`input[name="question${index}"]:checked`);
        if (selectedAnswer && parseInt(selectedAnswer.value) === q.correctAnswer) {
            score++;
        }
    });

    quizPage.classList.add("hidden");
    resultPage.classList.remove("hidden");

    scoreSpan.textContent = score;
    totalSpan.textContent = selectedQuestions.length;
}

function restartQuiz() {
    const resultPage = document.getElementById("result-page");
    const homepage = document.getElementById("homepage");

    resultPage.classList.add("hidden");
    homepage.classList.remove("hidden");
}