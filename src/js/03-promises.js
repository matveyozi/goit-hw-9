import { Notify } from 'notiflix/build/notiflix-notify-aio';

const form = document.querySelector('form');

form.addEventListener('submit', submitForm);

function submitForm(e) {
	e.preventDefault();
	const {
		elements: { delay, step, amount }
	} = e.currentTarget;

	// значення з інпуту first delay - це буде перша затримка виклику функціі створення промісу
	let stepDelay = +delay.value;
	// в циклі визивається функція з промісом, в який ми передаєм кількість промісів, і шаг виклику
	for (let i = 1; i <= +amount.value; i++) {
		createPromise(i, stepDelay)
			.then(({ position, delay }) => {
				onSuccess(position, delay)
			})
			.catch(({ position, delay }) => {
				onError(position, delay);
			});
		// додаєм шаг виклику створення промісу, бо на потрібно  створювати наступні проміси з шагом з інпуту delay step
		stepDelay += +step.value;
	}
}

// функція яка повертає проміс
function createPromise(position, delay) {
	const shouldResolve = Math.random() > 0.3;
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (shouldResolve) {
				// Fulfill
				resolve({ position, delay })
			} else {
				// Reject
				reject({ position, delay })
			}
		}, delay)
	});
}


function onSuccess(pos, del) {
	Notify.success(`Fulfilled promise ${pos} in ${del}ms`);
}

function onError(pos, del) {
	Notify.failure(`Rejected promise ${pos} in ${del}ms`);
}