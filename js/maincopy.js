document.getElementById('taskRegisterForm').addEventListener('submit', saveTask);
const card = document.querySelector('.card');
const cardHeader = document.getElementById('card-task-header');
const priorityLevel = document.querySelector('.priority-category');
let priority;
let dateOrderedData = [],
    onlyHigh,
    onlyMid,
    onlyLittle,
    highToLow,
    lowToHigh;
let selectedOption = '0';
window.addEventListener("load", orderTasks(selectedOption));
let option = document.getElementById("taskSorter").addEventListener('change', () => {
    selectedOption = document.getElementById("taskSorter").value;
    orderTasks(selectedOption)
});

function saveTask(e) {
    e.preventDefault();
    //get value from inputs
    let taskName = getInputVal('taskName');
    let taskDate = getInputVal('taskDate');
    let taskDescription = getInputVal('taskDescription');
    let priorVal = document.forms['taskRegisterForm']['priority'].value;
    empty(taskName, taskDate, taskDescription, priorVal);
    //getData();
}

function getInputVal(id) {
    return document.getElementById(id).value;
}

//Reference messages collection
let taskRef = firebase.database().ref('Tasks');

//Save the messages to the database
function saveData(taskName, taskDate, taskDescription, priorVal) {
    card.innerHTML = '';
    let newTaskRef = taskRef.push();
    newTaskRef.set({
        taskName: taskName,
        taskDate: taskDate,
        taskDescription: taskDescription,
        priorVal: priorVal,
    });
}

//Fetch data
let ref = firebase.database().ref('Tasks');
ref.on('value', getData);
let tName;
let tTime;
let tDescription;
let finalPriority;
let pri = '';

function getData(data) {
    let information = data.val();
    let keys = Object.keys(information);

    for (let i = 0; i < keys.length; i++) {
        let content = keys[i];

        tName = information[content].taskName;
        tTime = information[content].taskDate;
        tDescription = information[content].taskDescription;
        pri = information[content].priorVal
        finalPriority;

        // switch (information[content].priorVal) {
        //     case '1':
        //         finalPriority = 'Important';
        //         break;
        //     case '2':
        //         finalPriority = 'Medium';
        //         break;
        //     case '3':
        //         finalPriority = 'Little';
        //         break;
        //     default:
        //         break;
        // }

        dateOrderedData.push(information[content]);
        //console.log(dateOrderedData);
        // card.innerHTML += `
        // <div class="card-task">
        //     <div class="card-task-header ${finalPriority}" id="card-task-header">
        //     <p class="priority-category">Prioriry: ${finalPriority}</p>
        // </div>
        // <div class="card-task-header-info">
        //     <h3 class="card-task-Title">${i + 1}: ${tName}</h3>
        //     <span class="card-task-date">Due: ${tTime}</span>
        // </div>
        // <div class="card-task-body-info">
        //     <p class="card-description">${tDescription}</p>
        // </div>
        // <div class="card-task-footer">
        //     <button onclick="func_Dat_Deletes_Card();"><i class="fas fa-check"></i> Mark as completed</button>
        // </div>
        // </div>
        // `;


    }
    dateOrderedData.sort((a, b) =>
        a.taskDate < b.taskDate ? -1 : a.taskDate > b.taskDate ? 1 : 0
    );
    return tName, tTime, tDescription, finalPriority, pri, dateOrderedData;

    //return tName, tTime, tDescription, finalPriority, pri, dateOrderedData;
}

function orderTasks(selectedOption) {
    switch (selectedOption) {
        case '1':
            highToLow = dateOrderedData.sort((a, b) =>
                a.priorVal < b.priorVal ? -1 : a.priorVal > b.priorVal ? 1 : 0
            );
            displayTasks(highToLow);
            break;
        case '2':
            lowToHigh = dateOrderedData.sort((a, b) =>
                b.priorVal < a.priorVal ? -1 : b.priorVal > a.priorVal ? 1 : 0
            );
            displayTasks(lowToHigh);
            break;
        case '3':
            onlyHigh = dateOrderedData.filter((prior) => prior.priorVal == '1');
            displayTasks(onlyHigh);
            break;
        case '4':
            onlyMid = dateOrderedData.filter((prior) => prior.priorVal == '2');
            displayTasks(onlyMid)
            break;
        case '5':
            onlyLittle = dateOrderedData.filter((prior) => prior.priorVal == '3');
            displayTasks(onlyLittle)
            break;
        // case '0':
        //     dateOrderedData.sort((a, b) =>
        //         a.taskDate < b.taskDate ? -1 : a.taskDate > b.taskDate ? 1 : 0
        //     );
        //     console.log(dateOrderedData);
        //     break;
    }
}

let lastArray = [];

function displayTasks(dataArray) {
    console.log(dataArray);
    lastArray = dataArray;
    for (let index = 0; index < lastArray.length; index++) {

        switch (pri) {
            case '1':
                finalPriority = 'Important';
                break;
            case '2':
                finalPriority = 'Medium';
                break;
            case '3':
                finalPriority = 'Little';
                break;
            default:
                break;
        }

        card.innerHTML += `
        <div class="card-task">
            <div class="card-task-header ${finalPriority}" id="card-task-header">
            <p class="priority-category">Prioriry: ${finalPriority}</p>
        </div>
        <div class="card-task-header-info">
            <h3 class="card-task-Title">${index + 1}: ${tName}</h3>
            <span class="card-task-date">Due: ${tTime}</span>
        </div>
        <div class="card-task-body-info">
            <p class="card-description">${tDescription}</p>
        </div>
        <div class="card-task-footer">
            <button onclick="func_Dat_Deletes_Card();"><i class="fas fa-check"></i> Mark as completed</button>
        </div>
        </div>
        `;
        //const element = dataArray[index];

    }
    console.log(card);
}