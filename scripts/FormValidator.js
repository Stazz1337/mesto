
export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._formElement = formElement;
  }

 // появление/удаление поля с ошибкой

  _errorFieldShowHide (errorField, currentField, errorClass) {
  const currentFieldIsValid = currentField.validity.valid;
  errorField.textContent = currentField.validationMessage;
  if (!currentFieldIsValid) {
    errorField.classList.add(errorClass);
  } else {
    errorField.textContent = '';
    errorField.classList.remove(errorClass);
  }
}
// блокировка сабмит

  _submitButtonSwitch (fields, button ) {
  const formIsValid = fields.every((inputField) => inputField.validity.valid );
  if (formIsValid) {
    button.removeAttribute('disabled')
  } else {
    button.setAttribute('disabled', true)
  }
}

// обработка валидации форм

  enableValidation () {
    const form = this._formElement;
    const formFields = Array.from(form.querySelectorAll(this._config.inputSelector));
    const buttonSubmitForm = form.querySelector(this._config.submitButtonSelector);
    /*form.addEventListener('reset', () => { // собыите `reset` происходит когда вызывается `reset` у формы
      setTimeout(() => {  // добавим таймаут, чтобы `toggleButtonState` вызвался уже после сохранения формы
        submitButtonSwitch(formFields, buttonSubmitForm), 0 })
    })*/
    formFields.forEach((inputField) => {
      const errorField = form.querySelector(`#${inputField.id} + .${this._config.inputErrorClass}`);
      inputField.addEventListener('input', (evt) => {
        const currentField = evt.target;
        this._errorFieldShowHide (errorField, currentField, this._config.errorClass);
        this._submitButtonSwitch (formFields, buttonSubmitForm );
      })
    })
  }
}

