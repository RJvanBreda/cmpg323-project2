const mongoose = require('mongoose')
const Person = require('./person')


//database
const userSchema = new mongoose.Schema({

    name:{
        type: String,
        required: true
    },
    
})



userSchema.pre('remove', function(next) {
    Person.find({user: this.id}, (err, persons) => {
        if (err) {
            next (err)
        } else if (persons.length > 0) {
            persons.forEach(person => person.remove())
            next()
        } else {
            next()
        }
    })
})
module.exports = mongoose.model("User", userSchema)