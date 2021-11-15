const express = require('express');
const router = express.Router();
const clients = require('../controllers/clients');

router.get('/', clients.getClients);
router.get('/:id', clients.getOneClient);
router.post('/', clients.createClient);
router.put('/:id', clients.updateClient);
router.delete('/:id', clients.deleteClient);

module.exports = router;