const express = require('express');
const router = express.Router();
const auth = require('../utils/auth.js');
const { getUserProfile, updateProfile } = require('../controllers/profile.controller.js');

router.get('/profile', auth, getUserProfile);
router.put('/profile', auth, updateProfile);

module.exports = router;