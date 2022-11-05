"use script"

const addToDo = document.getElementById("add_to_do")
const listToDo = document.getElementById("list_to_do")
const toDoList = document.querySelectorAll(".todo")
const addButton = document.querySelectorAll(".add_button")
const container = document.querySelector(".container")
const button1 = document.getElementById("add_button_1")

let idButton = 10
let counterNotes = 0
let counterDelete = 0
// Preloader function
const preloaderFunction = (window.onload = function () {
    let preloader = document.getElementById("preloader")
    const func = () => {
        container.classList.remove("display_none")
    }
    setTimeout(func, 3 * 1000)
})

addToDo.onclick = function () {
    listToDo.classList.add("z_index")
    addToDo.classList.remove("z_index")
}
listToDo.onclick = function () {
    listToDo.classList.remove("z_index")
    addToDo.classList.add("z_index")
}
// function texrareaScrollHeight() {
//     let textarea = document.querySelector('textarea');

//     textarea.addEventListener('keyup', function () {
//         if (this.scrollTop > 0) {
//             this.style.height = this.scrollHeight + "px";
//         }
//     });
//     console.log(textarea);
// }

function createNote(title, text) {
    const noteElement = document.createElement("div")

    noteElement.classList.add("note")
    noteElement.innerHTML = `
    <button class="add_button_note add_button" id="${idButton}">
    <img src="img/icon_plus.png" alt="" />
  </button>
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
    <textarea id="note_text_input" class="hidden textarea_text">${text}</textarea>

    `
    const editBtn = noteElement.querySelector(".note_edit")
    const deleteBtn = noteElement.querySelector(".note_delete")
    const titleElement = noteElement.querySelector("#note_title")
    const textElement = noteElement.querySelector("#note_text")
    const titleInputElement = noteElement.querySelector("#note_title_input")
    const textInputElement = noteElement.querySelector("#note_text_input")
    let addButtonNote = noteElement.querySelector(".add_button_note")

    addButtonNote.onclick = function () {
        const element = createNote("Заголовок", "Ваш текст", idButton)
        counterNotes = counterNotes + 1
        for (let i = 0; i < toDoList.length; i++) {
            let idButtonClass = idButton - 1
            toDoList[i].appendChild(element)
            if (idButtonClass >= 10) {
                addButtonNote.classList.add("display_none")
            }
        }
        idButton = idButton + 1
    }

    // Function button edit notes
    editBtn.addEventListener("click", (e) => {
        const textarea = document.querySelector(".textarea_text")
        titleElement.classList.toggle("hidden")
        textElement.classList.toggle("hidden")

        titleInputElement.classList.toggle("hidden")
        textInputElement.classList.toggle("hidden")

        textarea.addEventListener("keyup", function () {
            if (this.scrollTop > 0) {
                this.style.height = this.scrollHeight + "px"
            }
            console.log("click text area")
        })
        console.log(textarea)
    })
    // Function delete notes
    deleteBtn.addEventListener("click", (e) => {
        noteElement.remove()
        counterNotes = counterNotes - 1
        counterDelete = counterDelete + 1
        if (counterNotes == 0) {
            for (let i = 0; i < addButton.length; i++) {
                addButton[i].classList.remove("display_none")
            }
        }
        if (Number(addButtonNote.id) + counterDelete == idButton) {
            console.log("click")
            // for (let i = idButton; i > addButtonNote.id; i--) {
            //     console.log(addButtonNote.id);

            // }
        }
        console.log(addButtonNote.id)
        console.log(idButton)
        console.log(counterDelete)
    })

    titleInputElement.addEventListener("input", (e) => {
        titleElement.innerText = e.target.value
    })
    textInputElement.addEventListener("input", (e) => {
        textElement.innerText = e.target.value
    })

    return noteElement
}

for (let i = 0; i < addButton.length; i++) {
    addButton[i].addEventListener("click", (e) => {
        const element = createNote("Заголовок", "Ваш текст", idButton)
        if (addButton[i].id === "add_button_0") {
            addButton[i].classList.add("display_none")
            toDoList[i].appendChild(element)
        } else if (addButton[i].id === "add_button_1") {
            toDoList[i].appendChild(element)
            addButton[i].classList.add("display_none")
            idButton = idButton + 1
            counterNotes = counterNotes + 1
            counterDelete = 0
        }
    })
}
