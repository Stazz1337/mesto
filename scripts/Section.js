
// import initialCards from './data'

export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(card) {
    this._container.append(card);
  }

  renderItems() {
    this._renderedItems.forEach(item => {
    this._renderer(item);
      });
    }

}
