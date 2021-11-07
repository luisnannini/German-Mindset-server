const fs = require('fs');

const data = fs.readFileSync('./data/applicants.json');
const applicants = JSON.parse(data);

const getAll = (req, res) => {
    res.json(applicants);
  };

// Single applicant by ID
const getById = (req, res) => {
    const found = applicants.some(applicant => applicant.id === parseInt(req.params.id));
    if (found) {
      res.json(applicants.filter(applicant => applicant.id === parseInt(req.params.id)));
    } else {
      res.send(400, {"Msg":"Applicant not found"});
    }
  };

  //Update applicant
const updateApplicant = (req, res) => {
    const found = applicants.some(applicant => applicant.id === parseInt(req.params.id));
    if (found) {
      const updateApplicant = req.body;
      applicants.forEach(applicant => {
        if(applicant.id === parseInt(req.params.id)){
          applicant.state = updateApplicant.state ? updateApplicant.state : applicant.state;
        }});
    } else {
      res.send(400, {"Msg":"Applicant not found"});
    }
};

  module.exports = {
    getAll: getAll,
    getById: getById,
    updateApplicant: updateApplicant,
}