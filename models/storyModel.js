const mongoose = require('mongoose')

const storySchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    spotname: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    caption: {
        type: String,
        required: true
    },
    publisherMail: {
        type: String,
        required: true
    },
    publisher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
    },
    uploadImage: {
        type: String,
        required: true
    },
    status:{
        type:String,
        default:'pending'
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
    }]

},
    {
        timestamps: true
    });

const stories = mongoose.model("stories", storySchema);

module.exports = stories