const mongoose = require('mongoose')


const  filepath = "uploads/files"

const personSchema = new mongoose.Schema({

    title:{
        type: String,
        required: true
    },
    Cellphone:{
        type: Number,
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

    file:{
        type: String,
        required: true,   
        
    },

    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,   
        ref: 'User'
        
    },




})

module.exports = mongoose.model("Person", personSchema)

module.exports.filepath = filepath