import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor({ popup, handleFormSubmit }) {
    super(popup);
    this._popupForm = this._popup.querySelector(".popup__border");
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = this._popup.querySelectorAll(".popup__input");
  }

  _getInputValues() {
    const inputValue = {};
    this._inputList.forEach((input) => {
      const value = input.value;
      const name = input.name;
      inputValue[name] = value;
    });
    return inputValue;
  }

  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener("submit", (evt) => {
      evt.preventDefault();
      const inputValues = this._getInputValues();
      this._handleFormSubmit(inputValues);
    });
  }

  setSubmitEventListener() {
    this._popup.addEventListener("submit", () => {
      this.close();
    });
  }

  close() {
    super.close();
    this._popupForm.reset();
  }
}
