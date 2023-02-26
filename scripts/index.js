// определяем кнопки и попап
const editButton = document.querySelector(".profile__edit-button");
const closeButton = document.querySelector(".popup__exit-button");
const saveButton = document.querySelector(".popup__save-button");
const popup = document.querySelector(".popup");

// определяем информацию профиля
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

// определяем поля инпута
const inputName = document.querySelector("#input-name");
const inputDescription = document.querySelector("#input-description");

// открытие попапа
function openPopup() {
  popup.classList.add("popup_opened");
  // добавление текста в инпут
  inputName.value = profileName.textContent;
  inputDescription.value = profileDescription.textContent;
}
editButton.addEventListener("click", openPopup);

// закрытие попапа
function closePopup() {
  popup.classList.remove("popup_opened");
}
closeButton.addEventListener("click", closePopup);

// сохранение текста
const popupForm = document.querySelector(".popup__border");

function handleFormSubmit(evt) {
  evt.preventDefault();

  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;

  closePopup();
}
popupForm.addEventListener("submit", handleFormSubmit);
