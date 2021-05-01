const options = document.querySelector('.option-group');
function empty(tName, tDate, tDesc, priority) {
    if (!tName.trim().length || !tDate.trim().length || !tDesc.trim().length || !priority > 0) {
        addStatusClass(tDesc, taskDescription);
        addStatusClass(tName, taskName);
        addStatusClass(tDate, taskDate);
        addStatusClass(priority, options);
    } else {
        saveData(tName, tDate, tDesc, priority);
    }
}

function addStatusClass(element, object) {
    if (!element.trim().length) {
        object.classList.add('empty-wrong');
    } else {
        object.classList.remove('empty-wrong');
    }
}
