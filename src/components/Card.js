export default class Card {
  constructor(
    { data, handleImageClick, handleCardSubmit, handleCardLike },
    templateSelector,
    userId
  ) {
    this._name = data.name;
    this._link = data.link;
    this._likes = data.likes;
    this.cardId = data._id;
    this._ownerId = data.owner._id;
    this._userId = userId;
    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
    this._handleCardSubmit = handleCardSubmit;
    this._handleCardLike = handleCardLike;
    this._element = this._getTemplate();
    this._cardLikes = this._element.querySelector(".card__like-counter");
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  getCard() {
    this._buttonDelete = this._element.querySelector(".card__delete");
    this._buttonLike = this._element.querySelector(".card__like");
    this._buttonView = this._element.querySelector(".card__view");

    const cardHeading = this._element.querySelector(".card__place");
    cardHeading.textContent = this._name;
    const cardImage = this._element.querySelector(".card__image");
    cardImage.src = this._link;
    cardImage.alt = `Картинка ${this._name}`;
    this._cardLikes.textContent = this._likes.length;
    // console.log(this._ownerId, this._userId)
    if (this._ownerId != this._userId) {
      this._buttonDelete.classList.add("card__delete_hidden");
    }

    this._setEventListeners();
    return this._element;
  }

  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  addLike(res) {
    this._buttonLike.classList.add("card__like_active");
    this._cardLikes.textContent = res.likes.length;
    this._likes = res.likes;
  }

  removeLike(res) {
    this._buttonLike.classList.remove("card__like_active");
    this._cardLikes.textContent = res.likes.length;
    this._likes = res.likes;
  }

  isLiked() {
    return this._likes.some((item) => item._id === this._userId);
  }

  _setEventListeners() {
    this._buttonDelete.addEventListener("click", () =>
      this._handleCardSubmit(this)
    );

    this._buttonLike.addEventListener("click", () => {
      this._handleCardLike(this);
    });

    this._buttonView.addEventListener("click", () => {
      this._handleImageClick(this._name, this._link);
    });
  }
}
