export default class Card {
  constructor(data, cardSelector, handleCardClick, handleCardRemove, handleCardLike) {
    this._name = data.name;
    this._link = data.link;
    this._id = data.id;
    this._likes = data.likes;
    this._isLiked = data.isLiked;
    this._isOwner = data.isOwner;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
    this._handleCardRemove = handleCardRemove;
    this._handleCardLike = handleCardLike;
    this._likeCounter = null;
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
    this._likeCounter = this._element.querySelector('.cards__like-counter');
    this.setLikeCount(this._likes);
    const cardPicture = this._element.querySelector(".cards__picture");
    cardPicture.src = this._link;
    cardPicture.alt = this._name;
    if (!this._isOwner) {
      this._element.querySelector(".cards__basket-button").remove();
    }
    if (this._isLiked) {
      this.handleLike();
    }

    // Вернём элемент наружу
    return this._element;
  }
  // функция 'мне нравится'
  handleLike() {
    this._element
      .querySelector(".cards__like-button")
      .classList.toggle("cards__like-button_active");
  }

  // функция удаления карточек
  removeCard() {
    this._element.remove();
    this._element = null;
  }

  _setEventListeners() {
    this._element
      .querySelector(".cards__like-button")
      .addEventListener("click", this._handleCardLike.bind(this));
    this._element
      .querySelector(".cards__basket-button")
      .addEventListener("click", this._handleCardRemove.bind(this));
    this._element
      .querySelector(".cards__picture")
      .addEventListener("click", () => {
        this._handleCardClick(this._name, this._link);
      });
  }

  setLikeCount(count) {
    this._likeCounter.textContent = count;
  }

  isLiked() {
    return this._isLiked;
  }

  getId() {
    return this._id;
  }
}
