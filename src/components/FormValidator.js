export class FormValidator {
  constructor(config, form) {
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inactiveButtonClass = config.inactiveButtonClass;
    this._inputErrorClass = config.inputErrorClass;
    this._errorClass = config.errorClass;
    this._form = form;
    this._submitButton = this._form.querySelector(config.submitButtonSelector);
  }

  enableValidation() {
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }

  clearForm() {
    this._form.reset();
    this._setSubmitButtonState(false);
  }

  _setEventListeners() {
    Array.from(this._form.querySelectorAll(this._inputSelector)).forEach(
      (input) => {
        input.addEventListener("input", (evt) => {
          this._checkInputValidity(evt);
        });
      }
    );
  }

  // функция проверки валидации
  _checkInputValidity(evt) {
    const inputElement = evt.target;
    this._toggleInputError(inputElement, inputElement.validity.valid);
    const emptyValues = Array.from(this._form.elements).some((input) => {
      return input.type !== "submit" && input.value.length === 0;
    });
    const inputWithError = this._form.querySelector(
      `.${this._inputErrorClass}`
    );
    if (inputWithError) {
      this._setSubmitButtonState(false);
    } else {
      this._setSubmitButtonState(!emptyValues);
    }
  }

  // метод скрытия/показа ошибки
  _toggleInputError(inputElement, valid) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = valid ? '' : inputElement.validationMessage;
    inputElement.classList.toggle(this._inputErrorClass, !valid);
    errorElement.classList.toggle(this._errorClass, !valid);
  }

  // функция смены состояния кнопки
  _setSubmitButtonState(isFormValid) {
    this._submitButton.classList.toggle(this._inactiveButtonClass, !isFormValid);
    if (isFormValid) {
      this._submitButton.removeAttribute('disabled');
    } else {
      this._submitButton.setAttribute('disabled', true);    
    }
  }
}

