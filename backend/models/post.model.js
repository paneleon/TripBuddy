const mongoose = require('mongoose');

const Category = {
    Restaurant: "Restaurant",
    Residence: "Residence",
    Attractions: "Attractions",
    Educational: "Educational",
    Outdoors: "Outdoors",
    Cultural: "Cultural",
    Religious: "Religious",
    Other: "Other"
}

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: String,
    rating: Number,
    postedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    date: { type: Date, default: Date.now },
    image: String,
    category: {
        type: String,
        enum: Category
    },
    address: String,
    country: String,
    city: String,
    comments: [{ 
        body: String, 
        date: Date, 
        postedBy: mongoose.Schema.Types.ObjectId 
    }], 
    likes: [mongoose.Schema.Types.ObjectId], //list of user ids
}, { timestamps: true}) // will give properties createdAt and updatedAt

module.exports = mongoose.model('Post', postSchema);