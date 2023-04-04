const express = require('express');
const router = express.Router();
const authUtils = require('../utils/auth.js');
const StatusController = require('../controllers/status.controller.js');


router.get('/', authUtils.auth, StatusController.getStatus);
router.put('/', authUtils.auth, StatusController.updateStatus);

module.exports = router;