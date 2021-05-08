document.getElementById('taskRegisterForm').addEventListener('submit', saveTask);
const card = document.querySelector('.card');
const cardHeader = document.getElementById('card-task-header');
const priorityLevel = document.querySelector('.priority-category');

function saveTask(e) {
    e.preventDefault();
    //let priorVal = document.forms['taskRegisterForm']['priority'].value;
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
let priority;

function getData(data) {
    let information = data.val();
    let keys = Object.keys(information);
    let dateOrderedData = [],
        onlyHigh,
        onlyMid,
        onlyLittle,
        highToLow,
        lowToHigh;

    for (let i = 0; i < keys.length; i++) {
        let content = keys[i];

        let tName = information[content].taskName;
        let tTime = information[content].taskDate;
        let tDescription = information[content].taskDescription;
        let finalPriority;

        switch (information[content].priorVal) {
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

        dateOrderedData.push(information[content]);

        card.innerHTML += `
        <div class="card-task">
            <div class="card-task-header ${finalPriority}" id="card-task-header">
            <p class="priority-category">Prioriry: ${finalPriority}</p>
        </div>
        <div class="card-task-header-info">
            <h3 class="card-task-Title">${i + 1}: ${tName}</h3>
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
    }

    //ordenadas por fecha

    dateOrderedData.sort((a, b) =>
        a.taskDate < b.taskDate ? -1 : a.taskDate > b.taskDate ? 1 : 0
    );
    console.log(dateOrderedData);

    //filtrados por prioridad

    onlyHigh = dateOrderedData.filter((prior) => prior.priorVal == '1');
    console.log(onlyHigh);

    onlyMid = dateOrderedData.filter((prior) => prior.priorVal == '2');
    console.log(onlyMid);

    onlyLittle = dateOrderedData.filter((prior) => prior.priorVal == '3');
    console.log(onlyLittle);

    //de mayor a menor prioridad

    highToLow = dateOrderedData.sort((a, b) =>
        a.priorVal < b.priorVal ? -1 : a.priorVal > b.priorVal ? 1 : 0
    );
    console.log(highToLow);

    //de menor a mayor prioridad

    lowToHigh = dateOrderedData.sort((a, b) =>
        b.priorVal < a.priorVal ? -1 : b.priorVal > a.priorVal ? 1 : 0
    );
    console.log(lowToHigh);
}
