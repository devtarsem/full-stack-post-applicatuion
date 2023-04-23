const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    user : {
        type : mongoose.Schema.ObjectId,
        ref : 'signup'
    }
    ,
    title : {
        type : String,
        trim : true
    }
    ,
    description : {
        type : String,
        trim : true
    }
    ,
    tagged : {
        type : String,
        trim : true
    }
    ,
    username : {
        type : String,
        trim : true
    }
    ,
    likes : {
        type : Number,
        trim : true,
        default : 0
    }
    ,
    comments : {
        type : Array
    }
    ,
    identifier : {
        type : Number
    }
})

const post = new mongoose.model('post', postSchema)

module.exports = post

