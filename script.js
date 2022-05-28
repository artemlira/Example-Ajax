'use strict';

const sendForm = () => {
   let form = document.querySelector('form'),
      user = form.querySelector('[type=text]'),
      email = form.querySelector('[type=mail]'),
      mesDiv = document.querySelector('.message');
   let massage = {
      'success': 'Ваші дані успішно відправленні',
      'warning': 'Дані відправляются',
      'error': 'Помилка відправлення даних'
   }
   form.addEventListener('submit', (event) => {
      event.preventDefault();

      const request = new XMLHttpRequest();
      request.addEventListener('readystatechange', () => {
         mesDiv.classList.add('warning');
         mesDiv.innerHTML = massage.warning;

         if (request.readyState !== 4) {
            return;
         }
         if (request.status === 200) {
            mesDiv.classList.remove('warning');
            mesDiv.classList.add('success')
            mesDiv.innerHTML = massage.success;
         } else {
            mesDiv.classList.remove('warning');
            mesDiv.classList.add('error')
            mesDiv.innerHTML = massage.error;
            
         }

      });
      request.open('POST', './send.php');
      request.setRequestHeader('Content-type', 'application/json');

      const data = {};
      data.user = user.value;
      data.email = email.value;

      const body = JSON.stringify(data);

      request.send(body);

   })
}

sendForm();

