from flask import Flask, render_template, request, jsonify
import random
import json
import os

app = Flask(__name__)


# Load questions from a JSON file
def load_questions():
    with open("questions.json", "r") as file:
        return json.load(file)


# Homepage
@app.route("/")
def home():
    return render_template("index.html")


# Start quiz
@app.route("/start_quiz", methods=["POST"])
def start_quiz():
    subject = request.form.get("subject")
    questions = load_questions()

    if subject == "all":
        selected_questions = questions
    else:
        selected_questions = [q for q in questions if q["subject"].lower() == subject.lower()]

    random.shuffle(selected_questions)
    return render_template("quiz.html", questions=selected_questions)


# Submit quiz and show results
@app.route("/submit_quiz", methods=["POST"])
def submit_quiz():
    user_answers = request.json.get("answers")
    questions = load_questions()
    score = 0

    for i, answer in enumerate(user_answers):
        if answer == questions[i]["correct_answer"]:
            score += 1

    return jsonify({"score": score, "total": len(questions)})


if __name__ == "__main__":
    app.run(debug=True)