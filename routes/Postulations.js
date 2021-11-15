const express = require('express');
const router = express.Router();
const postulations = require('../controllers/postulations');

router.get('/', postulations.getPostulations);
router.get('/:id', postulations.getPostulationByID);
router.get('/:client', postulations.getPostulationByClient);
router.post('/', postulations.addPostulation);
router.put('/:id', postulations.updatePostulation);
router.delete('/:id', postulations.deletePostulation);

module.exports = router;