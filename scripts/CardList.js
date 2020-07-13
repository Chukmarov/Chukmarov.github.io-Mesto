class CardList {

    constructor(container, arr) {
        this.arr = arr;
        this.container = container;
    }
    //для добавления карточки в список, принимает на вход экземпляр карточки
    addCard(unit) {
        this.container.insertAdjacentHTML('beforeend', unit);
    }
    //для отрисовки карточек при загрузке страницы
    render(arr,cardPrintCircle) {
        arr.forEach((unit) => {
            cardPrintCircle(unit);
        });
    }

};

// Это класс для хранения и отрисовки карточек. Метод constructor этого класса должен принимать два аргумента:
// DOM-элемент — контейнер, куда нужно складывать карточки;
// массив карточек, которые будут на странице при загрузке.
// Ещё у класса CardList должно быть два метода:
// addCard для добавления карточки в список, принимает на вход экземпляр карточки;
// render для отрисовки карточек при загрузке страницы.