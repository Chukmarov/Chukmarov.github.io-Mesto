class Popup{
    constructor(popupButtonAdd,popupProfile,popupPlace,popupImage){
        this.popupButtonAdd=popupButtonAdd;
        this.popupProfile=popupProfile;
        this.popupPlace=popupPlace;
        this.popupImage=popupImage;
    }

    open(event){

        if (event.target.classList.contains('user-info__button_add')){
            this.popupPlace.classList.toggle('popup_is-opened');

            if (!this.popupButtonAdd.hasAttribute('disabled')) {
                this.popupButtonAdd.setAttribute('disabled', 'disabled');
                this.popupButtonAdd.classList.remove('popup__button_active');
            };
        };

        if (event.target.classList.contains('user-info__button_edit')){
            this.popupProfile.classList.toggle('popup_is-opened');
        };

    }

    close(event){

        if (event.target.classList.contains('popup__close_new')){
            this.popupPlace.classList.toggle('popup_is-opened');
            if (!this.popupButtonAdd.hasAttribute('disabled')) {
                this.popupButtonAdd.setAttribute('disabled', 'disabled');
                this.popupButtonAdd.classList.remove('popup__button_active');
            };
        };

        if (event.target.classList.contains('popup__close_profile')){
            this.popupProfile.classList.toggle('popup_is-opened');
        };

        if (event.target.classList.contains('popup__close_image')){
            this.popupImage.classList.toggle('popup_is-opened');
            this.popupImage.removeAttribute('src', null);
        };

        if (event.target.classList.contains('popup__button_save')){
            this.popupProfile.classList.toggle('popup_is-opened');
        };

    }
};

//Это класс для всплывающего окна. Добавьте ему методы open и close, чтобы показывать и скрывать попап. Есть два подхода, как можно реализовать всплывающие окна:
// сделать единый контейнер для всех попапов и менять его содержимое при открытии;
// сделать независимые попапы в разных контейнерах.
// Первый способ одновременно лучше и сложнее. Но вы сами можете выбрать, как реализовать попап.
