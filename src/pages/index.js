import "./index.css";
import {initialCards, validationConfig, popupEditForm, popupAddForm, popupEdit, 
  popupAdd, popupView, profileName, profileDescription, buttonEdit, buttonAdd,
  inputName, inputDescription, inputPlace, inputLink} from "../components/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

///////////////////////////////////////////////////////////////////

const userInfo = new UserInfo({
  name: profileName,
  description: profileDescription,
});

const renderCard = (data) => {
  const card = new Card(
    {
      data,
      createPopupView: () => {
        popupWithImage.open(data);
      },
    },
    ".card-template"
  );
  const arrayCard = card.getCard();
  return arrayCard;
};

const cardSection = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = renderCard(item);
      cardSection.addItem(card);
    },
  },
  ".cards__list"
);

cardSection.renderCard();

// добавление карточки
function submitAddCard(evt) {
  evt.preventDefault();
  const form = evt.target;
  const newCard = {};
  newCard.link = inputLink.value;
  newCard.name = inputPlace.value;
  const newCardSection = new Section(
    {
      items: newCard,
      renderer: (item) => {
        const card = renderCard(item);
        newCardSection.addItem(card);
      },
    },
    ".cards__list"
  );
  newCardSection.renderNewCard(newCard);
  newPopupAdd.close();
  form.reset();
  validatorAdd.disableButton();
}

popupAddForm.addEventListener("submit", submitAddCard);

const newPopupEdit = new PopupWithForm({
  popupSelector: popupEdit,
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data);
  },
});

const newPopupAdd = new PopupWithForm({
  popupSelector: popupAdd,
  handleFormSubmit: (data) => {
    const card = renderCard(data);
    cardSection.addItem(card);
  },
});

const popupWithImage = new PopupWithImage(popupView);

newPopupEdit.setEventListeners();
newPopupAdd.setEventListeners();
popupWithImage.setEventListeners();

buttonEdit.addEventListener("click", function () {
  const newUserInfo = userInfo.getUserInfo();
  inputName.value = newUserInfo.name;
  inputDescription.value = newUserInfo.description;
  newPopupEdit.open();
});

buttonAdd.addEventListener("click", function () {
  newPopupAdd.open();
});

///////////////////////////////////////////////////////////////////

// подключаем валидацию
const validatorEdit = new FormValidator(validationConfig, popupEditForm);
validatorEdit.enableValidation();
const validatorAdd = new FormValidator(validationConfig, popupAddForm);
validatorAdd.enableValidation();

//////////////////////////////////////////////////////////////////
