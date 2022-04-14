// попапы
const closePopupButtons = document.querySelectorAll('.popup__close-button');
const popupAdd = document.querySelector('.popup_type_add');
const popupEdit = document.querySelector('.popup_type_edit');
const popupTypeImage = document.querySelector('.popup_type_image');

// профиль
const userName = document.querySelector('.profile__name');
const userJob = document.querySelector('.profile__profession');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');

// формы и их элементы
const editFormElement = document.forms['edit-profile'];
const addFormElement = document.forms['add-card'];
const nameInput = editFormElement.elements.name;
const jobInput = editFormElement.elements.profession;
const titleNameInput = addFormElement.elements.titleName;
const linkInput = addFormElement.elements.link;
const buttonCreate = document.querySelector('.form__button_create');

const cardsContainer = document.querySelector('.cards');

// попап карточки
const popupText = document.querySelector('.popup__text');
const popupImage = document.querySelector('.popup__image');

// получение текстового содержимого имени и профессии в профиле
const loadInformation = () => {
    nameInput.value = userName.textContent;
    jobInput.value = userJob.textContent;
}
 
//закрытие попапа на esc
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

// функция закрытия попапов
const closePopup = () => {
    // находим открытый попап с данным классом
    const openedPopup = document.querySelector('.popup_opened');
    if (openedPopup) {
        // закрываем открытый попап
        openedPopup.classList.remove('popup_opened');
        document.removeEventListener('keydown', handleEscape);
        document.removeEventListener('mousedown', handleOverlay);
    }
}

// обработчик события 
const handleProfileFormSubmit = (evt) => {
    // отмена стандартного поведения HTML
    evt.preventDefault();
    userName.textContent = nameInput.value;
    userJob.textContent = jobInput.value;
    closePopup();
}

// обработчик клика на кнопку редактирования профиля
buttonEdit.addEventListener('click', () => {
    loadInformation();
    openPopup(popupEdit);
});

// обработчик клика на кнопку добавления карточек
buttonAdd.addEventListener('click', () => {
    openPopup(popupAdd);
});

// обработчик клика на кнопку закрытия попапов (крестик)
closePopupButtons.forEach((elem) => {
    elem.addEventListener('click', closePopup);
})

// обработчики отправки форм
editFormElement.addEventListener('submit', handleProfileFormSubmit);

// массив с карточками
const initialCards = [
    {
        name: 'Архыз',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
        name: 'Челябинская область',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
        name: 'Иваново',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
        name: 'Камчатка',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
        name: 'Холмогорский район',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
        name: 'Байкал',
        link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];


// функция 'мне нравится'
const handleLike  = (evt) => {
    evt.target.classList.toggle('cards__like-button_active');
}

// функция удаления карточек
const removeCard = (evt) => {
    evt.target.closest('.cards__element').remove();
}

// функция открытия попапа с картинкой
const openImagePopup = (evt) => {
    const title = evt.target.closest('.cards__element').querySelector('.cards__title').textContent;
    const image = evt.target.src;
    popupText.textContent = title;
    popupImage.src = image;
    popupImage.alt = title;
    openPopup(popupTypeImage);
}

// создание карточек и вызов событий(лайк, удаление)
const createCard = (element) => {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.cloneNode(true);
    const cardPicture = cardElement.querySelector('.cards__picture')
    cardElement.querySelector('.cards__title').textContent = element.name;
    cardPicture.src = element.link;
    cardPicture.alt = element.name;
    cardElement.querySelector('.cards__like-button').addEventListener('click', handleLike);
    cardElement.querySelector('.cards__basket-button').addEventListener('click', removeCard);
    cardPicture.addEventListener('click', openImagePopup);
    return cardElement;
}

// отрисовывание созданных карточек
const renderCard = (element) => {
    cardsContainer.prepend(createCard(element));
}

// обработчик отправки формы добавления карточки
const handleFormSubmitAddCard = (evt) => {
    evt.preventDefault();
    const element = {};
    element.name = titleNameInput.value;
    element.link = linkInput.value;
    renderCard(element);
    addFormElement.reset();
    buttonCreate.setAttribute('disabled', true);
    buttonCreate.classList.add('form__button_disabled');
    closePopup();
}

initialCards.forEach(renderCard);

// создание карточки через попап
addFormElement.addEventListener('submit', handleFormSubmitAddCard);
