import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const input = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minsEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

input.addEventListener('input', onInputChange);
startBtn.addEventListener('click', onButtonClick);

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

let intervalId = null;
const timer = {
  start() {
    const startTime = userSelectedDate;

    intervalId = setInterval(() => {
      const currentTime = Date.now();

      let diffOfTime = startTime.getTime() - currentTime;
      if (diffOfTime <= 0) {
        timer.stop();
        return;
      }
      let timeComponents = convertMs(diffOfTime);
      updateClockFace(timeComponents);
    }, 1000);
  },

  stop() {
    clearInterval(intervalId);
  },
};

startBtn.disabled = true;
const fp = flatpickr('#datetime-picker', { ...options });

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

let userSelectedDate = 0;

function onInputChange(e) {
  if (options.defaultDate > fp.selectedDates[0]) {
    Notiflix.Notify.failure('Please, choose a date in the future');
  } else {
    startBtn.disabled = false;
    userSelectedDate = fp.selectedDates[0];
  }
}

function onButtonClick() {
  timer.start();
  startBtn.disabled = true;
}

function updateClockFace({ days, hours, minutes, seconds }) {
  daysEl.textContent = `${days}`;
  hoursEl.textContent = `${hours}`;
  minsEl.textContent = `${minutes}`;
  secondsEl.textContent = `${seconds}`;
}
