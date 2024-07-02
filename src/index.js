let addToy = false;
const url = "http://localhost:3000";
//get access to the toy-collection

const collection = document.getElementById("toy-collection");
const form = document.getElementsByClassName("add-toy-form")[0];

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

function renderToy(toy) {
	const div = document.createElement("div");
	const h2 = document.createElement("h2");
	const img = document.createElement("img");
	const p = document.createElement("p");
	const button = document.createElement("button");

	div.className = "card";
	h2.textContent = toy.name;
	img.src = toy.image;
	img.className = "toy-avatar";
	p.textContent = `${toy.likes} Likes`;
	button.className = "like-btn";
	button.id = toy.id;
	button.textContent = "Like <3";

	//add event listener to increase like count
	button.addEventListener("click", () => {
		//PATCH request to update in JSON as well
		fetch(`${url}/toys/${toy.id}`, {
			method: "PATCH",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({
				likes: parseInt(p.textContent) + 1,
			}),
		})
			.then((res) => {
				if (res.ok) {
					return res.json();
				} else {
					throw "no";
				}
			})
			.then((data) => {
				//get the number of likes
				p.textContent = `${data.likes} Likes`;
			});
	});

	div.append(h2);
	div.append(img);
	div.append(p);
	div.append(button);

	collection.append(div);
}

//fetch andy's toys
fetch(`${url}/toys`)
	.then((res) => {
		if (res.ok) {
			return res.json();
		} else {
			throw "no";
		}
	})
	//forEach over all the toys
	.then((data) => {
		//create a card for each toy (div, h2, img, p, button)
		//update attributes including class name
		data.forEach((toy) => {
			renderToy(toy);
		});
	});

form.addEventListener("submit", (e) => {
	e.preventDefault();

	let newToy = {
		//do not include id
		//this toy does not yet have an id
		//id is generate upon the POST request
		name: e.target.name.value,
		image: e.target.image.value,
		likes: 0,
	};

	fetch(`${url}/toys`, {
		method: "POST",
		headers: { "content-type": "application/json" },
		body: JSON.stringify(newToy),
	})
		.then((res) => {
			if (res.ok) {
				return res.json();
			} else {
				throw "no";
			}
		})
		.then((data) => {
			console.log(data);
			//PESSIMISTICALLY RENDERING - RELIES ON A SUCCESSFUL RESPONSE FROM SERVER TO RENDER
			renderToy(data);
		});
});
