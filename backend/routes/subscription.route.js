const express = require('express');
const router = express.Router();
const authUtils = require('../utils/auth.js');
const SubscriptionController = require('../controllers/subscription.controller.js');

router.get('/', authUtils.auth, SubscriptionController.getSubscription);
router.put('/', authUtils.auth, SubscriptionController.updateSubscription);

module.exports = router;