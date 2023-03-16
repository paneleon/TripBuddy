const mongoose = require('mongoose');

const Category = {
    Restaurant,
    Residence,
    Attractions,
    Educational,
    Outdoors,
    Cultural,
    Religious,
    Other
}

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    rating: Number,
    postedBy: String,
    date: { type: Date, default: Date.now },
    image: String,
    category: Category,
    address: String,
    country: String,
    city: String,
    comments: [{ 
        body: String, 
        date: Date, 
        postedBy: String 
    }], 
    likes: [String], //list of user ids
}, { timestamps: true}) // will give properties createdAt and updatedAt

module.exports = mongoose.model('Post', postSchema);