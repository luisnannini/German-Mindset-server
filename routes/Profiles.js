const express = require('express');
const router = express.Router();
const profiles = require('../controllers/profiles');

router.get('/', profiles.getProfiles);
router.post('/', profiles.addProfile);
router.put('/:id', profiles.updateProfile);
router.delete('/:id', profiles.deleteProfile);

module.exports = router;