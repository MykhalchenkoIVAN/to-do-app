"use script"

const addToDo = document.getElementById("add_to_do")
const listToDo = document.getElementById("list_to_do")
const toDoList = document.querySelectorAll(".todo")
const toDoList0 = document.querySelectorAll(".todo0")
const addButton = document.querySelectorAll(".add_button")
const container = document.querySelector(".container")
const button1 = document.getElementById("add_button_1")
const calendarWrapper = document.querySelector(".calendar_wrapper")
const clBtnOk = document.querySelector(".clendar_btn_ok")
const clBtnCncl = document.querySelector(".clendar_btn_cancel")
const overlay = document.querySelector(".overlay")

const rootElement = document.documentElement

let idButton = 0
let counterNotes = 0
let counterDelete = 0

let buttonArray = []
// Preloader function
const preloaderFunction = (window.onload = function () {
    let preloader = document.getElementById("preloader")
    const func = () => {
        container.classList.remove("display_none")
        container.classList.add("container_flex")
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

function createNote(title, text) {
    const noteElement = document.createElement("div")
    noteElement.classList.add("note")
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
        <button class="note_edit_clock" id="${idButton}"><img src="img/icon_clock.png" alt="edit"/>
        </button>
        <button class="note_delete" id="${idButton}"><img src="img/icon_delete.png" alt="delete"/>
        </button>
        </div>
    </div >
    <p id="note_text">${text}</p>
    <textarea id="note_text_input_${idButton}" class="hidden textarea_text"> ${text}</textarea>

    `

    const editBtn = noteElement.querySelectorAll(".note_edit")
    const deleteBtn = noteElement.querySelectorAll(".note_delete")
    const titleElement = noteElement.querySelector("#note_title")
    const textElement = noteElement.querySelector("#note_text")
    const titleInputElement = noteElement.querySelector("#note_title_input")
    const textInputElement = noteElement.querySelectorAll(".textarea_text")
    const addButtonNote = noteElement.querySelectorAll(".add_button_note")
    const addButtonNoteDelete = noteElement.querySelector(".add_button_note")
    const editNoteClock = noteElement.querySelectorAll(".note_edit_clock")

    // functions of the button for adding a new note
    for (let i = 0; i < addButtonNote.length; i++) {
        addButtonNote[i].addEventListener("click", function () {
            const element = createNote("Заголовок", "Ваш текст", idButton)
            for (let i = 0; i < toDoList.length; i++) {
                toDoList[i].appendChild(element)
            }
            addButtonNote[i].classList.add("display_none")
        })
    }
    // functions of the edit button
    for (let i = 0; i < editBtn.length; i++) {
        editBtn[i].addEventListener("click", function (e) {
            titleElement.classList.toggle("hidden")
            textElement.classList.toggle("hidden")
            titleInputElement.classList.toggle("hidden")
            textInputElement[i].classList.toggle("hidden")
            textInputElement[i].addEventListener("keyup", function () {
                if (this.scrollTop > 0) {
                    this.style.height = this.scrollHeight + "px"
                }
            })
        })
    }
    // Funcktion edit target time
    for (let i = 0; i < editNoteClock.length; i++) {
        editNoteClock[i].addEventListener("click", (e) => {
            calendarWrapper.classList.remove("display_none");
            calendarWrapper.classList.add("calendar_flex");
            overlay.classList.remove("display_none");

            let hour = document.querySelectorAll(".hour_class");

        })
    }
    // Function delete notes
    for (let i = 0; i < deleteBtn.length; i++) {
        deleteBtn[i].addEventListener("click", (e) => {
            noteElement.remove()
            counterNotes = counterNotes - 1
            counterDelete = counterDelete + 1
            buttonArray.pop()
            let l = buttonArray[buttonArray.length - 1]
            if (buttonArray.length > 0) {
                l.classList.remove("display_none")
                console.log("click")
            }
            if (counterNotes == 0) {
                for (let i = 0; i < addButton.length; i++) {
                    buttonArray = []
                    addButton[i].classList.remove("display_none")
                }
            }
        })
    }
    titleInputElement.addEventListener("input", (e) => {
        titleElement.innerText = e.target.value
    })
    for (let i = 0; i < textInputElement.length; i++) {
        textInputElement[i].addEventListener("input", (e) => {
            textElement.innerText = e.target.value
        })
    }

    buttonArray.push(addButtonNoteDelete)
    idButton++
    counterNotes = counterNotes + 1

    return noteElement
}

for (let i = 0; i < addButton.length; i++) {
    addButton[i].addEventListener("click", (e) => {
        idButton = 0
        console.log(idButton)
        const element = createNote("Заголовок", "Ваша замітка", idButton)
        if (addButton[i].id === "add_button_0") {
        } else if (addButton[i].id === "add_button_1") {
            toDoList[i].appendChild(element)
            addButton[i].classList.add("display_none")
            counterDelete = 0
        }
    })
}

// calendar functions

clBtnOk.addEventListener("click", (e) => {
    calendarWrapper.classList.add("display_none")
    calendarWrapper.classList.remove("calendar_flex")
    overlay.classList.add("display_none")
})
clBtnCncl.addEventListener("click", (e) => {
    calendarWrapper.classList.add("display_none")
    calendarWrapper.classList.remove("calendar_flex")
    overlay.classList.add("display_none")
    console.log("click cncl")
})

//
const isLeapYear = (year) => {
    return (
        (year % 4 === 0 && year % 100 !== 0 && year % 400 !== 0) ||
        (year % 100 === 0 && year % 400 === 0)
    )
}
const getFebDays = (year) => {
    return isLeapYear(year) ? 29 : 28
}
let calendar = document.querySelector(".calendar")
const month_names = [
    "Січень",
    "Лютий",
    "Березень",
    "Квітень",
    "Травень",
    "Червень",
    "Липень",
    "Серпень",
    "Вересень",
    "Жовтень",
    "Листопад",
    "Грудень",
]
let monthPicker = document.querySelector("#month_picker")

monthPicker.onclick = () => {
    monthList.classList.remove("hideonce")
    monthList.classList.remove("hide")
    monthList.classList.add("show")
}

const generateCalendar = (month, year) => {
    let calendar_days = document.querySelector(".calendar_days")
    calendar_days.innerHTML = ""
    let calendar_header_year = document.querySelector("#year")
    let days_of_month = [
        31,
        getFebDays(year),
        31,
        30,
        31,
        30,
        31,
        31,
        30,
        31,
        30,
        31,
    ]

    let currentDate = new Date()

    monthPicker.innerHTML = month_names[month]

    calendar_header_year.innerHTML = year

    let first_day = new Date(year, month)

    for (let i = 0; i <= days_of_month[month] + first_day.getDay() - 1; i++) {
        let day = document.createElement("div");
        day.classList.add("target_day")

        if (i >= first_day.getDay()) {
            day.innerHTML = i - first_day.getDay() + 1

            if (
                i - first_day.getDay() + 1 === currentDate.getDate() &&
                year === currentDate.getFullYear() &&
                month === currentDate.getMonth()
            ) {
                day.classList.add("current_date")
            }
        }
        calendar_days.appendChild(day)
    }

    const targetDay = document.querySelectorAll(".target_day");
    for (let i = 0; i < targetDay.length; i++) {
        targetDay[i].addEventListener("click", function () {
            console.log(targetDay[i].textContent);
        })
    }


}

let monthList = calendar.querySelector(".month_list")
month_names.forEach((e, index) => {
    let month = document.createElement("div")
    month.innerHTML = `<div>${e}</div>`

    monthList.append(month)
    month.onclick = () => {
        currentMonth.value = index
        generateCalendar(currentMonth.value, currentYear.value)
        monthList.classList.replace("show", "hide")
    }
})
    ; (function () {
        monthList.classList.add("hideonce")
    })()
document.querySelector("#pre-year").onclick = () => {
    --currentYear.value
    generateCalendar(currentMonth.value, currentYear.value)
}
document.querySelector("#next-year").onclick = () => {
    ++currentYear.value
    generateCalendar(currentMonth.value, currentYear.value)
}
let currentDate = new Date()
let currentMonth = { value: currentDate.getMonth() }
let currentYear = { value: currentDate.getFullYear() }
generateCalendar(currentMonth.value, currentYear.value)

// function generate time
const hour = document.querySelector('.hour');
const createHour = document.querySelector('.create_hour');
const minute = document.querySelector('.minute');


function createTime() {
    const createDivTime = document.createElement("div");
    createDivTime.classList.add("time_items")

}



hour.onclick = () => {
    const timeItems = document.querySelectorAll('.time_items');
    createHour.classList.add('calendar_flex')
    createHour.classList.toggle('display_none')
    if (timeItems.length == 0) {
        for (let i = 0; i < 24; i++) {
            const createDivTime = document.createElement("div");
            createDivTime.innerHTML = i;
            createDivTime.classList.add('time_items')
            createHour.appendChild(createDivTime)
        }
    }



    console.log(timeItems);
}

minute.onclick = () => {

}

