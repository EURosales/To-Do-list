document.getElementById('taskRegisterForm').addEventListener('submit', saveTask);
const card = document.querySelector('.card-task');
const cardHeader = document.querySelector('.card-task-header');
const priorityLevel = document.querySelector('.priority-category');

function saveTask(e) {
    e.preventDefault();
    //let priorVal = document.forms['taskRegisterForm']['priority'].value;
    //get value from inputs
    let taskName = getInputVal('taskName');
    let taskDate = getInputVal('taskDate');
    let taskDescription = getInputVal('taskDescription');
    let priorVal = document.forms['taskRegisterForm']['priority'].value;
    console.log(priorVal);
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
    console.log('LLegamos hasta la función de SAVEDATA()!');
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
    let dateOrderedData = [];

    for (let i = 0; i < keys.length; i++) {
        let content = keys[i];

        let tName = information[content].taskName;
        let tTime = information[content].taskDate;
        let tDescription = information[content].taskDescription;
        let tPriority = information[content].priorVal;
        dateOrderedData.push(information[content]);

        card.innerHTML += `

        <div class="card-task-header important">
            <p class="priority-category">${tPriority}</p>
        </div>
        <div class="card-task-header-info">
            <h3 class="card-task-Title">${tName}</h3>
            <span class="card-task-date">${tTime}</span>
        </div>
        <div class="card-task-body-info">
            <p class="card-description">${tDescription}</p>
        </div>
        <div class="card-task-footer">
            <button onclick="func_Dat_Deletes_Card();">Mark as completed</button>
        </div>

        `;

        //      info.innerHTML += `
        //   </div>
        //   <p class="color"><strong>Name:</strong>${name}<br>
        //   <a><strong>Email:</strong>${email}</a><br>
        //   <a><strong>Message:</strong>${message}</a>
        //   </p>
        //   </div>
        //   `;
    }
    dateOrderedData.sort((a, b) =>
        a.taskDate < b.taskDate ? -1 : a.taskDate > b.taskDate ? 1 : 0
    );
    console.table(dateOrderedData);
}
