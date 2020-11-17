const mongoose = require('mongoose')
const path = require('path')
const fileBasePath = 'uploads/files'

//database
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
    
    Ident:{
        type: Number,
        required: true   
    },

    createdAt:{
        type: Date,
        required: true,   
        default: Date.now
    },

    
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,   
        ref: 'User'
        
    },




})

personSchema.virtual('coverImagePath').get(function(){

    if (this.coverImageName!=null)
    {
            return path.join('/',  fileBasePath, this.coverImageName)
    }
})

module.exports = mongoose.model("Person", personSchema)
module.exports. fileBasePath =  fileBasePath