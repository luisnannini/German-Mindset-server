const express = require("express");
const applicants = require("./controllers/applicants");
const app = express();
const applicantsController = require('./controllers/applicants');

app.use(express.json());

app.post('/register', applicantsController.registerApplicant);
app.post('/register/cv', applicantsController.createCV);
app.put('/applicants/:id', applicantsController.changeAvailability);
const PORT = 5000;
app.listen(PORT);
