const express = require('express');
const { register } = require('../controllers/auth');
const { required } = require('../validations/auth');
// url = /api/auth/register
const router = express.Router();

router.post('/register', required, register);

module.exports = router;
