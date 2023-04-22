export default class Card {
  constructor({data, createPopupView}, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._createPopupView = createPopupView;
    this._element = this._getTemplate();
    this._buttonDelete = this._element.querySelector(".card__delete");
    this._buttonLike = this._element.querySelector(".card__like");
    this._buttonView = this._element.querySelector(".card__view");
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.cloneNode(true);
    return cardElement;
  }

  getCard() {
    this._setEventListeners();
    const cardHeading = this._element.querySelector(".card__place");
    cardHeading.textContent = this._name;
    const cardImage = this._element.querySelector(".card__image");
    cardImage.setAttribute("src", this._link);
    cardImage.setAttribute("alt", `Картинка ${this._name}`);
    return this._element;
  }

  _deleteCard(evt) {
    const button = evt.target;
    const card = button.closest(".card");
    card.remove();
  }

  _toggleLike(evt) {
    const like = evt.target;
    like.classList.toggle("card__like_active");
  }

  _setEventListeners() {
    this._buttonDelete.addEventListener("click", this._deleteCard);

    this._buttonLike.addEventListener("click", this._toggleLike);

    this._buttonView.addEventListener("click", () => {this._createPopupView(this._name, this._link)});
  }
  
}