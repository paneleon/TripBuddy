const express = require('express');
const ProfileController = require('../controllers/profile.controller.js');
const router = express.Router();

router.get('/profile', ProfileController.DisplayProfilePage);
router.post('/profile', ProfileController.ProcessProfileChangePage);

module.exports = router;