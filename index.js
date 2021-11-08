const express = require('express');
const applicantsController = require('./controllers/applicants')
const app = express();
app.set('json spaces', 2);
app.get('/', (req, res) => {
    res.send('Hello World')
})

const PORT = process.env.PORT || 3500;

app.listen(PORT, () => console.log(`Server starred on port ${PORT}`));

//Init body parser middleware
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Mindset frontpage');
});

//Update profile and cancel interviews
 app.get('/applicants', applicantsController.getAll);
 app.put('/applicants/:id', applicantsController.updateApplicant);
 app.delete('/applicants/:id', applicantsController.deleteInterview)