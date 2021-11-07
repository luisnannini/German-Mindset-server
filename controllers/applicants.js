const fs = require('fs');
const data = fs.readFileSync('./data/Data_applicants.json');
const applicants = JSON.parse(data);
const getAll = (req, res) => {
    res.json(applicants);
  };
  
//Update applicant
const updateApplicant = (req, res) => {
    const found = applicants.some(applicant => applicant.id === parseInt(req.params.id));
    if (found) {
      const updateApplicant = req.body;
      applicants.forEach(applicant => {
        if(applicant.id === parseInt(req.params.id)){
          applicant.state = updateApplicant.state
        }});
    } else {
      res.status(400);
      res.json({ msg: 'Applicant not found'});
    }
};

//Cancel an interview
const deleteInterview = (req, res) => {
    const found = applicants.some(applicant => applicant.id === parseInt(req.params.id));
    if (found) {
      res.json(applicants.filter(applicant => applicant.id !== parseInt(req.params.id)));
    } else {
      res.status(400);
      res.json({ msg: 'Interview not found'});
    }
}

  module.exports = {
    getAll: getAll,
    updateApplicant: updateApplicant,
    deleteInterview : deleteInterview
}