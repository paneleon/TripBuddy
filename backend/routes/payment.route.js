const express = require('express');
const router = express.Router();
const authUtils = require('../utils/auth.js');
const PaymentController = require('../controllers/payment.controller.js');

router.get('/payment', authUtils.isAuthenticated, PaymentController.getUserPayment);
router.put('/payment', authUtils.isAuthenticated, PaymentController.updatePayment);
router.delete('/deleteById/:id', authUtils.isAuthenticated, PaymentController.deletePayment);
module.exports = router;