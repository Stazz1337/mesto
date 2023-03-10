// http://www.clck.ru/33gbDP - картинка для тест вставки

import {initialCards, config} from "./data.js"
import Card from './Card.js';
import FormValidator from './FormValidator.js';

// const template = document.querySelector('.card-template').content.querySelector(".place__item-wrapper");
const cardsContainer = document.querySelector('.place');
const popupAddCardOpenButton = document.querySelector('.profile__add-button');
const popupAddCard = document.querySelector('.popup_type_add-card');
const formAddCard = document.querySelector('.popup__form_type_add-card');
const popupEditProfileOpenButton = document.querySelector('.profile__edit-button');
const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const formEditProfile = document.querySelector('.popup__form_type_edit-profile');
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
  renderCard(card);
})

// рендер начального массива

function renderCard(card) {
  cardsContainer.append(card);
}

// создание карточки как экземпляра класса

function createCard(name, link, templateSelector) {
  const card = new Card(name, link, templateSelector);
  const cardElement = card.generateCard();
  return cardElement;
}

// открыть попап добавления карточки

function openAddFormPopup () {
  validatorAddCardForm.resetValidation();
  openPopup(popupAddCard);
}

// обработчик добавление карточки из формы AddCard

 function handleFormAddCardSubmit (evt) {
  evt.preventDefault();
  const cardElement = createCard(imageNameInput.value, imageLinkInput.value, '.card-template_type_default');
  cardsContainer.prepend(cardElement);
  closePopup(popupAddCard);
  formAddCard.reset();
}

// открыть попап c формой edit - profile

function openPopupEditProfile () {
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
  validatorEditProfileForm.resetValidation();
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

// закрытие попапов на escape

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
