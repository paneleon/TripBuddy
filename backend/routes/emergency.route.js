const express = require('express');
const router = express.Router();
const authUtils = require('../utils/auth.js');
const EmergencyController = require('../controllers/emergency.controller.js');


router.get('/', authUtils.auth, EmergencyController.getUserEmergency);
router.put('/', authUtils.auth, EmergencyController.updateEmergency);

router.put('/add/:email', authUtils.isAuthenticated, EmergencyController.addEmergencyContact);
router.put('/remove/:id', authUtils.isAuthenticated, EmergencyController.removeEmergencyContact);


module.exports = router;