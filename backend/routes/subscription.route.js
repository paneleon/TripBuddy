const express = require('express');
const router = express.Router();
const authUtils = require('../utils/auth.js');
const SubscriptionController = require('../controllers/subscription.controller.js');

router.get('/subscription', authUtils.isAuthenticated, SubscriptionController.getSubscription);
router.put('/subscription', authUtils.isAuthenticated, SubscriptionController.updateSubscription);

module.exports = router;