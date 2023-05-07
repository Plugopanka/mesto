import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {
  constructor(popup) {
    super(popup);
    this._imagePopupView = this._popup.querySelector(".popup__image");
    this._subtitlePopupView = this._popup.querySelector(".popup__subtitle");
  }

  open(data) {
    
    this._imagePopupView.src = data.link;
    this._imagePopupView.alt = `Картинка ${data.name}`;
    this._subtitlePopupView.textContent = data.name;
    super.open();
  }
}
