const form = document.querySelector('.add-toy-form');

form.addEventListener('submit', function(e){
  e.preventDefault();
  let name = e.target.name.value;
  let image = e.target.image.value;
  let likes = 0;
  addToDom(name, image, likes);
})

let addToDom = function(name, image, likes){
  console.log(name, image, likes);
}

fetch('http://localhost:3000/toys')
.then(res => res.json())
.then(data => {
  data.forEach((el, i) => {
    addToDom(el.name, el.image, el.likes);
  })
})
.catch(err => console.log(err));

let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});