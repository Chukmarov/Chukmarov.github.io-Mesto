export class Card {
  constructor(obj,placesList,popupPictureTag,popupImage,userOwnerId, baseUrl, key) {
    this.name = obj.name;
    this.link = obj.link;
    this._id = obj._id;
    this.cardOwner_id = obj.owner._id;
    this.userOwner_id = userOwnerId;
    this.likeCounter = obj.likes;
    this.placesList = placesList;
    this.popupPictureTag = popupPictureTag;
    this.popupImage = popupImage;
    this.baseUrl = baseUrl;
    this.key = key;
  }

  like(likeTag, likePutFunc, likeDeleteFunc, apiErrorReturn) {
    if (!(undefined == (this.likeCounter.find(item => item._id == this.userOwner_id)))) {
      likeTag.classList.toggle('place-card__like-icon_liked');
    };

    likeTag.addEventListener('click', (event) => {
      event.target.classList.toggle('place-card__like-icon_liked');
      if (event.target.classList.contains('place-card__like-icon_liked')) {
        likePutFunc(event, this.baseUrl, this.key)

          .then(res => apiErrorReturn(res))
          .then((res) => {
            event.target.nextElementSibling.textContent = res.likes.length;
          })
          .catch((err) => {
            console.log(err);
            alert(`Возникла непредвиденная ошибка. ${err}. Проверьте параметры авторизации и попробуйте снова`);
            event.target.classList.toggle('place-card__like-icon_liked');
          })
      } else {
        likeDeleteFunc(event, this.baseUrl, this.key)

          .then(res => apiErrorReturn(res))
          .then((res) => {
            event.target.nextElementSibling.textContent = res.likes.length;
          })
          .catch((err) => {
            console.log(err);
            alert(`Возникла непредвиденная ошибка. ${err}. Проверьте параметры авторизации и попробуйте снова`);
            event.target.classList.toggle('place-card__like-icon_liked');
          })
      }
    });
  }

  remove(removeTag, deleteFromServerFunction, apiErrorReturn) {
    removeTag.addEventListener('click', (event) => {
      if (event.target.classList.contains('place-card__delete-icon')) {
        if (window.confirm("Вы действительно хотите удалить эту карточку?")) {
          deleteFromServerFunction(event, this.baseUrl, this.key)

            .then(res => apiErrorReturn(res))
            .then(() => {
              this.placesList.removeChild(event.target.closest('.place-card'))
            })
            .catch((err) => {
              alert(`Возникла непредвиденная ошибка. ${err}. Проверьте параметры авторизации и повторите попытку`);
              console.log(err);
            })
        }
      }
    });
  }
  // create - создает элемент карточки
  create() {
    const name = this.sanitizeHTML(this.name);
    const link = this.sanitizeHTML(this.link);
    const _id = this.sanitizeHTML(this._id);
    const likeCounter = this.likeCounter.length;

    if (this.cardOwner_id == this.userOwner_id) {
      const unit = `
          <div class="place-card">
            <div data-url="${link}" data-_id ="${_id}" data-owner_id ="${this.cardOwner_id}" class="place-card__image place-card__data-class" style="background-image: url(${link})">
              <button class="place-card__delete-icon"></button>
            </div>
            <div class="place-card__description">
              <h3 class="place-card__name">${name}</h3>
              <div class = "place-card__description-container">
                <button data-_id ="${_id}" class="place-card__like-icon"></button>
                <div class="place-card__like-counter">${likeCounter}</div>
              </div>
            </div>
          </div>`
      return unit;
    } else {
      const unit = `
          <div class="place-card">
            <div data-url="${link}" data-_id ="${_id}" data-owner_id ="${this.cardOwner_id}" class="place-card__image place-card__data-class" style="background-image: url(${link})">
            </div>
            <div class="place-card__description">
              <h3 class="place-card__name">${name}</h3>
              <div class = "place-card__description-container">
                <button data-_id ="${_id}" class="place-card__like-icon"></button>
                <div class="place-card__like-counter">${likeCounter}</div>
              </div>
            </div>
          </div>`
      return unit;
    }
  }

  sanitizeHTML(str) {
    // * Sanitize and encode all HTML in a user-submitted string
    // * (c) 2018 Chris Ferdinandi, MIT License, https://gomakethings.com
    // * @param  {String} str  The user-submitted string
    // * @return {String} str  The sanitized string

    let temp = document.createElement('div');
    temp.textContent = str;
    return temp.innerHTML;
  }

  open(openTag) {
    openTag.addEventListener('click', (event) => {
      if (event.target.classList.contains('place-card__image')) {
        const imageUrl = event.target.dataset.url;
        this.popupPictureTag.setAttribute('src', imageUrl);
        this.popupImage.classList.toggle('popup_is-opened');
      }
    });
  }
};

// Это класс, создающий карточку. Добавьте ему методы constructor, like и remove. И ещё один — create. Он будет создавать DOM-элемент карточки.
