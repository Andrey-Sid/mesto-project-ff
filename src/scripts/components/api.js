//Настройка для запроса
const config = {
    baseUrl: "https://nomoreparties.co/v1/wff-cohort-36",
    headers: {
        authorization: "d9115ba1-b9c6-4fd3-b979-3e4dfcfe8e51",
        "Content-Type": "application/json",
        },
};

//Проверка ответа сервера
function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка ${res.status}`);
}

//Get-запрос к серверу:
//Запрос данных о пользователе
function receiveUserData() {
    return fetch(`${config.baseUrl}/users/me`, {
      headers: config.headers,
    })
    
//Проверка ответа от сервера
    .then(checkResponse);
  }

//Запрос данных карточек
function receiveCardsData() {
    return fetch(`${config.baseUrl}/cards`, {
      headers: config.headers,
    })

//Проверка ответа от сервера
  .then(checkResponse);
  }

//Редактирование профиля
function updateUserData(name, about) {
    return fetch(`${config.baseUrl}/users/me`, {
      method: 'PATCH',
      headers: config.headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    })
    .then(checkResponse);
  }

// Новая карточка
function addNewCard(name, link) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  })
  .then(checkResponse);
}

// Лайк карточки
function likeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  })
  .then(checkResponse);
}

// Удаление лайка карточки
function unlikeCard(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(checkResponse);
}

// Удаление карточки
function deleteCardApi(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
  .then(checkResponse);
}

// Изменение аватара
function updateUserAvatar(avatarUrl) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: avatarUrl,
    }),
  })
  .then(checkResponse);
}

  export { receiveUserData, receiveCardsData, updateUserData, addNewCard, likeCard, unlikeCard, deleteCardApi, updateUserAvatar};
