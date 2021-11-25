let idToEdit
const url = "http://localhost:5000/clients/"

function getClients(){
	fetch(url)
		.then(function (response){
			return response.json();
		})
		.then(function(data){
			clients(data);
		})
		.catch(function(err) {
			console.log(err)
		})
}

getClients();

function clients(data){
  console.log(data)
  const listClients = document.querySelector('#list-clients');
  data.forEach(element => {
    let ul = document.createElement("ul")
    ul.id = element._id
    ul.classList.add("info-title-ul")
    let liCompanyName = document.createElement("li")
    let liCompanyAddress = document.createElement("li")
    let liOpenPositions = document.createElement("li")
    let liEditIcon = document.createElement("li")
    liCompanyName.classList.add("companyName")
    liCompanyAddress.classList.add("companyAddress")
    liOpenPositions.classList.add("openPositions")
    liCompanyName.innerText = element.companyName;
    liCompanyAddress.innerText = element.companyCompanyAddress;
    liOpenPositions.innerText = element.openPositions;
    liEditIcon.innerHTML = '<a class="edit-modal"><img id="write-icon" src="../img/write.png" alt="write-icon"></a><a href=""><img id="delete-icon" src="../img/bin.png" alt="delete-icon"></a>'
    ul.appendChild(liCompanyName);
    ul.appendChild(liCompanyAddress);
    ul.appendChild(liOpenPositions);
    ul.appendChild(liEditIcon)
    listClients.appendChild(ul)
    //Open Modal
    const editOpenModal = ul.querySelector(".edit-modal")
    editOpenModal.addEventListener("click", function(e){
      idToEdit = ul.id;
      document.querySelector(".modal-container").classList.remove("invisible")
      document.getElementById("companyName").value = ul.querySelector(".companyName").innerText
      document.getElementById("companyAddress").value = ul.querySelector(".companyAddress").innerText
      document.getElementById("openPositions").value = ul.querySelector(".openPositions").innerText
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
        deleteClient()
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
  editClient()
})
}

function addClientButton(){
  const addButton = document.querySelector(".add-button")
  addButton.addEventListener("click",function(e){
    document.querySelector(".modal-container").classList.remove("invisible")
    document.querySelector("#modal-title").innerHTML = "Add new Client"
    document.querySelector("input").createElement
    const addButton = document.querySelector("#subs-button")
    addButton.value = "ADD CLIENT"
    e.preventDefault()
    addButton.addEventListener("click", function(){
      addClient();
    })
  })
}

addClientButton()

//PUT METHOD

function editClient(){
  const client = {
    companyName: document.getElementById("companyName").value,
    companyAddress: document.getElementById("companyAddress").value,
    openPositions: document.getElementById("openPositions").value,
    phoneNumber: document.getElementById("phoneNumber").value,
    email: document.getElementById("email").value,
    fullName: document.getElementById("fullName").value,
    description: document.getElementById("description").value
  }
  console.log("info enviada", client)
  const putMethod = {
    method: 'PUT', // Method itself
    headers: {
     'Content-type': 'application/json; charset=UTF-8' // Indicates the content
    },
    body: JSON.stringify(client) // We send data in JSON format
  }
   // make the HTTP put request using fetch api
  console.log(url+idToEdit)
  fetch(url+idToEdit,putMethod)
    .then(response => {if (response.status == 200){location.reload()}})
    .catch(err => console.log(err)) // Do something with the error
}


//DELETE METHOD

function deleteClient(){
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

function addClient() {
  const client = {
    companyName: document.getElementById("companyName").value,
    companyAddress: document.getElementById("companyAddress").value,
    openPositions: document.getElementById("openPositions").value,
    phoneNumber: document.getElementById("phoneNumber").value,
    email: document.getElementById("email").value,
    fullName: document.getElementById("fullName").value,
    description: document.getElementById("description").value
  }

  fetch(url, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'},
      body: JSON.stringify(client)
  }).then(response => {if (response.status == 201){location.reload()}})
  .catch(err => console.log(err))
}

//VALIDATIONS: Form error or succes message

const companyName = document.getElementById('companyName');
companyName.addEventListener("blur",() =>{
    if(companyName.value == ""){
      showError(0);
    }else{
      showSuccess(0);
    }
})
companyName.addEventListener("focus",() =>{
  if(companyName.value == ""){
    remove(0);
  }
})

const companyAddress = document.getElementById('companyAddress');
companyAddress.addEventListener("blur",() =>{
    if(companyAddress.value == ""){
      showError(1);
    }else{
      showSuccess(1);
    }
})
companyAddress.addEventListener("focus",() =>{
  if(companyAddress.value == ""){
    remove(1);
  }
})

const openPositions = document.getElementById('openPositions');
openPositions.addEventListener("blur",() =>{
    if(openPositions.value == ""){
      showError(2);
    }else{
      showSuccess(2);
    }
})
openPositions.addEventListener("focus",() =>{
  if(openPositions.value == ""){
    remove(2);
  }
})

function showSuccess(i){
  data[i].classList.add('success');
}
function showError(i){
  data[i].classList.add('error');
}
function remove(i){
  data[i].classList.remove('error');
  data[i].classList.remove('success');
}

const data = document.querySelectorAll('input')