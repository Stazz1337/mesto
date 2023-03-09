// http://www.clck.ru/33gbDP - картинка для тест вставки

import openPopup from './index.js'

const popupImage = document.querySelector('.popup_type_image');
const popupBackground = document.querySelector('.popup__image');
const imageTitle = document.querySelector(".popup__image-title");

export default class Card {
  constructor(name, link, templateSelector) {
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector(".place__item-wrapper")
      .cloneNode(true);
    return cardElement;
  }

 generateCard() {

  // Запишем разметку в приватное поле _element.
  this._element = this._getTemplate();
  this._cardImage = this._element.querySelector('.place__image');
  this._cardTitle = this._element.querySelector('.place__title');
  this._likeButton = this._element.querySelector('.place__like');
  this._deleteButton = this._element.querySelector('.place__delete');

  // вызов обработчики кликов
  this._setEventListeners();

  // Добавим данные
  this._cardTitle.textContent = this._name;
  this._cardImage.src = this._link;
  this._cardImage.alt = this._name;

  // Вернём элемент наружу
  return this._element;
 }

  _removeCard() {
    this._element.remove();
    this._element = null;
  };

  _likeCard() {
    this._likeButton.classList.toggle('place__like_active');
  }

  _openPopupImage(){
    openPopup(popupImage);
    popupBackground.src = this._cardImage.src;
    popupBackground.alt = this._cardImage.alt;
    imageTitle.textContent = this._cardTitle.textContent;
  };

 _setEventListeners(){
  this._deleteButton.addEventListener('click', () => {this._removeCard()});
  this._cardImage.addEventListener('click', () => {this._openPopupImage()});
  this._likeButton.addEventListener('click', () => {this._likeCard()})
 }
}
