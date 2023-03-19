
import Popup from './Popup.js'

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._form = this._popup.querySelector('.popup__form');
    this._handleFormSubmit = handleFormSubmit;
  }

  _getInputValues(){

    this._formFields = Array.from(this._form.querySelectorAll('.popup__text'));

    this._fieldsValues = {};

    this._formFields.forEach((element, index) => {
      this._fieldsValues[index] = element.value;
     });

    this._fieldsValues['name'] = this._fieldsValues['0'];
    this._fieldsValues['job'] = this._fieldsValues['1'];
    delete this._fieldsValues['0'];
    delete this._fieldsValues['1'];

    console.log(this._fieldsValues);
    return this._fieldsValues;
  }


  setEventListeners(){
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
     
      this._handleFormSubmit(this._getInputValues())});
  }

  closePopup() {
    super.closePopup();
    this._form.reset();
  }
}
