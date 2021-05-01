document.querySelector('.save-task').addEventListener('click', saveTask);

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
    let newTaskRef = taskRef.push();
    console.log('LLegamos hasta la función de SAVEDATA()!');
    newTaskRef.set({
        taskName: taskName,
        taskDate: taskDate,
        taskDescription: taskDescription,
        priorVal: priorVal,
    });
}
