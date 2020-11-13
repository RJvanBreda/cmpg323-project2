const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const User = require('../models/user')
const Person = require('../models/person')
const uploadPath = path.join('public', Person.coverImageBasePath)
const imageMimeTypes = ['image/jpgeg', 'image/png']

const upload = multer({
  dest: uploadPath,
  fileFilter:(req, file, callback) => {

    callback(null, imageMimeTypes.includes(file.mimetype)) 
  }

})


//all users
router.get('/', async (req, res) => {
    res.send("all")
    
})




//new 
router.get('/new', async (req, res) => {
  renderNewPAge(res, new Person())
  /*try{
      const users = await User.find({})
      const person = new Person()
      res.render('persons/new', {

      
      users: users,
      person: person
  })
}
  catch{
    res.redirect('/persons')
  }*/
  })



//create user route
router.post('/', upload.single('cover'), async (req, res) => {
  const fileName = req.file != null ? req.file.filename:null
  const person = new Person ({
    title: req.body.title,
    user: req.body.user,
    Datebirth: new Date(req.body.Datebirth),
    ID: req.body.ID,
    coverImageName: fileName,
    Cellphone: req.body.Cellphone

  }
  )
  try{
      const newPerson = await person.save()
      //res.redirect('persons/${nenPerson.id}')
      res.redirect('persons')

  }

  catch {
    renderNewPAge(res, person, true)

  }
   

    
    

    
})
    
    



async function renderNewPAge(res, person, hasError = false) {
  try{
    const users = await User.find({})
    const params = {
      users: users,
    person: person
    }
    if (hasError) params.errorMessage = 'error creating '

    res.render('persons/new', params) 

}
catch{
  res.redirect('/persons')
}



}


module.exports = router