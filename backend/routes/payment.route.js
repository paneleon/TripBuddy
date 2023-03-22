const express = require('express');
const router = express.Router();
const authUtils = require('../utils/auth.js');
const PaymentController = require('../controllers/payment.controller.js');

router.get('/payment', authUtils.auth, PaymentController.getUserPayment);
router.put('/payment', authUtils.auth, PaymentController.updatePayment);

module.exports = router;