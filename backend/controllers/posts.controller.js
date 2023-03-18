const Post = require('../models/post.model')

exports.createNewPost = async (req, res) => {

    try {
        if (!req.body.title){
            return res.status(400).send({success: false, message: "Post title is required"})
        }

        const userId = "user id placeholder" // TODO: get user id from authentication middleware

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