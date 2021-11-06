const fs = require('fs');
const psychologists = JSON.parse(fs.readFileSync('./data/psychologists.json'));

const getAll = (req, res) => {
  res.json(psychologists);
};

const getById = (req, res) => {
  const psychologist = psychologists.find(psychologist => psychologist.id === req.params.id);
  if (psychologist) {
    res.json(psychologist);
  } else {
    res.send('User not found');
  }
};

const getByName = (req, res) => {
  const psychologist = psychologists.find(psychologist => psychologist.name === req.params.name);
  if (psychologist) {
    res.json(psychologist);
  } else {
    res.send('User not found');
  }
};

const update = (req, res) => {
  // update function
}

module.exports = {
  getAll: getAll,
  getById: getById,
  getByName: getByName,
  update: update
};