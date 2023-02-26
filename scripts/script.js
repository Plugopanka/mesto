const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".popup__exit-button");
const popup = document.querySelector(".popup");

// открытие попапа
function openPopup() {
  popup.classList.add("popup_opened");
}
editButton.addEventListener("click", openPopup);

// закрытие попапа
function closePopup() {
  popup.classList.remove("popup_opened");
}
closeButton.addEventListener("click", closePopup);

// добавление текста в профиль
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

const profileNameData = "Медвежонок Тедди";
const profileDescriptionData = "Искатель меда";

profileName.textContent = profileNameData;
profileDescription.textContent = profileDescriptionData;

// добавление текста в инпут
const inputName = document.querySelector("#input-name");
const inputDescription = document.querySelector("#input-description");

inputName.value = profileNameData;
inputDescription.value = profileDescriptionData;

// сохранение текста
const saveButton = document.querySelector(".popup__save-button");

function handleFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;

  closePopup();
}
popupForm.addEventListener("submit", handleFormSubmit);

// массив карточек
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const popupAdd = document.querySelector("#add-popup");
const buttonClosePopupAdd = document.querySelector("#add-popup-exit-button");
const buttonOpenPopupAdd = document.querySelector(".profile__add-button");

// открытие попапа
function openPopupAdd() {
  popupAdd.classList.add("popup_opened");
}
buttonOpenPopupAdd.addEventListener("click", openPopupAdd);

// закрытие попапа
function closePopupAdd() {
  popupAdd.classList.remove("popup_opened");
}
buttonClosePopupAdd.addEventListener("click", closePopupAdd);