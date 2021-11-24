let idToEdit
const url = "http://localhost:5000/applicants/"
// SELECTORS
const fullname = document.getElementById('name');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const date = document.getElementById('date');
const state = document.getElementById('state');
const data = document.querySelectorAll('input');
const url = "mongodb+srv://Sabrina:basd1234@basd-rr.gdgvl.mongodb.net/BaSD-RR?retryWrites=true&w=majority"
const applicantsList = document.getElementById('list-applicants');
const modal = document.querySelector('.modal-container');
const closeButton = document.querySelector('.modal-button');
const saveButton = document.querySelector('#subs-button');
const deleteButton = document.querySelector('#delete-button');
const addButton = document.querySelector('.add-button');

// FUNCTION BACK

function getApplicants(){
	fetch(url)
		.then(function (response){
			return response.json();
		})
		.then(function(data){
			applicants(data);
		})
		.catch(function(err) {
			console.log(err)
		})
}

function applicants(data){
    const listApplicants = document.querySelector('#list-applicants');
    data.forEach(element => {
      let ul = document.createElement("ul")
      ul.id = element._id
      ul.classList.add("info-title-ul")
      let liFullName = document.createElement("li")
      let liEmail = document.createElement("li")
      let liPhone = document.createElement("li")
      let liDate = document.createElement("li")
      let liStatus = document.createElement("li")
      liFullName.classList.add("name")
      liEmail.classList.add("email")
      liPhone.classList.add("phone")
      liDate.classList.add("date")
      liStatus.classList.add("state")
      liFullName.innerText = element.full_name
      liEmail.innerText = element.email
      liPhone.innerText = element.phone_number
      liDate.innerHTML = element.date
      liStatus.innerHTML = element.availability
      ul.appendChild(liFullName)
      ul.appendChild(liEmail)
      ul.appendChild(liPhone)
      ul.appendChild(liDate)
      ul.appendChild(liStatus)
      listApplicants.appendChild(ul)
    })
    handlerModal();
};

function handlerModal(){
    const modalCloseButton = document.querySelector(".modal-button")
    modalCloseButton.addEventListener("click", function(){
        document.querySelector(".modal-container").classList.add("invisible")
    })
    const modalSaveChanges = document.querySelector("#subs-button")
    modalSaveChanges.addEventListener("click", function(e){
      e.preventDefault()
      document.querySelector(".modal-container").classList.add("invisible")
    })
}


function addApplicant() {
    const applicant = {
      full_name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      phone_number: document.getElementById('phone').value,
      birth_date: document.getElementById('date').value,
      availability: document.getElementById('state').value
    }
  
    fetch(url, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8'},
        body: JSON.stringify(applicant)
    }).then(response => {if (response.status == 201){location.reload()}})
    .catch(err => console.log(err))
}

function addApplicantButton(){
    const addButton = document.querySelector(".add-button")
    addButton.addEventListener("click",function(e){
        document.querySelector(".modal-container").classList.remove("invisible")
        document.querySelector("#modal-title").innerHTML = "Add new Applicant"
        document.querySelector("input").createElement
        const addButton = document.querySelector("#subs-button")
        addButton.value = "SAVE APPLICANT"
        e.preventDefault()
        addButton.addEventListener("click",function(){
          addApplicant();
        })
    })
}

// FUNCTIONS INFO
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
function nameVerify(){
    let nameControl = fullname.value;
    let symbolsName = /([@"'.?*+^$#])/;
    let numbersName = /[0-9]/;
    if (
        nameControl !== "" &&
        nameControl.length > 0 &&
        nameControl.length >= 8 &&
        nameControl.indexOf(' ') >= 1 &&
        !nameControl.match(symbolsName) &&
        !nameControl.match(numbersName)
        ){
        return true;
    }else{
        return false;
    }
}
function emailVerify(){
    let emailControl = email.value;
    let dotCom = /.com/;
    let tag = /@/;
    let emailSymbols = /(?<=@)[a-z]/;
    if(
        emailControl !== '' &&
        emailControl.length >= 6 &&
        emailControl.match(dotCom) &&
        emailControl.match(tag) &&
        emailControl.match(emailSymbols)
    ){
        return true;
    }else{
        return false;
    }
}
function phoneVerify(){
    let phoneControl = phone.value;
    let symbols = /(-)/;
    if(
        phoneControl !== '' &&
        phoneControl !== null &&
        !isNaN(phoneControl) &&
        phoneControl.length >= 7 &&
        phoneControl.indexOf(' ') == -1 &&
        !phoneControl.match(symbols)
    ){
        return true;
    }else{
        return false;
    }
}
function dateVerify(){
    //Validation for date
}
function statusVerify(){
    //Validation for availability
}

// EVENTS 
fullname.onblur = ()=>{
    if (nameVerify()){
        showSuccess(0);
    }else{
        showError(0);
    }
}
fullname.onfocus = ()=>{
    remove(0); 
}
email.onblur = ()=>{
    if(emailVerify()){
        showSuccess(1);
    }else{
        showError(1);
    }
}
email.onfocus = ()=>{
    remove(1);
}
phone.onblur = ()=>{
    if(phoneVerify()){
        showSuccess(2);
    }else{
        showError(2);
    }
}
phone.onfocus = ()=>{
    remove(2);
}
// CALLS

handlerModal()
addApplicantButton()
getApplicants();
