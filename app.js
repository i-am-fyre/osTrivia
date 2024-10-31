// Sample questions for visualization
const questions = [
    {
      id: 1,
      question: "What is the capital of France?",
      options: ["Berlin", "Madrid", "Paris", "Rome"],
      answer: "Paris"
    },
    {
      id: 2,
      question: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      answer: "4"
    },
    {
      id: 3,
      question: "Which planet is known as the Red Planet?",
      options: ["Earth", "Mars", "Jupiter", "Saturn"],
      answer: "Mars"
    },
    {
      id: 4,
      question: "What is the largest mammal in the world?",
      options: ["Elephant", "Blue Whale", "Great White Shark", "Giraffe"],
      answer: "Blue Whale"
    },
    {
      id: 5,
      question: "Which element has the chemical symbol 'O'?",
      options: ["Gold", "Oxygen", "Silver", "Hydrogen"],
      answer: "Oxygen"
    },
    {
      id: 6,
      question: "What is the smallest prime number?",
      options: ["0", "1", "2", "3"],
      answer: "2"
    },
    {
      id: 7,
      question: "Who wrote 'Romeo and Juliet'?",
      options: ["Charles Dickens", "William Shakespeare", "Mark Twain", "Jane Austen"],
      answer: "William Shakespeare"
    },
    {
      id: 8,
      question: "What is the main ingredient in guacamole?",
      options: ["Tomato", "Avocado", "Onion", "Pepper"],
      answer: "Avocado"
    },
    {
      id: 9,
      question: "Which gas do plants absorb from the atmosphere?",
      options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
      answer: "Carbon Dioxide"
    },
    {
      id: 10,
      question: "What is the currency of Japan?",
      options: ["Yen", "Won", "Dollar", "Ruble"],
      answer: "Yen"
    }
  ];
  
let currentQuestionIndex = 0;
let timerDuration = 10;  // Seconds
let timer;
const fullDashOffset = 314;  // Circumference of the timer circle
const interval = 1000;  // Update every second

function displayQuestion() {
  const questionElement = document.getElementById("question");
  const optionsContainer = document.getElementById("options");
  const currentQuestion = questions[currentQuestionIndex];

  questionElement.textContent = currentQuestion.question;
  optionsContainer.innerHTML = "";  // Clear previous options

  currentQuestion.options.forEach(option => {
    const optionElement = document.createElement("div");
    optionElement.classList.add("option");
    optionElement.textContent = option;
    optionsContainer.appendChild(optionElement);
  });

  // Display the question ID
  const questionIdElement = document.getElementById("question-id");
  questionIdElement.textContent = `ID: ${currentQuestion.id}`;  // Update ID display

  startTimer();
}

function startTimer() {
  let timeLeft = timerDuration;
  const circle = document.querySelector(".timer-circle circle");
  const timerText = document.getElementById("timer-text");

  circle.style.strokeDashoffset = 0;  // Reset timer circle fill
  timerText.textContent = timeLeft;   // Initialize countdown number

  timer = setInterval(() => {
    timeLeft--;
    timerText.textContent = timeLeft; // Update countdown text
    const offset = (fullDashOffset * timeLeft) / timerDuration;
    circle.style.strokeDashoffset = fullDashOffset - offset;

    // Apply pulse effect for the last 3 seconds
    if (timeLeft <= 3) {
      timerText.classList.add("pulse");
    } else {
      timerText.classList.remove("pulse");
    }

    if (timeLeft <= 0) {
      clearInterval(timer);
      showCorrectAnswer();
    }
  }, interval);
}

function showCorrectAnswer() {
  const currentQuestion = questions[currentQuestionIndex];
  const options = document.querySelectorAll(".option");

  options.forEach(option => {
    if (option.textContent === currentQuestion.answer) {
      option.classList.add("correct");
    }
  });

  setTimeout(nextQuestion, 8000);  // Wait 8 seconds before next question
}

function nextQuestion() {
  currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;
  displayQuestion();
}

// Initialize the first question
displayQuestion();


window['__onGCastApiAvailable'] = function(isAvailable) {
  if (isAvailable) {
    initializeCast();
  }
};

function initializeCast() {
  const castContext = cast.framework.CastContext.getInstance();
  castContext.setOptions({
    receiverApplicationId: chrome.cast.media.DEFAULT_MEDIA_RECEIVER_APP_ID,
    autoJoinPolicy: chrome.cast.AutoJoinPolicy.ORIGIN_SCOPED
  });

  const castButton = document.getElementById("cast-button");
  castButton.addEventListener("click", () => {
    castContext.requestSession().then(
      () => console.log("Cast session started"),
      (error) => console.error("Error starting cast session:", error)
    );
  });
}
  