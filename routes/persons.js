const express = require('express')
const router = express.Router()
const multer = require('multer')
const path = require('path')
const fs = require('fs')
const User = require('../models/user')
const Person = require('../models/person')

const uploadPath = path.join('public', Person. fileBasePath)
const fileTypes = [ '.txt','.xlsx']
const upload = multer({
  dest: uploadPath,
  fileFilter:(req, file, callback) => {

    callback(null, fileTypes.includes(file.mimetype)) 
  }

})


//all users
router.get('/', async (req, res) => {

  let query = Person.find()
  if (req.query.title !=null && req.query.title != '' ) {
    query = query.regex('title', RegExp(req.query.title, 'i'))
  }
  //if (req.query.Datebirth !=null && req.query.Datebirth != '' ) {
  //  query. query.lte('Datebirth', req,query.Datebirth)
  //}

  try {
    const persons = await query.exec({})
    res.render('persons/index', {
      persons:persons,
      searchOptions:req.query

    })


  }
  catch 
  {
    res.redirect('/')
  }
    
    
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
    Ident: req.body.Ident,
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
    if (person.coverImageName!=null)
    {
      removefile(person.coverImageName)
    }
    
    renderNewPAge(res, person, true)

  }
   

    
    

    
})
    
    
function removefile(fileName)
{
  fs.unlink(path.join(uploadPath.fileName), err =>
  {
    if(err) console.error(err)
  })
}



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