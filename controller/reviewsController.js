const reviews = require('../models/reviewsModel')

exports.addReviewsController = async (req, res) => {
    console.log("Inside addReviewsController");
    //console.log(req.body);
    const publisher = req.payload.id
    const { spotname, location,rating, description } = req.body
    const reviewImages = req.files.reviewImages.map(file => file.filename)
    console.log(spotname, location,rating, description,reviewImages);

    try {
            const newReview = await reviews.create({
                publisher,spotname, location,rating, description,reviewImages
            })
            res.status(200).json(newReview)

    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }




    res.status(200).json("Add spot request received")

}

// //delete review
// exports.deleteReviewController = async (req, res) => {
//     console.log("Inside deleteReviewController");
//     //get _id of story
//     const { id } = req.params
//     try {
//         //get  books from db 
//         const reviewDetails = await reviews.findByIdAndDelete({ _id: id })
//         res.status(200).json(reviewDetails)
//     } catch (error) {
//         console.log(error);
//         res.status(500).json(error)
//     }
// }

//get all reviews
exports.getUserAllReviewsController = async (req, res) => {
    console.log("Inside getUserAllReviewsController");
    const userMailId = req.payload.id
    try {
        const allreviews = await reviews.find({publisher: {$ne:userMailId}})
        .populate("publisher", "username picture email")
        .sort({ createdAt: -1 })
        res.status(200).json(allreviews)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

//get home reviews
exports.getUserHomeReviewsController = async (req, res) => {
    console.log("Inside getUserHomeReviewsController");
    try {
        const allreviews = await reviews.find()
        .populate("publisher", "username picture email")
        .sort({ createdAt: -1 })
        res.status(200).json(allreviews)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}

//get my reviews
exports.getMyReviewsController = async (req, res) => {
    console.log("Inside getMyReviewsController");
    console.log(req.payload);
    
      const userMailId = req.payload.id

    try {
        const allreviews = await reviews.find({publisher : userMailId})
        .sort({ createdAt: -1 })
        res.status(200).json(allreviews)
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
}