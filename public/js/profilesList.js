const profilesList = document.getElementById('list-profiles');
const descriptionProfile = document.getElementById('description');
const idProfile = document.getElementById('id-profile');
const modal = document.querySelector('.modal-container');
const closeButton = document.querySelector('.modal-button');
const saveButton = document.querySelector('#subs-button');
const deleteButton = document.querySelector('#delete-button');
const addButton = document.querySelector('.add-button');


// GET List of profiles
fetch(`${window.location.origin}/profiles`)
.then((response) => response.json())
.then((response) => {
    response.forEach(element => {
        const ul = document.createElement('ul');
        const description = document.createElement('li');
        const id = document.createElement('li');
        description.classList.add('profile-description');
        description.innerText = element.description;
        id.innerText = element._id;
        ul.append(description, id);
        profilesList.append(ul);
        description.onclick = () => {
            modal.classList.remove('invisible');
            descriptionProfile.value = element.description;
            idProfile.value = element._id;
            idProfile.disabled = true;
        }
    });
})
.catch((error) => console.log(error));


function closeModal() {
    closeButton.addEventListener('click', function () {
        modal.classList.add('invisible');
    })
}

// POST Add new profile
function addProfile() {
        const profile = {
            description: descriptionProfile.value,
          }
          fetch(`${window.location.origin}/profiles`, {
              method: 'POST',
              headers: {
                'Content-type': 'application/json; charset=UTF-8'},
              body: JSON.stringify(profile)
          })
          .then(response => { if (response.status == 201) {location.reload()} })
          .catch(err => console.log(err))    
}

function addProfileButton() {
    addButton.addEventListener('click', function() {
    modal.classList.remove('invisible');
    document.querySelector("#modal-title").innerHTML = "Add new Profile";
    idProfile.value = "ID will be generated automatically";
    idProfile.disabled = true;
    saveButton.value = "Add Profile"
    deleteButton.disabled = true;
    saveButton.addEventListener('click', function() {
        addProfile();
    });
    })
}

// PUT Edit profile
function editProfile() {
    const profile = {
      description: descriptionProfile.value,
    }
    fetch(`${window.location.origin}/profiles/${idProfile.value}`, {
        method: 'PUT', 
        headers: {
         'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(profile)
    })
      .then(response => {if (response.status == 200){location.reload()}})
      .catch(err => console.log(err))
  }

function saveEdits() {
    saveButton.addEventListener('click', function(e) {
        e.preventDefault();
        modal.classList.add('invisible');
        editProfile();
    })
}

// DELETE Profile
function deleteProfile() {
     fetch(`${window.location.origin}/profiles/${idProfile.value}`, {
        method: 'DELETE',
        headers: {
         'Content-type': 'application/json; charset=UTF-8' 
        }  
     })
     .then(response => {if (response.status == 204){location.reload()}})
     .catch(err => console.log(err))
}

function deleteProfileButton() {
    deleteButton.addEventListener('click', function(e) {
        e.preventDefault();
        modal.classList.add('invisible');
        deleteProfile();
    })
}

// Functions
closeModal();
addProfileButton();
saveEdits();
deleteProfileButton();