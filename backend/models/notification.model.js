const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({

    notification:
    {
        type: String,
    },
    email:
    {
        type: String,
        required: true,
    },
    notificationBy: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    date: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Notification', notificationSchema);