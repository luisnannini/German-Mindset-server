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

const createApplicants = (req, res) => {
  const Applicants = new Applicantss({
    positions: req.body.positions,
    postulants: req.body.postulants,
    interview: req.body.interview,
    result: req.body.result,
  });

  Applicants.save((error, app) => {
    if (error) {
      return res.status(400).json(error);
    }
    return res.status(201).json(app);
  });
};

const deleteApplicants = (req, res) => {
  Applicantss.findByIdAndDelete(req.params.id, (error, chosenApplicants) => {
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
    deleteApplicants,
};