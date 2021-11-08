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
      res.send('Applicant not found');
    }
} 

//Change type of profile

const updateProfile = (req, res) => {
  const newProfile = {profile: req.query.typeOfProfile};
  applicants.list.push (newProfile);
  fs.writeFile('./data/Data_applicants.json', JSON.stringify(applicants), err => {
    if (err) {res.send('Verify profile')};
  });
  res.json(newProfile);
}


module.exports = {
    getAll: getAll,
    updateApplicant: updateApplicant,
    deleteInterview: deleteInterview, 
    updateProfile: updateProfile
}