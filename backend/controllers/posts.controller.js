const Post = require('../models/post.model')
const User = require('../models/user.model')

exports.createNewPost = async (req, res) => {

    try {
        if (!req.body.title){
            return res.status(400).send({success: false, message: "Post title is required"})
        }
        const userId = res.locals.userId // get user id from authentication middleware
        const post = new Post({
            title: req.body.title,
            description: req.body.description,
            rating: req.body.rating,
            postedBy: userId,
            image: req.body.image,
            category: req.body.category,
            address: req.body.address,
            country: req.body.country,
            city: req.body.city,
        })
        await post.save()
        return res.status(200).json(post);
    } catch (error) {
        return res.status(500).send({success: false, message: `Server error: ${error.message}`})
    }
}

exports.getPostDetails = async (req, res) =>{
    try {
        const id = req.params.id;
        const postFound = await Post.findById(id);

        const authorId = postFound.postedBy
        const author = await User.findById(authorId)
        const finalData = {...postFound.toJSON(), postedByUser: author}
        return res.status(200).json(finalData);
    } catch (error) {
        return res.status(500).send({message: `Server error: ${error.message}`})
    }
}

exports.getUsersPosts = async (req, res) =>{
    try {
        const userId = res.locals.userId
        const posts = await Post.find({postedBy: userId});
        return res.status(200).json(posts);
    } catch (error) {
        return res.status(500).send({message: `Server error: ${error.message}`})
    }
}

exports.getOtherUsersPosts = async (req, res) =>{
    try {
        const otherUserId = req.params.id;
        const posts = await Post.find({postedBy: otherUserId});
        return res.status(200).json(posts);
    } catch (error) {
        return res.status(500).send({message: `Server error: ${error.message}`})
    }
}

exports.deletePost = async (req, res) =>{
    try{
        const postId = req.params.id;
        const oldPost = await Post.findById(postId)
        const postedBy = oldPost.postedBy;
        const userId = res.locals.userId // get user id from authentication middleware
        if(userId == postedBy)
        {
            const result = await Post.findByIdAndRemove(postId);          
            return res.status(200).json(result); 
        }
        else
        {
            return res.status(400).json({error: "The post is not posted by this user"});
        }
              
    }catch (error) {
    return res.status(500).send({message: `Server error: ${error.message}`})
    }
}

exports.editPost = async (req, res) => {

    try {
        const postId = req.params.id;
        const oldPost = await Post.findById(postId)
        const postedBy = oldPost.postedBy;
        const userId = res.locals.userId // get user id from authentication middleware
        if(userId == postedBy)
        {
        const updatedPost = {
            "title": req.body.title,
            "description": req.body.description,
            "rating": req.body.rating,
            "postedBy": postedBy,
            "image": req.body.image,
            "category": req.body.category,
            "address": req.body.address,
            "country": req.body.country,
            "city": req.body.city
        }
        await Post.updateOne({_id:postId}, updatedPost);
        return res.status(200).json(updatedPost);
        }
        else
        {
            return res.status(400).json({error: "The post is not posted by this user"});
        }
    } catch (error) {
        return res.status(500).send({success: false, message: `Server error: ${error.message}`})
    }
}