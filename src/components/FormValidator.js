export default class FormValidator {
  constructor(config, formElement) {
    this._config = config;
    this._form = formElement;

    this._formFields = Array.from(
      this._form.querySelectorAll(this._config.inputSelector)
    );

    this._buttonSubmitForm = this._form.querySelector(
      this._config.submitButtonSelector
    );
  }

  // блокировка сабмит

  _switchSubmitButtonState() {
    const formIsValid = this._formFields.every(
      (inputField) => inputField.validity.valid
    );
    if (!formIsValid) {
      this._buttonSubmitForm.setAttribute("disabled", true);
    } else {
      this._buttonSubmitForm.removeAttribute("disabled");
    }
  }

  // проверка валидации

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
  }

  // показать поле с ошибкой

  _showInputError(inputElement, errorMessage) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(this._config.errorClass);
  }

  // спрятать поле с ошибкой

  _hideInputError(inputElement) {
    const errorElement = this._form.querySelector(`.${inputElement.id}-error`);
    errorElement.classList.remove(this._config.errorClass);
    errorElement.textContent = "";
  }

  // сброс валидации

  resetValidation() {
    this._switchSubmitButtonState();
    this._formFields.forEach((inputElement) => {
      this._hideInputError(inputElement);
    });
  }

  // обработка валидации форм

  enableValidation() {
    /*this._form.addEventListener('reset', () => { // собыите `reset` происходит когда вызывается `reset` у формы
      setTimeout(() => {  // добавить таймаут, чтобы `toggleButtonState` вызвался уже после сохранения формы
        this._switchSubmitButtonState(), 0 })
    })*/

    this._formFields.forEach((inputField) => {
      inputField.addEventListener("input", () => {
        this._checkInputValidity(inputField);
        this._switchSubmitButtonState();
      });
    });
  }
}
