const express = require('express');
const router = express.Router();
const auth = require('../utils/auth.js');
const { getSubscription ,updateSubscription } = require('../controllers/subscription.controller.js');

router.get('/subscription', auth, getSubscription);
router.put('/subscription', auth, updateSubscription);

module.exports = router;