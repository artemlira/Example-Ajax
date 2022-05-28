'use strict';



let select = window.cars,
   output = document.querySelector('.output');

// request.addEventListener('loadstart', () => { }) // прогресс начат
// request.addEventListener('abort', () => { }) // отмена запроса на сервер
// request.addEventListener('error', () => { }) // запрос пришел с ошибкой
// request.addEventListener('loadend', () => { })


select.addEventListener('change', () => {
   const request = new XMLHttpRequest();
   request.addEventListener('readystatechange', (event) => {// универсальное свойство, лучще использовать его
      console.log(request.readyState);
      if (request.readyState === 4 && request.status === 200) {
         
         const data = JSON.parse(request.responseText);
         
         data.cars.forEach(item => {
            if (item.brand == select.value) {
               output.innerHTML = 'Model: ' + item.model + '<br> Price: ' + item.price;
            }
         })
      }
   });

   request.open('GET', './cars.json');
   request.setRequestHeader('Content-type', 'application/json');
   request.send();
});



