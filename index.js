const express = require("express");
const app = express();
const applicantsController = require('./controllers/applicants');

app.use(express.json());

//Create/Register applicant endpoint
app.post('/register', applicantsController.registerApplicant);

//Upload CV information by new applicant
app.post('/register/cv', applicantsController.createCV);

//Change availability of applicant
app.put('/applicants/:id', applicantsController.changeAvailability);

const PORT = 5000;
app.listen(PORT);
