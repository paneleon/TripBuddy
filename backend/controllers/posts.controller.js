const Post = require("../models/post.model");
const User = require("../models/user.model");
const imageUpload = require("../config/imageUpload.config");

exports.createNewPost = async (req, res) => {
  try {
    if (!req.body.title) {
      return res
        .status(400)
        .send({ success: false, message: "Post title is required" });
    }
    const userId = res.locals.userId; // get user id from authentication middleware
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
    });

    await post.save();
    await User.updateOne(
      { _id: res.locals.userId },
      { $addToSet: { posts: post._id } }
    );
    return res.status(200).json(post);
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: `Server error: ${error.message}` });
  }
};

exports.getPostDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const postFound = await Post.findById(id);

    const authorId = postFound.postedBy;
    const author = await User.findById(authorId);
    const finalData = { ...postFound.toJSON(), postedByUser: author };
    return res.status(200).json(finalData);
  } catch (error) {
    return res.status(500).send({ message: `Server error: ${error.message}` });
  }
};

exports.getUsersPosts = async (req, res) => {
  try {
    const userId = res.locals.userId;
    const posts = await Post.find({ postedBy: userId });
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).send({ message: `Server error: ${error.message}` });
  }
};

exports.getOtherUsersPosts = async (req, res) => {
  try {
    const otherUserId = req.params.id;
    const posts = await Post.find({ postedBy: otherUserId });
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).send({ message: `Server error: ${error.message}` });
  }
};

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
    const oldPost = await Post.findById(postId);
    const postedBy = oldPost.postedBy;
    const userId = res.locals.userId; // get user id from authentication middleware
    if (userId == postedBy) {
      const updatedPost = {
        title: req.body.title,
        description: req.body.description,
        rating: req.body.rating,
        postedBy: postedBy,
        image: req.body.image,
        category: req.body.category,
        address: req.body.address,
        country: req.body.country,
        city: req.body.city,
      };

      // delete old image from cloud storage
      if (oldPost.image && oldPost.image != updatedPost.image) {
        await deleteImage(oldPost.image);
      }

      await Post.updateOne({ _id: postId }, updatedPost);
      return res.status(200).json(updatedPost);
    } else {
      return res
        .status(400)
        .json({ error: "The post is not posted by this user" });
    }
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: `Server error: ${error.message}` });
  }
};

const deleteImage = async (imageName) => {
  const images = await imageUpload.listFiles({name: imageName})
  const imageId = images[0].fileId
  await imageUpload.deleteFile(imageId)
}

exports.searchForPosts = async (req, res) => {
  try {
    const category = req.body.category;
    const keyword = req.body.keyword;
    const contentProviders = req.body.contentProviders;

    let conditions = [];
    // if keyword is provided
    if (keyword != null) {
      conditions.push({
        title: { $regex: new RegExp("" + keyword.toLowerCase(), "gi") },
      });
    }
    // if category is provided
    if (category != null) {
      conditions.push({ category: category });
    }
    // if content provider id is provided
    if (contentProviders.length > 0) {
      conditions.push({ postedBy: { $in: contentProviders } });
    }

    const posts = await Post.find({ $and: conditions }).populate(
      "postedBy",
      "username"
    ); // include the author's username
    return res.status(200).json(posts);
  } catch (error) {
    return res
      .status(500)
      .send({ success: false, message: `Server error: ${error.message}` });
  }
};

exports.savePost = async (req, res) => {
  try {
      const postId = req.params.id;
      const userId = res.locals.userId;

      const post = await Post.findById(postId);
      if (!post){
          return res.status(404).send({success: false, message: `Post with this id is not found`})
      }

      await User.updateOne({ _id: userId},  {$push: { savedPosts: postId } })
      return res.status(200).send({success: true, message: `Post was successfully saved`})
  } catch (error) {
      return res.status(500).send({success: false, message: `Server error: ${error.message}`})
  }
}

exports.getSavedPostsForUser = async (req, res) => {
  try {
    const userId = res.locals.userId;
    const user = await User.findOne({ _id: userId });
    const posts = await Post.find({ _id: { $in: user.savedPosts } }).populate('postedBy', 'username')
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(500).send({ success: false, message: `Server error: ${error.message}` });
  }
};

exports.deletePostFromSaved = async (req, res) => {
  try {
    const postId = req.params.id;
    await User.updateOne(
      { _id: res.locals.userId },
      { $pull: { savedPosts: postId } }
    );
    const user = await User.findById(res.locals.userId)
    console.log("user posts", user.savedPosts)
      return res.status(200).json({ success: true, message: `Post was successfully removed from saved` });
  } catch (error) {
    return res.status(500).send({ success: true, message: `Server error: ${error.message}` });
  }
};

exports.addComment = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = res.locals.userId; 
    const date = new Date();
    const post = await Post.findById(postId);
      if (!post){
          return res.status(404).send({success: false, message: `Post with this id is not found`})
      }
    const newComment = {
      body: req.body.commentBody,
      date: date,
      postedBy: userId
    }; 
      await Post.updateOne({ _id: postId},  {$push: { comments: newComment } });
      return res.status(200).json({ success: true, message: `Comment was successfully added` });
  } catch (error) {
    return res.status(500).send({ success: true, message: `Server error: ${error.message}` });
  }
};

exports.getComments = async (req, res) => {
  try {
    const postId = req.params.id;
    const date = new Date();
    const post = await Post.findById(postId).populate(
      "comments.postedBy",
      "username"
    ); // include the author's username;
      if (!post){
          return res.status(404).send({success: false, message: `Post with this id is not found`})
      }
    const comments = post.comments;
      return res.status(200).json(comments);
  } catch (error) {
    return res.status(500).send({ success: true, message: `Server error: ${error.message}` });
  }
};

exports.addlikes = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.body.userId; 
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).send({ success: false, message: `Post with this id is not found` })
    }
    if (post.likes.includes(userId)){
      await Post.updateOne({ _id: postId }, { $pull: { likes: userId },$inc: { likes_count: -1 }, });
      return res.status(200).json({ success: true, message: `Like was removed`, liked: false });
    } else {
      await Post.updateOne({ _id: postId }, { $push: { likes: userId },$inc: { likes_count: 1 } });
      return res.status(200).json({ success: true, message: `Like was added`, liked: true });
    }
    return res.status(200).json({ success: true, message: `Post was successfully liked` });
  } catch (error) {
    return res.status(500).send({ success: false, message: `Server error: ${error.message}` });
  }
}

exports.getlikes = async (req, res) => {
  try {
    const postId = req.params.id;
    const post = await Post.findById(postId).populate('likes')
    if (!post){
          return res.status(404).send({success: false, message: `Post with this id is not found`})
      }
      const likes = post.likes
      const likeCount = post.likes_count
      // const likeCount = post.likes.lengt; Count likes
      return res.status(200).json({ success: true, likes,likeCount});
  } catch (error) {
    return res.status(500).send({ success: true, message: `Server error: ${error.message}` });
  }
};
