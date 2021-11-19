window.onload = ()=>{
    if (params.get(':id')){
        fetch(`${window.location.origin}/applicants/?_id=${params.get(':id')}`)
        .then((res)=>{
            if(res.status !== 200 && res.status !== 201){
                return res.json().then(({message})=>{
                    throw new Error(message);
                })
            }
        return res.json();
        })
        .then((res)=>{
            res.data.forEach((applicant) => {
                fullname.value = applicant.full_name,
                email.value = applicant.email,
                phone.value = applicant.phone_number,
                date.value = applicant.birth_date,
                state.value = applicant.availability
            });
        })
        .catch((error)=>{
            console.log(error)
        })
    }
}
// SELECTORS
const fullname = document.getElementById('name');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const date = document.getElementById('date');
const state = document.getElementById('state');
const url = "mongodb+srv://Sabrina:basd1234@basd-rr.gdgvl.mongodb.net/BaSD-RR?retryWrites=true&w=majority"
const data = document.querySelectorAll('input')
const createApplicant = document.getElementById('submit');
// FUNCTIONS
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
function create (){
    fetch(url,newApplicant)
    .then((res)=>{
        if(res.status !== 200 && res.status !== 201){
            return res.json()
            .then(({message})=>{
                throw new Error(message)
            })
        }
        return res.json()
    })
    .then(()=>{
        window.location.href = `${window.location.origin}/public/listApplicant.html`
    })
    .catch((error)=>{
        console.log(error)
    })
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
        showSuccess(3);
    }else{
        showError(3);
    }
}
phone.onfocus = ()=>{
    remove(3);
}
// METHODS CALLS
createApplicant.onsumit = (event)=>{
    event.preventDefault();
    let url = `${window.location.origin}/applicants`;
    let newApplicant = {
        headers: {
            "Content-Type" : "application/json",
        },
        body : JSON.stringify({
            full_name : data[0].value,
            email: data[1].value,
            birth_date: data[2].value,
            phone_number: parseInt(data[3].value),
            availability: data[4].value
        })
    }
    if (params.get('/:id')){
        newApplicant.method = 'PUT';
        url = `${window.location.origin}/applicants/${param.get(':id')}`;
    }else{
        newApplicant.method = 'POST';
        url = `${window.location.origin}/applicants`;
    }
    create(url,newApplicant)
}