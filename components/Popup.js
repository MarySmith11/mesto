export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._close = this.close.bind(this);
    this._closeButton = this._popup.querySelector(".popup__close-button");
  }

  open() {
    this._popup.classList.add("popup_opened");
    this.setEventListeners();
  }

  close() {
    this._popup.classList.remove("popup_opened");
    this.removeEventListeners();
  }

  _handleEscClose(e) {
    if (e.key === "Escape") {
      this.close();
    }
  }

  _handleOverlay = (evt) => {
    if (evt.target.classList.contains("popup")) {
      this.close();
    }
  };

  removeEventListeners() {
    document.removeEventListener("keydown", this._handleEscClose);
    document.removeEventListener("mousedown", this._handleOverlay);
    this._closeButton.removeEventListener("click", this._close);
  }

  setEventListeners() {
    document.addEventListener("keydown", this._handleEscClose);
    document.addEventListener("mousedown", this._handleOverlay);
    this._closeButton.addEventListener("click", this._close);
  }
}
