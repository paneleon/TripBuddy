const express = require('express');
const UserController = require('../controllers/user.controller.js');
const router = express.Router();
const authUtils = require('../utils/auth.js');

router.post('/login', UserController.processLogin);
router.post('/register', UserController.processRegistration);
router.get('/logout', UserController.processLogout);
router.get('/auth', UserController.getAuthImageUploadData);

module.exports = router;