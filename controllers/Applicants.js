const Applicants = require('../models/Applicants');

const getApplicants = (req, res) => {
    Applicants.find()
      .then((Applicants) =>{
        return res.status(200).json(Applicants)
      })
      .catch((error) =>{
        return res.status(400).json(error)
      })
}

const updateApplicants = (req, res) => {
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

const createApplicants = (req, res) => {
    const Applicants = new Applicants({
        full_name: req.query.full_name,
        username: req.query.username,
        birth_date: req.query.birth_date,
        phone_number: req.query.phone_number,
        email: red.query.email,
        address: red.query.address,
      });
    
      Applicants.save((error, app) => {
        if (error) {
          return res.status(400).json(error);
        }
        return res.status(201).json(app);
      });
};

const deleteApplicants = (req, res) => {
  Applicants.findByIdAndDelete(req.params.id, (error, chosenApplicants) => {
    if (!chosenApplicants) {
      return res.status(404).json(`Id ${req.params.id} not found`);
    } if (error) {
      return res.status(400).json(error);
    }
    return res.status(204).send(`Id ${req.params.id} was remove successfully`);
  });
};

module.exports = {
    getApplicants,
    createApplicants,
    updateApplicants,
    deleteApplicants,
};