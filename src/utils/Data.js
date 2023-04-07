/*export const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];*/

export const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__text',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button:disabled',
  inputErrorClass: 'popup__input-error',
  errorClass: 'popup__input-error_active'
};

export const popupImage = document.querySelector('.popup_type_image');
export const popupAddCardOpenButton = document.querySelector('.profile__add-button');
export const popupAddCard = document.querySelector('.popup_type_add-card');
export const formAddCard = document.querySelector('.popup__form_type_add-card');
export const formUpdateAvatar = document.querySelector('.popup__form_type_update-avatar');
export const popupEditProfileOpenButton = document.querySelector('.profile__edit-button');
export const popupEditProfile = document.querySelector('.popup_type_edit-profile');
export const formEditProfile = document.querySelector('.popup__form_type_edit-profile');
export const cardListSelector = '.place';

export const removeCardButton = document.querySelector('.place__delete');

export const popupConfirmElement = document.querySelector('.popup_type_confirm');
export const popupUpdateAvatarElement = document.querySelector('.popup_type_update-avatar');
export const buttonEditAvatar = document.querySelector('.profile__avatar-edit-button');
