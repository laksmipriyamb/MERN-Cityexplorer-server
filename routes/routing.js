//import express
const express = require('express')
const userController = require('../controller/userController')
const spotController = require('../controller/spotController')
const storyController = require('../controller/storyController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const adminMiddleware = require('../middlewares/adminMiddleware')
const multerMiddleware = require('../middlewares/multerMiddleware')
const reviewsController = require('../controller/reviewsController')
const messageController = require('../controller/messageController')
//create router object
const router = new express.Router()

//define path for client api request
//register
router.post('/register',userController.registerController)

//login
router.post('/login',userController.loginController)

//googlelogin
router.post('/google/login',userController.googleLoginController)

//get home stories
// router.get('/latestStories',storyController.getHomeStoriesController)


//get home spots
router.get('/topdestinations',spotController.getHomeSpotsController)

//get all reviews for home
router.get('/home/reviews',reviewsController.getUserHomeReviewsController)



// ---------------------------Admin-----------------

//add spot
router.post('/admin/spot/add',adminMiddleware,multerMiddleware.fields([{ name: 'coverImage', maxCount: 1 },{ name: 'galleryImages', maxCount: 5 }]),spotController.addSpotController)

//edit spot details
router.put('/admin/spot/edit/:id',adminMiddleware,multerMiddleware.fields([{ name: 'coverImage', maxCount: 1 },{ name: 'galleryImages', maxCount: 5 }]),spotController.updateSpotController)

//delete spots 
router.delete('/spot/:id/delete',adminMiddleware,spotController.deleteSpotController)

//get all stories for admin
router.get("/admin/stories/all",adminMiddleware,storyController.getAllStoriesAdminController);

//story status update
router.put('/stories/:id/update',adminMiddleware,storyController.updateStoryStatusController)

//get all users - admin
router.get('/admin-users/all',adminMiddleware,userController.getAllUsersController)

// ------------------------------User----------------

//get all spots
router.get('/allspots',jwtMiddleware,spotController.getUserAllSpotsController)

//get spot details by id
router.get('/spot/:id/view',jwtMiddleware,spotController.getSpotDetailsIdByController)

//post story - request body content is form data
router.post('/user/story/post',jwtMiddleware,multerMiddleware.fields([{ name: 'uploadImage', maxCount: 1 }]),storyController.postStoryController)

//get all stories approved
router.get('/stories/all',jwtMiddleware,storyController.getAllApprovedStoriesController)
//get all stories pending
router.get('/stories/all',jwtMiddleware,storyController.getAllPendingStoriesController)

//get all user uploaded stories
router.get('/user-stories/all',jwtMiddleware,storyController.getUserUploadStoryProfilePageController)

//get all reviews for profile page
router.get('/my/reviews',jwtMiddleware,reviewsController.getMyReviewsController)

//delete stories 
router.delete('/stories/:id',jwtMiddleware,storyController.deleteStoryController)



//user edit - request body content is formdata
router.put('/user/profile/edit/:id',jwtMiddleware,multerMiddleware.single('picture'),userController.updateUserProfileController)

//user add reviews
router.post('/user/add/review',jwtMiddleware,multerMiddleware.fields([{ name: 'reviewImages', maxCount: 2 }]),reviewsController.addReviewsController)

//get all reviews for user
router.get('/reviews/all',jwtMiddleware,reviewsController.getUserAllReviewsController)


//delete review
router.delete('/reviews/:id',jwtMiddleware,reviewsController.deleteReviewController)


//like ans unlike story
router.put("/story/like/:storyId",jwtMiddleware,storyController.likeStoryController);

//save or unsave 
router.post("/spot/save",jwtMiddleware,spotController.saveSpotController)

// get saved spots
router.get("/spot/saved",jwtMiddleware,spotController.getSavedSpotsController)

//send message of spot
router.post("/message/add", jwtMiddleware, messageController.addMessageController)

module.exports = router