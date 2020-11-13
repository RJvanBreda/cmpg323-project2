const mongoose = require('mongoose')
const path = require('path')
const coverImageBasePath = 'uploads/bookCovers'

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

    coverImageName:{
        type: String,
        required: true,   
        
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
            return path.join('/', coverImageBasePath, this.coverImageName)
    }
})

module.exports = mongoose.model("Person", personSchema)
module.exports.coverImageBasePath = coverImageBasePath