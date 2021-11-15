const express = require('express');
const router = express.Router();
const psychologists = require('../controllers/psychologists');
const validation = require('../validations/psychologists')

router.get('/', psychologists.getPsychologists);
router.get('/:id', psychologists.getPsychologistById);
router.get('/:name', psychologists.getPsychilogistByName);
router.post(
    '/',
    validation.validatePsychologist,
    psychologists.addPsychologist
    );
router.delete('/:id', psychologists.deletePsychologist);
router.put('/:id', psychologists.updatePsychologist);
router.get('/appointments/', psychologists.getAppointments);
router.delete('/appointments/:id', psychologists.deleteAppointment);
router.put('/applicants/:id', psychologists.updateApplicantProfile);

module.exports = router;