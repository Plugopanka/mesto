export default class Section {
  constructor({items, renderer}, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderCard() {
    this._items.forEach(item => this._renderer(item));
  }

  renderNewCard (card) {
    this._renderer(card);
  }

  addItem(data) {
    this._container.prepend(data);
  }
}