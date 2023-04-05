// http://www.clck.ru/33gbDP - картинка для тест вставки

import './index.css';

import {config} from "../utils/Data.js"
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import UserInfo from "../components/UserInfo.js";
import PopupWithForm from "../components/PopupWithForm.js";

import Api from "../components/Api.js";
import PopupConfirm from '../components/PopupConfirm.js';


import {popupImage,
  popupAddCardOpenButton,
  popupAddCard,
  formAddCard,
  popupEditProfileOpenButton,
  popupEditProfile,
  formEditProfile,
  nameInput,
  jobInput,
  cardListSelector,
  formUpdateAvatar,
  popupConfirmElement,
  popupUpdateAvatarElement,
  buttonEditAvatar
} from "../utils/Data.js";

let currentUserId = '';

//api

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-63',
  headers: {
    authorization: 'f5c9f646-83a1-4941-8ba4-5e0e854925e0',
    'Content-Type': 'application/json'
  }
});


// создание карточки

function createCard(cardData, currentUserId, templateSelector, handleCardClick, handleRemoveCardClick, putLike, deleteLike) {
  const card = new Card(cardData, currentUserId, templateSelector, handleCardClick, handleRemoveCardClick, putLike, deleteLike);
  const cardElement = card.generateCard();
  return cardElement;
}

// получить данные профайла и аватара с сервера

api.getUserInfo()
.then((result) => {
  console.log(result);
  userInfo.setUserInfo(result.name, result.about);
  userInfo.setAvatar(result.avatar);

  currentUserId = result._id;
  }
)

.catch((err) => {
  console.log(err);
});

// добавление карточек с массива сервера

api.getInitialCards()

.then(result => {
  defaultCardList.renderItems(result)
})

.catch((err) => {
  console.log(err);
});



const defaultCardList = new Section({
  //items: initialCards,
  renderer: (item) => {
    const cardElement = createCard(item, currentUserId, '.card-template_type_default', handleCardClick, handleRemoveCardClick, putLike, deleteLike);
    defaultCardList.addItem(cardElement, 'append');
  }
}, cardListSelector);
//defaultCardList.renderItems()



// открыть попап добавления карточки

function openAddFormPopup () {
  validatorAddCardForm.resetValidation();
  addCardNewPopup.open();
}

// обработчик добавление карточки из формы AddCard

 function handleFormAddCardSubmit (newInputValues) {

  addCardNewPopup.setSubmitButtonText(true)

  // добавить карточку на сервер

  api.postCardServer(newInputValues)
  .then ((res) => {
     console.log(res);

     const cardElement = createCard(res, currentUserId, '.card-template_type_default', handleCardClick, handleRemoveCardClick, putLike, deleteLike);
     defaultCardList.addItem(cardElement, 'prepend');
     addCardNewPopup.close();
     formAddCard.reset();
  })
  .then (() => {
    addCardNewPopup.close();
    formAddCard.reset();
  })

  .catch((err) => {
    console.log(err);
  })
  .finally(() => addCardNewPopup.setSubmitButtonText(false) );
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

  editProfileNewPopup.setSubmitButtonText(true);

  userInfo.setUserInfo(newValues.name, newValues.job);

  // отправить данные редактирование профиля на сервер

  api.setUserInfo(newValues)

  .then((res) => {
    console.log(res);
    editProfileNewPopup.close()
  })

  .catch((err) => {
    console.log(err)})

  .finally(() => editProfileNewPopup.setSubmitButtonText(false) );
}

// кнопки открытия и сабмиты форм

popupAddCardOpenButton.addEventListener('click', openAddFormPopup);
popupEditProfileOpenButton.addEventListener('click', openPopupEditProfile);

// создание классов валидации форм

const validatorEditProfileForm = new FormValidator(config, formEditProfile);

validatorEditProfileForm.enableValidation();

const validatorAddCardForm = new FormValidator(config, formAddCard);

validatorAddCardForm.enableValidation();

const validatorformUpdateAvatar = new FormValidator(config, formUpdateAvatar);

validatorformUpdateAvatar.enableValidation();


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

const userInfo = new UserInfo ({name: '.profile__title', job: '.profile__subtitle', avatar: '.profile__avatar'});


// попап confirm после клика на корзину карточки и сабмит удаления карточки

const popupConfirm = new PopupConfirm (popupConfirmElement, handleFormConfirmSubmit);
popupConfirm.setEventListeners();

let cardId = '';
let event = '';

function handleRemoveCardClick (newCardId, newEvent) {

  popupConfirm.open();
  cardId = newCardId;
  event = newEvent;

};

function handleFormConfirmSubmit () {
  api.deleteCard(cardId)
  .then(() => {

  popupConfirm.close();
  event.closest('.place__item-wrapper').remove();
  })
  .catch((err) => {
    console.log(err)});
}


// установка аватара

const popupUpdateAvatar = new PopupWithForm (popupUpdateAvatarElement, popupUpdateAvatarFormSubmit);
popupUpdateAvatar.setEventListeners();


function popupUpdateAvatarFormSubmit(newValue) {

  popupUpdateAvatar.setSubmitButtonText(true);

  api.setAvatar(newValue.imageLink)
  .then((res) => {
      userInfo.setAvatar(res.avatar);

    })

  .then(() => {popupUpdateAvatar.close()})

  .catch((err) => {
    console.log(err)})
  .finally(() => popupUpdateAvatar.setSubmitButtonText(false));
}

function openPopupUpdateAvatar () {
  validatorformUpdateAvatar.resetValidation();
  popupUpdateAvatar.open()
 }

 buttonEditAvatar.addEventListener('click', openPopupUpdateAvatar);


 // поставить, убрать лайк

function putLike (cardId) {
  api.putCardLike(cardId)
}

function deleteLike (cardId) {
  api.deleteCardLike(cardId)
}










