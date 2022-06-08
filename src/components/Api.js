export default class Api {
    constructor(options) {
        this._baseUrl = options.baseUrl;
        this._baseHeaders = options.headers;
    }

    getUserInfo() {
        return fetch(
            `${this._baseUrl}/users/me`,
            {
                headers: this._baseHeaders
            }
        ).then((res) => {
            if (res.ok) {
                return res.json();
            }
            return Promise.reject(`Произошла ошибка при получении информации о пользователе: ${res.status} ${res.statusText}`);
        });
    }

    getInitialCards() {
        return fetch(
            `${this._baseUrl}/cards`,
            {
                headers: this._baseHeaders
            }
        )
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Произошла ошибка при получении карточек: ${res.status} ${res.statusText}`);
            })
    }

    updateUserProfile({ name, about }) {
        return fetch(
            `${this._baseUrl}/users/me`,
            {
                method: 'PATCH',
                headers: this._baseHeaders,
                body: JSON.stringify({
                    name,
                    about
                })
            }
        )
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Произошла ошибка при обновлении профиля пользователя: ${res.status} ${res.statusText}`);
            }
            );
    }

    updateUserAvatar(avatar) { 
        return fetch( 
          `${this._baseUrl}/users/me/avatar`, 
          { 
            method: 'PATCH', 
            headers: this._baseHeaders, 
            body: JSON.stringify({ 
              avatar 
            }) 
          } 
        ) 
        .then((res) => { 
          if (res.ok) { 
            return res.json(); 
          } 
          return Promise.reject(`Произошла ошибка при обновлении аватара пользователя: ${res.status} ${res.statusText}`); 
          } 
        ); 
      } 

    addNewCard({ name, link }) {
        return fetch(
            `${this._baseUrl}/cards`,
            {
                method: 'POST',
                headers: this._baseHeaders,
                body: JSON.stringify({
                    name,
                    link
                })
            }
        )
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Произошла ошибка при добавлении новой карточки: ${res.status} ${res.statusText}`);
            }
            );
    }

    removeCard(cardId) {
        return fetch(
            `${this._baseUrl}/cards/${cardId}`,
            {
                method: 'DELETE',
                headers: this._baseHeaders
            }
        )
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Произошла ошибка при удалении карточки: ${res.status} ${res.statusText}`);
            }
            );
    }

    likeAction(cardId, type) {
        return fetch(
            `${this._baseUrl}/cards/likes/${cardId}`,
            {
                method: type,
                headers: this._baseHeaders
            }
        )
            .then((res) => {
                if (res.ok) {
                    return res.json();
                }
                return Promise.reject(`Произошла ошибка при постановке лайка: ${res.status} ${res.statusText}`);
            }
            );
    }
} 