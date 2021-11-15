const Appointments = require('../models/Appointments');

// See list of appointments

const getAppointments = (req, res) => {
    Appointments.find()
      .then((appointments) =>{
        return res.status(200).json(appointments)
      })
      .catch((error) =>{
        return res.status(400).json(error)
      })
}

// See appointments by Id

const getOneApointment = (req, res) => {
    Appointments.findById(req.params.id,
    (error, oneAppointment) => {
      if(!oneAppointment) {
        return res.status(404).json({
          msg: `Apointment with id: ${req.params.id} was not found`
        })
      }
      if(error) {
        return res.status(400).json(error)
      }
      return res.status(200).json(oneAppointment)
    })
}

// See appointments by applicant Id

const getAppointmentsByApplicantsId = (req, res) => {
    Appointments.find({ id_applicant: req.params.id_applicant })
    .then ((appointments) => {
      return res.status(200).json(appointments)
    })
    .catch((error) => {
      return res.status(400).json(error)
    })
}

// See appointments by psychologist Id

const getAppointmentsByPsychologistId = (req, res) => {
    Appointments.find({ id_psychologist: req.params.id_psychologist })
    .then ((appointments) => {
      return res.status(200).json(appointments)
    })
    .catch((error) => {
      return res.status(400).json(error)
    })
}

// Create appointment

const createAppointment = (req, res) => {
    const newAppointment = new Appointments({
        id_applicant: req.body.id_applicant,
        id_psychologist: req.body.id_psychologist,
        date: req.body.date,
        time: req.body.time,
      });
    
      newAppointment.save((error, newAppointment) => {
        if (error) {
          return res.status(400).json(error);
        }
        return res.status(201).json(newAppointment);
      });
};

// Delete appointment

const deleteAppointment = (req, res) => {
  Appointments.findByIdAndDelete(req.params.id, (error, chosenAppointment) => {
    if (!chosenAppointment) {
      return res.status(404).json(`Appointment with id ${req.params.id} was not found`);
    } if (error) {
      return res.status(400).json(error);
    }
    return res.status(204).send(`Appointment with id ${req.params.id} was remove successfully`);
  });
};

  module.exports = {
    getAppointments,
    getAppointmentsByApplicantsId,
    getAppointmentsByPsychologistId,
    getOneApointment,
    createAppointment,
    deleteAppointment,
};