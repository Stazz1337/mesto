export default class Card {
  constructor(
    cardData,
    currentUserId,
    templateSelector,
    handleCardClick,
    handleRemoveCardClick,
    putLike,
    deleteLike
  ) {
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

  // проверка карточки был ли лайк от currentUser

  isLikedByCurrentUser() {
    this._likes.forEach((user) => {
      if (user._id === this._currentUserId) {
        this._likeButton.classList.add("place__like_active");
      }
    });
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".place__item-wrapper")
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    // Запишем разметку в приватное поле _element.
    this._element = this._getTemplate();
    this._cardImage = this._element.querySelector(".place__image");
    this._cardTitle = this._element.querySelector(".place__title");
    this._likeButton = this._element.querySelector(".place__like");

    //добавить счетчики лайков карточек
    this._likesCounterPlace = this._element.querySelector(".place__count");
    this._likesCounterPlace.textContent = this._likes.length;

    this._deleteButton = this._element.querySelector(".place__delete");

    //скрыть значок удаления чужих карточек
    if (this._currentUserId !== this._cardOwnerId) {
      this._deleteButton.style.visibility = "hidden";
    }

    // вызов обработчики кликов
    this._setEventListeners();
    this.isLikedByCurrentUser();

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

  removeCard() {
    this._element.remove();
    this._element = null;
  }

  // ставим и удаляем лайки

  _likeCard() {
    //this._likeButton.classList.toggle('place__like_active');

    if (!this._likeButton.classList.contains("place__like_active")) {
      this._putLike(this);
    } else {
      this._deleteLike(this);
    }
  }

  putLike(resArr) {
    this._likesCounterPlace.textContent = resArr.likes.length;
    this._likeButton.classList.add("place__like_active");
  }

  deleteLike(resArr) {
    this._likesCounterPlace.textContent = resArr.likes.length;
    this._likeButton.classList.remove("place__like_active");
  }

  _setEventListeners() {
    this._deleteButton.addEventListener("click", () => {

      this._handleRemoveCardClick(this.getCardId(), this);
    });

    this._cardImage.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });

    this._likeButton.addEventListener("click", () => {
      this._likeCard();
    });
  }
}
