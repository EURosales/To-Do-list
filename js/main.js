document.getElementById('taskRegisterForm').addEventListener('submit', submitForm);

function submitForm(e) {
    e.preventDefault();

    //get value from inputs
    let taskName = getInputVal('taskName');
    let taskDate = getInputVal('taskDate');
    let taskDescription = getInputVal('taskDescription');
    let priorVal;

    saveData(taskName, taskDate, taskDescription, priorVal);
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
