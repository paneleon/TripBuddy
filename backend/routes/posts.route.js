const express = require('express');
const router = express.Router();
const PostsController = require('../controllers/posts.controller')
const authUtils = require('../utils/auth.js')

router.post('/', authUtils.isAuthenticated, PostsController.createNewPost)


router.get('/getById/:id', PostsController.getPostDetails) //get post detail by post id
router.get('/getByUser', authUtils.isAuthenticated, PostsController.getUsersPosts) // get posts of authenticated user
router.get('/getByUser/:id', authUtils.isAuthenticated, PostsController.getOtherUsersPosts) // get posts of another user
router.delete('/deleteById/:id', authUtils.isAuthenticated, PostsController.deletePost) // get to delete post by id
router.put('/editById/:id',authUtils.isAuthenticated, PostsController.editPost)// post route to edit post by id
router.put('/search', PostsController.searchForPosts) // fetch posts with filters (use put to provide body)

module.exports = router;