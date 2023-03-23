const express = require('express');
const CategoryController = require('../controllers/category.controller');
const authUtils = require('../utils/auth.js')
const router = express.Router();

router.get('/getAll',authUtils.isAuthenticated, CategoryController.getCategorys);

module.exports = router;