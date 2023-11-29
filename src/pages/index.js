import '../pages/index.css'

let form = document.querySelector('.form__inputs'),
  formInputs = document.querySelectorAll('.form__input'),
  inputEmailNumber = document.querySelector('.form__input-email'),
  inputPassword = document.querySelector('.form__input-password'),
  successText = document.querySelector('.success__text'),
  preloader = document.querySelector('.preloader');

// Функция валидации email или номера телефона
function validateEmailNumber(inputVal) {
  let reEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  let reNumber = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
  return reEmail.test(String(inputVal).toLowerCase()) || reNumber.test(inputVal);
}

// Обработчик отправки формы
form.onsubmit = function (e) {
  e.preventDefault(); // Отменить отправку формы по умолчанию

  let emailNumberVal = inputEmailNumber.value.trim();
  let emptyInputs = Array.from(formInputs).filter(input => input.value === '');

  formInputs.forEach(function (input) {
    input.classList.remove('error');
  });

  // Проверяем, заполнены ли все поля
  if (emptyInputs.length !== 0) {
    // Если есть пустые поля, добавляем класс 'error' к этим полям
    emptyInputs.forEach(function (input) {
      input.classList.add('error');
    });
    document.querySelector('.form__error').innerText = 'Поля формы не заполены';
    document.querySelector('.form__error').style.display = "block";
  } else {
    // Если все поля заполнены, проверяем валидность email или номера телефона
    if (!validateEmailNumber(emailNumberVal)) {
      // Если email или номер телефона некорректны, добавляем классы ошибок
      inputEmailNumber.classList.add('error');
      document.querySelector('.form__error').innerText = 'Неправильный логин или пароль';
      document.querySelector('.form__error').style.display = "block";

    } else {
      authorize();
    }
  }
}

function authorize() {

  // Отправить запрос на сервер
  // (API не рабочий или данные логина/пароля недостоверные?)
  fetch('https://test-works.pr-uni.ru/api/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email_number: emailNumberVal.value,
      password: inputPassword.value
    })
  })
    .then(response => {
      // Скрыть прелоадер и разблокировать форму
      preloader.style.display = 'none';
      form.classList.remove('disabled');

      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Ошибка при авторизации');
      }
    })
    .then(data => {
      // Сохранить токен в куки
      document.cookie = `token = ${data.token}`;

      // Скрыть форму и показать текст успеха
      form.style.display = 'none';
      successText.innerText = `${data.user.name}, Вы успешно авторизованы!`;
      document.querySelector('.success').style.display = 'block';
    })
    .catch(error => {
      // Обработка ошибок
      console.error(error);
      // Вывести ошибку в интерфейсе
      document.querySelector('.form__error').innerText = 'Ошибка при авторизации';
    });
}

