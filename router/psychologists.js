const express = require('express');
const controller = require('../controllers/psychologists');
const validations = require('../validations/psychologists');
const authMiddleware = require('../middlewares/authMiddleware');


const router = express.Router();

const {
  listPsychologists,
  createPsychologist,
  deletePsychologist,
  updatePsychologist,
} = controller;

router.post('/', authMiddleware, validations.validatePsychologists, createPsychologist);
router.put('/:id', authMiddleware, validations.validateIdFormat, validations.validatePsychologistsUsedAttr, updatePsychologist);
router.delete('/:id', authMiddleware, validations.validateIdFormat, deletePsychologist);
router.get('/', authMiddleware, listPsychologists);

module.exports = router;
