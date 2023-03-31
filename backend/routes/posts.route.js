const express = require('express');
const router = express.Router();
const PostsController = require('../controllers/posts.controller')
const authUtils = require('../utils/auth.js')

router.post('/', authUtils.isAuthenticated, PostsController.createNewPost)


router.get('/getById/:id', PostsController.getPostDetails) //get post detail by post id
router.get('/getByUser', authUtils.isAuthenticated, PostsController.getUsersPosts) // get posts of authenticated user
router.get('/getByUser/:id', authUtils.isAuthenticated, PostsController.getOtherUsersPosts) // get posts of another user
router.delete('/deleteById/:id', authUtils.isAuthenticated, PostsController.deletePost) // get to delete post by id
router.put('/editById/:id', authUtils.isAuthenticated, PostsController.editPost)// post route to edit post by id
router.put('/search', PostsController.searchForPosts) // fetch posts with filters (use put to provide body)
router.put('/save/:id', authUtils.isAuthenticated, PostsController.savePost)
router.get('/saved', authUtils.isAuthenticated, PostsController.getSavedPostsForUser) // get to delete post by id
router.put('/removeSaved/:id', authUtils.isAuthenticated, PostsController.deletePostFromSaved) // remove posts from saved list
router.put('/addComment/:id', authUtils.isAuthenticated, PostsController.addComment)// API to add comment to post
router.get('/getComments/:id',PostsController.getComments)//get post comments by post id

module.exports = router;