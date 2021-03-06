export class Api {
  constructor(baseUrl, key){
    this.baseUrl = baseUrl;
    this.key = key;
  }

  apiErrorReturn(res){
    if (!res.ok) {
      console.log(res);
      return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`); 
    }
    return res.json();
  }
  // get запрос на получение карточек
  cardListGet(){
      return fetch(`${this.baseUrl}/cards`,{
      method:'GET',
      headers:{
          authorization:this.key
      }
      })
      .then(res => this.apiErrorReturn(res))
  }

  // get запрос на получение ФИО пользователя
  takeInfoFromServer(){

    return fetch(`${this.baseUrl}/users/me`, {
        method: 'GET',
        headers: {
          authorization: this.key
        }
      })
    .then(res => this.apiErrorReturn(res))
  }
  // patch отправка данных пользователя на сервер
  pushUserInfoToServer(obj) {

    return fetch(`${this.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: {
          authorization: this.key,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: `${obj.userInfoName}`,
          about: `${obj.userInfoJob}`
        })
      })
      .then((res) => {


        return this.apiErrorReturn(res);
      })
  }
  // post запрос на публикацию картинки на сервере
  postUserCardOnServer(obj) {

    return fetch(`${this.baseUrl}/cards`, {
        method: 'POST',
        headers: {
          authorization: this.key,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: `${obj.name}`,
          link: `${obj.link}`
        })
      })
      .then((res) => {

        return this.apiErrorReturn(res)
      })
  }
  // delete запрос на удаление карточки с сервера
  deleteUserCardFromServer(event,baseUrl,key) {
  return fetch(`${baseUrl}/cards/${event.target.parentElement.dataset._id}`, {
    method: 'DELETE',
    headers: {
      authorization: key,
    }
  })
  }
  // put запрос на отправку лайка
  sentLiketoServer(event,baseUrl,key){ 
  return fetch(`${baseUrl}/cards/like/${event.target.dataset._id}`, {
    method: 'PUT',
    headers: {
      authorization: key,
    }
  })
  }
  // delete запрос на удаление лайка
  deleteLikeFromServer(event,baseUrl,key){
  return fetch(`${baseUrl}/cards/like/${event.target.dataset._id}`, {
    method: 'DELETE',
    headers: {
      authorization: key,
    }
  })
  }

}       