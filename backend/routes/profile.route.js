const express = require('express');
const router = express.Router();
const authUtils = require('../utils/auth.js');
const ProfileController = require('../controllers/profile.controller.js');

router.get('/profile', authUtils.auth, ProfileController.getUserProfile);
router.put('/profile', authUtils.auth, ProfileController.updateProfile);

module.exports = router;