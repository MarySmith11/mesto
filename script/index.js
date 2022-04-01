const popup = document.querySelector('.popup');
const buttonEdit = document.querySelector('.profile__edit-button');
const buttonAdd = document.querySelector('.profile__add-button');
const closePopupButton = document.querySelectorAll('.popup__close-button');
const popupAdd = document.querySelector('.popup_type_add');
const popupEdit = document.querySelector('.popup_type_edit');
const popupTypeImage = document.querySelector('.popup_type_image');
const editFormElement = popupEdit.querySelector('.form');
const addFormElement = popupAdd.querySelector('.form');
const nameInput = document.querySelector('.form__text_type_name');
const jobInput = document.querySelector('.form__text_type_info');
const userName = document.querySelector('.profile__name');
const userJob = document.querySelector('.profile__profession');
const createButton = document.querySelector('.form__button_create');
const titleNameInput = addFormElement.querySelector('.form__text_type_title-name');
const linkInput = addFormElement.querySelector('.form__text_type_link');
const cardsContainer = document.querySelector('.cards');
const popupText = document.querySelector('.popup__text');
const popupImage = document.querySelector('.popup__image');

// получение текстового содержимого имени и профессии в профиле, и передаем значение в форму инпутам
const loadInformation = () => {
    nameInput.value = userName.textContent;
    jobInput.value = userJob.textContent;
}

// функция открытия попапов
function openPopup(openingPopup) {
    // открытие попапа для редактирования
    if (openingPopup.classList.contains('popup_type_edit')) {
        loadInformation();
    }
    openingPopup.classList.add('popup_opened');
}

// функция закрытия попапов
function closePopup() {
    // находим открытый попап с данным классом
    const openedPopup = document.querySelector('.popup_opened');
    if (openedPopup) {
        // закрываем открытый попап
        openedPopup.classList.remove('popup_opened');
    }
}

//закрытие попапа на esc
function keydownListener(e) {
    if (e.keyCode === 27) {
        closePopup();
    }
}

// обработчик события 
function editFormSubmitHandler(evt) {
    // отмена стандартного поведения HTML
    evt.preventDefault();
    userName.textContent = nameInput.value;
    userJob.textContent = jobInput.value;
    closePopup();
}

// обработчик клика на кнопку редактирования профиля
buttonEdit.addEventListener('click', () => {
    openPopup(popupEdit);
});

// обработчик клика на кнопку добавления карточек
buttonAdd.addEventListener('click', () => {
    openPopup(popupAdd);
});

// обработчик клика на кнопку закрытия попапов (крестик)
closePopupButton.forEach((elem) => {
    elem.addEventListener('click', closePopup);
})

// обработчик события нажатия клавиши на esc
document.addEventListener('keydown', keydownListener);

// обработчики отправки форм
editFormElement.addEventListener('submit', editFormSubmitHandler);

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
const likeHandler = (evt) => {
    evt.target.classList.toggle('cards__like-button_active');
}

// функция удаления карточек
const removeHandler = (evt) => {
    evt.target.closest('.cards__element').remove();
}

// функция открытия попапа с картинкой
const imagePopupOpenHandler = (evt) => {
    const title = evt.target.closest('.cards__element').querySelector('.cards__title').textContent;
    const image = evt.target.src;
    popupText.textContent = title;
    popupImage.src = image;
    openPopup(popupTypeImage);
}

// создание карточек и вызов событий(лайк, удаление)
const createCard = (element) => {
    const cardTemplate = document.querySelector('#card-template').content;
    const cardElement = cardTemplate.cloneNode(true);
    cardElement.querySelector('.cards__title').textContent = element.name;
    cardElement.querySelector('.cards__picture').src = element.link;
    cardElement.querySelector('.cards__like-button').addEventListener('click', likeHandler);
    cardElement.querySelector('.cards__basket-button').addEventListener('click', removeHandler);
    cardElement.querySelector('.cards__picture').addEventListener('click', imagePopupOpenHandler);
    return cardElement;
}

// отрисовывание созданных карточек
const renderCard = (element) => {
    cardsContainer.prepend(createCard(element));
}

// обработчик отправки формы добавления карточки
const addFormSubmitHandler = (evt) => {
    evt.preventDefault();
    const element = {};
    element.name = titleNameInput.value;
    element.link = linkInput.value;
    renderCard(element);
    titleNameInput.value = '';
    linkInput.value = '';
    closePopup();
}

initialCards.forEach((element) => {
    renderCard(element);
});

// создание карточки через попап
addFormElement.addEventListener('submit', addFormSubmitHandler);


