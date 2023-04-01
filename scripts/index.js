import {initialCards, validationConfig} from './constants.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

// создаем карточки из массива
const cardContainer = document.querySelector(".cards__list");

function renderCard(data) {
  const card = new Card(data, '.card-template', createPopupView);
  const arrayCard = card.getCard();
  cardContainer.prepend(arrayCard);
}

initialCards.forEach((item) => {
  renderCard(item);
});

///////////////////////////////////////////////////////////////////


// подключаем валидацию
const validator = new FormValidator(validationConfig);
validator.enableValidation();


//////////////////////////////////////////////////////////////////

// попапы
const popupEdit = document.querySelector(".popup_function_edit");
const popupAdd = document.querySelector(".popup_function_add");
const popupView = document.querySelector(".popup_function_view");

// кнопки попапов
const popupEditForm = document.forms["edit-form"];
const popupAddForm = document.forms["add-form"];

// кнопки страницы
const buttonEdit = document.querySelector(".profile__edit-button");
const buttonAdd = document.querySelector(".profile__add-button");

// определяем информацию профиля
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

// определяем поля инпута
const inputName = document.querySelector("#input-name");
const inputDescription = document.querySelector("#input-description");

// определение атирбутов в попап просмотра
const imagePopupView = popupView.querySelector(".popup__image");
const subtitlePopupView = popupView.querySelector(".popup__subtitle");

// открытие попапа
function openPopup(popup) {
  popup.classList.add("popup_opened");
  document.addEventListener('keydown', escapePopup);
}

buttonEdit.addEventListener("click", function () {
  // добавление текста в инпут
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
  openPopup(popupEdit);
});
buttonAdd.addEventListener("click", function () {
  openPopup(popupAdd);
});

// закрытие попапа
function closePopup(popup) {
  popup.classList.remove("popup_opened");
  document.removeEventListener('keydown', escapePopup);
}

const closeButtons = document.querySelectorAll('.popup__exit-button');
closeButtons.forEach((button) => {
  // находим 1 раз ближайший к крестику попап 
  const popup = button.closest('.popup');
  // устанавливаем обработчик закрытия на крестик
  button.addEventListener('click', () => closePopup(popup));
});

// сохранение текста
function submitEditCard(evt) {
  evt.preventDefault();

  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;

  closePopup(popupEdit);
}
popupEditForm.addEventListener("submit", submitEditCard);

// создание попапа предпросмотра
function createPopupView(name, link) {
  imagePopupView.src = link;
  imagePopupView.alt = `Картинка ${name}`;
  subtitlePopupView.textContent = name;
  openPopup(popupView);
}

// добавление карточки
function submitAddCard(evt) {
  evt.preventDefault();
  const form = evt.target;
  const buttonElement = form.querySelector(validationConfig.submitButtonSelector);
  const link = form.querySelector("#input-link").value;
  const name = form.querySelector("#input-place").value;
  const card = { link, name };
  renderCard(card);
  closePopup(popupAdd);
  form.reset();
  validator._disableButton(buttonElement);
}

popupAddForm.addEventListener("submit", submitAddCard);

// закрыть попап через область
const popups = document.querySelectorAll('.popup');
popups.forEach( (popup) => {
  popup.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup')) {
      closePopup(popup)
    }
  });
})

// закрыть попап через esc
const escapePopup = (evt) => {
  if (evt.key === 'Escape') {
    closePopup(document.querySelector('.popup_opened'));
  }
}
// добление и удаление слушателя лежит в функциях открытия и закрытия попапов