const localStorage = window.localStorage;
const addButton = document.getElementById('add-button');
const inputField = document.getElementById('input-field');
const itemsList = document.getElementById('items-list');
const clearButton = document.getElementById('clear');

const clearItems = () => {
	localStorage.clear();
	showItems();
}

const addItemToDOM = (currentItem, currentNum) => {
	let li = document.createElement('li');
	let checkbox = document.createElement('input');
	checkbox.setAttribute('type', 'checkbox');

	let span = document.createElement('span');

	let text;
	if (currentItem.includes('-completed')) {
		let numTimesCompleted = currentItem.split('-completed').length - 1;

		// if -completed appears more than once
		if (numTimesCompleted > 1) {
			text = document.createTextNode(currentItem.slice(0, -10 * numTimesCompleted));
			localStorage.setItem('item ' + currentNum, currentItem.slice(0, -10 * (numTimesCompleted - 1)));
		} else {  // if -completed appears once
			text = document.createTextNode(currentItem.slice(0, -10));
		}

		span.appendChild(text);
		span.style.textDecoration = 'line-through';
	} else {
		text = document.createTextNode(currentItem);
		span.appendChild(text);
	}

	checkbox.addEventListener('change', () => {
		let previousText = localStorage.getItem('item ' + currentNum);
		if (previousText.slice(-10, previousText.length) === '-completed') {
			localStorage.setItem('item ' + currentNum, previousText.slice(0, -10));
		}

		localStorage.setItem('item ' + currentNum, previousText + '-completed');
		span.style.textDecoration = 'line-through';
	})

	li.appendChild(checkbox);
	li.appendChild(span);
	itemsList.appendChild(li);
}

const showItems = () => {
	itemsList.textContent = '';  // removes existing list items so items don't appear twice
	let currentNum = 1;
	while (true) {
		let currentItem = localStorage.getItem('item ' + currentNum);
		if (!currentItem) break;
		addItemToDOM(currentItem, currentNum);
		currentNum++;
	}
}

const addItem = () => {
	let numItems = localStorage.length;
	let inputText = inputField.value;

	if (inputText.length === 0) {
		return
	}

	inputField.value = "";
	localStorage.setItem('item ' + (numItems + 1), inputText);
	showItems();
}

const init = () => {
	showItems();
	addButton.addEventListener('click', addItem);
	clearButton.addEventListener('click', clearItems);
}

init();

// if check, get sibling and mark that as completed in local storage
// cross out the letters