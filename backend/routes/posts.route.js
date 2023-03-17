const express = require('express');
const router = express.Router();
const PostsController = require('../controllers/posts.controller')

router.post('/', PostsController.createNewPost)

module.exports = router;