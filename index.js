const express = require('express');
const app = express();
const port = 5000;

const psychologistsController = require('./controllers/psychologists');

app.set('json spaces', 2);

//Init body parser middleware
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Mindset frontpage');
});

//ADMIN psychologists
app.get('/psychologists', psychologistsController.getAll);
app.get('/psychologists/byId/:id', psychologistsController.getById);
app.get('/psychologists/byName/:name', psychologistsController.getByName);
app.post('/psychologists/new', psychologistsController.createPsychologist);

app.listen(port, () => {
    console.log(`MindSet server listening at http://localhost:${port}`);
  });