const fs = require('fs');
const Interviews = require('../models/Interviews');

// See interviews for Postulant
const getInterviewsByPostulant = (req, res) => {
    Interviews.find( {id_user: req.params.id_user} )
        .then((interviews) => {
            res.status(200).json(interviews);
        })
        .catch((error) => {
            res.status(404).json(
                {msg: `There's no interviews booked with the user id ${req.params.id_user}`}
                )
        })
}

// Cancel interview
const deleteInterview = (req, res) => {
    Interviews.findByIdAndDelete(req.params.id_user, (error, interview) => {
      if (!interview) {
        return res.status(404).json(
            {msg: `There's no interview with the id of ${req.params.id_user}`}
            ); 
      }
      if (error) {
        return res.status(400).json(error);
      }
      return res.status(204).send();
    });
  };

  module.exports = {
    getInterviewsByPostulant,
    deleteInterview,
  }