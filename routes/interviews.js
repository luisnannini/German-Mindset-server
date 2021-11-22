const express = require('express');
const router = express.Router();
const interviews = require('../controllers/interviews');
const validation = require('../validations/interviews')


router.get('/', interviews.getInterviews);
router.get('/:id_clients', interviews.getInterviewsByClient);
router.delete('/:id', interviews.deleteInterview);

module.exports = router;