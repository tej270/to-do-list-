const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const statsText = document.getElementById("statsText");
const successMsg = document.getElementById("successMsg");
const greeting = document.getElementById("greeting");
const header = document.getElementById("userHeader");
const calendar = document.getElementById("calendar");


let userName = localStorage.getItem("userName");
if (!userName) {
  userName = prompt("Enter your name:");
  localStorage.setItem("userName", userName);
}
header.textContent = `${userName}'s To-Do List`;
setGreeting(userName);

// Toggle dark mode



// Add Task
addBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (!taskText) return;

  const li = document.createElement("li");
  li.textContent = taskText;
  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    updateStats();
  });
  taskList.appendChild(li);
  taskInput.value = "";
  updateStats();
});

function updateStats() {
  const tasks = document.querySelectorAll("#taskList li");
  const completed = document.querySelectorAll("#taskList li.completed").length;
  const total = tasks.length;
  // Progress Bar
const progress = total > 0 ? (completed / total) * 100 : 0;
document.getElementById("progressBar").style.width = progress + "%";


  statsText.textContent = `✅ Completed: ${completed} / Total: ${total}`;
  const badge = document.getElementById("badge");

  // Reset badge
  badge.classList.remove("badge-visible");
  badge.textContent = "";

  if (total >= 3 && completed < total) {
    badge.textContent = "You're crushing it 💥";
    badge.classList.add("badge-visible");
  }

  if (total > 0 && completed / total >= 0.8 && completed < total) {
    badge.textContent = "Almost there! 🏁";
    badge.classList.add("badge-visible");
  }

  if (completed === total && total > 0) {
    badge.textContent = "All done! Legend 🌟";
    badge.classList.add("badge-visible");
    successMsg.textContent = "🎉 All tasks done! You're a rockstar!";
    successMsg.style.color = "#4caf50";
    markTodayDone();
    launchConfetti(); // optional confetti
  } else {
    successMsg.textContent = "";
  }
}



function setGreeting(name) {
  const hour = new Date().getHours();
  let msg = "Hello";
  if (hour < 12) msg = "Good Morning";
  else if (hour < 18) msg = "Good Afternoon";
  else msg = "Good Evening";
  greeting.textContent = `${msg}, ${name}!`;
}

// Simple calendar showing streak
function markTodayDone() {
  const dateKey = new Date().toISOString().split("T")[0];
  const streak = JSON.parse(localStorage.getItem("calendarStreak") || "{}");
  streak[dateKey] = true;
  localStorage.setItem("calendarStreak", JSON.stringify(streak));
  renderCalendar();
}

function renderCalendar() {
  const streak = JSON.parse(localStorage.getItem("calendarStreak") || "{}");
  calendar.innerHTML = "";
  const today = new Date();

  for (let i = 0; i < 30; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const day = d.getDate();
    const key = d.toISOString().split("T")[0];

    const el = document.createElement("div");
    el.className = "day";
    el.textContent = day;

    // Animate each one with a delay
    el.style.animationDelay = `${i * 50}ms`;

    if (streak[key]) el.classList.add("done");
    calendar.appendChild(el);
  }
}


renderCalendar();
updateStreakBadge();

const quotes = [
  "Push yourself, because no one else is going to do it for you.",
  "It always seems impossible until it’s done.",
  "Believe you can and you're halfway there.",
  "Success doesn’t come to you — you go to it.",
  "Every day is a chance to get better.",
  "Be stronger than your excuses."
];

function rotateQuote() {
  const quoteEl = document.getElementById("quoteBox");
  quoteEl.textContent = quotes[Math.floor(Math.random() * quotes.length)];
}

rotateQuote();
setInterval(rotateQuote, 10000); // rotate every 10s
function launchConfetti() {
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { x: Math.random(), y: Math.random() - 0.2 }
      });
    }, i * 200);
  }
}
function updateStreakBadge() {
  const streak = JSON.parse(localStorage.getItem("calendarStreak") || "{}");
  const today = new Date();
  let count = 0;

  for (let i = 0; i < 5; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    const key = d.toISOString().split("T")[0];
    if (streak[key]) count++;
  }

  const badge = document.getElementById("streakBadge");
  badge.classList.remove("badge-visible");
  badge.textContent = "";

  if (count >= 5) {
    badge.textContent = "🥇 5-Day Streak Champion!";
    badge.classList.add("badge-visible");
  } else if (count >= 3) {
    badge.textContent = "🥈 Consistent Contributor!";
    badge.classList.add("badge-visible");
  }
}

const ding = new Audio("https://cdn.pixabay.com/audio/2021/08/04/audio_fce53b2dc9.mp3");
ding.play();
const dailyQuotes = [
  "Make today ridiculously amazing ✨",
  "Small steps every day 💪",
  "Consistency > Intensity 🔁",
  "You're stronger than your excuses 🌟",
  "Start where you are. Use what you have. Do what you can.",
  "Every accomplishment starts with the decision to try.",
  "The secret of getting ahead is getting started."
];

function showDailyQuote() {
  const qIndex = new Date().getDate() % dailyQuotes.length;
  document.getElementById("dailyQuote").textContent = `"${dailyQuotes[qIndex]}"`;
}

showDailyQuote();


