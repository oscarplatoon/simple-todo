console.log('My List')

let listsArr = []
let numOfLists = 0
let stringifiedLists
let listObj
let listKey

let displayLists = () => {
  if (localStorage.getItem('lists') && localStorage.getItem('lists').length > 2) {
    listsArr = JSON.parse(localStorage.getItem('lists'));
    numOfLists = listsArr.length;
    for (let i = 0; i < listsArr.length; i++) {
      for (key in listsArr[i]) {
        let items = listsArr[i][key];
        createList(key, items,i);
      }
    }
  } else {
    noListsNotification();
  }
}

// ----- Display Message
let noListsNotification = () => {
  let notification = document.getElementById('notification');
  let img = document.createElement('img');
  img.setAttribute('src', 'https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/dog-puppy-on-garden-royalty-free-image-1586966191.jpg?crop=1.00xw:0.669xh;0,0.190xh&resize=980:*');
  img.setAttribute('alt', 'pupply');
  img.setAttribute('id', 'no-list-notif');
  img.setAttribute('style', 'width: 100%');
  notification.appendChild(img);

}

// ----- Creates a new list
document.getElementById('create-new-list').onclick = (evt) => {
  evt.preventDefault();
  let newList = document.getElementById('new-list').value;
  if (newList.length > 0) {
    document.getElementById('new-list').value = '';
    let object = {};
    object[newList] = [];
    listsArr.push(object);
    // Adds
    stringifiedLists = JSON.stringify(listsArr);
    localStorage.setItem('lists', stringifiedLists);
    return createList(newList, [],numOfLists);
  } else {
    createNotification();
  }
}

// ----- Create an Notification Alert

let createNotification = () => {
  let notification = document.getElementById('notification');
  let alert = document.createElement('div');
  alert.setAttribute('class', 'alert alert-warning')
  alert.setAttribute('id', 'notif-message')
  alert.innerHTML = 'Please enter a valid List Name';
  notification.appendChild(alert)
}

// ----- Displays an Individual List
let createList = (listName, items=[], id) => {
  if (document.body.contains(document.getElementById('notif-message'))) {
    document.getElementById('notif-message').remove();
  }
  if (document.body.contains(document.getElementById('no-list-notif'))) {
    document.getElementById('no-list-notif').remove();
  }
  let listBody = document.getElementById('lists-body')

  let smallCard = document.createElement('div')
  smallCard.setAttribute('class', 'col-sm-4')
  smallCard.setAttribute('id', `small-card-${id}`)
  smallCard.setAttribute('style', 'margin: 20px 50px')

  let card = document.createElement('div')
  card.setAttribute('class', 'card')
  card.setAttribute('style', 'width: 24rem;')

  let cardBody = document.createElement('div')
  cardBody.setAttribute('class', 'card-body')
  // cardBody.setAttribute('id', `card-${id}`)

  let cardTitle = document.createElement('h2')
  cardTitle.setAttribute('class', 'card-title')

  let listParent = document.createElement('div')
  listParent.setAttribute('id', `card-${id}`)

  for (let i = 0; i < items.length; i++) {
    let cardText = document.createElement('p')
    cardText.setAttribute('class', 'card-text my-2')
    cardText.setAttribute('id', `item-${id}-${i}`)
    console.log(items[i] == items[i].strike())
    listParent.appendChild(cardText).innerHTML = items[i]

    cardText.onclick = (evt) => {
      toggleStrike(id, i)
    }
  }

  let input = document.createElement('input')
  input.setAttribute('class', 'form-control new-todo')
  input.setAttribute('id', `input-${id}`)
  input.setAttribute('placeholder', 'Rake the leaves')
  input.setAttribute('type', 'text')

  let addButton = document.createElement('button')
  addButton.setAttribute('id', `list-${id}`)
  addButton.setAttribute('type', 'button')
  addButton.setAttribute('class', 'btn btn-success btn-block mt-2')
  addButton.onclick = (evt) => {
    input = document.getElementById(`input-${id}`).value
    addToDo(input, id)
    document.getElementById(`input-${id}`).value = ''
  }

  let deleteListButton = document.createElement('button')
  deleteListButton.setAttribute('id', `delete-${id}`)
  deleteListButton.setAttribute('type', 'button')
  deleteListButton.setAttribute('class', 'btn btn-outline-danger btn-block mt-2')
  deleteListButton.setAttribute('style', 'margin-left: 5px')
  deleteListButton.onclick = (evt) => {
    deleteList(id)
  }

  cardBody.appendChild(cardTitle).innerHTML = listName.toUpperCase();
  cardBody.appendChild(listParent)
  cardBody.appendChild(input)
  cardBody.appendChild(addButton).innerHTML = "Add ToDo"
  cardBody.appendChild(deleteListButton).innerHTML = "Delete List"

  card.appendChild(cardBody)
  smallCard.appendChild(card)

  return listBody.appendChild(smallCard)
}

// ------ Add ToDo to Individual List
let addToDo = (todo, id) => {
  listObj = listsArr[id]
  listKey = Object.keys(listsArr[id])
  listObj[listKey].push(todo)
  stringifiedLists = JSON.stringify(listsArr)
  let newTodo = document.createElement('P')
  let node = document.createTextNode(todo)
  newTodo.appendChild(node)
  localStorage.setItem('lists', stringifiedLists)
  let listText = document.getElementById(`card-${id}`)
  listText.appendChild(newTodo)
  return location.reload()
}

// ---- Add Strike Through
let toggleStrike = (listID, itemID) => {
  listObj = listsArr[listID]
  listKey = Object.keys(listsArr[listID])
  let itemStrike = listObj[listKey][itemID]
  let toDoItem = document.getElementById(`item-${listID}-${itemID}`)
  if (itemStrike.includes('<strike>')) {
    let noStrikeItem = itemStrike.replace(/<[^>]*>?/gm, '');
    toDoItem.innerHTML = noStrikeItem
    listObj[listKey][itemID] = noStrikeItem
    stringifiedLists = JSON.stringify(listsArr)
    localStorage.setItem('lists', stringifiedLists)
  } else {
    listObj[listKey][itemID] = itemStrike.strike()
    toDoItem.innerHTML = itemStrike.strike()
    stringifiedLists = JSON.stringify(listsArr)
    localStorage.setItem('lists', stringifiedLists)
  }
}

// ----- DELETE LIST
let deleteList = (id) => {
  document.getElementById(`small-card-${id}`).remove()
  listsArr.splice(id, 1)
  stringifiedLists = JSON.stringify(listsArr)
  localStorage.setItem('lists', stringifiedLists)
  if (localStorage.getItem('lists').length === 2) {
    noListsNotification();
  }
}

displayLists()
