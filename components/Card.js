// http://www.clck.ru/33gbDP - картинка для тест вставки

export default class Card {
  constructor(cardData, currentUserId,  templateSelector, handleCardClick, handleRemoveCardClick, putLike, deleteLike) {

    this._name = cardData.name;
    this._link = cardData.link;

    this._likes = cardData.likes;

    this._cardId = cardData._id;

    this._cardOwnerId = cardData.owner._id;

    this._currentUserId = currentUserId;

    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;

    this._handleRemoveCardClick = handleRemoveCardClick;

    this._putLike = putLike;
    this._deleteLike = deleteLike;
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

  if (this._currentUserId !== this._cardOwnerId) {
    this._deleteButton.style.visibility = "hidden";
  }

  // вызов обработчики кликов
  this._setEventListeners();

  // Добавим данные
  this._cardTitle.textContent = this._name;
  this._cardImage.src = this._link;
  this._cardImage.alt = this._name;

  // Вернём элемент наружу
  return this._element;
 }

   // вернуть id карточки

  getCardId() {
    return this._cardId;
  }

  _removeCard() {
    this._element.remove();
    this._element = null;
  };

  _likeCard() {

    //this._likeButton.classList.toggle('place__like_active');

    if (!(this._likeButton.classList.contains('place__like_active'))) {
      this._putLike(this._cardId)

      this._likeButton.classList.add('place__like_active')
    }
    else {
      this._deleteLike(this._cardId)

      this._likeButton.classList.remove('place__like_active')
    }
  }


 _setEventListeners(){
  this._deleteButton.addEventListener('click', (e) => {
    const event = e.target;
    this._handleRemoveCardClick(this.getCardId(), event);
  });

  this._cardImage.addEventListener('click', () => {this._handleCardClick(this._name, this._link)});

  this._likeButton.addEventListener('click', () => {this._likeCard()})
 }
}
