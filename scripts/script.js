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

saveButton.addEventListener("click", handleFormSubmit);
