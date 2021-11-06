const express = require('express');
const app = express();
const port = 5000;

const psychologistsController = require('./controllers/psychologists');

app.set('json spaces', 2);

app.get('/', (req, res) => {
  res.send('Welcome to MindSet!');
});

//ADMIN
app.get('/psychologists', psychologistsController.getAll);
app.get('/psychologists/byId/:id', psychologistsController.getById);
app.get('/psychologists/byName/:name', psychologistsController.getByName);
app.get('/psychologists/update/:id', psychologistsController.update);

app.listen(port, () => {
  console.log(`MindSet server listening at http://localhost:${port}`);
});