const form = document.querySelector('.add-toy-form');

form.addEventListener('submit', function(e){
  e.preventDefault();
  let name = e.target.name.value;
  let image = e.target.image.value;
  let likes = 0;
  //addToDom(name, image, likes);
  let body = {
    likes: 0,
    name: name,
    image: image,
  }
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then(res => res.json())
  .then(data = function(){
    addToDom(data.name, data.image, data.likes, data.id);
    console.log(data);
  })
  .catch(err => console.log(err));
  e.target.reset();

})

let addToDom = function(name, image, likes, id){

  let card = document.createElement('div');
  let titleNode = document.createElement('h2');
  titleNode.innerText = name;
  let imgNode = document.createElement('img');
  imgNode.src = image;
  let likesNode = document.createElement('p');
  likesNode.innerText = likes;
  let likesButton = document.createElement('button');
  likesButton.classList.add('like-btn');
  likesButton.id = id;
  card.append(titleNode, imgNode, likesNode, likesButton);
  document.querySelector('#toy-collection').append(card);
}

fetch('http://localhost:3000/toys')
.then(res => res.json())
.then(data => {
  data.forEach((el, i) => {
    console.log(el);
    addToDom(el.name, el.image, el.likes, el.id);
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