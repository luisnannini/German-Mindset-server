const express = require('express');
const controller = require('../controllers/interviews');
const validations = require('../validations/interviews');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

const {
  listInterviews,
  createInterview,
  updateInterview,
  deleteInterview,
} = controller;

const {
  validateInterview,
  validateInterviewId,
  validateUpdatedInterview,
} = validations;

router.post('/', authMiddleware, authMiddleware, validateInterview, createInterview);
router.put('/:id', authMiddleware, validateInterviewId, validateUpdatedInterview, updateInterview);
router.delete('/:id', authMiddleware, validateInterviewId, deleteInterview);
router.get('/', authMiddleware, listInterviews);

module.exports = router;
