
import Popup from './Popup.js'

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._cardImage = this._popup.querySelector(".popup__image");
    this._cardTitle = this._popup.querySelector(".popup__image-title");
  }

  openPopup(name, link){
    super.openPopup();
    this._cardImage.src = link;
    this._cardTitle.alt = name;
    this._cardTitle.textContent = name;
  }

}


