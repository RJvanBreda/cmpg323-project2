const express = require('express')
const router = express.Router()
const Person = require('../models/person')
const User = require('../models/user')

//all person details
router.get('/', async (req, res) => {
    res.send('All details')
    
})




//new details
router.get('/new', async (req, res) => {
    try{
        const users = await Users.find({})
        const person = new Person()
        res.render('persons/new', {
            users: users,
            person:person
        })
    }
    catch {
        res.redirect('/persons')

    }
        
    
   

    
  })



//create person
router.post('/', async (req, res) => {
    res.send('Create details')
    
})
    
    






module.exports = router