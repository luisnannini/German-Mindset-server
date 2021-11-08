//Controllers require
const clients = require('./controllers/clientControl');
const postulations = require('./controllers/positionsControl');
const profiles = require('./controllers/profileControl');
// Express library to create server.
const express = require ('express');
const app= express();
// Library to allow cross origin.
const cors = require ('cors');
// Library to allow the data from the front-end.
app.use(cors());
app.use(express.json());
app.use(express.static('public'));
//Admin - Create, edit, delete and show clients
app.get('/clients', clients.listClients);
app.post('/clients', clients.newClient);
app.delete('/clients/:id', clients.deleteClient);
app.put('clients/:id',clients.clientUpdate);
//Admin - Visualize and cancel applicant postulations
app.get('/postulations',postulations.showApllicants);
app.get('/postulations/:id',postulations.cancelPostulation);
//Admin - Administrate professionals profiless
app.get('/profiles',profiles.listProfiles);
app.post('/profiles',profiles.newProfile);
app.put('/profiles/:id',profiles.editProfile);
app.delete('/profiles/:id',profiles.deleteProfile);
// Set of the port.
const PORT = process.env.PORT || 4000;
app.listen(PORT,()=> console.log(`Server running in ${PORT}`));