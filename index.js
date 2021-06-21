

const toDoTitle = document.getElementById('to_do_title');
const taskInput = document.getElementById('task_input');
const checkBox = document.getElementById('task_check');
const submitBtn = document.getElementById('submit_btn');
const taskLists = document.getElementById('task_lists');
let taskStorages = [];
let count = 0;
const addTasks = (event) =>{
  event.preventDefault()
  let taskInputVal = taskInput.value;
  if(!taskInputVal) {
    return;
  }
  localStorage.setItem(count, taskInputVal);
  taskStorages.push(localStorage);
  let list = document.createElement('li');
  list.id = count++;
  list.innerHTML = taskInputVal;
  taskLists.append(list);
  list.addEventListener('click', toggle);
  checkBox.addEventListener('click', () => {
    if (list.style.textDecoration == "line-through") {
      taskLists.removeChild(list);
    }
  })
  taskInput.value = "";
  
}

const toggle = (event) => {
  let target = event.target;
  if (!target) {
    return
  }
  if(target.style.textDecoration == "line-through") {
    target.style.textDecoration = "none";
  } else {
    target.style.textDecoration ="line-through";
  }
  
}


submitBtn.addEventListener('click', addTasks);