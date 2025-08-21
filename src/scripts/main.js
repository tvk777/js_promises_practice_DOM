'use strict';

const showMessage = (text, className) => {
  const notificationDiv = document.createElement('div');

  notificationDiv.className = className;
  notificationDiv.innerText = text;
  notificationDiv.dataset.qa = 'notification';

  document.body.append(notificationDiv);
};

const firstPromise = (ms) =>
  new Promise((resolve, reject) => {
    document.addEventListener('click', resolve);

    setTimeout(() => {
      reject(new Error('rejected'));
    }, ms);
  });

firstPromise(3000)
  .then((text) => {
    showMessage('First promise was resolved', 'success');
  })
  .catch(() => showMessage('First promise was rejected', 'error'));

const secondPromise = () =>
  new Promise((resolve) => {
    document.addEventListener('click', resolve);
    document.addEventListener('contextmenu', resolve);
  });

secondPromise()
  .then(() => {
    showMessage('Second promise was resolved', 'success');
  })
  .catch(() => showMessage('Second promise was rejected', 'error'));

let leftClick = false;
let rightClick = false;

const thirdPromise = () =>
  new Promise((resolve) => {
    document.addEventListener('click', () => {
      leftClick = true;

      if (leftClick && rightClick) {
        resolve();
      }
    });

    document.addEventListener('contextmenu', () => {
      rightClick = true;

      if (leftClick && rightClick) {
        resolve();
      }
    });
  });

thirdPromise()
  .then(() => {
    showMessage('Third promise was resolved', 'success');
  })
  .catch(() => showMessage('Third promise was rejected', 'error'));
