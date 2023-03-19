// http://www.clck.ru/33gbDP - картинка для тест вставки

import '../pages/index.css';

import {initialCards, config} from "../scripts/Data.js"
import Card from '../scripts/Card.js';
import FormValidator from '../scripts/FormValidator.js';
import Section from "../scripts/Section.js";
import PopupWithImage from "../scripts/PopupWithImage.js";
import UserInfo from "../scripts/UserInfo.js";
import PopupWithForm from "../scripts/PopupWithForm.js";

import {popupImage,
  cardsContainer,
  popupAddCardOpenButton,
  popupAddCard,
  formAddCard,
  popupEditProfileOpenButton,
  popupEditProfile,
  formEditProfile,
  name,
  job,
  nameInput,
  jobInput,
  imageNameInput,
  imageLinkInput,
  cardListSelector
} from "../scripts/Data.js";

// создание карточки

function createCard(name, link, templateSelector, handleCardClick) {
  const card = new Card(name, link, templateSelector, handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

// добавление карточек с массива

const defaultCardList = new Section({
  items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item.name, item.link, '.card-template_type_default', handleCardClick);
    defaultCardList.addItem(cardElement);
  }
}, cardListSelector);

defaultCardList.renderItems()

// открыть попап добавления карточки

function openAddFormPopup () {
  validatorAddCardForm.resetValidation();
  addCardNewPopup.openPopup();
}

// обработчик добавление карточки из формы AddCard

 function handleFormAddCardSubmit () {
  const cardElement = createCard(imageNameInput.value, imageLinkInput.value, '.card-template_type_default', handleCardClick);
  cardsContainer.prepend(cardElement);
  addCardNewPopup.closePopup();
  formAddCard.reset();
}

// открыть попап c формой edit - profile

function openPopupEditProfile () {
  /*
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;*/

  const defaultValues = userInfo.getUserInfo();

  nameInput.value = defaultValues.name;
  jobInput.value = defaultValues.job;

  validatorEditProfileForm.resetValidation();

  editProfileNewPopup.openPopup();
};

// обработка сабмит формы edit - profile

function handleFormEditProfileSubmit (newValues) {

  /*
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;*/

  userInfo.setUserInfo(newValues.name, newValues.job);

  editProfileNewPopup.closePopup();
}

// кнопки открытия и сабмиты форм

popupAddCardOpenButton.addEventListener('click', openAddFormPopup);
popupEditProfileOpenButton.addEventListener('click', openPopupEditProfile);

// создание классов валидации форм

const validatorEditProfileForm = new FormValidator(config, formEditProfile);

validatorEditProfileForm.enableValidation();

const validatorAddCardForm = new FormValidator(config, formAddCard);

validatorAddCardForm.enableValidation();

// создание попапов форм и установка обработчиков

const editProfileNewPopup = new PopupWithForm (popupEditProfile, handleFormEditProfileSubmit);
editProfileNewPopup.setEventListeners();

const addCardNewPopup = new PopupWithForm (popupAddCard, handleFormAddCardSubmit);
addCardNewPopup.setEventListeners();

// создание попапа с картинкой и установка обработчика

const popupImageNew = new PopupWithImage (popupImage);
popupImageNew.setEventListeners();

// обработка клика на карточку

function handleCardClick (name, link) {
  popupImageNew.openPopup(name, link);
}

// создание экземпляра инфо формы

const userInfo = new UserInfo ({name: '.profile__title', job: '.profile__subtitle'});
