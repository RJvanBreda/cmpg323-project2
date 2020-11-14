const express = require('express')
const router = express.Router()
const person = require('../models/person')


router.get('/', async (req, res) => {
    
    let persons
    try{
            persons = await person.find()
            
    }
    catch{
            person=[]
    }
    res.render('index', { persons: persons})
})

module.exports = router