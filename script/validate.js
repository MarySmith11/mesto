// функция состояния кнопки
const setSubmitButtonState = (formElement, selectors, isFormValid) => {
    const buttonElement = formElement.querySelector(selectors.submitButtonSelector);
    if (isFormValid) {
        buttonElement.removeAttribute('disabled');
        buttonElement.classList.remove(selectors.inactiveButtonClass);
    } else {
        buttonElement.setAttribute('disabled', true);
        buttonElement.classList.add(selectors.inactiveButtonClass);
    }
}

// функция показать ошибку
const showInputError = (formElement, inputElement, errorMessage, selectors) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(selectors.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(selectors.errorClass);
};

// функция скрыть ошибку
const hideInputError = (formElement, inputElement, selectors) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(selectors.inputErrorClass);
    errorElement.classList.remove(selectors.errorClass);
    errorElement.textContent = '';
};

// функция проверки валидации
const checkInputValidity = (formElement, inputElement, selectors) => {
    if (!inputElement.validity.valid) {
        showInputError(formElement, inputElement, inputElement.validationMessage, selectors);
    } else {
        hideInputError(formElement, inputElement, selectors);
    }
    const emptyValues = Array.from(formElement.elements).some((input) => {
        return input.type !== 'submit' && input.value.length === 0;
    });
    const inputWithError = formElement.querySelector(`.${selectors.inputErrorClass}`);
    if (inputWithError) {
        setSubmitButtonState(formElement, selectors, false);
    } else {
        setSubmitButtonState(formElement, selectors, !emptyValues);
    }
};

const setEventListeners = (formElement, selectors) => {
    const inputList = Array.from(formElement.querySelectorAll(selectors.inputSelector));
    inputList.forEach((inputElement) => {
        inputElement.addEventListener('input', function () {
            checkInputValidity(formElement, inputElement, selectors);
        });
    });
}

const enableValidation = (selectors) => {
    const formList = Array.from(document.querySelectorAll(selectors.formSelector));
    formList.forEach((formElement) => {
        formElement.addEventListener('submit', function (evt) {
            evt.preventDefault();
        });
        setEventListeners(formElement, selectors);
    });
}

enableValidation({
    formSelector: '.form',
    inputSelector: '.form__text',
    submitButtonSelector: '.form__button',
    inactiveButtonClass: 'form__button_disabled',
    inputErrorClass: 'form__text_type_error',
    errorClass: 'form__error_visible'
});
