const Appointments = require('../models/Appointments');

const getAppointments = (req, res) => {
    Appointments.find()
      .then((appointments) =>{
        return res.status(200).json(appointments)
      })
      .catch((error) =>{
        return res.status(400).json(error)
      })
}

const getAppointmentsByApplicantsId = (req, res) => {
    Appointments.find({ id_applicant: req.params.id_applicant })
    .then ((appointments) => {
      return res.status(200).json(appointments)
    })
    .catch((error) => {
      return res.status(400).json(error)
    })
}
  
const getAppointmentsByPsychologistId = (req, res) => {
    Appointments.find({ id_psychologist: req.params.id_psychologist })
    .then ((appointments) => {
      return res.status(200).json(appointments)
    })
    .catch((error) => {
      return res.status(400).json(error)
    })
}

const createAppointment = (req, res) => {
    const newAppointment = new Appointment({
        id_applicant: req.body.id_applicant,
        id_psychologist: req.body.id_psychologist,
        createdAt: Date().getTime().toString(),
      });
    
      newAppointment.save((error, newAppointment) => {
        if (error) {
          return res.status(400).json(error);
        }
        return res.status(201).json(newAppointment);
      });
};

const deleteAppointment = (req, res) => {
  Appointment.findByIdAndDelete(req.params.id, (error, chosenAppointment) => {
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
    createAppointment,
    deleteAppointment,
};