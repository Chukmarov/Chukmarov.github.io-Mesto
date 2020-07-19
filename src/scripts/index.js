'use strict'
 import {Api} from './Api.js';
 import {Card} from './Card.js';
 import {CardList} from './CardList.js';
 import {FormValidator} from './FormValidator.js';
 import {Popup} from './Popup.js';
 import {UserInfo} from './UserInfo.js';
 import '../pages/index.css';

  const popupButtonOpen = document.querySelector('.user-info__button_add');
  const popupProfileButtonOpen = document.querySelector('.user-info__button_edit');
  const popupPlace = document.querySelector('.popup_place');
  const popupProfile = document.querySelector('.popup_profile');
  const popupImage = document.querySelector('.popup_image');
  const popupImageClose = document.querySelector('.popup__close_image');
  const popupButtonClosed = document.querySelector('.popup__close_new');
  const popupProfileButtonClosed = document.querySelector('.popup__close_profile');
  const popupButtonAdd = document.querySelector('.popup__button');
  const formNew = document.querySelector('.popup__form_new');
  const formProfile = document.querySelector('.popup__form_edit');
  const placesList = document.querySelector('.places-list');
  const finderUserName = document.querySelector('.user-info__name');
  const finderUserJob = document.querySelector('.user-info__job');
  const finderUserPhoto = document.querySelector('.user-info__photo');
  const popupPictureTag = document.querySelector('.popup__image');
  const spanArr = document.querySelectorAll('.popup__span');
  const popupButtonSave = document.querySelector('.popup__button_save');
  const popupButtonPlus = document.querySelector('.popup__button_plus');
  const userNameValue = document.edit.user_name;
  const userJobValue = document.edit.user_job;
  const API_URL = NODE_ENV === 'production' ? 'https://praktikum.tk' : 'http://praktikum.tk';
  const baseUrl = `${API_URL}/cohort11`;
  const key = '676464ed-c1f0-4171-a190-0999982bcdd0';

  const cardListCreate = new CardList(placesList);
  const popupClass = new Popup(popupButtonAdd, popupProfile, popupPlace, popupImage);
  const userInfoClass = new UserInfo();
  const placeFormValidator = new FormValidator(formNew);
  const profileFormValidator = new FormValidator(formProfile);
  const apiManipulation = new Api(baseUrl, key);

  const cardPrintCircle = (unit) => {
    const sample = new Card(unit, placesList, popupPictureTag, popupImage, userInfoClass.userId, baseUrl, key);
    const creature = sample.create();
    cardListCreate.addCard(creature);
    const openTag = placesList.lastChild.querySelector('.place-card__image');
    const likeTag = placesList.lastChild.querySelector('.place-card__like-icon');
    const dataTag = placesList.lastChild.querySelector('.place-card__data-class');
    const removeTag = placesList.lastChild.querySelector('.place-card__delete-icon');
    sample.open(openTag);
    sample.like(likeTag, apiManipulation.sentLiketoServer, apiManipulation.deleteLikeFromServer, apiManipulation.apiErrorReturn);
    if (userInfoClass.userId == dataTag.dataset.owner_id) {
      sample.remove(removeTag, apiManipulation.deleteUserCardFromServer, apiManipulation.apiErrorReturn);
    }
  };

  //слушатель на открытие формы добавления карточек
  popupButtonOpen.addEventListener('click', (event) => {
    popupClass.open(event);
  });
  //слушатель на закрытия окна с большой картинкой 
  popupImageClose.addEventListener('click', (event) => {
    popupClass.close(event);
  });
  // слушатель на открытие формы профиля
  popupProfileButtonOpen.addEventListener('click', () => {
    userInfoClass.userInfoFormFill(userNameValue, userJobValue);
    popupClass.open(event);
  });
  // слушатель на закрытие окна с добавлением новой карточки
  popupButtonClosed.addEventListener('click', (event) => {
    formNew.reset();
    popupClass.close(event);
    profileFormValidator.validationMessageHide(spanArr);
  });
  // слушатель на закрытие окна с профилем
  popupProfileButtonClosed.addEventListener('click', (event) => {
    profileFormValidator.validationMessageHide(spanArr);
    popupClass.close(event);
  });
  // слушатель на создание новой карточки
  formNew.addEventListener('submit', (event) => {
    popupButtonPlus.textContent = "Загрузка...";
    const popupInputName = document.new.name.value;
    const popupInputLink = document.new.link.value;

    const newAddObject = {
      name: popupInputName,
      link: popupInputLink
    };

    apiManipulation.postUserCardOnServer(newAddObject, popupButtonPlus)
    .then((res) => {
      cardPrintCircle(res);
      popupPlace.classList.remove('popup_is-opened');
      formNew.reset();
    })
    .catch((err) => {
      alert(`${err}. Проверьте авторизацию и попробуйте еще раз`)
      console.log(err);
    })
    .finally(() => {
      popupButtonPlus.textContent = "+";
    });
    event.preventDefault();
  });
  // слушатель на отправку формы профиля
  formProfile.addEventListener('submit', (event) => {

    const obj = {
      userInfoName: document.edit.user_name.value,
      userInfoJob: document.edit.user_job.value,
    };
    popupButtonSave.textContent = "Загрузка...";
    apiManipulation.pushUserInfoToServer(obj)
      .then((res) => {
        popupProfile.classList.toggle('popup_is-opened');
        userInfoClass.setUserInfo(res);
        userInfoClass.updateUserInfo(res, finderUserName, finderUserJob);
      })
      .catch((err) => {
        alert(err);
        console.log(err);
      })
      .finally(()=>{
        popupButtonSave.textContent = "Сохранить";
      });

      event.preventDefault();

  });

    Promise.all([
      apiManipulation.takeInfoFromServer(),
      apiManipulation.cardListGet()
    ])
    .then((values) =>{
      const [userData, initialCards] = values;
      userInfoClass.updateUserInfo(userData, finderUserName, finderUserJob);
      userInfoClass.updateUserAvatar(userData, finderUserPhoto);
      userInfoClass.setUserInfo(userData);
      cardListCreate.render(initialCards, cardPrintCircle);
    })
    .catch((err) =>{
      alert("Во время загрузки данных с сервера произошла ошибка. Проверьте авторизацию и попробуйте перезагрузить страницу")
      console.log(err);  
    });
      

  placeFormValidator.setEventListeners();
  profileFormValidator.setEventListeners();

