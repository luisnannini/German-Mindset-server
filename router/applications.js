const express = require('express');
const controller = require('../controllers/applications');
const validation = require('../validations/applications');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

const {
  createApplication,
  deleteApplication,
  listApplication,
} = controller;

const {
  requireValidation,
  validateApplicantFormat,
} = validation;

router.post('/', authMiddleware, requireValidation, validateApplicantFormat, createApplication);
router.delete('/:id', authMiddleware, deleteApplication);
router.get('/', authMiddleware, listApplication);

module.exports = router;
