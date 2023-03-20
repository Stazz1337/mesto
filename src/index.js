// http://www.clck.ru/33gbDP - картинка для тест вставки

import '../pages/index.css';

import {initialCards, config} from "../components/Data.js"
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";

import {popupImage,
  popupAddCardOpenButton,
  popupAddCard,
  formAddCard,
  popupEditProfileOpenButton,
  popupEditProfile,
  formEditProfile,
  nameInput,
  jobInput,
  imageNameInput,
  imageLinkInput,
  cardListSelector
} from "../components/Data.js";

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
    defaultCardList.addItem(cardElement, 'append');
  }
}, cardListSelector);

defaultCardList.renderItems()

// открыть попап добавления карточки

function openAddFormPopup () {
  validatorAddCardForm.resetValidation();
  addCardNewPopup.open();
}

// обработчик добавление карточки из формы AddCard

 function handleFormAddCardSubmit () {
  const cardElement = createCard(imageNameInput.value, imageLinkInput.value, '.card-template_type_default', handleCardClick);
  defaultCardList.addItem(cardElement, 'prepend');
  addCardNewPopup.close();
  formAddCard.reset();
}

// открыть попап c формой edit - profile

function openPopupEditProfile () {

  const defaultValues = userInfo.getUserInfo();

  nameInput.value = defaultValues.name;
  jobInput.value = defaultValues.job;

  validatorEditProfileForm.resetValidation();

  editProfileNewPopup.open();
};

// обработка сабмит формы edit - profile

function handleFormEditProfileSubmit (newValues) {

  userInfo.setUserInfo(newValues.name, newValues.job);

  editProfileNewPopup.close();
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
  popupImageNew.open(name, link);
}

// создание экземпляра инфо формы

const userInfo = new UserInfo ({name: '.profile__title', job: '.profile__subtitle'});
