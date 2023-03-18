const express = require('express');
const UserController = require('../controllers/user.controller.js');
const authUtils = require('../utils/auth.js')
const router = express.Router();

router.post('/login', UserController.processLogin);
router.post('/register', UserController.processRegistration);
router.get('/logout', UserController.processLogout);

module.exports = router;