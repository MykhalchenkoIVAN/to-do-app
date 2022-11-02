'use script'

let addToDo = document.getElementById('add_to_do');
let listToDo = document.getElementById('list_to_do');
const toDoList = document.querySelector('.todo')
const addButton = document.querySelector('.add_button');
console.log(addButton);

// addToDo.onclick = function () {
//     listToDo.classList.add('z_index');
//     addToDo.classList.remove('z_index');
// }
// listToDo.onclick = function () {
//     listToDo.classList.remove('z_index');
//     addToDo.classList.add('z_index');
// }

// for (let i = 0; i < addButton.length; i++) {
//     addButton[i].addEventListener('click', function () {
//         console.log(addButton[i].id);
//         console.log(inputAdd1.id);

//         if (addButton[i].id == "add_btn1") {
//             console.log("натиснуто 1");
//             let toDoAdd1 = document.getElementById('input_add1').value;
//             document.querySelector(".todo1").textContent = toDoAdd1;
//             document.getElementById('input_add1').value = "";

//         } else if
//             (addButton[i].id == "add_btn2") {
//             console.log("натиснуто 2");
//             let toDoAdd2 = document.getElementById('input_add2').value;
//             document.querySelector(".todo2").textContent = toDoAdd2;
//             document.getElementById('input_add2').value = "";
//             console.log(typeof toDoAdd);
//         }

//     })
// }
function createNote(title, text) {
    const noteElement = document.createElement('div');
    noteElement.classList.add('note');
    noteElement.innerHTML = `
    <div class="note_header">
        <p id="note_title">${title}</p>
        <textarea id="note_title_input" class="hidden">${title}</textarea>
        <div class="note_action">
        <button class="note_edit"><img src="img/icon_edit.png" alt="edit"/>
        </button>
        <button class="note_delete"><img src="img/icon_delete.png" alt="delete"/>
        </button>
        </div>
    </div >
    <p id="note_text">${text}</p>
    <textarea id="note_text_input" class="hidden">${text}</textarea>
    `
    const editBtn = noteElement.querySelector('.note_edit');
    const deleteBtn = noteElement.querySelector('.note_delete');
    const titleElement = noteElement.querySelector('#note_title');
    const textElement = noteElement.querySelector('#note_text');
    const titleInputElement = noteElement.querySelector('#note_title_input');
    const textInputElement = noteElement.querySelector('#note_text_input');

    editBtn.addEventListener('click', (e) => {
        titleElement.classList.toggle('hidden');
        textElement.classList.toggle('hidden');

        titleInputElement.classList.toggle('hidden');
        textInputElement.classList.toggle('hidden');
    });
    deleteBtn.addEventListener('click', (e) => {
        noteElement.remove();
    });

    titleInputElement.addEventListener('input', (e) => {
        titleElement.innerText = e.target.value;
    });
    textInputElement.addEventListener('input', (e) => {
        textElement.innerText = e.target.value;
    });

    return noteElement;
}

addButton.addEventListener('click', (e) => {
    const element = createNote("Заголовок", "Ваш текст");
    toDoList.appendChild(element);

})