const { ObjectId } = require('mongoose').Types;

const required = (req, res, next) => {
  if (!req.body.client || !ObjectId.isValid(req.body.client)) {
    return res.status(400).json({ message: 'You must complete a valid id of the client' });
  }
  if (!req.body.professionalProfiles || !ObjectId.isValid(req.body.professionalProfiles)) {
    return res.status(400).json({ message: 'You must complete a valid id of the profile.' });
  }
  if (!req.body.isOpen && (req.body.isOpen !== true && req.body.isOpen !== false)) {
    return res.status(400).send({
      message: 'You must Indicate if the position is open(true) or close(false)',
    });
  }
  if (!req.body.jobDescription) {
    return res.status(400).send({ message: 'You must write a job description' });
  }
  if (
    !req.body.vacancy
    || !Number.isInteger(+req.body.vacancy)
    || parseInt(req.body.vacancy, 10) < 1) {
    return res.status(400).send({
      message: 'The number of vacancies must be an integer number and more than 0',
    });
  }

  return next();
};

module.exports = {
  required,
};
