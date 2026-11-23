const STORAGE_KEY = "focusMinutes";
const DEFAULT_MINUTES = 25;
const MIN_MINUTES = 1;
const MAX_MINUTES = 60;

const minutesInput = document.querySelector("#focus-minutes");
const saveBtn = document.querySelector(".btn-save");

function loadMinutes() {
  try {
    const saved = Number(localStorage.getItem(STORAGE_KEY));
    if (Number.isInteger(saved) && saved >= MIN_MINUTES && saved <= MAX_MINUTES) {
      return saved;
    }
  } catch (e) {
    // localStorage를 쓸 수 없으면 기본값 사용
  }
  return DEFAULT_MINUTES;
}

function updateSaveButton() {
  saveBtn.disabled = minutesInput.value.trim() === "";
}

function saveMinutes() {
  const minutes = Number(minutesInput.value);

  if (!Number.isInteger(minutes) || minutes < MIN_MINUTES || minutes > MAX_MINUTES) {
    alert(`타이머 시간은 ${MIN_MINUTES}분 이상 ${MAX_MINUTES}분 이하의 정수로 입력해 주세요.`);
    minutesInput.focus();
    return;
  }

  try {
    localStorage.setItem(STORAGE_KEY, String(minutes));
    alert(`타이머 시간이 ${minutes}분으로 저장되었습니다.`);
  } catch (e) {
    alert("설정을 저장하지 못했습니다.");
  }
}

minutesInput.oninput = updateSaveButton;
saveBtn.onclick = saveMinutes;

minutesInput.value = loadMinutes();
updateSaveButton();
