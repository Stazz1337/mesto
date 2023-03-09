// http://www.clck.ru/33gbDP - картинка для тест вставки

import Card from './Card.js';
import FormValidator from './FormValidator.js';

// const template = document.querySelector('.card-template').content.querySelector(".place__item-wrapper");
const list = document.querySelector('.place');
const popupAddCardOpenButton = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_add-card');
export const formAddCard = document.querySelector('.popup__form_type_add-card');
const popupEditProfileOpenButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
export const formEditProfile = document.querySelector('.popup__form_type_edit-profile');
const name = document.querySelector('.profile__title');
const job = document.querySelector('.profile__subtitle');
const nameInput = document.querySelector('.popup__text_type_name');
const jobInput = document.querySelector('.popup__text_type_job');
const imageNameInput = document.querySelector('.popup__text_type_imageName');
const imageLinkInput = document.querySelector('.popup__text_type_imageLink');
const popups = document.querySelectorAll('.popup');

// добавление карточек с массива

initialCards.forEach(item => {
  const card = createCard(item.name, item.link, '.card-template_type_default');
  const cardElement = card.generateCard();
  renderCard(cardElement);
})

// рендер начального массива

function renderCard(card) {
  list.append(card);
}

// создание карточки как экземпляра класса

function createCard(name, link, templateSelector) {
  const newCard = new Card(name, link, templateSelector) ;
  return newCard;
}

// открыть попап добавления карточки

function openAddFormPopup () {
  openPopup(popupAddCard);
}

// обработчик добавление карточки из формы AddCard

 function handleFormAddCardSubmit (evt) {
  evt.preventDefault();

  // addCardBegin(createCard(imageNameInput.value, imageLinkInput.value));

  const card = new Card(imageNameInput.value, imageLinkInput.value, '.card-template_type_default');
  const cardElement = card.generateCard();
  document.querySelector('.place').prepend(cardElement);

  closePopup(popupAddCard);
  formAddCard.reset();
}

// открыть попап c формой edit - profile

function openPopupEditProfile () {
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
  openPopup(popupEditProfile);
};

// открыть/закрыть попап

export default function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', handlePopupCloseEscape);
};

function closePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', handlePopupCloseEscape);
};

// обработка сабмит формы edit - profile

function handleFormSubmit (evt, popup) {
  evt.preventDefault();
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  closePopup(popup);
}

// кнопки открытия и сабмиты форм

popupAddCardOpenButton.addEventListener('click', openAddFormPopup);
formAddCard.addEventListener('submit', handleFormAddCardSubmit);
popupEditProfileOpenButton.addEventListener('click', openPopupEditProfile);
formEditProfile.addEventListener('submit', evt => handleFormSubmit(evt, popupEditProfile));

// ПР-6
// закрытие попапов на escape

// document.addEventListener('keydown', handlePopupCloseEscape);

const handlePopupCloseEscape = (evt) => {
  if (evt.key === 'Escape') {
    const popupActive = document.querySelector('.popup_opened');
    closePopup (popupActive);
  };
};

// закрытие попапов по клику вне форм и кнопке X

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains('popup_opened')) {
            closePopup(popup)
        }
        if (evt.target.classList.contains('popup__close')) {
          closePopup(popup)
        }
    })
})

// создание классов валидации форм

const validatorEditProfileForm = new FormValidator(config, formEditProfile);
validatorEditProfileForm.enableValidation();

const validatorAddCardForm = new FormValidator(config, formAddCard);
validatorAddCardForm.enableValidation();

/*
// добавление карточек с массива

initialCards.forEach(item => {
  const card = createCard(item.name, item.link);
  renderCard(card);
})

// рендер начального массива

function renderCard(card) {
  list.append(card);
}

// создание карточки

function createCard(name, link) {
  const newCard = template.cloneNode(true);
  newCard.querySelector('.place__title').textContent = name;
  newCard.querySelector('.place__image').src = link;
  newCard.querySelector('.place__image').alt = name;
  newCard.querySelector('.place__image').addEventListener('click', openPopupImage);
  newCard.querySelector('.place__delete').addEventListener('click', removeCard);
  newCard.querySelector('.place__like').addEventListener('click', function (event) {
    event.target.classList.toggle('place__like_active');
  })
  return newCard;
}*/

// вызов данных валидации формы

/*enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button:disabled',
  inputErrorClass: 'popup__input-error',
  errorClass: 'popup__input-error_active'
});*/

/*
// закрытие попапов по клику вне форм - альтернативный код

popups.forEach(function(targetPopup) {
  targetPopup.addEventListener('click', handlePopupCloseOuterClick)
});

function handlePopupCloseOuterClick (evt) {
  if (evt.target === evt.currentTarget) {
    closePopup (evt.target);
  };
};

// закрыть на кнопку X  - альтернативный код

/*closeButtons.forEach(function(targetButton) {
  targetButton.addEventListener('click', evt => closePopup(evt.target.closest('.popup')))
});
*/

// 5. удаление карточки place__item по клику на корзину - процедурный код

/* function removeCard (event) {
  const cardToDelete = event.target.closest('.place__item-wrapper');
  cardToDelete.remove();
};  */

//  6. открытие popup__image  - процедурный код

/* function openPopupImage(event){
  openPopup(popupImage);
  popupBackground.src = event.target.src;
  popupBackground.alt = event.target.alt;
  imageTitle.textContent = event.target.nextElementSibling.nextElementSibling.textContent;
}  */

// добавить новую карточку в начало списка

/* function addCardBegin(card) {
  list.prepend(card);
}  */

//export const popupImage = document.querySelector('.popup_type_image');
//export const popupBackground = document.querySelector('.popup__image');
//export const imageTitle = document.querySelector(".popup__image-title");

// const title =  document.querySelector('.place__title');
// const closeButtons = document.querySelectorAll('.popup__close');


//const errorFields = Array.from(document.querySelectorAll('.popup__input-error'));
//const inputFields = Array.from(document.querySelectorAll('.popup__text'));
//const buttonSubmitAddCard = formAddCard.querySelector('.popup__button');

//const cardTemplate = document.querySelector('.card-template');

// обработка массива
/*
initialCards.forEach(item => {
  const card = new Card(item.name, item.link);
  const cardElement = card.generateCard();
  document.querySelector('.place').append(cardElement);
})*/
