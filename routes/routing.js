//import express
const express = require('express')
const userController = require('../controller/userController')
const spotController = require('../controller/spotController')
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

// ---------------------------Admin-----------------

//add spot
router.post('/admin/spot/add',adminMiddleware,multerMiddleware.fields([{ name: 'coverImage', maxCount: 1 },{ name: 'galleryImages', maxCount: 5 }]),spotController.addSpotController)

// ------------------------------User----------------

module.exports = router