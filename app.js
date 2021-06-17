var storedItems = []
console.log(JSON.parse(localStorage.getItem('toDoItems')))
// console.log(storedItems)
/* This adds the text field as an item in the storedItems && the localStorage using JSON methods.
*/


const addItem = () => {
  let toDoItem = document.getElementById('add-item-text').value;
  // Used to generate unique keys for local storage:
  numberItems = localStorage.length;
  if(toDoItem.length === 0) {
    return
  }

  localStorage.setItem('item '+(numberItems+1), toDoItem)
}

document.getElementById('submit-button').onclick = () => {
  console.log('CLICKED')
  console.log('adding item')
  addItem();
  console.log('updating html list')
  updateList();
  document.getElementById('add-item-text').value = ""
}

const updateList = ()=> {
  let unorderedList = document.getElementById('todo-list')
  // Empties the html list of old items.
  if (unorderedList) {
    while(unorderedList.firstChild) {
      unorderedList.removeChild(unorderedList.firstChild)
    }
  }

  // Begin building the list items from storedItems array to append back to the ul
  for(let i = 0; i < storedItems.length; i++) {
    let newListItem = document.createElement("li")
    newText = document.createTextNode(storedItems[i])
    newListItem.appendChild(newText)
    unorderedList.appendChild(newListItem)
  }
}

/*
  let newElem = document.createElement('LI');
  const numText = document.createTextNode(number)
  newElem.appendChild(numText)
  const numList = document.getElementById('guess-list')
  numList.appendChild(newElem)
  }
*/

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