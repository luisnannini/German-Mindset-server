const url = "http://localhost:5000/postulations/"

function getPostulations(){
	fetch(url)
		.then(function (response){
			return response.json();
		})
		.then(function(data){
			postulations(data);
		})
		.catch(function(err) {
			console.log(err)
		})
}

getPostulations();

function postulations(data){
  console.log(data)
  const listPostulations = document.querySelector('#list-postulations');
  data.forEach(element => {
    let ul = document.createElement("ul")
    ul.id = element._id
    ul.classList.add("info-title-ul")
    let liClient = document.createElement("li")
    let liProfile = document.createElement("li")
    let liDescription = document.createElement("li")
    let liEditIcon = document.createElement("li")
    liClient.classList.add("id-client")
    liProfile.classList.add("id-profile")
    liDescription.classList.add("id-description")
    liClient.innerText = element.id_clients;
    liProfile.innerText = element.id_profile;
    liDescription.innerText = element.description;
    liEditIcon.innerHTML = '<a class="edit-modal"><img src="/write.png" alt=""></a><a href=""><img src="/bin.png" alt=""></a>'
    ul.appendChild(liClient);
    ul.appendChild(liProfile);
    ul.appendChild(liDescription);
    ul.appendChild(liEditIcon)
    listPostulations.appendChild(ul)
  
  });
  modal(ul.id);
}

function modal(id){
//Close Modal
const modalCloseButton = document.querySelector(".modal-button")
	modalCloseButton.addEventListener("click", function(){
		document.querySelector(".modal-container").classList.add("invisible")
	})
const modalSaveChanges = document.querySelector("#subs-button")
modalSaveChanges.addEventListener("click", function(e){
  e.preventDefault()
  document.querySelector(".modal-container").classList.add("invisible")
  editPostulation(id)
})
//Open Modal
const editOpenModal = document.querySelectorAll(".edit-modal")
editOpenModal.forEach(element => {
  element.addEventListener("click", function(e){
    document.querySelector(".modal-container").classList.remove("invisible")
    const ul = e.target.parentElement.parentElement.parentElement;
    document.getElementById("id-client").value = ul.querySelector(".id-client").innerText
    document.getElementById("id-profile").value = ul.querySelector(".id-profile").innerText
    document.getElementById("id-description").value = ul.querySelector(".id-description").innerText
  })
});
}

function editPostulation(id){
  const postulation = {
    id_clients: document.getElementById("id-client").value,
    id_profile: document.getElementById("id-profile").value,
    description: document.getElementById("id-description").value
  }
  console.log(postulation)



  const putMethod = {
    method: 'PUT', // Method itself
    headers: {
     'Content-type': 'application/json; charset=UTF-8' // Indicates the content
    },
    body: JSON.stringify(postulation) // We send data in JSON format
  }
   // make the HTTP put request using fetch api
  fetch(url+""+id, putMethod)
    .then(response => response.json())
    .then(data => console.log(data)) // Manipulate the data retrieved back, if we want to do something with it
    .catch(err => console.log(err)) // Do something with the error
}