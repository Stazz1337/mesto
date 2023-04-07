import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupElement) {
    super(popupElement);
    this._cardImage = this._popup.querySelector(".popup__image");
    this._cardTitle = this._popup.querySelector(".popup__image-title");
  }

  open(name, link) {
    super.open();
    this._cardImage.src = link;
    this._cardTitle.alt = name;
    this._cardTitle.textContent = name;
  }
}
