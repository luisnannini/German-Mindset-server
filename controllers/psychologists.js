const { json } = require('express');
const fs = require('fs');

const data = fs.readFileSync('./data/psychologists.json');
const psychologists = JSON.parse(data);

// Get all psychologists
const getAll = (req, res) => {
  res.json(psychologists);
};

// Single psychologist by ID
const getById = (req, res) => {
  const found = psychologists.some(psychologist => psychologist.id === parseInt(req.params.id));
  if (found) {
    res.json(psychologists.filter(psychologist => psychologist.id === parseInt(req.params.id)));
  } else {
    res.send('User not found');
  }
};

// Single psychologist by Name
const getByName = (req, res) => {
  const found = psychologists.some(psychologist => psychologist.first_name === req.params.name);
  if (found) {
    res.json(psychologists.filter(psychologist => psychologist.first_name === req.params.name));
  } else {
    res.send('User not found');
  }
};

//Function to create a random ID number
function generateRandomIntegerInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
let randomId = generateRandomIntegerInRange(100, 200);

// Create new psychologist
const createPsychologist = (req, res) => {
  const newPsychologist = {
    id: randomId,
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    license: req.body.license,
    university: req.body.university,
    birth_date: req.body.birth_date,
    address: req.body.address,
    phone_number: req.body.phone_number
  }
  //Check to require information
  if(!newPsychologist.first_name || !newPsychologist.address ||
    !newPsychologist.birth_date || !newPsychologist.email ||
    !newPsychologist.last_name || !newPsychologist.license ||
    !newPsychologist.phone_number){
    return res.status(400).json({ msg: 'Please include all the information'});
  } else {
    psychologists.push(newPsychologist);
    res.send(200, {psychologists})
  }} 

  //Remove a psychologist
const deletePsychologist = (req, res) => {
  const found = psychologists.some(psychologist => psychologist.id === parseInt(req.params.id));
  if (found) {
    res.json(psychologists.filter(psychologist => psychologist.id !== parseInt(req.params.id)));
  } else {
    res.send('User not found');
  }
}

// Update Psychologist
const updatePsychologist = (req, res) => {
  const found = psychologists.some(psychologist => psychologist.id === parseInt(req.params.id));
  if (found) {
    const updatePsychologist = req.body;
    psychologists.forEach(psychologist => {
      if(psychologist.id === parseInt(req.params.id)){
        psychologist.first_name = updatePsychologist.first_name ? updatePsychologist.first_name : psychologist.first_name,
        psychologist.last_name = updatePsychologist.last_name ? updatePsychologist.last_name : psychologist.last_name,
        psychologist.email = updatePsychologist.email ? updatePsychologist.email : psychologist.email,
        psychologist.license = updatePsychologist.license ? updatePsychologist.license : psychologist.license,
        psychologist.university = updatePsychologist.university ? updatePsychologist.university : psychologist.university,
        psychologist.birth_date = updatePsychologist.birth_date ? updatePsychologist.birth_date : psychologist.birth_date,
        psychologist.address =  updatePsychologist.address ? updatePsychologist.address : psychologist.address,
        psychologist.phone_number = updatePsychologist.phone_number ? updatePsychologist.phone_number : psychologist.phone_number;
        res.json({ msg: 'Member updated', psychologist})
      }});
  } else {
    res.send('User not found');
  }
};



module.exports = {
  getAll: getAll,
  getById: getById,
  getByName: getByName,
  createPsychologist: createPsychologist,
  deletePsychologist: deletePsychologist,
  updatePsychologist: updatePsychologist
};