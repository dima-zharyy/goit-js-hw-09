import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

//
// ------Решить проблему - создается новый таймер
//

const refs = {
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

let userTimePick = null;

refs.startBtn.addEventListener('click', onStartTimer);
disableStartBtn();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    disableStartBtn();
    if (selectedDates[0] < Date.now()) {
      Notify.failure('Please choose a date in the future');
      return;
    }
    enableStartBtn();
    userTimePick = selectedDates[0];
  },
};

flatpickr('#datetime-picker', options);

function enableStartBtn() {
  refs.startBtn.removeAttribute('disabled');
}

function disableStartBtn() {
  refs.startBtn.setAttribute('disabled', 'true');
}

function onStartTimer() {
  const timer = new Timer({ onTick: updateTimerInterface });
  timer.start();
  disableStartBtn();
}

class Timer {
  constructor({ onTick }) {
    this.timerId = null;
    this.deadline = userTimePick;
    this.onTick = onTick;
  }
  start() {
    this.timerId = setInterval(() => {
      const currentTime = Date.now();
      const timerInMs = this.deadline - currentTime;
      if (timerInMs <= 0) {
        clearInterval(this.timerId);
        return;
      }
      const timerData = this.getDeadlineData(timerInMs);
      this.onTick(timerData);
    }, 1000);
  }

  getDeadlineData(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    // Remaining days
    const days = String(Math.floor(ms / day));
    // Remaining hours
    const hours = this.addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = this.addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = this.addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

    return { days, hours, minutes, seconds };
  }

  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }
}

function updateTimerInterface({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.minutes.textContent = `${minutes}`;
  refs.seconds.textContent = `${seconds}`;
}
