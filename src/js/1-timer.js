
 import flatpickr from "flatpickr";
  import "flatpickr/dist/flatpickr.min.css";
 import iziToast from "izitoast";
 import "izitoast/dist/css/iziToast.min.css";
 let userSelectedDate; // Оголошуємо змінну на рівні зовнішнього блоку коду
 
 const datetimePicker = document.querySelector("#datetime-picker");
 const startButton = document.querySelector("[data-start]");
 const timeDays = document.querySelector("[data-days]");
  const timeHours = document.querySelector("[data-hours]");
 const timeMinutes = document.querySelector("[data-minutes]");
  const timeSeconds = document.querySelector("[data-seconds]");
 
  startButton.disabled = true;
  
  const options = {
   enableTime: true,
   time_24hr: true,
   defaultDate: new Date(),
    minuteIncrement: 1,
   onClose(selectedDates) {
     userSelectedDate = selectedDates[0]; // Оновлюємо значення userSelectedDate
     const currentDate = new Date();
      if (userSelectedDate <= currentDate) {
       iziToast.show({
         title: 'Alert:',
         message: "Please choose a date in the future",
         titleColor: 'red',
         messageColor: 'black',
         backgroundColor: 'grey',
         position: 'topRight', 
       });
      startButton.disabled = true;       //  деактивуємо кнопку
      
    } 
    },
  };

  flatpickr("#datetime-picker", options);

  datetimePicker.addEventListener("change", (event) => {
   const selectedDate = new Date(event.target.value);
   const currentDate = new Date();
  
  // Перевіряємо, чи обрана дата в майбутньому
   if (selectedDate > currentDate) {
     startButton.disabled = false; // Активуємо кнопку "Start"
    
   } else {
    startButton.disabled = true; // Деактивуємо кнопку "Start"
  }
 });

let countdownInterval;

  function addLeadingZero(value) {
   return String(value).padStart(2, '0');
 }

  function updateTimer() {
   const currentDate = new Date();
    const timeDifference = userSelectedDate.getTime() - currentDate.getTime();

   if (timeDifference <= 0) {
    clearInterval(countdownInterval);
     timeDays.textContent = "00";
    timeHours.textContent = "00";
    timeMinutes.textContent = "00";
    timeSeconds.textContent = "00";
    startButton.disabled = false;
    datetimePicker.disabled = false;

    return;
  }

   const time = convertMs(timeDifference);

  timeDays.textContent = addLeadingZero(time.days);
  timeHours.textContent = addLeadingZero(time.hours);
  timeMinutes.textContent = addLeadingZero(time.minutes);
   timeSeconds.textContent = addLeadingZero(time.seconds);
 }

  
 
  startButton.addEventListener("click", () => {
    const currentDate = new Date();
    const timeDifference = userSelectedDate.getTime() - currentDate.getTime();
    if (timeDifference > 0) {
      startButton.disabled = true;
      datetimePicker.disabled = true;
      countdownInterval = setInterval(updateTimer, 1000);
      updateTimer(); // Викликаємо один раз, щоб спочатку оновити таймер
    }
  });


 function convertMs(ms) {
 
 const second = 1000;
     const minute = second * 60;
       const hour = minute * 60;
   const day = hour * 24;


  const days = Math.floor(ms / day);
   // Remaining hours
   const hours = Math.floor((ms % day) / hour);
   // Remaining minutes
   const minutes = Math.floor(((ms % day) % hour) / minute);
   // Remaining seconds
   const seconds = Math.floor((((ms % day) % hour) % minute) / second);

   return { days, hours, minutes, seconds };
 }

