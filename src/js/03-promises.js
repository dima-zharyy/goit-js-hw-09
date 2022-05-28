import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  form: document.querySelector('.form'),
};

refs.form.addEventListener('submit', onSubmit);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      const promiseData = {
        position,
        delay,
      };

      if (shouldResolve) {
        resolve(promiseData);
      } else {
        reject(promiseData);
      }
    }, delay);
  });
}

function onSubmit(event) {
  event.preventDefault();
  const { delay, step, amount } = getFormData(event.currentTarget);

  let iterableDelay = Number(delay);

  for (let i = 1; i <= amount; i += 1) {
    if (i === 1) {
      createPromise(i, iterableDelay)
        .then(({ position, delay }) => {
          Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          Notify.failure(`Rejected promise ${position} in ${delay}ms`);
        });
      iterableDelay += Number(step);
      continue;
    }

    createPromise(i, iterableDelay)
      .then(({ position, delay }) => {
        Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });

    iterableDelay += Number(step);
  }
}

function getFormData(eventCurrentTarget) {
  const inputData = new FormData(eventCurrentTarget);
  const outputData = {};

  inputData.forEach((value, name) => {
    outputData[name] = value;
  });

  return outputData;
}
