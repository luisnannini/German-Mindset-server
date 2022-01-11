const express = require('express');
const controller = require('../controllers/admins');
const validations = require('../validations/admins');
const authMiddleware = require('../middlewares/authMiddleware');
const { updateFirebaseUser, deleteFirebaseUser } = require('../middlewares/firebaseUsersHandler');

const router = express.Router();

const {
  createAdmin, getAdmins, deleteAdmin, updateAdmin,
} = controller;

router.post('/', authMiddleware, validations.validateUpdatedAdmin, createAdmin);
router.put('/:id', authMiddleware, validations.validateUpdatedAdmin, updateFirebaseUser, updateAdmin);
router.delete('/:id', authMiddleware, validations.validateIdFormat, deleteFirebaseUser, deleteAdmin);
router.get('/', authMiddleware, getAdmins);

module.exports = router;
