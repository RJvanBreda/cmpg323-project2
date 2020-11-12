const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Person = require('../models/person')


//all users
router.get('/', async (req, res) => {
    res.send("all")
    
})




//new 
router.get('/new', async (req, res) => {
  try{
      const users = await User.find({})
      const person = new Person()
      res.render('persons/new', {

      
      users: users,
      person: person
  })
}
  catch{
    res.redirect('/persons')
  }
  })



//create user route
router.post('/', async (req, res) => {
   

    
    

    
})
    
    






module.exports = router