import { popupText, popupImage, popupTypeImage } from "./constants.js";
import { openPopup } from "./utils.js";

export default class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
  }

  _getTemplate() {
    // забираем разметку из HTML и клонируем элемент
    const cardElement = document
      .querySelector(this._cardSelector)
      .content.querySelector(".cards__element")
      .cloneNode(true);
    // вернём DOM-элемент карточки
    return cardElement;
  }

  generateCard() {
    // Запишем разметку в приватное поле _element.
    this._element = this._getTemplate();
    this._setEventListeners();
    // Добавим данные
    this._element.querySelector(".cards__title").textContent = this._name;
    this._element.querySelector(".cards__picture").src = this._link;
    this._element.querySelector(".cards__picture").alt = this._name;

    // Вернём элемент наружу
    return this._element;
  }
  // функция 'мне нравится'
  _handleLike() {
    this._element
      .querySelector(".cards__like-button")
      .classList.toggle("cards__like-button_active");
  }

  // функция удаления карточек
  _removeCard() {
    this._element.remove();
  }

  // функция открытия попапа с картинкой
  _openImagePopup() {
    popupText.textContent = this._name;
    popupImage.src = this._link;
    popupImage.alt = this._name;
    openPopup(popupTypeImage);
  }

  _setEventListeners() {
    this._element
      .querySelector(".cards__like-button")
      .addEventListener("click", () => {
        this._handleLike();
      });
    this._element
      .querySelector(".cards__basket-button")
      .addEventListener("click", () => {
        this._removeCard();
      });
    this._element
      .querySelector(".cards__picture")
      .addEventListener("click", () => {
        this._openImagePopup();
      });
  }
}
