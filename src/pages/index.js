import '../pages/index.css'

let form = document.querySelector('.form__inputs'),
  formInputs = document.querySelectorAll('.form__input'),
  inputEmailNumber = document.querySelector('.form__input-email'),
  inputPassword = document.querySelector('.form__input-password'),
  successText = document.querySelector('.success__text'),
  preloader = document.querySelector('.preloader');
const loader = '<span class="preloader"></span>'
const replaceElementContent = (element, content) => {
  element.innerHTML = content;
};
const submitButton = document.querySelector('.form__button');

const removeElement = (element) => {
  if (element) {
    element.remove();
  }
};

let error;

// Функция валидации email или номера телефона
function validateEmailNumber(inputVal) {
  let reEmail = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
  let reNumber = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
  return reEmail.test(String(inputVal).toLowerCase()) || reNumber.test(inputVal);
}

form.onsubmit = async function (e) {
  e.preventDefault(); // отменить отправку формы по умолчанию

  replaceElementContent(submitButton, loader);
  removeElement(error);
  let emailNumberVal = inputEmailNumber.value.trim();
  let emptyInputs = Array.from(formInputs).filter(input => input.value === '');

  for (let input of formInputs) {
    input.classList.remove('error');
  }

  // проверяем, заполнены ли все поля
  if (emptyInputs.length !== 0) {
    // если есть пустые поля, добавляем класс 'error' к этим полям
    for (let input of emptyInputs) {
      input.classList.add('error');
    }
    document.querySelector('.form__error').innerText = 'поля формы не заполнены';
    document.querySelector('.form__error').style.display = "block";


  } else {
    // если все поля заполнены, проверяем валидность email или номера телефона
    if (!validateEmailNumber(emailNumberVal)) {
      // если email или номер телефона некорректны, добавляем классы ошибок
      inputEmailNumber.classList.add('error');
      document.querySelector('.form__error').innerText = 'неправильный логин или пароль';
      document.querySelector('.form__error').style.display = "block";
    } else {
      await authorize(emailNumberVal, inputPassword.value);
    }
  }
}

const authorize = async (emailNumberVal, inputPassword) => {
  try {
    const response = await fetch(`https://test-works.pr-uni.ru/api/login/index.php?login=${emailNumberVal}&password=${inputPassword.value}`);
    const data = await response.json();

    // определить переменные preloader, form и successText
    const preloader = document.getElementById('preloader');
    const form = document.getElementById('form-inputs');
    const successMessage = document.querySelector('.success');
    const successText = document.querySelector('.success__text');

    if (response.ok) {
      // скрыть прелоадер и разблокировать форму
      preloader.style.display = 'none';
      form.classList.remove('disabled');

      // сохранить токен в куки
      document.cookie = `token=${data.token}`;

      // скрыть форму и показать текст успеха
      form.style.display = 'none';
      successText.innerText = `${data.user.name}, вы успешно авторизованы!`;
      successMessage.style.display = 'block'

      return data.user;
    } else {

      throw new Error('ошибка при авторизации');
    }
  } catch (error) {
    // обработка ошибок
    console.error(error);

    // вывести ошибку в интерфейсе
    document.querySelector('.form__error').innerText = 'ошибка при авторизации';
  } finally {
    //скрыть прелоадер в любом случае
    const preloader = document.getElementById('preloader');
    preloader.style.display = 'none';
  }
}


