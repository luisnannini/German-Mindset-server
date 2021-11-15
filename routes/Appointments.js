const express = require('express');
const router = express.Router();
const appointments = require('../controllers/appointments');

router.get('/', appointments.getAppointments);
router.get('/:id', appointments.getOneApointment);
router.get('/applicant/:id', appointments.getAppointmentsByApplicantsId);
router.get('/psychologists/:id', appointments.getAppointmentsByPsychologistId);
router.post('/', appointments.createAppointment);
// router.put('/:id', appointments.updateApplicant);
router.delete('/:id', appointments.deleteAppointment);

module.exports = router;