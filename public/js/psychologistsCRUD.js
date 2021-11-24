let idToEdit
const url = "http://localhost:5000/psychologists/"

function getPsychologists(){
	fetch(url)
		.then(function (response){
			return response.json();
		})
		.then(function(data){
			psychologists(data);
		})
		.catch(function(err) {
			console.log(err)
		})
}

getPsychologists();

function psychologists(data){
  console.log(data)
  const listPsychologists = document.querySelector('#list-psychologists');
  data.forEach(element => {
    let ul = document.createElement("ul")
    ul.id = element._id
    ul.classList.add("info-title-ul")
    let liFull_name = document.createElement("li")
    let liEmail = document.createElement("li")
    let liLicense = document.createElement("li")
    let liEditIcon = document.createElement("li")
    liFull_name.classList.add("full_name")
    liEmail.classList.add("email")
    liLicense.classList.add("license")
    liFull_name.innerText = element.full_name;
    liEmail.innerText = element.email;
    liLicense.innerText = element.license;
    liEditIcon.innerHTML = '<a class="edit-modal"><img src="/write.png" alt=""></a><a href=""><img id="delete-icon" src="/bin.png" alt=""></a>'
    ul.appendChild(liFull_name);
    ul.appendChild(liEmail);
    ul.appendChild(liLicense);
    ul.appendChild(liEditIcon);
    listPsychologists.appendChild(ul)
    //Open Modal
    const editOpenModal = ul.querySelector(".edit-modal")
    editOpenModal.addEventListener("click", function(e){
      idToEdit = ul.id;
      document.querySelector(".modal-container").classList.remove("invisible")
      document.getElementById("full_name").value = ul.querySelector(".full_name").innerText
      document.getElementById("email").value = ul.querySelector(".email").innerText
      document.getElementById("license").value = ul.querySelector(".license").innerText
    })
    //Open Modal for Delete option
    const deleteOpenModal = ul.querySelector("#delete-icon")
    deleteOpenModal.addEventListener("click", function(e){
      idToEdit = ul.id;
      e.preventDefault()
      document.querySelector(".modal-container").classList.remove("invisible")
      document.querySelector(".form-container").remove()//me sale un error en la consola porque en el momento que lo vuelvo a abrir ya esta borrado el elemento, tengo que revisar el evento o cuando ponerlo
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
        deletePsychologist()
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
  editPsychologist()
})
}

function addPsychologistsButton(){
  const addButton = document.querySelector(".add-button")
  addButton.addEventListener("click",function(e){
    document.querySelector(".modal-container").classList.remove("invisible")
    document.querySelector("#modal-title").innerHTML = "Add new Psychologist"
    const addButton = document.querySelector("#subs-button")
    addButton.value = "ADD PSYCHOLOGIST"
    e.preventDefault()
    addButton.addEventListener("click",function(){
      addPsychologist();
    })
  })
}

addPsychologistsButton()

//PUT METHOD

function editPsychologist(){
  const psychologist = {
    full_name: document.getElementById("full_name").value,
    email: document.getElementById("email").value,
    license: document.getElementById("license").value,
    address: document.getElementById("address").value,
    phone_number: document.getElementById("phone_number").value,
    birth_date: document.getElementById("birth_date").value,
  }
  console.log("info enviada", psychologist)
  const putMethod = {
    method: 'PUT', // Method itself
    headers: {
     'Content-type': 'application/json; charset=UTF-8' // Indicates the content
    },
    body: JSON.stringify(psychologist) // We send data in JSON format
  }
   // make the HTTP put request using fetch api
  console.log(url+idToEdit)
  fetch(url+idToEdit,putMethod)
    .then(response => {if (response.status == 200){location.reload()}})
    .catch(err => console.log(err)) // Do something with the error
}


//DELETE METHOD

function deletePsychologist(){
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

function addPsychologist() {
  const psychologist = {
    full_name: document.getElementById("full_name").value,
    email: document.getElementById("email").value,
    license: document.getElementById("license").value,
    phone_number: document.getElementById("phone_number").value,
    address: document.getElementById("address").value,
    birth_date: document.getElementById("birth_date").value
  }

  fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'},
      body: JSON.stringify(psychologist)
  }).then(response => {if (response.status == 201){location.reload()}})
  .catch(err => console.log(err))
}