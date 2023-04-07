export default class Api {
  constructor({ baseUrl, headers }) {
    // тело конструктора
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  /*  _request(url, options) {
    return fetch(url, options).then(this._checkResponse)
  }
  */

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка ${res.status}`);
  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this._checkResponse);
  }

  setUserInfo(values) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: values.name,
        about: values.about,
      }),
    }).then(this._checkResponse);
  }

  postCardServer(newInputValues) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: newInputValues.name,
        link: newInputValues.link,
      }),
    }).then(this._checkResponse);
  }

  putCardLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: this._headers,
      body: JSON.stringify({
        card: cardId,
      }),
    }).then(this._checkResponse);
  }

  deleteCardLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: this._headers,
      body: JSON.stringify({
        card: cardId,
      }),
    }).then(this._checkResponse);
  }

  deleteCard(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkResponse);
  }

  setAvatar(value) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: value,
      }),
    }).then(this._checkResponse);
  }
  // другие методы работы с API
}
