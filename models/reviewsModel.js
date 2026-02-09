const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
    {
        publisher: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "users",
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
        
        rating: {
            type: Number,
            required: true
        },

        description: {
            type: String,
            required: true
        },
        reviewImages: {
            type: Array,
            required: true
        },
    },
    {
        timestamps: true,
    }
);
const reviews = mongoose.model("reviews", reviewSchema);
module.exports = reviews;

