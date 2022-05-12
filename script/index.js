import Card from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { closePopup, openPopup } from "./utils.js";
import { initialCards } from './constants.js';

// попапы
const closePopupButtons = document.querySelectorAll(".popup__close-button");
const popupAdd = document.querySelector(".popup_type_add");
const popupEdit = document.querySelector(".popup_type_edit");

// профиль
const userName = document.querySelector(".profile__name");
const userJob = document.querySelector(".profile__profession");
const buttonEdit = document.querySelector(".profile__edit-button");
const buttonAdd = document.querySelector(".profile__add-button");

// формы и их элементы
const editFormElement = document.forms["edit-profile"];
const addFormElement = document.forms["add-card"];
const nameInput = editFormElement.elements.name;
const jobInput = editFormElement.elements.profession;
const titleNameInput = addFormElement.elements.titleName;
const linkInput = addFormElement.elements.link;
const buttonCreate = document.querySelector(".form__button_create");

const cardsContainer = document.querySelector(".cards");

// получение текстового содержимого имени и профессии в профиле
const loadInformation = () => {
  nameInput.value = userName.textContent;
  jobInput.value = userJob.textContent;
};

// обработчик отправки формы редактирования профиля
const handleProfileFormSubmit = (evt) => {
  // отмена стандартного поведения HTML
  evt.preventDefault();
  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  closePopup();
};

// обработчик клика на кнопку редактирования профиля
buttonEdit.addEventListener("click", () => {
  loadInformation();
  openPopup(popupEdit);
});

// обработчик клика на кнопку добавления карточек
buttonAdd.addEventListener("click", () => {
  openPopup(popupAdd);
});

// обработчик клика на кнопку закрытия попапов
closePopupButtons.forEach((elem) => {
  elem.addEventListener("click", closePopup);
});

// обработчики отправки форм
editFormElement.addEventListener("submit", handleProfileFormSubmit);

initialCards.forEach((initCard) => {
  const card = new Card(initCard, ".card-template");
  const cardElement = card.generateCard();

  // Добавляем в DOM
  cardsContainer.prepend(cardElement);
});

// обработчик отправки формы добавления карточки
const handleFormSubmitAddCard = (evt) => {
  evt.preventDefault();
  const element = {};
  element.name = titleNameInput.value;
  element.link = linkInput.value;
  const card = new Card(element, ".card-template");
  const cardElement = card.generateCard();
  cardsContainer.prepend(cardElement);
  addFormElement.reset();
  buttonCreate.setAttribute("disabled", true);
  buttonCreate.classList.add("form__button_disabled");
  closePopup();
};

// создание карточки через попап
addFormElement.addEventListener("submit", handleFormSubmitAddCard);

const addFormValidator = new FormValidator({
  inputSelector: ".form__text",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__text_type_error",
  errorClass: "form__error_visible",
}, addFormElement);
addFormValidator.enableValidation();

const editFormValidator = new FormValidator({
    inputSelector: ".form__text",
    submitButtonSelector: ".form__button",
    inactiveButtonClass: "form__button_disabled",
    inputErrorClass: "form__text_type_error",
    errorClass: "form__error_visible",
  }, editFormElement);
editFormValidator.enableValidation();
