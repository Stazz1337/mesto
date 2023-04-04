
export default class Api {
  constructor({baseUrl, headers}) {
    // тело конструктора
    this._baseUrl = baseUrl;
    this._headers = headers;

  }

  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers})

      .then(res => {
        if (res.ok) {
          return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers})

      .then(res => {
        if (res.ok) {
          return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      });
  }

  setUserInfo(values) {

    return fetch(`${this._baseUrl}/users/me`, {
      method: 'PATCH',
      headers: this._headers,
      body: JSON.stringify({
        name: values.name,
        about: values.job
      })})

      .then(res => {
        if (res.ok) {
          return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }

  postCardServer(newInputValues) {
    return fetch(`${this._baseUrl}/cards`, {
      method: 'POST',
      headers: this._headers,
      body: JSON.stringify({
        name: newInputValues.name,
        link: newInputValues.link
      })})

      .then(res => {
        if (res.ok) {
          return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      })
  }


  putCardLike(cardId) {
    fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
     method: 'PUT',
     headers: this._headers,
     body: JSON.stringify({
       card: cardId
     })})

     .then(res => {
       if (res.ok) {
         return res.json();
       }
       // если ошибка, отклоняем промис
       return Promise.reject(`Ошибка: ${res.status}`);
     }); }


  deleteCardLike(cardId) {
    fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: 'DELETE',
      headers: this._headers,
      body: JSON.stringify({
        card: cardId
      })})

      .then(res => {
        if (res.ok) {
          return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
    }); }


    deleteCard(cardId) {
      return fetch(`${this._baseUrl}/cards/${cardId}`, {
        method: 'DELETE',
        headers: this._headers,
      })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      })
    }

    setAvatar(value) {
      return fetch(`${this._baseUrl}/users/me/avatar`, {
        method: 'PATCH',
        headers: this._headers,
        body: JSON.stringify({
          avatar: value
        })
      })
      .then(res => {
        if (res.ok) {
          console.log(res)
          return res.json();
        }
        // если ошибка, отклоняем промис
        return Promise.reject(`Ошибка: ${res.status}`);
      })
    }
  // другие методы работы с API
}
