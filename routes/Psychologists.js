const express = require('express');
const router = express.Router();
const psychologists = require('../controllers/psychologists');

router.get('/', psychologists.getPsychologists);
router.get('/:id', psychologists.getPsychologistByID);
router.get('/:name', psychologists.getPsychologistByName);
router.post('/', psychologists.addPsychologist);
router.delete('/:id', psychologists.deletePsychologist);
router.put('/:id', psychologists.updatePsychologist);
router.get('/appointments/', psychologists.getAppointments);
router.delete('/appointments/:id', psychologists.deleteAppointment);
router.put('/appointments/:id', psychologists.updateApplicantProfile);

module.exports = router;