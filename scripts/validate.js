const showInputError = (errorElement, inputElement, errorMessage, buttonElement, validationConfig) => {
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.classList.add(validationConfig.errorClass);
  errorElement.textContent = errorMessage;
}

const hideInputError = (errorElement, inputElement, buttonElement, validationConfig) => {
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.errorClass);
  errorElement.textContent = '';
}

const isValid = (formElement, inputElement, buttonElement, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.name}-error`);
  if (!inputElement.validity.valid) {
    showInputError(errorElement, inputElement, inputElement.validationMessage, buttonElement, validationConfig);
  } else {
    hideInputError(errorElement, inputElement, buttonElement, validationConfig);
  }
}

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid
  })
}

const disableButton = (buttonElement, validationConfig) => {
  buttonElement.setAttribute('disabled', 'true');
  buttonElement.classList.add(validationConfig.inactiveButtonClass);
}

const enableButton = (buttonElement, validationConfig) => {
  buttonElement.removeAttribute('disabled');
  buttonElement.classList.remove(validationConfig.inactiveButtonClass);
}

const toggleButtonState = (inputList, buttonElement, validationConfig) => {
  if (hasInvalidInput(inputList)) {
    disableButton(buttonElement, validationConfig);
  }
  else {
    enableButton(buttonElement, validationConfig);
  }
}

const setEventListeners = (formElement, validationConfig) => {
  const inputList = Array.from(formElement.querySelectorAll(validationConfig.inputSelector));
  const buttonElement = formElement.querySelector(validationConfig.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, validationConfig);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      isValid(formElement, inputElement, buttonElement, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });
};

const enableValidation = (validationConfig) => {
  const formList = Array.from(document.querySelectorAll(validationConfig.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, validationConfig);
  });
}

enableValidation (validationConfig);

