//import express
const express = require('express')
const userController = require('../controller/userController')
const spotController = require('../controller/spotController')
const storyController = require('../controller/storyController')
const jwtMiddleware = require('../middlewares/jwtMiddleware')
const adminMiddleware = require('../middlewares/adminMiddleware')
const multerMiddleware = require('../middlewares/multerMiddleware')

//create router object
const router = new express.Router()

//define path for client api request
//register
router.post('/register',userController.registerController)

//login
router.post('/login',userController.loginController)

//googlelogin
router.post('/google/login',userController.googleLoginController)

//get home spots
router.get('/topdestinations',spotController.getHomeSpotsController)

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



// ------------------------------User----------------

//get all spots
router.get('/allspots',jwtMiddleware,spotController.getUserAllSpotsController)

//get spot details by id
router.get('/spot/:id/view',jwtMiddleware,spotController.getSpotDetailsIdByController)

//post story - request body content is form data
router.post('/user/story/post',jwtMiddleware,multerMiddleware.fields([{ name: 'uploadImage', maxCount: 1 }]),storyController.postStoryController)

//get all stories approved
router.get('/stories/all',jwtMiddleware,storyController.getAllApprovedStoriesController)

//get all user uploaded stories
router.get('/user-stories/all',jwtMiddleware,storyController.getUserUploadStoryProfilePageController)

//delete stories 
router.delete('/stories/:id',jwtMiddleware,storyController.deleteStoryController)


//user edit - request body content is formdata
router.put('/user/profile/edit/:id',jwtMiddleware,multerMiddleware.single('picture'),userController.updateUserProfileController)


module.exports = router