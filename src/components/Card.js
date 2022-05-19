export default class Card {
  constructor(data, cardSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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
    const cardPicture = this._element.querySelector(".cards__picture");
    cardPicture.src = this._link;
    cardPicture.alt = this._name;

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
    this._element = null;
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
        this._handleCardClick(this._name, this._link);
      });
  }
}
