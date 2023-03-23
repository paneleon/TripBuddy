const express = require('express');
const router = express.Router();
const authUtils = require('../utils/auth.js');
const ProfileController = require('../controllers/profile.controller.js');

router.get('/', authUtils.isAuthenticated, ProfileController.getUserProfile);
router.put('/', authUtils.isAuthenticated, ProfileController.updateProfile);

module.exports = router;