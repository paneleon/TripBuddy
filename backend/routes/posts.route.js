const express = require('express');
const router = express.Router();
const PostsController = require('../controllers/posts.controller')
const authUtils = require('../utils/auth.js')

router.post('/', authUtils.isAuthenticated, PostsController.createNewPost)

module.exports = router;