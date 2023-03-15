const body = document.querySelector('body');
const btnStart = document.querySelector('[data-start]');
const btnStop = document.querySelector('[data-stop]');
btnStop.disabled = true;
let timerId = null;

btnStart.addEventListener('click', intervalToggleBackground);
btnStop.addEventListener('click', () => {
	clearInterval(timerId);
	btnStart.disabled = false;
	btnStop.disabled = true;
});

// Функція для зміни кольору фону з інтервалом
function intervalToggleBackground() {
	toggleBackground()
	timerId=setInterval(toggleBackground, 1000);
	btnStart.disabled = true;
	btnStop.disabled = false;
}


function toggleBackground() {
	body.style.backgroundColor = getRandomHexColor();

}

function getRandomHexColor() {
	return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}









