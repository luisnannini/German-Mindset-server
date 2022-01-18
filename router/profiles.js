const express = require('express');
const controller = require('../controllers/profiles');
const validations = require('../validations/profiles');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

const {
  listProfiles,
  createProfile,
  updateProfile,
  deleteProfile,
} = controller;

const {
  validateRequiredProfile,
  validateIdFormat,
} = validations;

router.get('/', listProfiles);
router.post('/', authMiddleware, validateRequiredProfile, createProfile);
router.put('/:id', authMiddleware, validateIdFormat, updateProfile);
router.delete('/:id', authMiddleware, validateIdFormat, deleteProfile);

module.exports = router;
