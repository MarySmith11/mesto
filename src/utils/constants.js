export const validatorConfig = {
  inputSelector: ".form__text",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__text_type_error",
  errorClass: "form__error_visible",
};

export const popupText = document.querySelector('.popup__text');
export const popupImage = document.querySelector('.popup__image');
export const popupTypeImage = document.querySelector('.popup_type_image');
// профиль
export const buttonEdit = document.querySelector(".profile__edit-button");
export const buttonAdd = document.querySelector(".profile__add-button");
export const editAvatarOpener = document.querySelector('.profile__avatar-wrap');
// формы и их элементы
export const editFormElement = document.forms["edit-profile"];
export const updateAvatarFormElement = document.forms['update-avatar'];
export const addFormElement = document.forms["add-card"];
export const nameInput = editFormElement.elements.name;
export const jobInput = editFormElement.elements.profession;
