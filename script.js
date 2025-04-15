const quizData = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Lisbon"],
    correct: 2
  },
  {
    question: "Which language is used for web development?",
    options: ["Python", "HTML", "C++", "Java"],
    correct: 1
  },
  {
    question: "What is 5 + 3?",
    options: ["5", "8", "10", "15"],
    correct: 1
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Earth", "Mars", "Jupiter", "Saturn"],
    correct: 1
  },
  {
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
    correct: 3
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["William Wordsworth", "William Shakespeare", "Jane Austen", "Mark Twain"],
    correct: 1
  },
  {
    question: "What is the chemical symbol for water?",
    options: ["O2", "CO2", "H2O", "NaCl"],
    correct: 2
  },
  {
    question: "What year did World War II end?",
    options: ["1942", "1945", "1939", "1950"],
    correct: 1
  },
  {
    question: "Which gas do plants absorb from the atmosphere?",
    options: ["Oxygen", "Carbon Dioxide", "Hydrogen", "Nitrogen"],
    correct: 1
  },
  {
    question: "Who painted the Mona Lisa?",
    options: ["Pablo Picasso", "Vincent van Gogh", "Leonardo da Vinci", "Claude Monet"],
    correct: 2
  },
  {
    question: "Which organ in the human body pumps blood?",
    options: ["Lungs", "Brain", "Liver", "Heart"],
    correct: 3
  },
  {
    question: "Which continent is the Sahara Desert located in?",
    options: ["Asia", "South America", "Africa", "Australia"],
    correct: 2
  },
  {
    question: "What is the freezing point of water in Celsius?",
    options: ["0°C", "32°C", "100°C", "-1°C"],
    correct: 0
  }
];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

shuffle(quizData);

let current = 0;
let score = 0;
let attempted = 0;
let timer = 60;
let startTime = Date.now(); // ✅ This was missing

function loadQuestion() {
  const q = quizData[current];
  document.getElementById("question").innerText = q.question;
  q.options.forEach((opt, i) => {
    document.getElementById("text" + i).innerText = opt;
    document.getElementById("opt" + i).checked = false;
  });

  document.getElementById("progress").innerText = `Attempted: ${attempted} / ${quizData.length}`;
}

function nextQuestion() {
  const answer = document.querySelector('input[name="answer"]:checked');
  if (!answer) {
    alert("Please select an answer.");
    return;
  }

  attempted++;

  if (parseInt(answer.value) === quizData[current].correct) {
    score++;
  }

  current++;

  if (current < quizData.length) {
    loadQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  const timeTaken = Math.floor((Date.now() - startTime) / 1000); // in seconds

  document.querySelector(".quiz-box").innerHTML = `
    <h2>Quiz Completed!</h2>
    <p>Your score: ${score} out of ${quizData.length}</p>
    <p>Questions attempted: ${attempted}</p>
    <p>Time taken: <strong>${timeTaken} seconds</strong></p>
    <button onclick="location.reload()">Restart</button>
  `;
}

function startTimer() {
  const timerEl = document.getElementById("timer");
  const interval = setInterval(() => {
    timer--;
    timerEl.innerText = `Time left: ${timer}s`;

    if (timer <= 0) {
      clearInterval(interval);
      showResult();
    }
  }, 1000);
}

function toggleTheme() {
  document.body.classList.toggle("dark");
  localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
}

function applySavedTheme() {
  const saved = localStorage.getItem("theme");
  if (saved === "dark") {
    document.body.classList.add("dark");
  }
}

applySavedTheme();
loadQuestion();
startTimer();

