let storedNames = []
const addItem = () => {
  let toDoItem = document.getElementById('add-item-text').value;
  storedNames.push(toDoItem);
  (console.log(storedNames))
  localStorage.setItem('toDoItems', JSON.stringify(toDoItem))
  console.log(JSON.parse(localStorage.getItem('toDoItems')))
  return storedNames

}

/**
 *
 var names = [];
 names[0] = prompt("New member name?");
 localStorage.setItem("names", JSON.stringify(names));

 //...
 var storedNames = JSON.parse(localStorage.getItem("names"));

 localstorage.names = JSON.stringify(names);
 var storedNames = JSON.parse(localStorage.names);
 */