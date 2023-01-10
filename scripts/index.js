let popupOpenButton = document.querySelector('.profile__edit-button');
let popupCloseButton = document.querySelector('.popup__close');

let popup = document.querySelector('.popup');
let form = document.querySelector('.popup__form');

let name = document.querySelector('.profile__title');
let job = document.querySelector('.profile__subtitle');

let nameInput = document.querySelector('.name');
let jobInput = document.querySelector('.job');

function openForm () {
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
  popup.classList.add('popup_opened');
}

function closeForm () {
  popup.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
  evt.preventDefault();
   name.textContent = nameInput.value;
   job.textContent = jobInput.value;
   closeForm();
}

popupOpenButton.addEventListener('click', openForm);
popupCloseButton.addEventListener('click', closeForm);
form.addEventListener('submit', handleFormSubmit);

