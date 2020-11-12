const express = require('express')
const router = express.Router()
const User = require('../models/user')

//all
router.get('/', (req, res) => {
    res.render('users/index')
})




//new 
router.get('/new', (req, res) => {
    res.render('users/new', {user: new User()})
  })

//create user route
router.post('/', (req, res) => {
    res.send('Create')
})
    
    






module.exports = router