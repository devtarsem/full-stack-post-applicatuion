const mongoose = require('mongoose')

const bookmarkSchema = mongoose.Schema({
    user : {
        type : mongoose.Schema.ObjectId,
        ref : 'signup'
    }
    ,
    postid : {
        type : mongoose.Schema.ObjectId,
        ref : 'post'
    }
})

const bookmark = new mongoose.model('bookmark', bookmarkSchema)

module.exports = bookmark