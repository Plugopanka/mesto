export default class FormValidator {
  constructor(config) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
  }

  _showInputError (errorElement, inputElement, errorMessage) {
    inputElement.classList.add(this._inputErrorClass);
    errorElement.classList.add(this._errorClass);
    errorElement.textContent = errorMessage;
  }
  
  _hideInputError (errorElement, inputElement) {
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  }

  _isValid (formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
    if (!inputElement.validity.valid) {
      this._showInputError(errorElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(errorElement, inputElement);
    }
  }
  
  _hasInvalidInput (inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid
    })
  }
  
  _disableButton (buttonElement) {
    buttonElement.setAttribute('disabled', 'true');
    buttonElement.classList.add(this._inactiveButtonClass);
  }
  
  _enableButton (buttonElement) {
    buttonElement.removeAttribute('disabled');
    buttonElement.classList.remove(this._inactiveButtonClass);
  }
  
  _toggleButtonState (inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      this._disableButton(buttonElement);
    }
    else {
      this._enableButton(buttonElement);
    }
  }
  
  _setEventListeners (formElement) {
    const inputList = Array.from(formElement.querySelectorAll(this._inputSelector));
    const buttonElement = formElement.querySelector(this._submitButtonSelector);
    this._toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(formElement, inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  };

  enableValidation () {
    const formList = Array.from(document.querySelectorAll(this._formSelector));
    formList.forEach((formElement) => {
      formElement.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
      this._setEventListeners(formElement);
    });
  }
}