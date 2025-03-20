document.getElementById("quiz-form").addEventListener("submit", function (e) {
    e.preventDefault();
    const formData = new FormData(this);
    const answers = [];

    for (let i = 1; i <= document.querySelectorAll(".question").length; i++) {
        answers.push(formData.get(`question${i}`));
    }

    fetch("/submit_quiz", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ answers }),
    })
        .then((response) => response.json())
        .then((data) => {
            window.location.href = `/result?score=${data.score}&total=${data.total}`;
        });
});