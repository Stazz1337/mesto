
export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(card, position) {
    if (position === "append") {
      this._container.append(card);
    } else if (position === "prepend") {
      this._container.prepend(card);
    }
  }

  renderItems() {
    this._renderedItems.forEach(item => {
     this._renderer(item);
    });
    }

}
