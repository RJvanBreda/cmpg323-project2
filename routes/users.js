const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Person = require('../models/person')

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



// Create user Route
//create user route
router.post('/', async (req, res) => {
  const user = new User({
      name: req.body.fname,
      

  })

  try{
          const newUser = await user.save()
         
          //res.redirect(`users`)
  }
  catch {
      res.render('users/new', {

          user: user,
          errorMessage: 'error creating user'
      })

  }
  

  
})
  
    



router.get('/:id', async (req, res) => {
    res.send('show User - ' + req.params.id)
    
    /*try {
            const user = await User.findById(req.params.id)
           // const  persons = await Person.find({user: user.id})
            res.render ('users/show', {
                user: user,
               // userdetailsare: persons
            })

    }
    catch {
        
            res.redirect('/')
    }
    
*/
})

router.get('/:id/edit',  async(req, res) =>{

    try {
        const user = await User.findById(req.params.id)
        res.render('users/edit', {user: user})
    }
    catch {
            res.redirect('/users')
    }

    
})

router.put('/:id', async (req, res) =>{
    let user
    

    try{
        user = await User.findById(req.params.id)
        user.name = req.body.name
            await user.save()
          // res.redirect(`users/${newUser.id}`)
           res.redirect(`/users/${user.id}`)
    }
    catch {
        if (user == null) {

            res.redirect('/')
        } else {
        res.render('users/edit', {

            user: user,
            errorMessage: 'error updating user'
        
        })

    }
}
    //res.send('update User' + req.params.id)
})

router.delete('/:id', async (req, res) => {
    let user
    try {
      user = await User.findById(req.params.id)
      await user.remove()
      res.redirect('/users')
    } catch {
      if (user == null) {
        res.redirect('/users')
      } else {
        res.redirect(`/users/${user.id}`)
      }
    }
  })
  
module.exports = router

