import Popup from "./Popup.js";
export default class PopupWithConfirm extends Popup {
  constructor({ popup }, handleFormSubmit) {
    super(popup);
    this._submitButton = this._popup.querySelector(".popup__save-button");
    this._handleFormSubmit = handleFormSubmit;
  }

  setSubmitAction(action) {
    this._handleFormSubmit = action;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit();
    });
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._submitButton.textContent = "Удаление...";
    } else {
      this._submitButton.textContent = "Да";
    }
  }
}
