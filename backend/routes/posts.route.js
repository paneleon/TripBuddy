const express = require('express');
const router = express.Router();
const PostsController = require('../controllers/posts.controller')

router.post('/', PostsController.createNewPost)

//GET ROUTE for post detail by post id - READ OPERATION
router.get('/getById/:id',PostsController.getPostDetails)

module.exports = router;