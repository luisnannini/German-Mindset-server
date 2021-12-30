const express = require('express');
const controller = require('../controllers/postulants');
const validations = require('../validations/postulants');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

const {
  createPostulant, updatePostulants, deletePostulant, listPostulants,
} = controller;

const { validatePostulant, validatePostulantId, validateUpdatedPostulant } = validations;

router.post('/', authMiddleware, validatePostulant, createPostulant);
router.put('/:id', authMiddleware, validatePostulantId, validateUpdatedPostulant, updatePostulants);
router.delete('/:id', authMiddleware, validatePostulantId, deletePostulant);
router.get('/', authMiddleware, listPostulants);

module.exports = router;
