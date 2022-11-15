"use script"

const addToDo = document.getElementById("add_to_do");
const listToDo = document.getElementById("list_to_do");
const toDoList = document.querySelectorAll(".todo");
const toDoList0 = document.querySelectorAll(".todo0");
const addButton = document.querySelectorAll(".add_button");
const container = document.querySelector(".container");
const calendarWrapper = document.querySelector(".calendar_wrapper");
const clBtnCncl = document.querySelector(".clendar_btn_cancel");
const clBtnOk = document.querySelector(".clendar_btn_ok");
const overlay = document.querySelector(".overlay");

const createMinute = document.querySelector('.create_minute');
const createHour = document.querySelector('.create_hour');

let idButton = 0;
let counterNotes = 0;
let counterDelete = 0;

let globalDynamicEditBtnId = 0;

let buttonArray = [];

let timeItemsHourArray = [];
let timeItemsMinuteArray = [];

let targetTimeArray = [];
let targetDayArray = [];
let targetMonthArray = [];
let targetYearArray = [];
let targetHourArray = [];
let targetMinuteArray = [];

// function that prohibits copying
document.ondragstart = noselect;
document.onselectstart = noselect;
document.oncontextmenu = noselect;
function noselect() { return false; };

// Preloader function
const preloaderFunction = (window.onload = function () {
    let preloader = document.getElementById("preloader");
    const func = () => {
        container.classList.remove("display_none");
        container.classList.add("container_flex");
    }
    setTimeout(func, 1 * 1000);
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
        <p class="note_title" id="${idButton}">${title}</p>
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
    <div class="note_target_time display_none" id="${idButton}">
    <img src="img/icons_bell.png" alt="bell" />
    <div class="target_date_wrapper id="${idButton}"">
      <div class="target_days">1</div>
      <div class="target_month">Липень</div>
      <div class="target_year">2022</div>
    </div>
    <div class="target_time_wrapper">
      <div class="target_hour"></div>
      <div class="target">:</div>
      <div class="target_minuts">30</div>
    </div>
  </div>

    `
    clBtnOk.id = idButton;

    const editBtn = noteElement.querySelectorAll(".note_edit");
    const editNoteClock = noteElement.querySelectorAll(".note_edit_clock");

    const deleteBtn = noteElement.querySelectorAll(".note_delete");
    const titleElement = noteElement.querySelectorAll(".note_title");
    const textElement = noteElement.querySelector("#note_text");
    const titleInputElement = noteElement.querySelector("#note_title_input");
    const textInputElement = noteElement.querySelectorAll(".textarea_text");
    const addButtonNote = noteElement.querySelectorAll(".add_button_note");
    const addButtonNoteDelete = noteElement.querySelector(".add_button_note");

    const noteTargetTimeDiv = noteElement.querySelector('.note_target_time ');

    const targetTime = noteElement.querySelector(".note_target_time");
    const targetDay = noteElement.querySelector(".target_days");
    const targetMonth = noteElement.querySelector(".target_month");
    const targetYear = noteElement.querySelector(".target_year");
    const targetHour = noteElement.querySelector(".target_hour");
    const targetMinute = noteElement.querySelector(".target_minuts");

    targetDay.id = idButton;

    // functions of the button for adding a new note
    for (let i = 0; i < addButtonNote.length; i++) {
        addButtonNote[i].addEventListener("click", function () {
            const element = createNote("Заголовок", "Ваш текст", idButton)
            for (let i = 0; i < toDoList.length; i++) {
                toDoList[i].appendChild(element)
            }


            addButtonNote[i].classList.add("display_none");
        })

    }
    // functions of the edit button
    for (let i = 0; i < editBtn.length; i++) {
        editBtn[i].addEventListener("click", function (e) {
            titleElement[i].classList.toggle("hidden")
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
            globalDynamicEditBtnId = editNoteClock[i].id;
            globalAddButtonNoteId = editNoteClock[i].id
            if (noteTargetTimeDiv.className == "note_target_time display_none" && editNoteClock[i].id == noteTargetTimeDiv.id) {
                hour.innerHTML = "год"
                hour.style.color = "rgba(192, 192, 192, 0.521)";
                minute.innerHTML = "хв";
                minute.style.color = "rgba(192, 192, 192, 0.521)";
            }
        })

    }
    // function generate time
    const hour = document.querySelector('.hour');
    const minute = document.querySelector('.minute');
    const monthDiv = document.querySelector('.month_picker');
    const yearhDiv = document.querySelector('.year_class').textContent;

    hour.onclick = () => {

        if (timeItemsHourArray.length == 0) {
            for (let i = 0; i < 24; i++) {
                const createHourItems = document.createElement('div');
                createHourItems.innerHTML = i;
                createHourItems.classList.add('time_items_hour');
                createHour.classList.remove('display_none');
                createHour.appendChild(createHourItems)
            }
        }

        createHour.classList.add("calendar_flex");
        hour.style.color = "black";
        overlay.classList.add("overlay_index");
        const timeItems = document.querySelectorAll('.time_items_hour');

        timeItemsHourArray = timeItems;


        for (let i = 0; i < timeItems.length; i++) {
            timeItems[i].addEventListener('click', function () {
                let contentButtonHour = timeItems[i].textContent;
                hour.innerHTML = contentButtonHour;
                createHour.classList.add('display_none');
                createHour.classList.remove("calendar_flex");
                overlay.classList.remove("overlay_index");
            })
        }

    }

    minute.onclick = () => {
        if (timeItemsMinuteArray.length == 0) {
            for (let i = 0; i < 60; i++) {
                const createHourItems = document.createElement('div');
                createHourItems.innerHTML = i;
                createHourItems.classList.add('time_items_minute');
                createMinute.classList.remove('display_none');
                createMinute.appendChild(createHourItems)
            }
        }

        createMinute.classList.add("calendar_flex");
        overlay.classList.add("overlay_index");
        minute.style.color = "black";
        const timeItems = document.querySelectorAll('.time_items_minute');

        timeItemsMinuteArray = timeItems;


        for (let i = 0; i < timeItems.length; i++) {
            timeItems[i].addEventListener('click', function () {
                let contentButtonMinute = timeItems[i].textContent;
                minute.innerHTML = contentButtonMinute;
                createMinute.classList.add('display_none');
                createMinute.classList.remove("calendar_flex");
                overlay.classList.remove("overlay_index");
            })
        }
    }

    // Function delete notes
    for (let i = 0; i < deleteBtn.length; i++) {
        deleteBtn[i].addEventListener("click", (e) => {
            noteElement.remove();
            counterNotes = counterNotes - 1;
            counterDelete = counterDelete + 1;
            buttonArray.pop();
            let l = buttonArray[buttonArray.length - 1]
            if (buttonArray.length > 0) {
                l.classList.remove("display_none");
            }
            if (counterNotes == 0) {
                for (let i = 0; i < addButton.length; i++) {
                    buttonArray = []
                    addButton[i].classList.remove("display_none");
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

    buttonArray.push(addButtonNoteDelete);

    targetTimeArray.push(targetTime);
    targetDayArray.push(targetDay);
    targetMonthArray.push(targetMonth);
    targetYearArray.push(targetYear);
    targetHourArray.push(targetHour);
    targetMinuteArray.push(targetMinute);

    idButton++;
    counterNotes = counterNotes + 1;

    return noteElement
}

for (let i = 0; i < addButton.length; i++) {
    addButton[i].addEventListener("click", (e) => {
        idButton = 0
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
let dayDivValue = 0;
let globalAddButtonNoteId = 0;

clBtnOk.onclick = (e) => {
    const hourDivValue = document.querySelector('.hour').textContent;
    const minuteDivValue = document.querySelector('.minute').textContent;
    const monthDivValue = document.querySelector('.month_picker').textContent;
    const yearhDivValue = document.querySelector('.year_class').textContent;

    for (let i = globalDynamicEditBtnId; i < targetTimeArray.length; i++) {
        if (targetTimeArray[i].id == globalDynamicEditBtnId) {
            targetTimeArray[i].classList.remove("display_none");
            targetTimeArray[i].classList.add("note_target_time_flex");
            if (targetTimeArray[i].id == targetDayArray[i].id) {
                targetDayArray[i].textContent = dayDivValue;
                targetMonthArray[i].textContent = monthDivValue;
                targetYearArray[i].textContent = yearhDivValue;
                targetHourArray[i].textContent = hourDivValue;
                targetMinuteArray[i].textContent = minuteDivValue;
            }

        }
    }
    calendarWrapper.classList.add("display_none");
    calendarWrapper.classList.remove("calendar_flex");
    overlay.classList.add("display_none");



}

clBtnCncl.addEventListener("click", () => {
    calendarWrapper.classList.add("display_none");
    calendarWrapper.classList.remove("calendar_flex");
    overlay.classList.add("display_none");

})

overlay.onclick = () => {
    if (overlay.className == "overlay") {
        calendarWrapper.classList.add("display_none");
        calendarWrapper.classList.remove("calendar_flex");
        overlay.classList.add("display_none");
    } else if (overlay.className == "overlay overlay_index") {
        createMinute.classList.remove('calendar_flex');
        createMinute.classList.add('display_none');
        overlay.classList.remove('overlay_index');
        createHour.classList.remove('calendar_flex');
        createHour.classList.add('display_none');
    }
}

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
            let a = targetDay[i].textContent
            dayDivValue = a;
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


