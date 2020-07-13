class FormValidator {
    constructor(form) {
        this.form = form;
    }
    checkInputValidity(event) {
        const errorBlank = this.form.querySelector(`#${event.target.id}-error`);
        if (event.target.validity.valueMissing) {
            errorBlank.textContent = 'Это обязательное поле';
            return
        }
        if (event.target.validity.tooShort || event.target.validity.tooLong) {
            errorBlank.textContent = 'Должно быть от 2 до 30 символов';
            return

        } else {
            errorBlank.textContent = '';
        }
    }
    setSubmitButtonState(inputs, button) {
        const flag = inputs.every(item => item.checkValidity());

        if (flag) {
            button.removeAttribute('disabled');
            button.classList.add('popup__button_active');
        } else {
            if (!button.hasAttribute('disabled')) {
                button.setAttribute('disabled', 'disabled');
                button.classList.remove('popup__button_active');
            }
        }
    }
    setEventListeners() {
        const inputs = Array.from(this.form.querySelectorAll('input'));
        const button = this.form.querySelector('button');

        this.form.addEventListener('input', (event) => {
            this.setSubmitButtonState(inputs, button);
            this.checkInputValidity(event);
        });
    }
    validationMessageHide(spanArr) {
        spanArr.forEach((item) => {
            item.textContent = ''
        });

    }

}
// FormValidator
// Класс для валидации полей формы. Его конструктор должен принимать один из двух аргументов:
// элемент формы,
// или элемент попапа, внутри которого находится эта форма.
// Также у класса должны быть определены методы:
// checkInputValidity, чтобы валидировать поля. Метод показывает ошибку, если инпуты не проходят валидацию. Если проходят — скрывает ошибку.
// setSubmitButtonState, чтобы делать кнопку сабмита активной и неактивной. Состояние кнопки сабмита зависит от того, прошли все поля валидацию или нет. Этот метод должен вызываться при любом изменении данных формы. Если поля в порядке, кнопка становится активной. Если одно из полей не прошло валидацию, или пользователь его не заполнил, — кнопка неактивна.
// setEventListeners, чтобы добавлять обработчики. Добавляет необходимые для валидации обработчики всем полям формы.
