function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
startBtn = document.querySelector('[data-start]');
stopBtn = document.querySelector('[data-stop]');
bodyEl = document.querySelector('body');

startBtn.addEventListener('click', startChangeColor);
stopBtn.addEventListener('click', stopChangeColor);

let intervalId = null;
stopBtn.disabled = true;

function startChangeColor(e) {
  intervalId = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startBtn.disabled = true;
  stopBtn.disabled = false;
}

function stopChangeColor(e) {
  clearInterval(intervalId);
  startBtn.disabled = false;
  stopBtn.disabled = true;
}
