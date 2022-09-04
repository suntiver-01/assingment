const mongoose = require('mongoose')
const { uuid } = require('uuidv4');

const groupSchema = new mongoose.Schema({
   
    userId:{
        type:String,
        required:true,
    },
    groupId:{
        type:String,
        required:true,
    },
    nameGroup:{
        type:String,
        required:true,
        minlength:1,
        maxlength:15
    },
    contact:[ {
        contactId:{
            type:String,
            required:true,
        },
        firstName:{
            type:String,
            required:true,
            minlength:1,
            maxlength:50
        },
        lastName:{
            type:String,
            minlength:1,
            maxlength:50,
            default:""
        },
        birthDate:{
            type:Date,
            default:""
        },
        phone:{
            type:String,
            maxlength:10,
            default:""
        },
        email:{
            type:String,
            minlength:5,
            maxlength:255,
            default:""
        },
        url:{
            type:String,
            minlength:5,
            maxlength:255,
            default:""
        },
        image:{
            type:String,
            default:""
        },
        updated: {
            type: Date,
            default:""
        },
        created: {
            type: Date,
            default: Date.now
        },
    }
],
  
    updated: {
        type: Date
    },
    created: {
        type: Date,
        default: Date.now
    },
})

const Group = mongoose.model('Group',groupSchema)
exports.Group =  Group;