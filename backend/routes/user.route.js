const express = require('express');
const UserController = require('../controllers/user.controller.js');
const authUtils = require('../utils/auth.js');
const router = express.Router();

router.post('/login', UserController.login);
router.post('/register', UserController.register);
router.get('/logout', UserController.logout);
router.get('/auth', UserController.getAuthImageUploadData);
router.post('/subscribeTo/:id', authUtils.isAuthenticated, UserController.subscribeToContentProvider)

module.exports = router;