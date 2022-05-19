/* функция закрытия попапов
const closePopup = () => {
    // находим открытый попап с данным классом
    const openedPopup = document.querySelector('.popup_opened');
    if (openedPopup) {
        // закрываем открытый попап
        openedPopup.classList.remove('popup_opened');
        document.removeEventListener('keydown', handleEscape);
        document.removeEventListener('mousedown', handleOverlay);
    }
}*/

/*закрытие попапа на esc
const handleEscape = (e) => {
    if (e.key === 'Escape') {
        closePopup();
    }
}

//закрытие попапа кликом на оверлей
const handleOverlay = (evt) => {
    if (evt.target.classList.contains('popup')) {
        closePopup();
    }
} 

// функция открытия попапов
const openPopup = (openingPopup) => {
    openingPopup.classList.add('popup_opened');
    // обработчик события нажатия клавиши на esc
    document.addEventListener('keydown', handleEscape);
    document.addEventListener('mousedown', handleOverlay);
}

export { closePopup, handleEscape, handleOverlay, openPopup };
*/