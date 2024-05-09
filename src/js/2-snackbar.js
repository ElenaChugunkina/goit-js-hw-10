import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
const form = document.querySelector(".form");
console.log(form);
const delayInput = form.querySelector('input[name="delay"]');
console.log(delayInput);
const radioBtn = form.querySelectorAll("input[name='state']");
console.log(radioBtn);
const submitButton = form.querySelector("button[type='submit']")
console.log(submitButton);

form.addEventListener("submit", event => {
  event.preventDefault();
  const delay = parseInt(delayInput.value); // Отримуємо значення затримки
  console.log(delay);
  const selectedState = [...radioBtn].find(radio => radio.checked); // Отримуємо обраний стан радіокнопки.
  console.log(selectedState);

  if(delay && selectedState) {
    const promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (selectedState.value === "fulfilled") {
          resolve(delay);
        } else {
          reject(delay);
        }
      }, delay);
    });

    promise.then((delay) => {
      iziToast.success({
        title: 'Fulfilled:',
        message: `✅ promise in ${delay}ms`
    });
    }).catch((delay) => {
      iziToast.error({
        title: 'Rejected:',
        message: `❌ promise in ${delay}ms`
    });
    });
  }
  
});

