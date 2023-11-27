import '../pages/index.css'

//Получаем ссылку на форму и элементы ввода
let form = document.querySelector('.form__inputs'),
  formInputs = document.querySelectorAll('.form__input'),
  inputEmailNumber = document.querySelector('.form__input-email'),
  inputPassword = document.querySelector('.form__input-password')

//Определяем функцию для проверки валидности email или номера телефона
function validateEmailNumber(inputVal) {
  let reEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  let reNumber = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
  return reEmail.test(String(inputVal).toLowerCase()) || reNumber.test(inputVal);
}

// Обработчик отправки формы
form.onsubmit = function (event) {
  // Отменяем действие по умолчанию для формы (отправку)
  event.preventDefault();

  // Получаем значения полей
  let emailNumberVal = inputEmailNumber.value;
  let emptyInputs = Array.from(formInputs).filter(input => input.value === '');

  // Удаляем класс 'error' у всех полей формы
  formInputs.forEach(function (input) {
    input.classList.remove('error');
  });

  // Проверяем, заполнены ли все поля
  if (emptyInputs.length !== 0) {
    // Если есть пустые поля, добавляем класс 'error' к этим полям
    emptyInputs.forEach(function (input) {
      input.classList.add('error');
    });
  } else {
    // Если все поля заполнены, проверяем валидность email или номера телефона
    if (!validateEmailNumber(emailNumberVal)) {
      // Если email или номер телефона некорректны, добавляем класс 'error' к полю email/номера телефона
      inputEmailNumber.classList.add('error');
      console.log('not valid');
    } else {
      // Если все введено корректно, продолжаем с авторизацией
      authorize();
    }
  }
}

// Функция для авторизации
function authorize() {
  // Отправляем запрос на сервер для авторизации
  fetch('https://test-works.pr-uni.ru/api/login', {
    method: 'POST',
    credentials: 'include', // Включаем отправку куки
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      emailNumber: inputEmailNumber.value,
      password: inputPassword.value
    })
  })
    .then(response => response.json())
    .then(data => {
      // Проверяем ответ от сервера
      if (data.success) {
        // Если авторизация прошла успешно, сохраняем токен в куки
        document.cookie = `token = ${data.token}`;
        // Скрываем форму и выводим сообщение об успешной авторизации
        form.style.display = 'none';
        let successMessage = document.createElement('p');
        successMessage.textContent = `${data.user.name}, Вы успешно авторизованы!`;
        form.parentNode.appendChild(successMessage);
      } else {
        // Если авторизация не удалась, отображаем ошибку
        alert('Ошибка авторизации. Попробуйте еще раз.');
      }
    })
    .catch(error => {
      // Если произошла ошибка при отправке запроса или получении ответа, отображаем ошибку
      alert('Произошла ошибка. Попробуйте еще раз.');
      console.error(error);
    });
}


