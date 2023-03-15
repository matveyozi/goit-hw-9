// Описаний в документації
import flatpickr from "flatpickr";
// Додатковий імпорт стилів
import "flatpickr/dist/flatpickr.min.css";

const inputDate = document.querySelector('#datetime-picker')
const btnStart = document.querySelector('[data-start]');
let time = 0;
btnStart.addEventListener('click', start)
btnStart.disabled = true;
const options = {
	enableTime: true,
	time_24hr: true,
	defaultDate: new Date(),
	minuteIncrement: 1,
	onClose(selectedDates) {
		time = selectedDates[0];
		
		if (selectedDates[0] < options.defaultDate) {
			alert('Please choose a date in the future');
		} else {
			btnStart.disabled = false;
		}
	},
};

flatpickr(inputDate, options);
// start()
function getZero(num) {
	if (num >= 0 && num < 10) {
		return '0' + num;
	} else {
		return num;
	}
}
function start() {
	const timer = setInterval(() => {
		const currentDate = convertMs(time - new Date().getTime());
		
		document.querySelector('[data-days]').textContent = getZero(currentDate.days);
		document.querySelector('[data-hours]').textContent = getZero(currentDate.hours);
		document.querySelector('[data-minutes]').textContent = getZero(currentDate.minutes);
		document.querySelector('[data-seconds]').textContent = getZero(currentDate.seconds);
		if (currentDate.seconds === 0) {
			clearInterval(timer);
		}
	}, 1000)
	btnStart.disabled = true;
}

function convertMs(ms) {
	// Number of milliseconds per unit of time
	const second = 1000;
	const minute = second * 60;
	const hour = minute * 60;
	const day = hour * 24;

	// Remaining days
	const days = Math.floor(ms / day);
	// Remaining hours
	const hours = Math.floor((ms % day) / hour);
	// Remaining minutes
	const minutes = Math.floor(((ms % day) % hour) / minute);
	// Remaining seconds
	const seconds = Math.floor((((ms % day) % hour) % minute) / second);

	return { days, hours, minutes, seconds };
}

