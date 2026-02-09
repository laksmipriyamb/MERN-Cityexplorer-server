const messages = require('../models/messageModel')

//add message
exports.addMessageController = async (req, res) => {
    console.log("Inside addMessageController");
    console.log(req.body);
    
  const userId = req.payload.id
  const { spotId, message } = req.body || {};

  if (!spotId) {
  return res.status(400).json("spotId  required");
}

if (!message) {
  return res.status(400).json("message  required");
}

  try {
    const newMessage = new messages({
      spotId,
      userId,
      message
    })

    await newMessage.save()
    res.status(200).json("Message sent successfully")
  } catch (error) {
    res.status(500).json(error)
  }
}