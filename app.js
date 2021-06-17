//select html tags and save it to variables
const submitBtn = document.getElementById('submit_btn');
let count = 0


submitBtn.onclick = (e) => {
  e.preventDefault()
  let new_task = document.getElementById('add_task').value
  let parent = document.getElementById('list')
  let newElement = document.createElement('li');
  let newElement2 = document.createElement('button')
  newElement2.addEventListener('click', function(){
  newElement.style.textDecoration = "line-through"
  newElement2.style.display = "none";
    
    
  })

  newElement.setAttribute('class',count)
  newElement2.setAttribute('class',count)
  count += 1  
  newElement.appendChild(document.createTextNode(new_task))
  newElement2.appendChild(document.createTextNode('finish task'))
  parent.appendChild(newElement)
  parent.appendChild(newElement2)

}



// element.addEventListener("click", myFunction);

// function myFunction() {
//   document.getElementById;
// }

// window.onclick = e => {
    
//   let x = document.getElementsByClassName(e.target.class);  // to get the element
//   let b = document.getElementById('list')
//   b.remove(x)

//   //console.log(e.target.tagName).remove();  // to get the element tag name alone
// } 