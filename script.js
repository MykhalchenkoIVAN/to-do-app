"use script"

const addToDo = document.getElementById("add_to_do");
const listToDo = document.getElementById("list_to_do");
const toDoList = document.querySelectorAll(".todo");
const toDoList0 = document.querySelectorAll(".todo0");
const addButton = document.querySelectorAll(".add_button");
const container = document.querySelector(".container");
const button1 = document.getElementById("add_button_1");



let idButton = 0;
let counterNotes = 0;
let counterDelete = 0;

let buttonArray = [];
// Preloader function
const preloaderFunction = (window.onload = function () {
    let preloader = document.getElementById("preloader");
    const func = () => {
        container.classList.remove("display_none");
    }
    setTimeout(func, 3 * 1000);
})

addToDo.onclick = function () {
    listToDo.classList.add("z_index");
    addToDo.classList.remove("z_index");
}
listToDo.onclick = function () {
    listToDo.classList.remove("z_index");
    addToDo.classList.add("z_index");
}

function createNote(title, text) {



    const noteElement = document.createElement("div");

    noteElement.classList.add("note");
    noteElement.innerHTML = `
    <button class="add_button_note add_button" id="${idButton}">
    <img src="img/icon_plus.png" alt="" />
  </button>
    <div class="note_header">
        <p id="note_title">${title}</p>
        <textarea id="note_title_input" class="hidden note_title_input">${title}</textarea>
        <div class="note_action">
        <button class="note_edit" id="${idButton}"><img src="img/icon_edit.png" alt="edit"/>
        </button>
        <button class="note_delete" id="${idButton}"><img src="img/icon_delete.png" alt="delete"/>
        </button>
        </div>
    </div >
    <p id="note_text">${text}</p>
    <textarea id="note_text_input_${idButton}" class="hidden textarea_text">${text}</textarea>

    `
    const editBtn = noteElement.querySelectorAll(".note_edit");
    const deleteBtn = noteElement.querySelectorAll(".note_delete");
    const titleElement = noteElement.querySelector("#note_title");
    const textElement = noteElement.querySelector("#note_text");
    const titleInputElement = noteElement.querySelector("#note_title_input");
    const textInputElement = noteElement.querySelectorAll(".textarea_text");
    const addButtonNote = noteElement.querySelectorAll(".add_button_note");
    const addButtonNoteDelete = noteElement.querySelector(".add_button_note");



    for (let i = 0; i < addButtonNote.length; i++) {
        addButtonNote[i].addEventListener("click", function () {
            const element = createNote("Заголовок", "Ваш текст", idButton)
            for (let i = 0; i < toDoList.length; i++) {
                toDoList[i].appendChild(element);
            }
            addButtonNote[i].classList.add("display_none");
        })
    }
    for (let i = 0; i < editBtn.length; i++) {

        editBtn[i].addEventListener('click', function (e) {
            console.log(e.target.getAttribute('id'));
            titleElement.classList.toggle("hidden");
            textElement.classList.toggle("hidden");
            titleInputElement.classList.toggle("hidden");
            textInputElement[i].classList.toggle("hidden");


            textInputElement[i].addEventListener("keyup", function () {
                if (this.scrollTop > 0) {
                    this.style.height = this.scrollHeight + "px"
                }
            })

        })
    }
    // Function delete notes
    for (let i = 0; i < deleteBtn.length; i++) {
        deleteBtn[i].addEventListener("click", (e) => {
            noteElement.remove();
            counterNotes = counterNotes - 1;
            counterDelete = counterDelete + 1;
            let lastElem = buttonArray.pop()
            console.log(lastElem);
            if (counterNotes == 0) {
                for (let i = 0; i < addButton.length; i++) {
                    buttonArray = [];
                    addButton[i].classList.remove("display_none");
                }
            }
        })
    }
    // deleteBtn.addEventListener("click", (e) => {
    //     e
    //     noteElement.remove();
    //     counterNotes = counterNotes - 1;
    //     counterDelete = counterDelete + 1;
    //     if (counterNotes == 0) {
    //         for (let i = 0; i < addButton.length; i++) {
    //             addButton[i].classList.remove("display_none")
    //         }
    //     }
    //     if (addButtonNoteDelete.length > 0) {
    //         let c = addButtonNoteDelete.length - 1;
    //         addButtonNoteDelete[c].classList.remove("display_none");
    //     }

    // });

    titleInputElement.addEventListener("input", (e) => {
        titleElement.innerText = e.target.value
    });
    for (let i = 0; i < textInputElement.length; i++) {
        textInputElement[i].addEventListener("input", (e) => {
            textElement.innerText = e.target.value
        });
    }



    buttonArray.push(addButtonNoteDelete)
    idButton++;

    counterNotes = counterNotes + 1;
    console.log(counterNotes);
    console.log(buttonArray);
    return noteElement

}

for (let i = 0; i < addButton.length; i++) {
    addButton[i].addEventListener("click", (e) => {
        idButton = 0;
        console.log(idButton);
        const element = createNote("Заголовок", "Ваш текст", idButton)
        if (addButton[i].id === "add_button_0") {
        } else if (addButton[i].id === "add_button_1") {
            toDoList[i].appendChild(element);
            addButton[i].classList.add("display_none");
            counterDelete = 0;

        }
    })

}
