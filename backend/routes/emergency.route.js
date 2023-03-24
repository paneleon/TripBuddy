const express = require('express');
const router = express.Router();
const authUtils = require('../utils/auth.js');
const EmergencyController = require('../controllers/emergency.controller.js');

router.get('/emergency', authUtils.auth, EmergencyController.getUserEmergency);
router.put('/emergency', authUtils.auth, EmergencyController.updateEmergency);

module.exports = router;