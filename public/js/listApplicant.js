//SELECTORS
const addNew = document.getElementById('new');
const edit = document.getElementsByClassName('edit');
const eliminate = document.getElementsByClassName('delete');

//FUNCTIONS 

function getApplicants(){
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

getApplicants();

//PUT METHOD

function editApplicant(){
  const applicantUpdate = {
    //modals inputs  idapplicant : documente.getelement ('' ).value
  }
  const putMethod = {
    method: 'PUT',
    headers: {
     'Content-type': 'application/json; charset=UTF-8'
    },
    body: JSON.stringify(applicantUpdate)
  }
  fetch(url+idToEdit,putMethod)
  .then((res) => {
    if (res.status == 200){
      location.reload()
    }
  })
  .catch((error) => {
    console.log(error)
  })
}


//DELETE METHOD

function deleteApplicant(){
  const deleteMethod = {
    method: 'DELETE',
    headers: {
     'Content-type': 'application/json; charset=UTF-8'
    }
  }
  fetch(url,deleteMethod)
  .then((response) => {
    if (response.status == 204){
      location.reload()
    }
  })
  .catch((error) => {
    console.log(error)
  })
}


//EVENTS

//METHODS

// SSSSSSS

let idToEdit
const url = "http://localhost:5000/applicants/"

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
    liEditIcon.innerHTML = '<a class="edit-modal"><img src="/write.png" alt=""></a><a href=""><img id="delete-icon" src="/bin.png" alt=""></a>'
    ul.appendChild(liClient);
    ul.appendChild(liProfile);
    ul.appendChild(liDescription);
    ul.appendChild(liEditIcon)
    listPostulations.appendChild(ul)
    //Open Modal
    const editOpenModal = ul.querySelector(".edit-modal")
    editOpenModal.addEventListener("click", function(e){
      idToEdit = ul.id;
      document.querySelector(".modal-container").classList.remove("invisible")
      document.getElementById("id-client").value = ul.querySelector(".id-client").innerText
      document.getElementById("id-profile").value = ul.querySelector(".id-profile").innerText
      document.getElementById("id-description").value = ul.querySelector(".id-description").innerText
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
        deletePostulation()
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
  editPostulation()
})
}

function addPostulationButton(){
  const addButton = document.querySelector(".add-button")
  addButton.addEventListener("click",function(e){
    document.querySelector(".modal-container").classList.remove("invisible")
    document.querySelector("#modal-title").innerHTML = "Add new Postulation"
    const addButton = document.querySelector("#subs-button")
    addButton.value = "ADD POSITION"
    e.preventDefault()
    addButton.addEventListener("click",function(){
      addPostulation();
    })
  })
}

addPostulationButton()
