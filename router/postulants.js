const express = require('express');
const controller = require('../controllers/postulants');
const validations = require('../validations/postulants');
const authMiddleware = require('../middlewares/authMiddleware');
const { updateFirebaseUser, deleteFirebaseUser } = require('../middlewares/firebaseController');

const router = express.Router();

const {
  createPostulant, updatePostulants, deletePostulant, listPostulants,
} = controller;

const { validatePostulant, validatePostulantId, validateUpdatedPostulant } = validations;

router.post('/', authMiddleware, validatePostulant, createPostulant);
router.put('/:id', authMiddleware, validatePostulantId, validateUpdatedPostulant, updatePostulants, updateFirebaseUser);
router.delete('/:id', authMiddleware, validatePostulantId, deletePostulant, deleteFirebaseUser);
router.get('/', authMiddleware, listPostulants);

module.exports = router;
