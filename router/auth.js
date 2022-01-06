const express = require('express');
const { registerAdmin } = require('../controllers/auth');
const { required } = require('../validations/auth');
// url = /api/auth/register
const router = express.Router();

router.post('/register', required, registerAdmin);

module.exports = router;
