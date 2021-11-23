let idToEdit
const url = "http://localhost:5000/admins/"

function getAdmins(){
	fetch(url)
		.then(function (response){
			return response.json();
		})
		.then(function(data){
			admins(data);
		})
		.catch(function(err) {
			console.log(err)
		})
}

getAdmins();

function admins(data){
  console.log(data)
  const listAdmins = document.querySelector('#list-admins');
  data.forEach(element => {
    let ul = document.createElement("ul")
    ul.id = element._id
    ul.classList.add("info-title-ul")
    let liName = document.createElement("li")
    let liIdAdmin = document.createElement("li")
    let liEmail = document.createElement("li")
    let liEditIcon = document.createElement("li")
    liName.classList.add("name")
    liIdAdmin.classList.add("id-admin")
    liEmail.classList.add("email")
    liName.innerText = element.id_clients;
    liIdAdmin.innerText = element.id_profile;
    liEmail.innerText = element.description;
    liEditIcon.innerHTML = '<a class="edit-modal"><img src="../imgs/write.png" alt=""></a><a href=""><img id="delete-icon" src="../imgs/bin.png" alt=""></a>'
    ul.appendChild(liEmail);
    ul.appendChild(liIdAdmin);
    ul.appendChild(liEmail);
    ul.appendChild(liEditIcon)
    listAdmins.appendChild(ul)
    //Open Modal
    const editOpenModal = ul.querySelector(".edit-modal")
    editOpenModal.addEventListener("click", function(e){
      idToEdit = ul.id;
      document.querySelector(".modal-container").classList.remove("invisible")
      document.getElementById("name").value = ul.querySelector(".name").innerText
      document.getElementById("id-admin").value = ul.querySelector(".id-admin").innerText
      document.getElementById("email").value = ul.querySelector(".email").innerText
    })
    //Open Modal for Delete option
    const deleteOpenModal = ul.querySelector("#delete-icon")
    deleteOpenModal.addEventListener("click", function(e){
      idToEdit = ul.id;
      e.preventDefault()
      document.querySelector(".modal-container").classList.remove("invisible")
      document.querySelector(".form-container").remove()
      document.querySelector("#modal-title").innerHTML = "Are you sure?"
      const saveInput = document.createElement('input')
      const cancelInput = document.createElement('input')
      saveInput.type="submit";
      saveInput.id="confirm-button";
      saveInput.value= "Confirm delete"
      cancelInput.type="button";
      cancelInput.id="cancel-button";
      cancelInput.value= "CANCEL"
      document.querySelector(".modal-container").appendChild(saveInput)
      document.querySelector(".modal-container").appendChild(cancelInput)
      //Delete Event
      const deleteElement = document.querySelector("#confirm-button")
      deleteElement.addEventListener("click",function(e){
        idToEdit = ul.id
        deleteAdmin()
      })
      //Cancel Delete
      const cancelDeleteButton = document.querySelector("#cancel-button")
      cancelDeleteButton.addEventListener("click",function(){
        document.querySelector(".modal-container").classList.add("invisible")
      })
      const cancelDeleteX = document.querySelector(".modal-button")
      cancelDeleteX.addEventListener("click",function(){
        document.querySelector(".modal-container").classList.add("invisible")
      })
    })
  });
  modal();
};

function modal(){
//Close Modal
const modalCloseButton = document.querySelector(".modal-button")
	modalCloseButton.addEventListener("click", function(){
		document.querySelector(".modal-container").classList.add("invisible")
	})
const modalSaveChanges = document.querySelector("#subs-button")
modalSaveChanges.addEventListener("click", function(e){
  e.preventDefault()
  document.querySelector(".modal-container").classList.add("invisible")
  editAdmin()
})
}

function addAdminButton(){
  const addButton = document.querySelector(".add-button")
  addButton.addEventListener("click",function(e){
    document.querySelector(".modal-container").classList.remove("invisible")
    document.querySelector("#modal-title").innerHTML = "Add new administrator"
    const addButton = document.querySelector("#subs-button")
    addButton.value = "ADD ADMIN"
    e.preventDefault()
    addButton.addEventListener("click",function(){
      addAdmin();
    })
  })
}

addAdminButton()

//PUT METHOD

function editAdmin(){
  const administrator = {
    name: document.getElementById("name").value,
    id_admin: document.getElementById("id-admin").value,
    email: document.getElementById("email").value
  }
  console.log("info enviada", administrator)
  const putMethod = {
    method: 'PUT', // Method itself
    headers: {
     'Content-type': 'application/json; charset=UTF-8' // Indicates the content
    },
    body: JSON.stringify(administrator) // We send data in JSON format
  }
   // make the HTTP put request using fetch api
  console.log(url+idToEdit)
  fetch(url+idToEdit,putMethod)
    .then(response => {if (response.status == 200){location.reload()}})
    .catch(err => console.log(err)) // Do something with the error
}


//DELETE METHOD

function deleteAdmin(){
  const deleteMethod = {
    method: 'DELETE', // Method itself
    headers: {
     'Content-type': 'application/json; charset=UTF-8' // Indicates the content
    },
    // No need to have body, because we don't send nothing to the server.
   }
   // Make the HTTP Delete call using fetch api
   fetch(url+idToEdit,deleteMethod)
   .then(response => {if (response.status == 204){location.reload()}})
   .catch(err => console.log(err)) // Do something with the error
}

//POST METHOD

function addAdmin() {
  const administrator = {
    name: document.getElementById("name").value,
    id_admin: document.getElementById("id-admin").value,
    email: document.getElementById("email").value
  }

  fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'},
      body: JSON.stringify(administrator)
  }).then(response => {if (response.status == 201){location.reload()}})
  .catch(err => console.log(err))
}