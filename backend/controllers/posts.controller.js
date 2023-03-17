const Post = require('../models/post.model')

exports.createNewPost = async (req, res) => {

    try {
        if (!req.body.title){
            return res.status(400).send({message: "Post title is required"})
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
        return res.status(500).send({message: `Server error: ${error.message}`})
    }
}

exports.getPostDetails = async (req, res) =>{
    try {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        let id = req.params.id;
        postFound = await Post.findById(id);
        //console.log(postFound);
        return res.end(JSON.stringify(res.postFound));
    } catch (error) {
        return res.status(500).send({message: `Server error: ${error.message}`})
    }
}