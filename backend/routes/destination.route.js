const express = require('express');
const DestinationController = require('../controllers/destination.controller');
const authUtils = require('../utils/auth.js')
const router = express.Router();

router.post('/create',authUtils.isAuthenticated, DestinationController.createDestination);
router.get('/getAll',authUtils.isAuthenticated, DestinationController.getDestinations);
router.delete('/delete/:destinationId',authUtils.isAuthenticated, DestinationController.deleteDestinations);

module.exports = router;