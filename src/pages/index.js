import './index.css';
import Card from "../components/Card.js";
import Section from "../components/Section.js";
import { FormValidator } from "../components/FormValidator.js";
import {
  buttonEdit,
  buttonAdd,
  editAvatarOpener,
  editFormElement,
  addFormElement,
  nameInput,
  jobInput,
  validatorConfig,
  updateAvatarFormElement
} from "../utils/constants.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupConfirmation from '../components/PopupConfirmation.js';
import UserInfo from "../components/UserInfo.js";
import Api from '../components/Api.js';

const userInfo = new UserInfo({ nameSelector: ".profile__name", professionSelector: ".profile__profession", avatarSelector: ".profile__avatar" })

const apiInstance = new Api({
  baseUrl: 'https://nomoreparties.co/v1/cohort-42',
  headers: {
    authorization: '06c6d84b-91cf-46b1-9787-cc57bf55dfba',
    'Content-Type': 'application/json'
  }
});

// попап с картинкой
const imagePopup = new PopupWithImage(".popup_type_image");
imagePopup.setEventListeners();

// попап подтверждения удаления карточки
const removeCardPopup = new PopupConfirmation(
  '.popup_type_confirmation',
  (card) => {
    apiInstance.removeCard(card.getId())
      .then(() => {
        card.removeCard();
      })
      .catch((err) => {
        console.log(err);
      });
  }
);
removeCardPopup.setEventListeners();

const createCard = (item) => {
  const card = new Card(
    item,
    ".card-template",
    (name, link) => {
      imagePopup.open(name, link);
    },
    () => {  
      removeCardPopup.setCard(card);
      removeCardPopup.open();
    },
    () => {
      const method = card.isLiked() ? 'DELETE' : 'PUT';
      apiInstance.likeAction(item.id, method)
        .then((res) => {
          card.handleLike();
          card.setLikeCount(res.likes.length);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  );
  return card.generateCard();
};

const loadInformation = () => {
  const userData = userInfo.getUserInfo();
  nameInput.value = userData.name;
  jobInput.value = userData.profession;
};

const editFormValidator = new FormValidator(validatorConfig, editFormElement);
editFormValidator.enableValidation();

const editAvatarPopup = new PopupWithForm('.popup_type_avatar', (values) => {
  editAvatarPopup.getButtonElement().textContent = 'Сохранение...';
  apiInstance.updateUserAvatar(values.avatar)
    .then((res) => {
      userInfo.setUserInfo({
        avatar: res.avatar
      });
      editAvatarPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      editAvatarPopup.getButtonElement().textContent = 'Сохранить';
    })
});
editAvatarPopup.setEventListeners();
const editAvatarValidator = new FormValidator(validatorConfig, updateAvatarFormElement);
editAvatarValidator.enableValidation();
editAvatarOpener.addEventListener('click', editAvatarPopup.open.bind(editAvatarPopup));

// попап редактирования профиля
const editPopup = new PopupWithForm(".popup_type_edit", (values) => {
  editPopup.getButtonElement().textContent = 'Сохранение...';
  const data = {
    name: values['name'],
    profession: values['profession']
  }
  apiInstance.updateUserProfile(
    {
      name: data.name,
      about: data.profession
    }
  )
    .then((res) => {
      userInfo.setUserInfo({
        name: res.name,
        profession: res.about
      });
      editPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      editPopup.getButtonElement().textContent = 'Сохранить';
    })
});
editPopup.setEventListeners();

// обработчик клика на кнопку редактирования профиля
buttonEdit.addEventListener("click", () => {
  loadInformation();
  editPopup.open();
});

// создание списка карточек
const cardList = new Section(
  (item) => {
    cardList.addItem(
      createCard(item),
      true
    );
  },
  ".cards",
  userInfo
);

// попап добавления карточки
const addPopup = new PopupWithForm(".popup_type_add", (values) => {
  addPopup.getButtonElement().textContent = 'Сохранение...';
  const item = {
    name: values['name'],
    link: values['link']
  };
  apiInstance.addNewCard(item)
    .then((res) => {
      cardList.addItem(
        createCard(
          {
            name: res.name,
            link: res.link,
            id: res._id,
            likes: res.likes.length,
            isOwner: res.owner._id === userInfo.getUserId(),
            isLiked: Array.from(res.likes).some((like) => like._id === userInfo.getUserId())
          }),
      );
      addPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      addPopup.getButtonElement().textContent = 'Сохранить';
    })
});
addPopup.setEventListeners();

const addFormValidator = new FormValidator(validatorConfig, addFormElement);
addFormValidator.enableValidation();

buttonAdd.addEventListener("click", () => {
  addFormValidator.clearForm();
  addPopup.open();
});

apiInstance.getUserInfo()
  .then((res) => {
    userInfo.setUserInfo(
      {
        name: res.name,
        profession: res.about,
        avatar: res.avatar,
        id: res._id
      }
    );

    apiInstance.getInitialCards()
      .then((res) => {
        /*результат полученных с сервера карточек */
        cardList.renderItems(res);
      }).catch((err) => {
        console.log(err);
      })
  }).catch((err) => {
    console.log(err);
  });














