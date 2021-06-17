document.getElementById('submit-button').onclick = () => {
  console.log('CLICKED')
  console.log('adding item')
  addItem();
  console.log('updating html list')
  updateList();
  document.getElementById('add-item-text').value = ""
}

// Adds item to local storage.
const addItem = () => {
  let toDoItem = document.getElementById('add-item-text').value;
  // Used to generate unique keys for local storage:
  numberItems = localStorage.length;
  if(toDoItem.length === 0) {
    return null
  }
  localStorage.setItem('item '+(numberItems), toDoItem)
}


const clearList = () => {}

const updateList = ()=> {
  let unorderedList = document.getElementById('todo-list')

  // Empties the html list of old items.
  if (unorderedList) {
    while(unorderedList.firstChild) {
      unorderedList.removeChild(unorderedList.firstChild)
    }
  }

  if(localStorage.length == 0) {
    return
  }
  console.log(localStorage)
  // Begin building the list items from storedItems array to append back to the ul
  for(let i = 0; i < localStorage.length; i++) {
    console.log(`Adding item ${i} from local storage`)
    //This builds the LI to add to the list
    let newListItem = document.createElement("li")
    let newCheckBox = document.createElement('input')
    newCheckBox.setAttribute ('type', 'checkbox')
    newCheckBox.setAttribute('id', `check ${i}`)
    newCheckBox.addEventListener('change', function() {
      if(this.checked) {
        //grab the ID, pass it in to a "make text strike" func
        strikeText(i)
      } else {
        //grab the ID, pass it to a make text normal func
        normalText(i)
      }
    })
    // This holds the text with an ID (important for strike through)
    newPara = document.createElement('p')
    newPara.setAttribute('id', `para ${i}`)
    
    newText = (document.createTextNode(localStorage.getItem(`item ${i}`)))
    if(newText.length == 0) {
      newText = document.createTextNode(localStorage.getItem(`item ${i} checked`))
    }
    
    // Check if the key is "checked" and if so, strikeText for that block.
    if(localStorage.key(i) == `item ${i} checked`) {
      newCheckBox.checked = true;
    } else if(localStorage.key(i) == `item ${i}`) {
      newCheckBox.checked = false;
    }
    
    newPara.appendChild(newText)
    newListItem.appendChild(newCheckBox)
    newListItem.appendChild(newPara)
    unorderedList.appendChild(newListItem)
  }
}

const strikeText = (id) => {
  strikePara = document.getElementById(`para ${id}`)
  strikePara.style.textDecoration = 'line-through'
  storageVal = localStorage.getItem(`item ${id}`)
  console.log(storageVal)
  localStorage.setItem(`item ${id} checked`, storageVal)
  localStorage.removeItem(`item ${id}`)

}

const normalText = (id) => {
  normalPara = document.getElementById(`para ${id}`)
  normalPara.style.textDecoration = 'none'
  storageVal = localStorage.getItem(`item ${id} checked`)
  console.log(storageVal)
  localStorage.setItem(`item ${id}`, storageVal)
  localStorage.removeItem(`item ${id} checked`)
}

updateList()