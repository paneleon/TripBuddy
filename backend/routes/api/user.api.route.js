const express = require('express');
const UserAPIController = require('../../controllers/api/auth.api.controller.js');
const router = express.Router();

router.post('/login', UserAPIController.processLogin);
router.post('/register', UserAPIController.processRegistration);
router.get('/logout', UserAPIController.processLogout);

module.exports = router;