import Card from "../components/Card.js";
import Section from "../components/Section.js";
import { FormValidator } from "../components/FormValidator.js";
import { initialCards } from "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

// профиль
const buttonEdit = document.querySelector(".profile__edit-button");
const buttonAdd = document.querySelector(".profile__add-button");

// формы и их элементы
const editFormElement = document.forms["edit-profile"];
const addFormElement = document.forms["add-card"];
const nameInput = editFormElement.elements.name;
const jobInput = editFormElement.elements.profession;

const userInfo = new UserInfo({nameSelector: ".profile__name", professionSelector: ".profile__profession"})

const loadInformation = () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.profession;
};

// попап с картинкой
const imagePopup = new PopupWithImage(".popup_type_image");

const validatorConfig = {
  inputSelector: ".form__text",
  submitButtonSelector: ".form__button",
  inactiveButtonClass: "form__button_disabled",
  inputErrorClass: "form__text_type_error",
  errorClass: "form__error_visible",
};

const addFormValidator = new FormValidator(validatorConfig, addFormElement);
addFormValidator.enableValidation();

const editFormValidator = new FormValidator(validatorConfig, editFormElement);
editFormValidator.enableValidation();

// создание карточки
const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, ".card-template", (name, link) => {
        imagePopup.open(name, link);
      });
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
    },
  },
  ".cards"
);

cardList.renderItems();

// попап добавления карточки
const addPopup = new PopupWithForm(".popup_type_add", (values) => {
  const card = new Card(values, ".card-template", (name, link) => {
    imagePopup.open(name, link);
  });
  const cardElement = card.generateCard();
  cardList.addItem(cardElement);
});
// обработчик клика на кнопку добавления карточки
buttonAdd.addEventListener("click", () => {
  addPopup.open();
});

// попап редактирования профиля
const editPopup = new PopupWithForm(".popup_type_edit", (values) => {
  userInfo.setUserInfo(values)
});
// обработчик клика на кнопку редактирования профиля
buttonEdit.addEventListener("click", () => {
  loadInformation();
  editPopup.open();
});
