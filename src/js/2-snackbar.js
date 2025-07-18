import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
import "/css/styles.css";
import okIcon from '../img/ok.svg';
import errorIcon from '../img/error.svg';

const form = document.querySelector(".form");

form.addEventListener("submit", onFormSubmit);
function onFormSubmit(event) {
    event.preventDefault();
    
    const delay = Number(form.elements.delay.value);
    const state = form.elements.state.value;

    createPromise(delay, state)

        .then(result => {
            iziToast.success({
                title: ' OK',
                message: `Fulfilled promise in ${result}ms`,
                position: 'topRight',
                iconUrl: okIcon,
                class: 'my-style-toast',
                titleColor: '#ffffff',
                messageColor: '#ffffff',
                iconColor: '#ffffff',
                timeout: 3000
            });
        })
        .catch (error => {
                iziToast.error({
                    title: 'Error',
                    message: `Rejected promise in ${error}ms`,
                    position: 'topRight',
                    iconUrl: errorIcon,
                    class: 'my-style-toast',
                    titleColor: '#ffffff',
                    messageColor: '#ffffff',
                    iconColor: '#ffffff',
                    timeout: 3000
                });
            });

 form.reset();
}

function createPromise(delay, state) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (state === "fulfilled") {
                resolve(delay);
            } else {
                reject(delay);
            }
        }, delay);
    });
}


const delayInput = document.querySelector('.input-form');
const fieldset = document.querySelector('.fieldset');

delayInput.addEventListener('focus', () => {
    delayInput.classList.add('pressed');
});

delayInput.addEventListener('blur', () => {
    delayInput.classList.remove('pressed');
});

const radioButtons = document.querySelectorAll('input[name="state"]');

radioButtons.forEach(radio => {
    radio.addEventListener('change', () => {
        fieldset.classList.add('pressed');
    });
});
