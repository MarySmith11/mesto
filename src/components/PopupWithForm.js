import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, formCallback) {
    super(popupSelector);
    this._formCallback = formCallback;
    this._form = this._popup.querySelector(".form");
    this._formElements = Array.from(this._form.elements);
    this._submitHandler = this._submitHandler.bind(this);
    this._submitButton = this._form.querySelector('.form__button');
  }

  _getInputValues() {
    const values = {}
    this._formElements.forEach((input) => {
        values[input.name] = input.value;
    })
    return values;
  }

  close() {
    this._form.reset();
    super.close();
  }

  _submitHandler(evt) {
      evt.preventDefault();
      this._formCallback(this._getInputValues())
      this.close();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', this._submitHandler);
  }
  
  getButtonElement(){ 
    return this._submitButton;
  } 
}
