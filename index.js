const express = require('express');
const applicantsProfile = require('./controllers/applicants');
const psychologistsAvailability = require('./controllers/psychologists');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
  res.send('Hello World!')
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`)
});

//Update profile and cancel interviews
 /* app.get('/applicants', applicantsController.getAll);
 app.put('/applicants/:id', applicantsController.updateApplicant);
 app.delete('/applicants/:id', applicantsController.deleteInterview); */

//Change type of profile

app.get('/applicants', applicantsProfile.updateProfile);

//Psychologists availability

app.get('/psychologists', psychologistsAvailability.getAll);








// Interviews view and cancelations

 /* - ID
 - Applicant
 - Next interview     cancel interviews
 - Type of profile */


// Interviews type of profile

/* - ID
 - Applicant
 - Next interview
 - Type of profile    modify type of profile   */


// Time available for interviews
