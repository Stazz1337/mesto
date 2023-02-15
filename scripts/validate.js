// появление/удаление поля с ошибкой

function errorFieldShowHide (errorField, currentField, errorClass) {
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

function submitButtonSwitch (fields, button ) {
  const formIsValid = fields.every((inputField) => inputField.validity.valid );
  if (formIsValid) {
    button.removeAttribute('disabled')
  } else {
    button.setAttribute('disabled', true)
  }
}

// обработка валидации форм

const enableValidation = (config) => {
  const formsList = document.querySelectorAll(config.formSelector);
  formsList.forEach((form) => {
    const formFields = Array.from(form.querySelectorAll(config.inputSelector));
    const buttonSubmitForm = form.querySelector(config.submitButtonSelector);
    form.addEventListener('reset', () => { // собыите `reset` происходит когда вызывается `reset` у формы
      setTimeout(() => {  // добавим таймаут, чтобы `toggleButtonState` вызвался уже после сохранения формы
        submitButtonSwitch(formFields, buttonSubmitForm), 0 })
    })
    formFields.forEach((inputField) => {
      const errorField = form.querySelector(`#${inputField.id} + .${config.inputErrorClass}`);
      inputField.addEventListener('input', (evt) => {
        const currentField = evt.target;
        errorFieldShowHide (errorField, currentField, config.errorClass);
        submitButtonSwitch (formFields, buttonSubmitForm );
      })
    })
  })
}
