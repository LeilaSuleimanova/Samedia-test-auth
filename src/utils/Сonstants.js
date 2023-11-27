// Массив карточек

export const enableValidation = {
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_invalid',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}

const formPopupAdd = document.querySelector('#popup-form-add')
const formPopupInfo = document.querySelector('#popup-form-info')
const popupAddButton = document.querySelector('.profile__add-button')
const popupAvatarButton = document.querySelector('.profile__avatar-button')
const formPopupAvatar = document.querySelector('#popup-form-avatar')
const popupProfile = '#popup-profile'
const selectorElement = '.elements'
const selectorTemplate = '.template-cards'
const popupWrapImageSelector = '#popup-image'
const popupAddSelector = '#popup-add'
const popupAvatarSelector = '#popup-avatar'
const popupDeleteSelector = '#popup-delete'
const profileInfo = {
  userNameSelector: '.profile__title',
  userDescriptionSelector: '.profile__subtitle',
  userImageSelector: '.profile__avatar'
}

export {
  popupAddButton,
  popupProfile,
  selectorElement,
  selectorTemplate,
  popupWrapImageSelector,
  popupAddSelector,
  profileInfo,
  formPopupAdd,
  formPopupInfo,
  popupAvatarSelector,
  formPopupAvatar,
  popupAvatarButton,
  popupDeleteSelector
}
