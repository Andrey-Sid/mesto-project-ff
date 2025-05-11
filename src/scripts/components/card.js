import {likeCard, unlikeCard} from "./api";

//@todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;

//@todo: Функция создания карточки
function createCard(value, userId, handlerDeleteCard, handlerLikeImage, openImageCard, openConfirmPopup) {

  const cardElement = cardTemplate.querySelector(".places__item").cloneNode(true); //клонируем содержимое тега template
  const imageCardElement = cardElement.querySelector(".card__image");
  const cardTitle = cardElement.querySelector(".card__title");

// Для реализации отображения лайков
  const likeCountElement = cardElement.querySelector(".card__like-count");
  const likeButton = cardElement.querySelector(".card__like-button");

// Устанавливаем значение вложенных элементов
    imageCardElement.src = value.link;
    imageCardElement.alt = value.name;
    cardTitle.textContent = value.name;

//добавляем к иконке удаления обработчик клика, по которому будет вызван переданный в аргументах колбэк

const deleteButton = cardElement.querySelector(".card__delete-button");
  if (value.owner._id === userId) {
    deleteButton.addEventListener("click", () => openConfirmPopup(cardElement, value._id));
  } else {
    deleteButton.style.display = 'none';
  }
  
    likeCountElement.textContent = value.likes.length;
  const isLiked = value.likes.some((like) => like._id === userId); //лайкнул ли?
    if (isLiked) {
      likeButton.classList.add("card__like-button_is-active");
    }

 //Лайк
 likeButton.addEventListener("click", (evt) => handlerLikeImage(evt, value._id, userId, likeButton, likeCountElement));

//Отрытие изображения
  const imageFullSize = cardElement.querySelector(".card__image");
  imageFullSize.addEventListener("click", () => openImageCard(value));

  return cardElement;
}

//@todo: Функция удаления карточки
function deleteCard(handlerDeleteCard) {
  handlerDeleteCard.remove();
}

//@todo: Функция like карточки API
const likeImage = function(evt, cardId, userId, likeButton, likeCountElement) { 
  evt.preventDefault();

  if (likeButton.classList.contains("card__like-button_is-active")) { 
    unlikeCard(cardId) 
      .then((updatedCard) => { 
        likeCountElement.textContent = updatedCard.likes.length;
        likeButton.classList.remove("card__like-button_is-active");
      }) 
      .catch((err) => {
        console.error("Ошибка удаления лайка:", err);
      });
  } else {
    likeCard(cardId)
      .then((updatedCard) => {
        likeCountElement.textContent = updatedCard.likes.length;
        likeButton.classList.add("card__like-button_is-active");
      })
      .catch((err) => {
        console.error("Ошибка добавления лайка:", err);
      });
  } 
}; 

export{createCard, deleteCard, likeImage};