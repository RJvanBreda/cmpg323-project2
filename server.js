if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: '.env' })
  }


const express = require ('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyparser = require('body-parser')
const methodOverride = require('method-override')


const flash = require('express-flash')
const session = require('express-session')


const passport = require('passport')
const bcrypt = require('bcrypt')
const uname = []





const initializePassport = require('./passport-config')
initializePassport(passport, email => uname.find(user => user.email === email)
)



app.use(flash())
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave:false,
  saveUnitialized: false
}))
app.use(passport.initialize())
app.use(passport.session())

app.use(express.urlencoded({extended: false}))

app.get('/',checkAuthenticated, (req, res) => {
  res.render('index.ejs')
})

app.get('/login', (req,res)=> {
  res.render('login.ejs')
})
 


//app.post('/index2', function(req, res) {
  // Your logic and then redirect
 // res.redirect('/index');
//});



app.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash:true


}))

app.get('/register', (req, res) => {
  res.render('register.ejs')
})

app.post('/register', async (req, res) => {
  try{
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      uname.push ({
        id:Date.now().toString(),
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
      })
      res.redirect('/login')
  }
  catch {
    res.redirect('/register')
  }
    console.log(uname)
})




const indexRouter = require('./routes/index')
const userRouter = require('./routes/users')
const personRouter = require('./routes/persons')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(methodOverride('_method'))
app.use(express.static('public'))
app.use(bodyparser.urlencoded({limit: '10mb', extended: false}))

const mongoose = require('mongoose')


mongoose.connect(process.env.DATABASE_URL, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex : true})
const db = mongoose.connection
db.on('error', error => console.error(error))
db.once('open', () => console.log('Connected to Mongoose'))


//app.get('/', (req, res) => {
  //res.render('/', {name: 'kyle'})
//})



app.use('/', indexRouter)
app.use('/users', userRouter)
app.use('/persons', personRouter)




function checkAuthenticated(req, res, next)
{

  if(req.isAuthenticated()) {
    return res.redirect('/index')
  }
  
}

app.listen(process.env.PORT || 3000)