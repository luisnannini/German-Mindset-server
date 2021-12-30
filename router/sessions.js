const express = require('express');
const validations = require('../validations/sessions');
const controller = require('../controllers/sessions');
const authMiddleware = require('../middlewares/authMiddleware');


const router = express.Router();

const {
  createSession,
  listSessions,
  updateSession,
  deleteSession,
} = controller;

router.post('/', authMiddleware, validations.validateSessions, createSession);
router.put('/:id', authMiddleware, validations.validateIdFormat, validations.validateSessionsUsedAttr, updateSession);
router.delete('/:id', authMiddleware, validations.validateIdFormat, deleteSession);
router.get('/', authMiddleware, listSessions);

module.exports = router;
