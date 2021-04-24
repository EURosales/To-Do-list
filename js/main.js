document.getElementById('contactForm').addEventListener('submit', submitForm);

function submitForm(e) {
    e.preventDefault();
    //get value from inputs
    let name = getInputVal('nameField');
    let age = getInputVal('ageField');

    saveData(name, age);
    getData();
}

function getInputVal(id) {
    return document.getElementById(id).value;
}

//Reference messages collection
let messagesRef = firebase.database().ref('Messages');

//Save the messages to the database
function saveData(name, age) {
    let newMessageRef = messagesRef.push();
    newMessageRef.set({
        name: name,
        age: age,
    });
}
