import "./index.css";
import {
  initialCards,
  validationConfig,
  popupEditForm,
  popupAddForm,
  popupEditSelector,
  popupAddSelector,
  popupViewSelector,
  profileName,
  profileDescription,
  buttonEdit,
  buttonAdd,
  inputName,
  inputDescription
} from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

///////////////////////////////////////////////////////////////////

const userInfo = new UserInfo({
  name: profileName,
  description: profileDescription
});

const renderCard = (data) => {
  const card = new Card(
    {
      data,
      handleImageClick: () => {
        popupWithImage.open(data);
      },
    },
    ".card-template"
  );
  const newCard = card.getCard();
  return newCard;
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

cardSection.renderItems();


const popupEdit = new PopupWithForm({
  popup: popupEditSelector,
  handleFormSubmit: (data) => {
    userInfo.setUserInfo(data);
  },
});

const popupAdd = new PopupWithForm({
  popup: popupAddSelector,
  handleFormSubmit: (data) => {
    const card = renderCard(data);
    cardSection.addItem(card);
  },
});

const popupWithImage = new PopupWithImage(popupViewSelector);


popupEdit.setEventListeners();
popupEdit.setSubmitEventListener();
popupAdd.setEventListeners();
popupAdd.setSubmitEventListener();
popupWithImage.setEventListeners();

buttonEdit.addEventListener("click", function () {
  const newUserInfo = userInfo.getUserInfo();
  inputName.value = newUserInfo.name;
  inputDescription.value = newUserInfo.description;
  popupEdit.open();
});

buttonAdd.addEventListener("click", function () {
  popupAdd.open();
});

///////////////////////////////////////////////////////////////////

// подключаем валидацию
const validatorEdit = new FormValidator(validationConfig, popupEditForm);
validatorEdit.enableValidation();
const validatorAdd = new FormValidator(validationConfig, popupAddForm);
validatorAdd.enableValidation();

//////////////////////////////////////////////////////////////////
