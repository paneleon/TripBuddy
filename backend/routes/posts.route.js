const express = require('express');
const router = express.Router();
const PostsController = require('../controllers/posts.controller')
const authUtils = require('../utils/auth.js')

router.post('/', authUtils.isAuthenticated, PostsController.createNewPost)

//GET ROUTE for post detail by post id - READ OPERATION
router.get('/getById/:id', PostsController.getPostDetails)
router.get('/getByUser', authUtils.isAuthenticated, PostsController.getUsersPosts) // get posts of authenticated user
router.get('/getByUser/:id', authUtils.isAuthenticated, PostsController.getOtherUsersPosts) // get posts of another user

module.exports = router;