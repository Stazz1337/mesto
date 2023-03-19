export default class Popup {
  constructor(popupSelector) {
    this._popup = popupSelector;
  }

  openPopup() {
    this._popup.classList.add('popup_opened');
    document.addEventListener('keydown', (evt) => {this._handleEscClose(evt)});
  };

  closePopup () {
    this._popup.classList.remove('popup_opened');
    document.removeEventListener('keydown', (evt) => {this._handleEscClose(evt)});
  };

  _handleEscClose (evt) {
    if (evt.key === 'Escape') {
      this.closePopup (this._popup);
    };
  };

  setEventListeners () {
    this._popup.addEventListener('mousedown', (evt) => {
      if (evt.target.classList.contains('popup_opened')) {
        this.closePopup(this._popup)
      }
      if (evt.target.classList.contains('popup__close')) {
        this.closePopup(this._popup)
      }
  })
  }

}
