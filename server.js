if(process.env.NODE_ENV !== 'production') {
    require('dotenv').config({ path: '.env' })
  }

const express = require ('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyparser = require('body-parser')
const methodOverride = require('method-override')


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


app.use('/', indexRouter)
app.use('/users', userRouter)
app.use('/persons', personRouter)


app.listen(process.env.PORT || 3000)