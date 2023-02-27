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

// попапы
const popupEdit = document.querySelector(".popup_function_edit");
const popupAdd = document.querySelector(".popup_function_add");
const popupView = document.querySelector(".popup_function_view");

// кнопки попапов
const closeButtonPopupEdit = popupEdit.querySelector(".popup__exit-button");
const closeButtonPopupAdd = popupAdd.querySelector(".popup__exit-button");
const closeButtonPopupView = popupView.querySelector(".popup__exit-button");
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
}

const closeButtons = document.querySelectorAll('.popup__exit-button');
console.log(closeButtons)
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

// создание карточки из массива
const cardContainer = document.querySelector(".cards__list");

function getCard(card) {
  const cardElement = document.querySelector(".card-template").content.cloneNode(true);
  const cardHeading = cardElement.querySelector(".card__place");
  cardHeading.textContent = card.name;
  const cardImage = cardElement.querySelector(".card__image");
  cardImage.setAttribute("src", card.link);
  cardImage.setAttribute("alt", `Картинка ${card.name}`);
  // удалить карточки из массива
  const buttonDelete = cardElement.querySelector(".card__delete");
  buttonDelete.addEventListener("click", deleteCard);
  //  поставить лайк на карточки из массива
  const buttonLike = cardElement.querySelector(".card__like");
  buttonLike.addEventListener("click", toggleLike);
  // открыть попап карточки из массива
  const buttonView = cardElement.querySelector(".card__view");
  buttonView.addEventListener("click", function (evt) {
    imagePopupView.src = card.link;
    imagePopupView.alt = `Картинка ${card.name}`;
    subtitlePopupView.textContent = card.name;
    openPopup(popupView);
  });
return cardElement
}

function createCard(card) {
  const arrayCard = getCard(card);
  cardContainer.prepend(arrayCard);
}

initialCards.forEach(createCard);

// добавление карточки
function submitAddCard(evt) {
  evt.preventDefault();
  const form = evt.target;
  const link = form.querySelector("#input-link").value;
  const name = form.querySelector("#input-place").value;
  const card = { link, name };
  createCard(card);
  closePopup(popupAdd);
  form.reset();
}

popupAddForm.addEventListener("submit", submitAddCard);

// удаление карточек
function deleteCard(evt) {
  const button = evt.target;
  const card = button.closest(".card");
  card.remove();
}

// поставить лайк
function toggleLike(evt) {
  const like = evt.target;
  like.classList.toggle("card__like_active");
}
