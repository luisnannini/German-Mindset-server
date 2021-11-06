const fs = require('fs');

const psychologists = JSON.parse(fs.readFileSync('./data/psychologists.json'));

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

function generateRandomIntegerInRange(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
let randomnId = generateRandomIntegerInRange(100, 200);
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
  if(!newPsychologist.first_name || !newPsychologist.address ||
    !newPsychologist.birth_date || !newPsychologist.email ||
    !newPsychologist.last_name || !newPsychologist.license ||
    !newPsychologist.phone_number){
    return res.status(400).json({ msg: 'Please include all the information'});
  } else {
   let json = JSON.stringify(newPsychologist)
  }
  
    
}


module.exports = {
  getAll: getAll,
  getById: getById,
  getByName: getByName,
};