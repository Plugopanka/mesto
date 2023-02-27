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
const popupEditForm = popupEdit.querySelector(".popup__border");
const popupAddForm = popupAdd.querySelector(".popup__border");

// кнопки страницы
const buttonEdit = document.querySelector(".profile__edit-button");
const buttonAdd = document.querySelector(".profile__add-button");
const buttonsLike = document.querySelectorAll(".card__like");
const buttonsDelete = document.querySelectorAll(".card__delete");
const buttonsView = document.querySelectorAll(".card__view");


// определяем информацию профиля
const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");

// определяем поля инпута
const inputName = document.querySelector("#input-name");
const inputDescription = document.querySelector("#input-description");

// добавление текста в инпут
inputName.value = profileName.textContent;
inputDescription.value = profileDescription.textContent;

// определение атирбутов в попап просмотра
const cardPlace = document.querySelectorAll(".card__place");
const cardImage = document.querySelectorAll(".card__image");
const imagePopupView = popupView.querySelector(".popup__image");
const subtitlePopupView = popupView.querySelector(".popup__subtitle");



function openPopupView() {

  subtitlePopupView.textContent = cardPlace.textContent;
  imagePopupView.src = cardImage.src;
}

buttonsView.forEach(function (item) {
  item.addEventListener("click", openPopupView);
});

// открытие попапа
function openPopup(popup) {
  popup.classList.add("popup_opened");
}

buttonEdit.addEventListener("click", function () {
  openPopup(popupEdit);
});
buttonAdd.addEventListener("click", function () {
  openPopup(popupAdd);
});
buttonsView.forEach(function (item) {
  item.addEventListener("click", function () {
    openPopup(popupView);
  });
});

// закрытие попапа
function closePopup(popup) {
  popup.classList.remove("popup_opened");
}

closeButtonPopupEdit.addEventListener("click", function () {
  closePopup(popupEdit);
});
closeButtonPopupAdd.addEventListener("click", function () {
  closePopup(popupAdd);
});
closeButtonPopupView.addEventListener("click", function () {
  closePopup(popupView);
});

// сохранение текста
function submitEditCard(evt) {
  evt.preventDefault();

  profileName.textContent = inputName.value;
  profileDescription.textContent = inputDescription.value;

  closePopup(popupEdit);
}
popupEditForm.addEventListener("submit", submitEditCard);

// добавление атрибутов в попап просмотра
function viewCard(evt) {
  const image = evt.target;
  const card = image.closest(".card");
  image.firstElementChild.getAttribute("src")
}

// создание карточки из массива
const cardContainer = document.querySelector(".cards__list");

function createCard(card) {
  const arrayCard = document.querySelector(".card-template").content.cloneNode(true);
  const cardHeading = arrayCard.querySelector(".card__place");
  cardHeading.textContent = card.name;
  const cardImage = arrayCard.querySelector(".card__image");
  cardImage.setAttribute("src", card.link);
  cardImage.setAttribute("alt", `Картинка ${card.name}`);
  // удалить карточки из массива
  const buttonDelete = arrayCard.querySelector(".card__delete");
  buttonDelete.addEventListener("click", deleteCard);
  //  поставить лайк на карточки из массива
  const buttonLike = arrayCard.querySelector(".card__like");
  buttonLike.addEventListener("click", getLike);
  // открыть карточку из массива
  const buttonView = arrayCard.querySelector(".card__view");
  subtitlePopupView.textContent = cardHeading.textContent;
  buttonView.addEventListener("click", function () {
    openPopup(popupView);
  });

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
}

popupAddForm.addEventListener("submit", submitAddCard);

// удаление карточек
function deleteCard(evt) {
  const button = evt.target;
  const card = button.closest(".card");
  card.remove();
}

// поставить лайк
function getLike(evt) {
  const like = evt.target;
  like.classList.toggle("card__like_active");
}

// поставить лайк на карточки из разметки
buttonsLike.forEach(function (item) {
  item.addEventListener("click", getLike);
});

// удалить карточки из разметки
buttonsDelete.forEach(function (item) {
  item.addEventListener("click", deleteCard);
});
