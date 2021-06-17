let taskCounter = 1

// Getting the task
let ourTask = document.getElementById("task-button")

ourTask.onclick = () => {
  let value = document.getElementById("task").value;
  console.log("Hello")
  localStorage.setItem(taskCounter,value);
  console.log(taskCounter)
  return taskAdder()
}

// Printing to html
const taskAdder = () => {
  let newListItem = document.createElement("LI");
  let item = localStorage.getItem(taskCounter);
  let itemToBeAdded = document.createTextNode(item);
  newListItem.appendChild(itemToBeAdded);
  taskCounter++;
  let taskList = document.getElementById("task-list");
  taskList.appendChild(newListItem)
}

document.getElementById("delete-button").onclick = () => {
  let taskNumber = document.getElementById('striker').value;
  let taskValue = localStorage.getItem(taskNumber); 
  for (let i = 1; i < localStorage.length; i++) {
    let item = localStorage.getItem(i);
    if (item == taskValue) {
      localStorage.setItem(taskNumber, taskValue.strike());
    }
  }
  htmlPrinter();
}

function htmlPrinter() {
  let taskList = document.getElementById("task-list");
  taskList.textContent = "";
  console.log(taskList)
  for (let i = 1; i < taskCounter; i++) {
    let newListItem = document.createElement("LI");
    let item = localStorage.getItem(i);
    let itemToBeAdded = document.createTextNode(item);
    newListItem.appendChild(itemToBeAdded);
    let taskList = document.getElementById("task-list");
    taskList.appendChild(newListItem)
  }
}
