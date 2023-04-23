const mongoose = require('mongoose')

const activitySchema = mongoose.Schema({
    user : {
        type : mongoose.Schema.ObjectId,
        ref : 'signup'
    }
    ,
    comment : {
        type : String,
        trim : true,
        default : ''
    }
    ,
    like : {
        type : Boolean,
        default : false
    }
    ,
    postId : {
        type : mongoose.Schema.ObjectId,
        ref : 'post'
    }
})

const activity = new mongoose.model('activity', activitySchema)

module.exports = activity

