// массив карточек
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const validationConfig = {
  formSelector: ".popup__border",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error_visible",
};

// формы попапов
const popupEditForm = document.forms["edit-form"];
const popupAddForm = document.forms["add-form"];
const popupChangeForm = document.forms["change-form"];

// попапы
const popupEdit = document.querySelector(".popup_function_edit");
const popupAdd = document.querySelector(".popup_function_add");
const popupChange = document.querySelector(".popup_function_change");
const popupSubmit = document.querySelector(".popup_function_submit");
const popupView = document.querySelector(".popup_function_view");

// определяем информацию профиля
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__avatar");

// кнопки страницы
const buttonEdit = document.querySelector(".profile__edit-button");
const buttonAdd = document.querySelector(".profile__add-button");
const buttonChange = document.querySelector(".profile__avatar-button");

// определяем поля инпута
const inputName = document.querySelector("#input-name");
const inputDescription = document.querySelector("#input-description");

export {
  initialCards,
  validationConfig,
  popupEditForm,
  popupAddForm,
  popupChangeForm,
  popupEdit,
  popupAdd,
  popupView,
  popupChange,
  popupSubmit,
  profileName,
  profileDescription,
  profileAvatar,
  buttonEdit,
  buttonAdd,
  buttonChange,
  inputName,
  inputDescription
};
