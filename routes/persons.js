const express = require('express')
const router = express.Router()
const User = require('../models/user')
const Person = require('../models/person')
const path = require ('path')
const uploadPath = path.join('public', Person.filepath)
const multer =require('multer')
const fileTypes = ['xml']
const upload = multer({ dest:upload,
fileFilter: (req, file, callback) => {
  callback(null,)
}})


//all users
router.get('/', async (req, res) => {
    res.send("all")
    
})




//new 
router.get('/new', async (req, res) => {
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








  // Create Book Route
router.post('/', upload.single('file'), async (req, res) => {
  const fileName = req.file != null ? req.file.filename : null
  const person = new Person({
    title: req.body.title,
    user: req.body.user,
    Datebirth: new Date(req.body.Datebirth),
    ID: req.body.ID,
    file: fileName,
    Cellphone: req.body.Cellphone
  })

  try {
    const newPerson = await person.save()
    // res.redirect(`books/${newBook.id}`)
    res.redirect(`persons`)
  } catch {
    if (person.file != null) {
      removeBookCover(person.file)
    }
    renderNewPage(res, person, true)
  }
})

function removeBookCover(fileName) {
  fs.unlink(path.join(uploadPath, fileName), err => {
    if (err) console.error(err)
  })
}

async function renderNewPage(res, person, hasError = false) {
  try {
    const users = await User.find({})
    const params = {
      users: users,
      person: person
    }
    if (hasError) params.errorMessage = 'Error Creating Book'
    res.render('persons/new', params)
  } catch {
    res.redirect('/persons')
  }
}

module.exports = router