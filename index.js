// Express library to create server.
const express = require ('express');
const app= express();
// Library to allow cross origin.
const cors = require ('cors');
// Set of the port.
const PORT = process.env.PORT || 4000;
app.listen(PORT,()=> console.log(`Server running in ${PORT}`));
//Get the data needed
const psychologists = require('./data/applicants.json');
const clients = require('./data/clients.json');
const openJobs = require('./data/open-jobs.json');
const applicants = require('./data/applicants.json');
const profilesYear = require('./data/profiles-by-year.json');
// Library to allow the data from the front-end.
    //app.use(cors());
    //app.use(express.json());
    //app.use(express.static('public'));
// Methods
app.post('/client',(req,res)=>{

});
app.put('/:id',(req,res)=>{});
 

