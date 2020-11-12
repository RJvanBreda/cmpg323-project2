const mongoose = require('mongoose')

const personSchema = new mongoose.Schema({

    title:{
        type: String,
        required: true
    },
    Fullname:{
        type: String,
        required: true
        
    },
    Datebirth:{
        type: Date,
        required: true   
    },
    
    ID:{
        type: Number,
        required: true   
    },

    createdAt:{
        type: Date,
        required: true,   
        default: Date.now
    },

    fileUpload:{
        type: String,
         
        default: Date.now
    },

    user:{
        type: mongoose.Schema.Types.ObjectId,
         required: true,
         ref: 'User'
    },



})

module.exports = mongoose.model("person", personSchema)