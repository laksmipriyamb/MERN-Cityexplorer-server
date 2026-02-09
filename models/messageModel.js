const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema(
  {
    spotId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "spots",
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true
    },
    message: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
)

const messages = mongoose.model("messages", messageSchema)
module.exports = messages