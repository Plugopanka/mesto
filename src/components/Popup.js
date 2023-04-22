export default class Popup {
  constructor(popupSelector) {
    this._popup = popupSelector;
    // this._handleEscClose = _handleEscClose.bind(this);
  }

  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
      this.close();
    }

  }

  setEventListeners() {
    this._popup.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__exit-button')) {
        this.close();
      }
    })

    if (this._popup.classList.contains("popup_opened")) {
    this._popup.addEventListener('keydown', (evt) => {this._handleEscClose(evt)});
    } else {
    this._popup.removeEventListener('keydown', (evt) => {this._handleEscClose(evt)});
    }
  }

  open() {
    this.setEventListeners();
    this._popup.classList.add("popup_opened");
  }

  close() {
    this.setEventListeners();
    this._popup.classList.remove("popup_opened");
  }
}