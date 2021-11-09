//Init
const express = require('express');
const app = express();
const port = 5000;

const psychologistsController = require('./controllers/psychologists');
const jobOfferController = require('./controllers/jobOffers');
const applicantsController = require('./controllers/applicants')
const profileTypesController = require('./controllers/profileTypes')

//Json visibility
app.set('json spaces', 2);

//Init body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended: false}));


//Frontpage message
app.get('/', (req, res) => {
  res.send('Mindset frontpage');
});

//ADMIN psychologists
app.get('/psychologists', psychologistsController.getAll);
app.get('/psychologists/:id', psychologistsController.getById);
app.get('/psychologists/byName/:name', psychologistsController.getByName);
app.post('/psychologists', psychologistsController.createPsychologist);
app.delete('/psychologists/:id', psychologistsController.deletePsychologist);
app.put('/psychologists/:id',psychologistsController.updatePsychologist);

//ADMIN Job Offers
app.get('/job_offers', jobOfferController.getAll);
app.get('/job_offers/:id', jobOfferController.getById);
app.get('/job_offers/company/:company', jobOfferController.getByCompany);
app.post('/job_offers', jobOfferController.createJobOffer);
app.put('/job_offers/:id', jobOfferController.updatejobOffer);
app.delete('/job_offers/:id', jobOfferController.deletejobOffer);

//ADMIN applicants
app.get('/applicants', applicantsController.getAll);
app.get('/applicants/:id', applicantsController.getById);
app.put('/applicants/:id', applicantsController.changeAvailability);

//ADMIN Profile Types
app.get('/profiles', profileTypesController.getAll);
app.get('/profiles/:id', profileTypesController.getById);
app.get('/profiles/byProfile/:profile', profileTypesController.getByName);
app.get('/profiles/anual/:id', profileTypesController.getReport);

//APPLICANTS 
app.post('/register', applicantsController.registerApplicant);
app.post('/register/cv', applicantsController.createCV);
app.put('/applicants/:id', applicantsController.changeAvailability);
app.use("/psychologist-interviews", require("./controllers/psychologist-interview"));
app.use("/company-interviews", require("./controllers/company-interviews"));

app.listen(port, () => {
    console.log(`MindSet server listening at http://localhost:${port}`);
  });
