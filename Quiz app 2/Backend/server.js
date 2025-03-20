const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const port = 3000;

// Load questions from a JSON file
const questions = JSON.parse(fs.readFileSync(path.join(__dirname, "questions.json")));

// Serve static files from the frontend folder
app.use(express.static(path.join(__dirname, "../frontend")));

// Homepage route
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// Start quiz route
app.get("/start-quiz", (req, res) => {
    const subject = req.query.subject;
    let selectedQuestions;

    if (subject === "all") {
        selectedQuestions = questions;
    } else {
        selectedQuestions = questions.filter(q => q.subject === subject);
    }

    res.json(selectedQuestions);
});

// Submit quiz route
app.post("/submit-quiz", express.json(), (req, res) => {
    const userAnswers = req.body.answers;
    let score = 0;

    userAnswers.forEach((answer, index) => {
        if (answer === questions[index].correctAnswer) {
            score++;
        }
    });

    res.json({ score, total: questions.length });
});

// Start the server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});