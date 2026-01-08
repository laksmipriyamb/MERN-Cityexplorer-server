const spots = require('../models/spotModel')

//add spot
exports.addSpotController = async (req,res)=>{
    console.log("Inside addSpotController");
    console.log(req.body);
    
    // const {spotname,category,location,description,bestTime,coverImage,galleryImages} = req.body
    // console.log(spotname,category,location,description,bestTime,coverImage,galleryImages);
    res.status(200).json("Add spot request received")
    
}