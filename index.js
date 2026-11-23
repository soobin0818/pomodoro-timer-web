const STORAGE_KEY = "focusMinutes";
const DEFAULT_MINUTES = 25;

function loadFocusSeconds() {
  try {
    const saved = Number(localStorage.getItem(STORAGE_KEY));
    if (Number.isInteger(saved) && saved >= 1 && saved <= 60) {
      return saved * 60;
    }
  } catch (e) {
    // localStorage를 쓸 수 없으면 기본값 사용
  }
  return DEFAULT_MINUTES * 60;
}

let FOCUS_SECONDS = loadFocusSeconds();
let remainingSeconds = FOCUS_SECONDS;
let timerId = null;

const timeEl = document.querySelector(".time");
const startBtn = document.querySelector(".btn-start");
const pauseBtn = document.querySelector(".btn-pause");
const resetBtn = document.querySelector(".btn-reset");

function formatTime(totalSeconds) {
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function render() {
  timeEl.textContent = formatTime(remainingSeconds);
}

function startTimer() {
  if (timerId !== null || remainingSeconds <= 0) return;

  timerId = setInterval(function () {
    remainingSeconds -= 1;
    render();

    if (remainingSeconds <= 0) {
      pauseTimer();
    }
  }, 1000);
}

function pauseTimer() {
  clearInterval(timerId);
  timerId = null;
}

function resetTimer() {
  pauseTimer();
  remainingSeconds = FOCUS_SECONDS;
  render();
}

startBtn.onclick = startTimer;
pauseBtn.onclick = pauseTimer;
resetBtn.onclick = resetTimer;

// 다른 탭에서 설정을 바꾸면 메인 페이지에도 바로 반영
window.onstorage = function (event) {
  if (event.key !== STORAGE_KEY) return;
  FOCUS_SECONDS = loadFocusSeconds();
  resetTimer();
};

render();
