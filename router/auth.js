const express = require('express');
const { registerAdmin, registerPostulant, registerPsychologist } = require('../controllers/auth');
const { required } = require('../validations/auth');

const router = express.Router();

router.post('/registerAdmin', required, registerAdmin);
router.post('/register', required, registerPostulant);
router.post('/registerPsychologist', required, registerPsychologist);

module.exports = router;
