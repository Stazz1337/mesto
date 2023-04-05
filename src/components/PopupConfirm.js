import Popup from './Popup.js'

export default class PopupConfirm extends Popup {
  constructor(popupElement, handleFormSubmit) {
    super(popupElement);
    this._form = this._popup.querySelector('.popup__form');
    this._handleFormSubmit = handleFormSubmit;
  }


setEventListeners(){
  super.setEventListeners();

  this._form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    this._handleFormSubmit()});
}
}

