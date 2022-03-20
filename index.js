let popup = document.querySelector('.popup');
let buttonEdit = document.querySelector('.profile__edit-button');
let closePopupButton = popup.querySelector('.popup__close-button');
let formElement = popup.querySelector('.form');
let nameInput = document.querySelector('.form__text_type_name');
let jobInput = document.querySelector('.form__text_type_info');
let userName = document.querySelector('.profile__name');
let job = document.querySelector('.profile__profession');

function loadInformation () {
    nameInput.value = userName.textContent;
    jobInput.value = job.textContent;
}

function openPopup () {
    popup.classList.add('popup_state_opened');
    loadInformation();
}

function closePopup () {
    popup.classList.remove('popup_state_opened');
}

function keydownListener (e) {
    if(e.keyCode === 27) {
        closePopup();
    }
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    userName.textContent = nameInput.value;
    job.textContent = jobInput.value;
    closePopup();
}

buttonEdit.addEventListener('click', openPopup);
closePopupButton.addEventListener('click', closePopup);
document.addEventListener('keydown', keydownListener);
formElement.addEventListener('submit', formSubmitHandler);

