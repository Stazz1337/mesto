let popupOpenButton = document.querySelector('.profile__edit-button');
let popupCloseButton = document.querySelector('.popup__close');

let popup = document.querySelector('.popup');
let form = document.querySelector('.popup__form');

let name = document.querySelector('.profile__title');
let job = document.querySelector('.profile__subtitle');

let nameInput = document.querySelector('.popup__text_type_name');
let jobInput = document.querySelector('.popup__text_type_job');

function openPopup () {
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
  popup.classList.add('popup_opened');
}

function closePopup () {
  popup.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
  evt.preventDefault();
   name.textContent = nameInput.value;
   job.textContent = jobInput.value;
   closePopup();
}

popupOpenButton.addEventListener('click', openPopup);
popupCloseButton.addEventListener('click', closePopup);
form.addEventListener('submit', handleFormSubmit);

