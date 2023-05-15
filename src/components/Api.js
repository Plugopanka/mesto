export default class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _returnPromiseStatus(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка ${res.status}`);
    }
    return res.json();
  }

  getCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
    }).then((res) => {
      return this._returnPromiseStatus(res);
    });
  }

  getUserData() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
    }).then((res) => {
      return this._returnPromiseStatus(res);
    });
  }

  getLikes() {
    return fetch(`${this._url}/cards/likes`, {
      headers: this._headers,
    }).then((res) => {
      return this._returnPromiseStatus(res);
    });
  }

  putLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes `, {
      method: "PUT",
      headers: this._headers,
    }).then((res) => {
      return this._returnPromiseStatus(res);
    });
  }

  deleteLike(cardId) {
    return fetch(`${this._url}/cards/${cardId}/likes `, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      return this._returnPromiseStatus(res);
    });
  }

  postNewCard(name, link) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({ name, link }),
    }).then((res) => {
      return this._returnPromiseStatus(res);
    });
  }

  deleteNewCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then((res) => {
      return this._returnPromiseStatus(res);
    });
  }

  patchUserInfo(name, about) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ name, about }),
    }).then((res) => {
      return this._returnPromiseStatus(res);
    });
  }

  patchUserAvatar(avatar) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({ avatar }),
    }).then((res) => {
      return this._returnPromiseStatus(res);
    });
  }
}
