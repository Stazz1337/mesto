let popup__open = document.querySelector('.profile__edit-button');
let popup__close = document.querySelector('.popup__toggle');
let formElement = document.querySelector('.popup');

let name = document.querySelector('.profile__title');
let job = document.querySelector('.profile__subtitle');

let nameInput = document.querySelector('.popup__item_name');
let jobInput = document.querySelector('.popup__item_job');


function Toggle() {
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
  formElement.classList.toggle('popup_opened');
}

popup__open.addEventListener('click', Toggle);
popup__close.addEventListener('click', Toggle);


function handleFormSubmit (evt) {
  evt.preventDefault();

   name.textContent = nameInput.value;
   job.textContent = jobInput.value;

}

formElement.addEventListener('submit', handleFormSubmit);


