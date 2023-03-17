const express = require('express');
const UserController = require('../controllers/user.controller.js');
const router = express.Router();

router.get('/login', UserController.DisplayLoginPage);
router.post('/login', UserController.ProcessLoginPage);

router.get('/register', UserController.DisplayRegisterPage);
router.post('/register', UserController.ProcessRegisterPage);

router.get('/logout', UserController.ProcessLogoutPage);

module.exports = router;