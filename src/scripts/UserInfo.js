export class UserInfo {
    constructor(userName, userJob, userAvatar, userId) {
        this.userName = userName;
        this.userJob = userJob;
        this.userAvatar = userAvatar;
        this.userId = userId;

    }
    // setUserInfo, чтобы обновлять данные внутри экземпляра класса;
    setUserInfo(obj) {
        this.userName = obj.name;
        this.userJob = obj.about;
        this.userAvatar = obj.avatar;
        this.userId = obj._id;
    }
    // updateUserInfo, чтобы отображать эти данные на странице.
    updateUserInfo(obj, finderUserName, finderUserJob) {
        finderUserName.textContent = obj.name;
        finderUserJob.textContent = obj.about;
    }
    updateUserAvatar(obj, finderUserPhoto) {
        finderUserPhoto.setAttribute('style', `background-image: url(${obj.avatar})`);
    }
    // userInfoFormFill, для заполнения данных формы.
    userInfoFormFill(userNameValue, userJobValue) {

        userNameValue.value = this.userName;
        userJobValue.value = this.userJob;
    }

};

// Класс для работы с данными пользователя. Экземпляр этого класса должен хранить в себе данные пользователя: имя и информацию о себе, а также отображать эту информацию на странице. Для этого класса нужно определить методы:
// setUserInfo, чтобы обновлять данные внутри экземпляра класса;
// updateUserInfo, чтобы отображать эти данные на странице.
// Логичный вопрос: почему не объединить эти методы в один, который бы обновлял данные и затем выводил на экран?
// Первая причина — принцип разделения ответственности. Лучше, чтобы каждый метод отвечал за небольшую часть функциональности.
// Вторая причина станет понятна в следующем спринте, — когда мы подключим проект к серверу. Тогда, чтобы обновить данные, сначала нужно будет отправить запрос на сервер, дождаться ответа и только после этого обновить DOM. Поэтому лучше сразу вынести обновление DOM в отдельную функцию.
