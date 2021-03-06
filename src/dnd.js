/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то дабавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#homework-container');

/*
 Функция должна создавать и возвращать новый div с классом draggable-div и случайными размерами/цветом/позицией
 Функция должна только создавать элемент и задвать ему случайные размер/позицию/цвет
 Функция НЕ должна добавлять элемент на страницу. На страницу элемент добавляется отдельно

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
 */
function createDiv() {
    let newElem = document.createElement('div');
    newElem.style.width = Math.random()*100+'%';
    newElem.style.height = Math.random()*100+'%';
    newElem.style.position = 'absolute';
    newElem.style.top = Math.random()*100+'%';
    newElem.style.left = Math.random()*100+'%';
    newElem.style.background = `rgb(${Math.random()*100},${Math.random()*100},${Math.random()*100})`;
    newElem.classList.add('draggable-div');
    return newElem;
}

/*
 Функция должна добавлять обработчики событий для перетаскивания элемента при помощи drag and drop

 Пример:
   const newDiv = createDiv();
   homeworkContainer.appendChild(newDiv);
   addListeners(newDiv);
 */
function addListeners(target) {
    let moveEl = (e) =>{
        target.style.left = `${e.pageX - pos.left / 2}px`;
        target.style.top = `${e.pageY - pos.top / 2}px`;
    }

    target.addEventListener('mousedown',e=>{
        let elemAbs = this.getBoundingClientRect();
        let pos = {
            top: elemAbs.top + pageYOffset,
            left: elemAbs.left + pageXOffset
        }
        document.addEventListener('mousemove', moveEl);
        target.addEventListener('dragstart', () => false);
        target.addEventListener('mouseup', function upHand() {
            document.removeEventListener('mousemove', moveEl);
            target.removeEventListener('mouseup', upHand);
        });
    });
}

let addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function() {
    // создать новый div
    const div = createDiv();

    // добавить на страницу
    homeworkContainer.appendChild(div);
    // назначить обработчики событий мыши для реализации D&D
    addListeners(div);
    // можно не назначать обработчики событий каждому div в отдельности, а использовать делегирование
    // или использовать HTML5 D&D - https://www.html5rocks.com/ru/tutorials/dnd/basics/
});

export {
    createDiv
};
