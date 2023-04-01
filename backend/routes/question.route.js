const express = require('express');
const router = express.Router();
const QuestionController = require('../controllers/question.controller')
const authUtils = require('../utils/auth.js')

router.delete('/deleteById/:id', authUtils.isAuthenticated, QuestionController.deleteQuestion)

module.exports = router;