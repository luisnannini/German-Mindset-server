const express = require('express');
const controller = require('../controllers/positions');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();
const positionsValidations = require('../validations/positions');

const {
  createPosition,
  updatePosition,
  deletePosition,
  listPositions,
} = controller;

router.get('/', listPositions);
router.post('/', authMiddleware, positionsValidations.required, createPosition);
router.put('/:id', authMiddleware, positionsValidations.required, updatePosition);
router.delete('/:id', authMiddleware, deletePosition);

module.exports = router;
