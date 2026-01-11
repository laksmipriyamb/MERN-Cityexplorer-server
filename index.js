//import express,dotenv,cors
//loads .env file contents into process.env by default
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const router = require('./routes/routing')
require('./config/db')

//create srver for express
const cityexplorerServer = express()

//enable cors in express server
cityexplorerServer.use(cors())

//add json parser to server
cityexplorerServer.use(express.json())

//use router in server
cityexplorerServer.use(router)
//enable static files
cityexplorerServer.use('/uploads',express.static('./uploads'))

//create a port where server listen in web
const PORT = 3000

//server listen in that port
cityexplorerServer.listen(PORT,()=>{
    console.log("Cityexplorer server Started...And waiting for client request");
    
})

//resolve http get request to http://localhost:3000/ using server
cityexplorerServer.get('/',(req,res)=>{
    res.status(200).send('<h1>Cityexplorer server Started...And waiting for client request</h1>')
})