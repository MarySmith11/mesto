import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._name = this._popup.querySelector(".popup__text");
    this._image = this._popup.querySelector(".popup__image");
  }

  open(name, link) {
    this._name.textContent = name;
    this._image.src = link;
    this._image.alt = name;
    super.open();
  }
}
