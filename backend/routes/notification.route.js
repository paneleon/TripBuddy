const express = require('express');
const router = express.Router();
const NotificationController = require('../controllers/notification.controller')
const authUtils = require('../utils/auth.js')

router.post('/addNotification', authUtils.isAuthenticated, NotificationController.createNewNotification)//API to add a new notification

module.exports = router;