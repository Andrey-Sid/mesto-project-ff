// @todo: Темплейт карточки
const cardContainer = document.querySelector("#card-template").content;

// @todo: DOM узлы
const locationsList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard(card, deleteItem) {
  const cardItem = cardContainer.querySelector('.card').cloneNode(true);
  const cardPicture = cardItem.querySelector('.card__image');

  cardPicture.src = card.link;
  cardPicture.alt = card.name;
  cardItem.querySelector('.card__title').textContent = card.name;

  cardItem.querySelector('.card__delete-button').addEventListener('click', deleteItem);

  return cardItem;
}

// @todo: Функция удаления карточки
function deleteCard(event) {
  event.target.closest('.card').remove(); 
}

// @todo: Вывести карточки на страницу
initialCards.forEach(card => {
  locationsList.append(createCard(card, deleteCard));
});
