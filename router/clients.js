const express = require('express');
const controller = require('../controllers/clients');
const clientValidations = require('../validations/clients');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

const {
  createClient,
  updateClient,
  deleteClient,
  listClients,
} = controller;

router.post('/', authMiddleware, clientValidations.required, createClient);
router.put('/:id', authMiddleware, clientValidations.required, updateClient);
router.delete('/:id', authMiddleware, deleteClient);
router.get('/', authMiddleware, listClients);

module.exports = router;
