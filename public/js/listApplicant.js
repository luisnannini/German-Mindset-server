//SELECTORS
const addNew = document.getElementById('new');
const edit = document.getElementsByClassName('edit');
const eliminate = document.getElementsByClassName('delete');

//EVENTS
addNew.onclick = ()=>{
    location.href = "http://localhost:5000/public/views/formApplicants.html"
}
//METHODS