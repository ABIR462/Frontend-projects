let selectedQuestions = [];

// Start quiz
function startQuiz() {
    const subject = document.getElementById("subject").value;
    fetch(`/start-quiz?subject=${subject}`)
        .then(response => response.json())
        .then(data => {
            selectedQuestions = data;
            window.location.href = "quiz.html";
        });
}

// Render quiz questions
function renderQuiz() {
    const questionsDiv = document.getElementById("questions");
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

// Submit quiz
function submitQuiz() {
    const answers = [];
    selectedQuestions.forEach((q, index) => {
        const selectedAnswer = document.querySelector(`input[name="question${index}"]:checked`);
        answers.push(selectedAnswer ? parseInt(selectedAnswer.value) : null);
    });

    fetch("/submit-quiz", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ answers }),
    })
        .then(response => response.json())
        .then(data => {
            localStorage.setItem("quizResult", JSON.stringify(data));
            window.location.href = "result.html";
        });
}

// Display quiz results
function displayResults() {
    const result = JSON.parse(localStorage.getItem("quizResult"));
    document.getElementById("score").textContent = result.score;
    document.getElementById("total").textContent = result.total;
}

// Restart quiz
function restartQuiz() {
    window.location.href = "index.html";
}

// Initialize quiz page
if (window.location.pathname.endsWith("quiz.html")) {
    renderQuiz();
}

// Initialize result page
if (window.location.pathname.endsWith("result.html")) {
    displayResults();
}