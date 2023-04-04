
import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor(popupElement, handleFormSubmit) {
    super(popupElement);
    this._form = this._popup.querySelector('.popup__form');
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues(){

    this._formFields = Array.from(this._form.querySelectorAll('.popup__text'));

    this._fieldsValues = {};

    this._formFields.forEach((element) => {
      this._fieldsValues[element.name] = element.value;
     });

    console.log(this._fieldsValues);
  
    return this._fieldsValues;
  }

  setEventListeners(){
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();

      this._handleFormSubmit(this._getInputValues())});
  }

  close() {
    super.close();
    this._form.reset();
  }
}
