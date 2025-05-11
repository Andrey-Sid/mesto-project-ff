// Открытие модального окна (попап)
function openModal (modal) {
    modal.classList.add ("popup_is-opened");
    document.addEventListener ("keydown",closeEsc);
}

// Закрытие модального окна (попап) (общее: "Х",оверлей)
function closeModal (modal) {
    modal.classList.remove ("popup_is-opened");
    document.removeEventListener ("keydown",closeEsc);
}

//Закрытие модального окна (попап) нажатием на Esc
function closeEsc (evt) {
    if (evt.key === "Escape") {
        const modalOpened = document.querySelector(".popup_is-opened");
        if (modalOpened) closeModal(modalOpened);
    }
};

//Экспорт
export {openModal, closeModal};
