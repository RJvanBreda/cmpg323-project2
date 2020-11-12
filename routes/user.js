const express = require('express')
const router = express.Router()

//all
router.get('/', (req, res) => {
    res.render('user/index')
})




//new 
router.get('/new', (req, res) => {
    res.render('user/new', { author: new Author() })
  })

//create user
router.post('/', (req, res) => {
    res.send('create')
})
    
    






module.exports = router