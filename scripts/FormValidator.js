// http://www.clck.ru/33gbDP - картинка для тест вставки

import {formAddCard, formEditProfile} from './index.js'

export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._form = formElement;

    this._formFields = Array.from(this._form.querySelectorAll(this._config.inputSelector));

    this._errorFields = Array.from(this._form.querySelectorAll(this._config.inputErrorClass));

    this._buttonSubmitForm = this._form.querySelector(this._config.submitButtonSelector);
  }

 // блокировка сабмит

  _switchSubmitButtonState (fields, button ) {
  const formIsValid = fields.every((inputField) => inputField.validity.valid );
  if (formIsValid) {
    button.removeAttribute('disabled')
  } else {
    button.setAttribute('disabled', true)
  }
 }

 // проверка валидации

  _checkInputValidity (formElement, inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(formElement, inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(formElement, inputElement);
    }
  };

  // показать поле с ошибкой

  _showInputError(formElement, inputElement, errorMessage){
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  };

  // спрятать поле с ошибкой

  _hideInputError(formElement, inputElement) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = '';
  };

 // проверить заполненность полей в addcard

  _checkEmptyInputsInAddCardForm(formFields){
    const inputsAreEmpty = formFields.every((formField) => formField.value.length === 0);
    if (inputsAreEmpty && this._form === formAddCard ) {
      this._buttonSubmitForm.setAttribute('disabled', true);
    }
  }

  // удалить поля ошибок в editprofile

  _removeErrorFieldsAfterSubmitEditProfile (errorFields) {
    if (this._form === formEditProfile) {
    errorFields.forEach((errorField)=>{errorField.classList.remove('popup__input-error_active')});
    }
  }

 // обработка валидации форм

  enableValidation () {
    /*this._form.addEventListener('reset', () => { // собыите `reset` происходит когда вызывается `reset` у формы
      setTimeout(() => {  // добавим таймаут, чтобы `toggleButtonState` вызвался уже после сохранения формы
        this._switchSubmitButtonState(this._formFields, this._buttonSubmitForm), 0 })
    })*/
    this._form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        this._removeErrorFieldsAfterSubmitEditProfile(this._errorFields);
      });

    this._checkEmptyInputsInAddCardForm(this._formFields);

    this._formFields.forEach((inputField) => {

      inputField.addEventListener('input', () => {
        this._checkInputValidity (this._form, inputField);
        this._switchSubmitButtonState (this._formFields, this._buttonSubmitForm);
      })
    })
  }
}

  /*
 // появление/удаление поля с ошибкой

  _showHideErrorField (errorField, currentField, errorClass) {
  const currentFieldIsValid = currentField.validity.valid;
  errorField.textContent = currentField.validationMessage;
  if (!currentFieldIsValid) {
    errorField.classList.add(errorClass);
  } else {
    errorField.textContent = '';
    errorField.classList.remove(errorClass);
  }
}*/

