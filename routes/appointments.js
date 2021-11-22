const express = require('express');
const router = express.Router();
const appointments = require('../controllers/appointments');
const validation = require('../validations/appointments')

router.get('/', appointments.getAppointments);
router.get('/psychologists/:id_psychologist', appointments.getAppointmentsByPsychologistId);
router.get('/:id', appointments.getOneApointment);
router.get('/applicant/:id_applicant', appointments.getAppointmentsByApplicantsId);
router.post(
    '/',
    validation.validateAppointment,
    appointments.createAppointment
);
//router.put('/:id', appointments.updateApplicant);
router.delete('/:id', appointments.deleteAppointment);

module.exports = router;