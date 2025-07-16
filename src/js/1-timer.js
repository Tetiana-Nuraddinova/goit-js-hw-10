import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css"; 
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import "/css/styles.css"
import errorIcon from '../img/error.svg';

const startBtn = document.querySelector('#start-button');
const input = document.querySelector('#datetime-picker');

const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

let userSelectedDate = null;
let timerId = null;

startBtn.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const selectedDate = selectedDates[0];
        if (selectedDate <= new Date()) {
            iziToast.warning({
                message: 'Please choose a date in the future',
                position: 'topCenter',
                class: 'toast-error',
                iconUrl: errorIcon, 
                iconColor: '#ffffff',
                backgroundColor: '#ef4040ff;',
                messageColor: '#ffffff',
                progressBarColor: '#b51b1b',
               
            });
            startBtn.disabled = true;
        } else {
            userSelectedDate = selectedDate;
            startBtn.disabled = false;
        }
    },
  };
flatpickr('#datetime-picker', options);

startBtn.addEventListener('click', () => {
    startBtn.disabled = true;
    input.disabled = true;

    timerId = setInterval(() => {
        const nowData = new Date();
        const diff = userSelectedDate - nowData;

        if (diff <= 0) {
            clearInterval(timerId);
            updateTimerUl(0);
            input.disabled = false;
            return;

        }
        updateTimerUl(diff);
    }, 1000);
});

function updateTimerUl(ms) {
    const { days, hours, minutes, seconds } = convertMs(ms);

    daysEl.textContent = addLeadingZero(days);
    hoursEl.textContent = addLeadingZero(hours);
    minutesEl.textContent = addLeadingZero(minutes);
    secondsEl.textContent = addLeadingZero(seconds);

}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);

    return { days, hours, minutes, seconds };
}



