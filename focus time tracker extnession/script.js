const pomodoroButton = document.getElementById("pomodoroButton");
const shortBreakButton = document.getElementById("shortBreakButton");
const longBreakButton = document.getElementById("longBreakButton");

const mainContainer = document.getElementById("main-container");
const actionButton = document.getElementById("actionButton");
const timer = document.getElementById("timer");

const buttons = [pomodoroButton, shortBreakButton, longBreakButton];

const pomodoroTime = 50;
const shortBreakTime = 10;
const longBreakTime = 20;

let timerId = null;
let remainingTime = pomodoroTime * 60;
let currentModeTime = pomodoroTime * 60;

function clearActiveButtons() {
  buttons.forEach((button) => {
    button.classList.remove("bg-black/15");
  });

  actionButton.classList.remove(
    "text-[#AF4949]",
    "text-[#297479]",
    "text-[#2F6A95]",
  );
}

function updateTimerDisplay(secondsLeft) {
  let minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;

  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  timer.textContent = `${minutes}:${seconds}`;
}

function pauseTimer() {
  clearInterval(timerId);
  timerId = null;
}

function startTimer() {
  if (timerId) return;

  timerId = setInterval(() => {
    remainingTime--;

    if (remainingTime <= 0) {
      remainingTime = 0;
      updateTimerDisplay(remainingTime);
      pauseTimer();
      actionButton.textContent = "START";
      return;
    }

    updateTimerDisplay(remainingTime);
  }, 1000);
}

function setMode(modeInMinutes, bgToAdd, textColorToAdd, activeButton) {
  pauseTimer();
  clearActiveButtons();

  activeButton.classList.add("bg-black/15");

  mainContainer.classList.remove(
    "bg-[#AF4949]",
    "bg-[#297479]",
    "bg-[#2F6A95]",
  );
  mainContainer.classList.add(bgToAdd);

  actionButton.classList.add(textColorToAdd);
  actionButton.textContent = "START";

  currentModeTime = modeInMinutes * 60;
  remainingTime = currentModeTime;

  updateTimerDisplay(remainingTime);
}

function activatePomodoro() {
  setMode(50, "bg-[#AF4949]", "text-[#AF4949]", pomodoroButton);
}

function activateShortBreak() {
  setMode(10, "bg-[#297479]", "text-[#297479]", shortBreakButton);
}

function activateLongBreak() {
  setMode(20, "bg-[#2F6A95]", "text-[#2F6A95]", longBreakButton);
}

pomodoroButton.addEventListener("click", activatePomodoro);
shortBreakButton.addEventListener("click", activateShortBreak);
longBreakButton.addEventListener("click", activateLongBreak);

actionButton.addEventListener("click", () => {
  if (actionButton.textContent === "START") {
    startTimer();
    actionButton.textContent = "PAUSE";
  } else {
    pauseTimer();
    actionButton.textContent = "START";
  }
});

activatePomodoro();
