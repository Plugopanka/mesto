import "./index.css";
import {
  initialCards,
  validationConfig,
  popupEditForm,
  popupAddForm,
  popupChangeForm,
  popupEdit,
  popupAdd,
  popupChange,
  popupSubmit,
  popupView,
  profileName,
  profileDescription,
  profileAvatar,
  buttonEdit,
  buttonAdd,
  buttonChange,
  inputName,
  inputDescription,
} from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithConfirm from "../components/PopupWithConfirm.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";

///////////////////////////////////////////////////////////////////

// подключаем валидацию
const validatorEdit = new FormValidator(validationConfig, popupEditForm);
validatorEdit.enableValidation();
const validatorAdd = new FormValidator(validationConfig, popupAddForm);
validatorAdd.enableValidation();
const validatorChange = new FormValidator(validationConfig, popupChangeForm);
validatorChange.enableValidation();
//////////////////////////////////////////////////////////////////

const userInfo = new UserInfo({
  name: profileName,
  about: profileDescription,
  avatar: profileAvatar,
});

const renderCard = (data, userId) => {
  const card = new Card(
    {
      data,
      handleImageClick: () => {
        popupWithImage.open(data);
      },
      handleCardSubmit: (card) => {
        handleCardDelete(card);
        popupWithSubmitForm.open();
      },
      handleCardLike: (card) => {
        if (card.isLiked()) {
          api
            .deleteLike(card.cardId)
            .then((res) => {
              card.removeLike(res);
            })
            .catch((err) => console.log(`Ошибка загрузки ${err}`));
        } else {
          api
            .putLike(card.cardId)
            .then((res) => {
              card.addLike(res);
            })
            .catch((err) => console.log(`Ошибка загрузки ${err}`));
        }
      },
    },
    ".card-template",
    userId
  );
  const newCard = card.getCard();
  return newCard;
};

const cardSection = new Section(
  {
    renderer: (item, userId) => {
      const card = renderCard(item, userId);
      cardSection.addItem(card);
    },
  },
  ".cards__list"
);

const api = new Api({
  url: "https://nomoreparties.co/v1/cohort-65",
  headers: {
    authorization: "d0b175f3-b7bd-4d1e-af37-189224954b9b",
    "Content-Type": "application/json",
  },
});

Promise.all([api.getUserData(), api.getCards()])
  .then(([userData, cardData]) => {
    userInfo.setUserInfo(userData);
    userInfo.setUserAvatar(userData.avatar);
    const userId = userData._id;
    console.log(userId);
    cardSection.renderItems(cardData, userId);
  })
  .catch((err) => console.log(`Ошибка загрузки ${err}`));

const popupWithEditForm = new PopupWithForm({
  popup: popupEdit,
  handleFormSubmit: (data) => {
    popupWithEditForm.renderLoading(true);
    api
      .patchUserInfo(data.name, data.about)
      .then((res) => {
        const card = renderCard(res.name, res.about);
        cardSection.addItem(card);
      })
      .catch((err) => console.log(`Ошибка загрузки ${err}`))
      .finally(() => popupWithEditForm.renderLoading(false));
    userInfo.setUserInfo(data);
    popupWithEditForm.close();
    validatorEdit.disableButton();
  },
});

popupWithEditForm.renderLoading(false);

const popupWithAddForm = new PopupWithForm({
  popup: popupAdd,
  handleFormSubmit: (data) => {
    popupWithEditForm.renderLoading(true);
    api
      .postNewCard(data.name, data.link)
      .then((res) => {
        const card = renderCard(res.name, res.link);
        cardSection.addItem(card);
      })
      .catch((err) => console.log(`Ошибка загрузки ${err}`))
      .finally(() => popupWithAddForm.renderLoading(false));

    popupWithAddForm.close();
    validatorAdd.disableButton();
  },
});

popupWithAddForm.renderLoading(false);

const popupWithChangeForm = new PopupWithForm({
  popup: popupChange,
  handleFormSubmit: (data) => {
    popupWithChangeForm.renderLoading(true);
    api
      .patchUserAvatar(data.link)
      .then((res) => {
        userInfo.setUserAvatar(res.avatar);
      })
      .catch((err) => console.log(`Ошибка загрузки ${err}`))
      .finally(() => popupWithChangeForm.renderLoading(false));

    popupWithChangeForm.close();
    validatorChange.disableButton();
  },
});

popupWithChangeForm.renderLoading(false);

function handleCardDelete(data) {
  const handleFormSubmit = () => {
    popupWithSubmitForm.renderLoading(true);
    api.deleteNewCard(data.cardId).then((res) => {
      res
        .deleteCard()
        .catch((err) => console.log(`Ошибка загрузки ${err}`))
        .finally(() => popupWithSubmitForm.renderLoading(false));
    });
  };
  popupWithSubmitForm.setSubmitAction(handleFormSubmit);
  popupWithSubmitForm.close();
}

const popupWithSubmitForm = new PopupWithConfirm({
  popup: popupSubmit,
});

popupWithSubmitForm.renderLoading(false);

const popupWithImage = new PopupWithImage(popupView);

popupWithEditForm.setEventListeners();
popupWithAddForm.setEventListeners();
popupWithChangeForm.setEventListeners();
popupWithSubmitForm.setEventListeners();
popupWithImage.setEventListeners();

buttonEdit.addEventListener("click", function () {
  const newUserInfo = userInfo.getUserInfo();
  inputName.value = newUserInfo.name;
  inputDescription.value = newUserInfo.about;
  popupWithEditForm.open();
});

buttonAdd.addEventListener("click", function () {
  popupWithAddForm.open();
});

buttonChange.addEventListener("click", function () {
  popupWithChangeForm.open();
});

///////////////////////////////////////////////////////////////////
