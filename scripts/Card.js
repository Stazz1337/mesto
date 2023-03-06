export default class Card {
  constructor(name, link) {
    this._name = name;
    this._link = link;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector('.card-template')
      .content
      .querySelector(".place__item-wrapper")
      .cloneNode(true);
    return cardElement;
  }

 generateCard() {
  // Запишем разметку в приватное поле _element.
  this._element = this._getTemplate();

  // вызов обработчики кликов
  this._setEventListeners();

  // Добавим данные
  this._element.querySelector('.place__title').textContent = this._name;
  this._element.querySelector('.place__image').src = this._link;
  this._element.querySelector('.place__image').alt = this._name;

  // Вернём элемент наружу
  return this._element;
 }

  _removeCard(event) {
    const cardToDelete = event.target.closest('.place__item-wrapper');
    cardToDelete.remove();
  };

  _openPopupImage(event){
    const popupImage = document.querySelector('.popup_type_image');
    const popupBackground = document.querySelector('.popup__image');
    const imageTitle = document.querySelector(".popup__image-title");

    const handlePopupCloseEscape = (evt) => {
      if (evt.key === 'Escape') {
        const popupActive = document.querySelector('.popup_opened');
        closePopup (popupActive);
      };
    };

    function closePopup (popup) {
      popup.classList.remove('popup_opened');
      document.removeEventListener('keydown', handlePopupCloseEscape);
    };

    function openPopup(popup) {
      popup.classList.add('popup_opened');
      document.addEventListener('keydown', handlePopupCloseEscape);
    };

    openPopup(popupImage);

    popupBackground.src = event.target.src;
    popupBackground.alt = event.target.alt;
    imageTitle.textContent = event.target.nextElementSibling.nextElementSibling.textContent;
  };

 _setEventListeners(){
  this._element.querySelector('.place__delete').addEventListener('click', this._removeCard);
  this._element.querySelector('.place__image').addEventListener('click', this._openPopupImage);
  this._element.querySelector('.place__like').addEventListener('click', function (event) {
    event.target.classList.toggle('place__like_active');
  })
 }
}

