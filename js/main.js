document.getElementById('taskRegisterForm').addEventListener('submit', saveTask);
const card = document.querySelector('.card');
const cardHeader = document.getElementById('card-task-header');
const priorityLevel = document.querySelector('.priority-category');

let priority,
    onlyHigh,
    onlyMid,
    onlyLittle,
    highToLow,
    lowToHigh,
    selectedOption,
    rawData = [];
let byDate = [];

// selectedOption = document.getElementById('taskSorter').value;
// window.addEventListener('ready', orderTasks(selectedOption));

document.getElementById('taskSorter').addEventListener('change', () => {
    selectedOption = document.getElementById('taskSorter').value;
    orderTasks(selectedOption);
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

function getData(data) {
    let information = data.val();
    let keys = Object.keys(information);

    for (let i = 0; i < keys.length; i++) {
        let content = keys[i];
        rawData.push(information[content]);
    }
    //console.log(rawData);
    byDate = rawData.sort((a, b) =>
        a.taskDate < b.taskDate ? -1 : a.taskDate > b.taskDate ? 1 : 0
    );
    //console.log(byDate);
    return byDate;
}

function orderTasks(selectedOption) {
    console.log(byDate, 'byDate FUERA DE CASO DEL SWITCH');
    switch (selectedOption) {
        case '0':
            byDate = rawData.sort((a, b) =>
                a.taskDate < b.taskDate ? -1 : a.taskDate > b.taskDate ? 1 : 0
            );
            displayTasks(byDate);
            break
        case '1':
            highToLow = byDate.sort((a, b) =>
                a.priorVal < b.priorVal ? -1 : a.priorVal > b.priorVal ? 1 : 0
            );
            console.log(selectedOption);
            console.log(byDate, 'byDate');
            console.log(highToLow, 'highToLow');
            displayTasks(highToLow);
            break;
        case '2':
            lowToHigh = byDate.sort((a, b) =>
                b.priorVal < a.priorVal ? -1 : b.priorVal > a.priorVal ? 1 : 0
            );
            displayTasks(lowToHigh);
            break;
        case '3':
            onlyHigh = byDate.filter((prior) => prior.priorVal == '1');
            displayTasks(onlyHigh);
            break;
        case '4':
            onlyMid = byDate.filter((prior) => prior.priorVal == '2');
            displayTasks(onlyMid);
            break;
        case '5':
            onlyLittle = byDate.filter((prior) => prior.priorVal == '3');
            displayTasks(onlyLittle);
            break;
        default:
            displayTasks(byDate);
            break;
    }
}

function displayTasks(dataArray) {
    card.innerHTML = '';
    console.log('se ejecuto displayTask()')
    for (let index = 0; index < dataArray.length; index++) {
        const nombre = dataArray[index].taskName;
        const fecha = dataArray[index].taskDate;
        const prioridad = dataArray[index].priorVal;
        const descripcion = dataArray[index].taskDescription;
        switch (prioridad) {
            case '1':
                finalPriority = 'Important';
                break;
            case '2':
                finalPriority = 'Medium';
                break;
            case '3':
                finalPriority = 'Little';
                break;
        }

        card.innerHTML += `
            <div class="card-task">
                <div class="card-task-header ${finalPriority}" id="card-task-header">
                <p class="priority-category">Prioriry: ${finalPriority}</p>
            </div>
            <div class="card-task-header-info">
                <h3 class="card-task-Title">${index + 1}: ${nombre}</h3>
                <span class="card-task-date">Due: ${fecha}</span>
            </div>
            <div class="card-task-body-info">
                <p class="card-description">${descripcion}</p>
            </div>
            <div class="card-task-footer">
                <button onclick="func_Dat_Deletes_Card();"><i class="fas fa-check"></i> Mark as completed</button>
            </div>
            </div>
            `;
    }
}
