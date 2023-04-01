export default class Card {
  constructor(data, templateSelector, createPopupView) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._createPopupView = createPopupView;
  }

  _getTemplate() {
    const cardElement = document.querySelector(this._templateSelector).content.cloneNode(true);
    return cardElement;
  }

  getCard() {
    this._element = this._getTemplate();
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
    const buttonDelete = this._element.querySelector(".card__delete");
    buttonDelete.addEventListener("click", this._deleteCard);

    const buttonLike = this._element.querySelector(".card__like");
    buttonLike.addEventListener("click", this._toggleLike);

    const buttonView = this._element.querySelector(".card__view");
    buttonView.addEventListener("click", () => {this._createPopupView(this._name, this._link)});
  }
  
}