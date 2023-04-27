import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupElement, handleFormSubmit) {
    super(popupElement);
    this._form = this._popup.querySelector(".popup__form");
    this._formFields = Array.from(this._form.querySelectorAll(".popup__text"));
    this._submitButton = this._form.querySelector(".popup__button");
    this._submitButtonTextContent = this._submitButton.textContent;
    this._handleFormSubmit = handleFormSubmit;
  }

  setInputValues(data) {
    this._formFields.forEach((input) => {
      // вставляем данные из объекта по атрибуту `name` этого инпута
      input.value = data[input.name];
    });
  }

  _getInputValues() {
    this._fieldsValues = {};
    this._formFields.forEach((element) => {
      this._fieldsValues[element.name] = element.value;
    });
    console.log(this._fieldsValues);
    return this._fieldsValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }

  setSubmitButtonText(savingState) {
    if (savingState) {
      this._submitButton.textContent = "Сохранение...";
    }
    if (!savingState) {
      this._submitButton.textContent = this._submitButtonTextContent;
    }
  }
}
