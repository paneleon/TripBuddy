const express = require('express');
const router = express.Router();
const NotificationController = require('../controllers/notification.controller')
const authUtils = require('../utils/auth.js')

router.delete('/deleteById/:id', authUtils.isAuthenticated, NotificationController.deleteNotification);

module.exports = router;