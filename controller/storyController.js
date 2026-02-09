const stories = require('../models/storyModel')

//post story
exports.postStoryController = async (req, res) => {
    console.log("Inside postStoryController");
    //get story details from req body
    console.log(req.body);
    console.log("JWT PAYLOAD:", req.payload)
    const { title, spotname, location, caption } = req.body
    const uploadImage = req.files.uploadImage[0].filename
    const publisherMail = req.payload.userMail
    const publisher = req.payload.id
    console.log(title, spotname, location, caption, uploadImage, publisherMail,publisher);

    try {
        const newStory = await stories.create({
            title, spotname, location, caption, uploadImage, publisherMail,publisher,status:"pending"
        })
        res.status(200).json(newStory)

    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

// //get home stories
// exports.getHomeStoriesController = async (req, res) => {
//     console.log("Inside getHomeStoriesController");
//     try {
//         const homeStories = await stories.find()
//         res.status(200).json(homeStories)
//     } catch (error) {
//         console.log(error);
//         res.status(500).json(error)
//     }
// }

//get all stories for admin
exports.getAllStoriesAdminController = async (req,res)=>{
    console.log("Inside getAllStoriesAdminController");
    try {
    const allStories = await stories
      .find()
      .populate("publisher", "username email picture")
      .sort({ createdAt: -1 });
    console.log(allStories[0].publisher)
    res.status(200).json(allStories);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}

//update story status
exports.updateStoryStatusController = async (req, res) => {
    console.log("Inside updateStoryStatusController");
    //get _id of story
    const { id } = req.params
    try {
        //get  stories from db 
        const storyDetails = await stories.findById({ _id: id })
        storyDetails.status = "approved"
        //save changes to mongodb
        await storyDetails.save()
        res.status(200).json(storyDetails)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

//get all approved stories
exports.getAllApprovedStoriesController = async (req, res) => {
  console.log("Inside getAllApprovedStoriesController");
  const userMailId = req.payload.id

  try {
    const allStories = await stories
      .find({ status: "approved",publisher : {$ne : userMailId} }) // ✅ only approved
      .populate("publisher", "username picture") // ✅ get user details
      .sort({ createdAt: -1 })

      const modifiedStories = allStories.map(story => ({
      ...story._doc,
      totalLikes: story.likes.length
    }));

    res.status(200).json(modifiedStories)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}
//get all pending stories
exports.getAllPendingStoriesController = async (req, res) => {
  console.log("Inside getAllPendingStoriesController");
  const userMailId = req.payload.id

  try {
    const allStories = await stories
      .find({ status:{$ne : "approved"},publisher : {$ne : userMailId} }) // 
      .populate("publisher", "username picture") // 
      .sort({ createdAt: -1 })

      const modifiedStories = allStories.map(story => ({
      ...story._doc,
      totalLikes: story.likes.length
    }));

    res.status(200).json(modifiedStories)
  } catch (error) {
    console.log(error)
    res.status(500).json(error)
  }
}

//get all user publishedstories
exports.getUserUploadStoryProfilePageController = async (req, res) => {
    console.log("Inside getUserUploadStoryProfilePageController");
    //get login user mail from token
    const loginUserMail = req.payload.userMail
    try {
        //get all stories from db posted by loggedin user
        const allUserStories = await stories.find({ publisherMail: loginUserMail })
        res.status(200).json(allUserStories)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }



}

//update story status-admin :login user 
exports.updateStoryStatusController = async (req, res) => {
    console.log("Inside updateStoryStatusController");
    //get _id of story
    const { id } = req.params
    try {
        //get  stories from db 
        const storyDetails = await stories.findById({ _id: id })
        storyDetails.status = "approved"
        //save changes to mongodb
        await storyDetails.save()
        res.status(200).json(storyDetails)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

//delete user story
exports.deleteStoryController = async (req, res) => {
    console.log("Inside deleteStoryController");
    //get _id of story
    const { id } = req.params
    try {
        //get  books from db 
        const storyDetails = await stories.findByIdAndDelete({ _id: id })
        res.status(200).json(storyDetails)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}



// like  story
exports.likeStoryController = async (req, res) => {
  const userId = req.payload.id; 
  const { storyId } = req.params;

  try {
    const story = await stories.findById(storyId);

    if (!story) {
      return res.status(404).json("Story not found");
    }

    const alreadyLiked = story.likes.includes(userId);

    if (alreadyLiked) {
      // unlike
      story.likes.pull(userId);
    } else {
      // like
      story.likes.push(userId);
    }

    await story.save();

    res.status(200).json({
      liked: !alreadyLiked,
      totalLikes: story.likes.length
    });

  } catch (err) {
    res.status(500).json(err.message);
  }
};
