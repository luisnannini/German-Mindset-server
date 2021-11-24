//Initiating variables to validate complete form and display content
var formErrors = {
	fullName: null,
	email: null,
	password: null,
	cPassword: null,
	phoneNumber: null,
	city: null,
	address: null,
	age: null,
	idNumber: null,
	postalCode: null
};
// var displayContent = []; ----- Commented for week 06 of BaSD
var displayEverything = document.getElementById('display-content');
var displayError = document.getElementById('display-content-error');
var closeButton = document.getElementById('close-button');
var inputAll = document.getElementsByClassName('input-all');
var error = false;
var isFull = true;

// Function to save user input --------  Commented for week 06 of BaSD
// function loopDisplay() {
// 	for (let i = 0; i < inputAll.length; i++) {
// 		displayContent.push(inputAll[i].value);
// 	}
// }

//Validation for full-name
var nameInput = document.getElementById('full-name');
var validationName = document.getElementById('name-valid');

nameInput.addEventListener('focus', clearNameError);
nameInput.addEventListener('blur', validateName);

function clearNameError() {
	closeButton.style.display = 'none';
	displayEverything.style.display = 'none';
	displayError.style.display = 'none'
	validationName.classList.add('validation-hidden');
}
function validateName() {
	var input = nameInput.value;
	if (input.length < 6) {
		formErrors.fullName = "Name must be longer than 5 characters";
	} else if (input.indexOf(' ') < 0) {
		formErrors.fullName = 'Please insert your full name';
	} else {
		formErrors.fullName = null;
	}
	if (formErrors.fullName) {
		validationName.classList.remove('validation-hidden');
		validationName.innerHTML = formErrors.fullName;
	} else {
		clearNameError();
	}
}

//Validation for Email 
const emailInput = document.getElementById('email-input');
const validationEmail = document.getElementById('email-valid');

emailInput.addEventListener('focus', clearEmailError);
emailInput.addEventListener('blur', validateEmail);

function clearEmailError() {
	closeButton.style.display = 'none';
	displayEverything.style.display = 'none';
	displayError.style.display = 'none'
	validationEmail.classList.add('validation-hidden');
}
function validateEmail() {
	var input = emailInput.value;
	if (input.length < 6) {
		formErrors.email = 'email must be at least 6 characters';
	} else if (input.indexOf('@') == -1) {
		formErrors.email = 'email format is invalid';
	} else if (input.indexOf('.') == -1) {
		formErrors.email = 'email format is invalid';
	} else {
		formErrors.email = null;
	}
	if (formErrors.email){
		validationEmail.classList.remove('validation-hidden');
		validationEmail.innerHTML = formErrors.email;
	} else {
		clearEmailError();
	}
};


//Phone Number Validation
const phoneInput = document.getElementById('phone-input');
const validationPhone = document.getElementById('phone-valid');

phoneInput.addEventListener('focus', clearPhoneError);
phoneInput.addEventListener('blur', validatePhone);

function clearPhoneError() {
	closeButton.style.display = 'none';
	displayEverything.style.display = 'none';
	displayError.style.display = 'none'
	validationPhone.classList.add('validation-hidden');
}
function validatePhone() {
	var input = phoneInput.value;
	if (input.length < 7) {
		formErrors.phoneNumber = 'Phone number must be at least 7 characters long';
	} else if (input.search(/\W/) != -1 || isNaN(input)) {
		formErrors.phoneNumber = 'Invalid character detected please enter a valid phone number';
	} else {
		formErrors.phoneNumber = null;
	}
	if (formErrors.phoneNumber){
		validationPhone.classList.remove('validation-hidden');
		validationPhone.innerHTML = formErrors.phoneNumber;
	} else {
		clearPhoneError();
	}
}

//Validation for address 
const addressInput = document.getElementById('address-input');
const validationAddress = document.getElementById('address-valid');

addressInput.addEventListener('focus', clearAddressError);
addressInput.addEventListener('blur', validateAddress);

function clearAddressError() {
	closeButton.style.display = 'none';
	displayEverything.style.display = 'none';
	displayError.style.display = 'none'
	validationAddress.classList.add('validation-hidden');
}
function validateAddress() {
	var input = addressInput.value;
	if (input.length < 5) {
		formErrors.address = 'Address must be at least 5 characters long';
	} else if (input.search(/[0-9]/) < 0) {
		formErrors.address = 'Address Must contain at least one number';
	} else if (input.indexOf(' ') < 0 || input.search(/[A-z]{3}/)) {
		formErrors.address = 'A valid address must contain a street name and a number';
	} else {
		formErrors.address = null;
	} 
	if (formErrors.address) {
		validationAddress.classList.remove('validation-hidden');
		validationAddress.innerHTML = formErrors.address;
	} else {
		clearPhoneError();
	}
	
}


//Validation for Id number
const licenseInput = document.getElementById('id-input');
const validationId = document.getElementById('id-valid');

licenseInput.addEventListener('focus', clearIdError);
licenseInput.addEventListener('blur', validateId);

function clearIdError() {
	closeButton.style.display = 'none';
	displayEverything.style.display = 'none';
	displayError.style.display = 'none'
	validationId.classList.add('validation-hidden');
}
function validateId() {
	var input = licenseInput.value;
	if (input.length < 7 || input.length > 8) {
		formErrors.idNumber = 'A valid ID must be between 7 and 8 characters long';
	} else {
		formErrors.idNumber = null;
	}
	if (formErrors.idNumber) {
		validationId.classList.remove('validation-hidden');
		validationId.innerHTML = formErrors.idNumber;
	} else {
		clearIdError();
	}
}

//Button validations and information display 
var btn = document.getElementById('send-button');
btn.addEventListener('click', submitBtn);

closeButton.addEventListener('click', closeDisplay)
function closeDisplay() {
	displayEverything.style.display = 'none';
	closeButton.style.display = 'none';
	displayError.style.display = 'none'
}

//Function to check if any input field was left without information
function validLoop() {
	for (let i = 0; i < inputAll.length; i++) {
		var e = inputAll[i].value;
		if (e == '' || e == null) {
			isFull = false;
		} else if (e !== null) {
			isFull = true;
		}
    }
}

//Function to check if there was any errors during form completion.
function errorDuringCompletion() {
	error = false;
	var z = Object.values(formErrors);
		z.forEach(e => {
			if (e !== null) {
				error = true;
				return;
			}
		});
}

//Function when send button is clicked, to check if there was any errors and display necessary information
function submitBtn() {
    validLoop();
	if (!isFull){
        alert('You need to complete the form');
		return;
    }
	errorDuringCompletion();
	if (!error) {
		return;
	} else {
		var displayContentError = Object.values(formErrors);
		displayError.innerHTML = displayContentError.join('<p>');
		closeButton.style.display = 'block';
		displayError.style.display = 'block';
		displayError.style.color = '#ff0000';
		return;
	} 
}
