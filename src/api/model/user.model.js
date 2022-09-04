const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({

    userId:{
        type:String,
        unique:true
    },
    email:{
        type:String,
        required:true,
        minlength:5,
        maxlength:255,
        unique:true
    },
    updated: {
        type: Date
    },
    created: {
        type: Date,
        default: Date.now
    },
})

const User = mongoose.model('User',userSchema)
exports.User =  User;