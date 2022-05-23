import './index.css';
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import { FormValidator } from "../components/FormValidator.js";
import {
  initialCards,
  buttonEdit,
  buttonAdd,
  editFormElement,
  addFormElement,
  nameInput,
  jobInput,
  validatorConfig
} from "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import UserInfo from "../components/UserInfo.js";

const userInfo = new UserInfo({ nameSelector: ".profile__name", professionSelector: ".profile__profession" })

const loadInformation = () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.profession;
};

// попап с картинкой
const imagePopup = new PopupWithImage(".popup_type_image");
imagePopup.setEventListeners();

const addFormValidator = new FormValidator(validatorConfig, addFormElement);
addFormValidator.enableValidation();

const editFormValidator = new FormValidator(validatorConfig, editFormElement);
editFormValidator.enableValidation();

const createCard = (item) => {
  const card = new Card(item, ".card-template", (name, link) => {
    imagePopup.open(name, link);
  });
  return card.generateCard();
}

// создание карточки
const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      cardList.addItem(createCard(item));
    },
  },
  ".cards"
);

cardList.renderItems();

// попап добавления карточки
const addPopup = new PopupWithForm(".popup_type_add", (values) => {
  cardList.addItem(createCard(values));
});

addPopup.setEventListeners();

// обработчик клика на кнопку добавления карточки
buttonAdd.addEventListener("click", () => {
  addFormValidator.clearForm();
  addPopup.open();
});

// попап редактирования профиля
const editPopup = new PopupWithForm(".popup_type_edit", (values) => {
  userInfo.setUserInfo(values)
});

editPopup.setEventListeners();

// обработчик клика на кнопку редактирования профиля
buttonEdit.addEventListener("click", () => {
  loadInformation();
  editPopup.open();
});
