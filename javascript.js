// Create a "close" button and append it to each item 
let mylist = document.getElementsByTagName("LI");
let i;
for (i = 0; i < mylist.length; i++) {
    let span = document.createElement("SPAN");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    mylist[i].appendChild(span);
}

//Click on a close button to hide the current list.
let close = document.getElementsByClassName("close");
let j;
for (j = 0; j < close.length; j++){
    close[j].onclick = () => {
        let div = this.parentElement;
        div.style.display = "none";
    };
}

//Add a "checked" symbol when clicking on a list item
let list = document.querySelector('ul');
list.addEventListener('click', function(che){
    if (che.target.tagName === 'LI'){
        che.target.classList.toggle('checked');
    }
}, false);


//Create a new list item when clicking on the "ADD" button.
const newElement = () => {
    let li = document.createElement("li");
    var inputValue = document.getElementById("myInput").value;
    let text = document.createTextNode(inputValue);
    li.appendChild(text);
    
    if(inputValue === '') {
        alert("Write something to do in the box.");
        }
        else {
        document.getElementById("myUnList").appendChild(li);
        }
    document.getElementById("myInput").value = "";
    
    let span = document.createElement("SPAN");
    let txt = document.createTextNode("\u00D7");
    span.className = "close";
    span.appendChild(txt);
    li.appendChild(span);
    
    for (i = 0; i < close.length; i++) {
        close[i].onclick = () => {
            let div = this.parentElement;
            div.style.display = "none";
        };
     }
 };



