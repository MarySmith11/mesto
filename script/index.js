let popup = document.querySelector('.popup');
let buttonEdit = document.querySelector('.profile__edit-button');
let closePopupButton = popup.querySelector('.popup__close-button');
let formElement = popup.querySelector('.form');
let nameInput = document.querySelector('.form__text_type_name');
let jobInput = document.querySelector('.form__text_type_info');
let userName = document.querySelector('.profile__name');
let userJob = document.querySelector('.profile__profession');

function loadInformation () {
    nameInput.value = userName.textContent;
    jobInput.value = userJob.textContent;
}

function openPopup () {
    loadInformation();
    popup.classList.add('popup_opened');
}

function closePopup () {
    popup.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    userName.textContent = nameInput.value;
    userJob.textContent = jobInput.value;
    closePopup();
}

buttonEdit.addEventListener('click', openPopup);
closePopupButton.addEventListener('click', closePopup);
formElement.addEventListener('submit', formSubmitHandler);

