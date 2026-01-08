const mongoose = require("mongoose");

const spotSchema = new mongoose.Schema(
  {
    spotname: {
      type: String,
      required: true
    },

    category: {
      type: String,
      required: true
    },

    location: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    bestTime: {
      type: String,
      required: true
    },

    coverImage: {
      type: String,
      required: true
    },

    galleryImages: {
        type: Array,
        required: true
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
      }
    ],

    savedBy: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users"
      }
    ]
  });

const spots = mongoose.model("spots", spotSchema);
module.exports = spots;
