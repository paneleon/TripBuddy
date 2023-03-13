const express = require('express');
const router = express.Router();
const SampleController = require('../controllers/sample.controller')

router.post('/sample', SampleController.getSampleData)

module.exports = router;