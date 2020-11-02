class Api {
    constructor(options) {
      this._url = options.baseUrl;
      this._headers = options.headers;
    }
  
    getInfoUser() {
      return fetch(`${this._url}/users/me`, {
          headers: this._headers,
        })
        .then(res => {
          if (res.ok) {
            return res.json();
          } else {
            return Promise.reject(`Ошибка: ${res.status}`);
          }
        });
    }
  
    getInitialCards() {
      return fetch(`${this._url}/cards`, {
          method: 'GET',
          headers: this._headers,
        })
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`); // если ошибка, отклоняем промис
        });
    }
  
    updateInfo(name, about) {
      return fetch(`${this._url}/users/me`, {
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify({
            name: name,
            about: about
          })
        })
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
        });
    }
  
    addNewCard(cardName, cardLink) {
      return fetch(`${this._url}/cards`, {
          method: 'POST',
          headers: this._headers,
          body: JSON.stringify({
            name: cardName,
            link: cardLink
          })
        })
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
        });
    }
  
    deleteCard(id) {
      return fetch(`${this._url}/cards/${id}`, {
          method: 'DELETE',
          baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-16',
          headers: this._headers,
        })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`error${res.status}`);
        });
    };
  
    addLike(card) {
      return fetch(`${this._url}/cards/likes/${card.id}`, {
          method: 'PUT',
          headers: this._headers,
        })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
        })
    }
  
    deleteLike(card) {
      return fetch(`${this._url}/cards/likes/${card.id}`, {
          method: 'DELETE',
          headers: this._headers,
        })
        .then((res) => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
        })
    } 
  
    updateAvatar(link) {
      return fetch(`${this._url}/users/me/avatar`, {
          method: 'PATCH',
          headers: this._headers,
          body: JSON.stringify({
            avatar: link
          })
        })
        .then(res => {
          if (res.ok) {
            return res.json();
          }
          return Promise.reject(`Ошибка: ${res.status}`);
        });
    }
  }
  
  const api = new Api({
    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-16',
    headers: {
      authorization: 'af63ec2b-e6dc-434c-948a-6575ce618808',
      'Content-Type': 'application/json'
    }
  });
  
  export default api;