const Applicants = require('../models/Applicants');

const getApplicants = (req, res) => {
    Applicants.find()
      .then((applicants) =>{
        return res.status(200).json(applicants)
      })
      .catch((error) =>{
        return res.status(400).json(error)
      })
}

const getOneApplicant = (req, res) => {
  Applicants.findById(req.params.id,
  (error, oneApplicant) => {
    if(!oneApplicant) {
      return res.status(404).json({
        msg: `Applicant with id: ${req.params.id} was not found`
      })
    }
    if(error) {
      return res.status(400).json(error)
    }
    return res.status(200).json(oneApplicant)
  })
}

const updateApplicant = (req, res) => {
	Applicants.findByIdAndUpdate(req.params.id,
	{
        full_name: req.query.full_name,
        username: req.query.username,
        birth_date: req.query.birth_date,
        phone_number: req.query.phone_number,
        email: red.query.email,
        address: red.query.address,
        availability: red.query.address,
	},
	{new: true},
	(error, newApplicants) => {
	  if(!newApplicants) {
	    return res.status(404).json({
	      msg: 'Applicants with id: ${req.params.id} was not found'	
	    })
	}
	if(error) {
	    return res.status(400).json(error)	
	}
	    return res.status(200).json(newApplicants)
	}
)}

const createApplicant = (req, res) => {
    const Applicants = new Applicants({
        full_name: req.body.full_name,
        username: req.body.username,
        birth_date: req.body.birth_date,
        phone_number: req.body.phone_number,
        email: red.body.email,
        address: red.body.address,
      });
    
      Applicants.save((error, app) => {
        if (error) {
        return res.status(400).json(error);
        }
        return res.status(201).json(applicant);
      });
};

const deleteApplicant = (req, res) => {
  Applicants.findByIdAndDelete(req.params.id, (error, chosenApplicants) => {
    if (!chosenApplicants) {
      return res.status(404).json(`Applicant with id ${req.params.id} was not found`);
    } if (error) {
      return res.status(400).json(error);
    }
    return res.status(204).send(`Applicant with id ${req.params.id} was remove successfully`);
  });
};

module.exports = {
    getApplicants,
    createApplicant,
    updateApplicant,
    deleteApplicant,
};