import Popup from "./Popup.js";

export default class PopupConfirmation extends Popup {
  constructor(popupSelector, buttonClickCallback) {
    super(popupSelector);
    this._buttonClickCallback = buttonClickCallback;
    this._buttonClickHandler = this._buttonClickHandler.bind(this);
    this._confirmationButton = this._popup.querySelector('.form__button_type_confirmation');
    this._card = null;
  }

  _buttonClickHandler() {
      this._buttonClickCallback(this._card);
      this.setCard(null);
      this.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._confirmationButton.addEventListener('click', this._buttonClickHandler);
  }
  
  getButtonElement(){ 
    return this._submitButton;
  } 

  setCard(card) {
    this._card = card;
  }
}
