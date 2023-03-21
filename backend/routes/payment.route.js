const express = require('express');
const router = express.Router();
const auth = require('../utils/auth.js');
const { getUserPayment, updatePayment } = require('../controllers/payment.controller.js');

router.get('/payment', auth, getUserPayment);
router.put('/payment', auth, updatePayment);

module.exports = router;