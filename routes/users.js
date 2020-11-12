const express = require('express')
const router = express.Router()
const User = require('../models/user')

//all users
router.get('/', (req, res) => {
    res.render('users/index')
})




//new 
router.get('/new', (req, res) => {
    res.render('users/new', {user: new User()})
  })



//create user route
router.post('/', async (req, res) => {
    const user = new User({
        name: req.body.name

    })

    try{
            const newUser = await user.save()
           // res.redirect(`users/${newUser.id}`)
            res.redirect(`users`)
    }
    catch {
        res.render('users/new', {

            user: user,
            errorMessage: 'error creating user'
        })

    }
    

    
})
    
    






module.exports = router