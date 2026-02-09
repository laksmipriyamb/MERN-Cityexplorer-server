const spots = require('../models/spotModel')

//add spot
exports.addSpotController = async (req, res) => {
    console.log("Inside addSpotController");
    //console.log(req.body);
    const { spotname, category, location, description, bestTime } = req.body
    const coverImage = req.files.coverImage[0].filename
    const galleryImages = req.files.galleryImages.map(file => file.filename)
    console.log(spotname, category, location, description, bestTime, coverImage, galleryImages);

    try {
        const existingSpot = await spots.findOne({ spotname, location })
        if (existingSpot) {
            res.status(401).json("Spot Already Added....Add new Spot!!!")
        } else {
            const newSpot = await spots.create({
                spotname, category, location, description, bestTime, coverImage, galleryImages
            })
            res.status(200).json(newSpot)
        }

    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }




    res.status(200).json("Add spot request received")

}

//get home spots
exports.getHomeSpotsController = async (req, res) => {
    console.log("Inside getHomeSpotsController");
    try {
        const homeSpots = await spots.find()
        res.status(200).json(homeSpots)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

//get all  spots -user
exports.getUserAllSpotsController = async (req, res) => {
    console.log("Inside getHomeSpotsController");
    try {
        const allSpots = await spots.find()
        res.status(200).json(allSpots)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

//get spot details by id
exports.getSpotDetailsIdByController = async (req, res) => {
    console.log("Inside getSpotDetailsIdByController");
    const { id } = req.params
    try {
        const spotDetails = await spots.findById(id)
        if (!spotDetails) {
            return res.status(404).json("Spot not found")
        }
        res.status(200).json(spotDetails)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

//edit spot details
// update spot by id - admin
exports.updateSpotController = async (req, res) => {
  console.log("Inside updateSpotController");

  const { id } = req.params;

  try {
    // find existing spot
    const existingSpot = await spots.findById(id);
    if (!existingSpot) {
      return res.status(404).json("Spot not found");
    }

    // destructure text fields
    const {
      spotname,
      category,
      location,
      description,
      bestTime
    } = req.body;

    // base update object
    const updateData = {
      spotname: spotname || existingSpot.spotname,
      category: category || existingSpot.category,
      location: location || existingSpot.location,
      description: description || existingSpot.description,
      bestTime: bestTime || existingSpot.bestTime,
    };

    // ✅ cover image update
    if (req.files?.coverImage) {
      updateData.coverImage = req.files.coverImage[0].filename;
    }

    // ✅ gallery images update (append)
    if (req.files?.galleryImages?.length > 0) {
      const newImages = req.files.galleryImages.map(
        file => file.filename
      );

      updateData.galleryImages = [
        ...existingSpot.galleryImages,
        ...newImages
      ];
    }

    // ✅ update using updateData
    const updatedSpot = await spots.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    res.status(200).json(updatedSpot);

  } catch (error) {
    console.error(error);
    res.status(500).json("Server error while updating spot");
  }
};

//delete spot by admin
exports.deleteSpotController = async (req, res) => {
    console.log("Inside deleteBookController");
    //get _id of book
    const { id } = req.params
    try {
        //get  books from db 
        const spotDetails = await spots.findByIdAndDelete(id)
        res.status(200).json(spotDetails)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

//save spot controller
exports.saveSpotController = async (req, res) => {
  console.log("Inside saveSpotController");

  const userId = req.payload.id
  const { spotId } = req.body

  try {
    const spot = await spots.findById(spotId)

    if (!spot) {
      return res.status(404).json("Spot not found")
    }

    //unsave
    if (spot.savedBy.includes(userId)) {
      spot.savedBy = spot.savedBy.filter(
        (id) => id.toString() !== userId
      )
      await spot.save()
      return res.status(200).json({ message: "Spot removed from saved" })
    }

    // Save spot
    spot.savedBy.push(userId)
    await spot.save()

    res.status(200).json({ message: "Spot saved successfully" })

  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
}

//get saved spots
exports.getSavedSpotsController = async (req, res) => {
  const userId = req.payload.id

  try {
    const savedSpots = await spots.find({
      savedBy: userId
    })

    res.status(200).json(savedSpots)
  } catch (error) {
    console.log(error);
    res.status(500).json(error)
  }
}