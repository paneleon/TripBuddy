const express = require('express');
const router = express.Router();
const authUtils = require('../utils/auth.js');
const PaymentController = require('../controllers/payment.controller.js');


router.get('/', authUtils.auth, PaymentController.getUserPayment);
router.put('/', authUtils.auth, PaymentController.updatePayment);

router.delete('/', authUtils.isAuthenticated, PaymentController.deletePayment);

module.exports = router;