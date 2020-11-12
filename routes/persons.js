const express = require('express')
const router = express.Router()
const User = require('../models/user')

//all users
router.get('/', async (req, res) => {
    res.send("all")
    
})




//new 
router.get('/new', (req, res) => {
  res.send("new")
  })



//create user route
router.post('/', async (req, res) => {
   

    
    

    
})
    
    






module.exports = router