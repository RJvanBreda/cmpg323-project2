const express = require('express')
const router = express.Router()
const User = require('../models/user')

//all users
router.get('/', async (req, res) => {
    let searchOptions = {}
    if (req.query.name !=null && req.query.name !== '') {
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try{
        const users = await User.find(searchOptions)
        res.render('users/index', {
            users: users, 
            searchOptions: req.query})
    }
    catch{
        res.redirect('/')
    }

    
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
    
    



router.get('/:id', (req, res) => {
    res.send('show User' + req.params.id)


})

router.get('/:id/edit', (req, res) =>{

    res.send('edit User' + req.params.id)
})

router.put('/:id', (req, res) =>{
    res.send('update User' + req.params.id)
})

router.delete('/:id', (req, res) =>{
    res.send('Delete User' + req.params.id)
})
module.exports = router